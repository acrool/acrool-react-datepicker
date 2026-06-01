import clsx from 'clsx';
import CSS from 'csstype';
import dayjs from 'dayjs';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import {ListChildComponentProps, VariableSizeList as List} from 'react-window';

import {useLocaleWeekDay} from '../hooks';
import useLocale from '../locales';
import {getWeeksInMonth, isEmpty} from '../utils';
import {DatepickerAtom} from './Datepicker';
import styles from './scroll-range-datepicker.module.scss';
import {IScrollRangeDatepickerProps} from './types';
import {getToday} from './utils';


interface IAutoSize {
    width: number
    height: number
}




// 未設定 minDate/maxDate 時，焦點月前後各預載的月數 (模擬無限滾動)
const DEFAULT_RANGE_MONTHS = 60;

// 年月標題列高度 (對應 .date-year-month-row)
const YEAR_MONTH_ROW_HEIGHT = 30;
// 日期格容器左右 padding (對應 .date-day-content padding: 0 12px)
const DATE_CONTENT_PADDING_X = 12;
// 日期格列間距 (對應 .date-day-content row-gap)；月份間距也沿用此值
const ROW_GAP = 4;
// 容器寬度未知時的日期格高度後備值
const DAY_CELL_FALLBACK = 30;




/**
 * 日期輸入控件
 *
 * 手機版使用原生輸入框, 電腦版使用自製的Picker選擇
 * supper control & unControl
 *
 * @param className
 * @param style
 * @param label
 * @param value
 * @param value
 * @param onChange
 * @constructor
 */
const ScrollRangeDatepicker = ({
    className,
    style,
    value = {startDate: getToday(), endDate: getToday()},
    onChange,
    defaultFocusDate,
    format = 'YYYY-MM-DD',
    maxYear,
    minYear,
    locale,
    isVisibleFastPicker = false,
    minDate,
    maxDate,
    isDark,
}: IScrollRangeDatepickerProps) => {
    const {i18n} = useLocale(locale);
    // const today = getToday();
    const listRef = useRef<List>(null);
    // 虛擬列表可捲動的外層元素 (用於量測 scrollbar 寬度)
    const outerRef = useRef<HTMLDivElement>(null);
    const [focusDate] = useState<string|undefined>(defaultFocusDate);
    // 虛擬列表容器寬度 (用於動態計算每月高度)
    const [listWidth, setListWidth] = useState(0);
    // scrollbar 佔用寬度 (用於對齊星期列與日期格)
    const [scrollbarWidth, setScrollbarWidth] = useState(0);
    // 目前捲動到頂部的月份 index (用於年月吸頂)
    const [topIndex, setTopIndex] = useState(0);


    /**
     * 計算可捲動的月份範圍
     *
     * - 有帶 minDate/maxDate：限制最早/最晚可滾動的月份
     * - 未帶：以焦點月為中心前後各 DEFAULT_RANGE_MONTHS 個月 (模擬無限滾動)
     */
    const {startMonth, itemCount, focusIndex} = useMemo(() => {
        const focusMonth = dayjs(isEmpty(focusDate) ? undefined : focusDate).startOf('month');

        const hasMin = !isEmpty(minDate) && dayjs(minDate).isValid();
        const hasMax = !isEmpty(maxDate) && dayjs(maxDate).isValid();

        const start = hasMin
            ? dayjs(minDate).startOf('month')
            : focusMonth.subtract(DEFAULT_RANGE_MONTHS, 'month');
        const end = hasMax
            ? dayjs(maxDate).startOf('month')
            : focusMonth.add(DEFAULT_RANGE_MONTHS, 'month');

        const count = Math.max(1, end.diff(start, 'month') + 1);

        // 焦點月限制在範圍內，作為初始捲動位置
        const fIndex = Math.min(Math.max(focusMonth.diff(start, 'month'), 0), count - 1);

        return {startMonth: start, itemCount: count, focusIndex: fIndex};
    }, [focusDate, minDate, maxDate]);


    /**
     * 由列表 index 換算對應的年月
     */
    const getMonthByIndex = useCallback((index: number) => {
        return startMonth.add(index, 'month');
    }, [startMonth]);


    /**
     * 動態計算每月高度
     *
     * 依該月實際週數計算，避免固定高度造成週數較少月份的多餘空白；
     * 扣掉 scrollbar 寬度，使日期格高度與實際渲染的方格一致
     */
    const getItemSize = useCallback((index: number) => {
        const weeks = getWeeksInMonth(getMonthByIndex(index));
        const cellSize = listWidth > 0
            ? (listWidth - scrollbarWidth - DATE_CONTENT_PADDING_X * 2) / 7
            : DAY_CELL_FALLBACK;
        const dayContentHeight = weeks * cellSize + (weeks - 1) * ROW_GAP;
        // 月份之間的間距沿用週列間距 (ROW_GAP)
        return YEAR_MONTH_ROW_HEIGHT + dayContentHeight + ROW_GAP;
    }, [getMonthByIndex, listWidth, scrollbarWidth]);


    useEffect(() => {
        // 範圍/寬度/焦點月變動時，重算高度快取並回到焦點月
        if (!listRef.current) return;
        listRef.current.resetAfterIndex(0);
        if (listWidth > 0) {
            listRef.current.scrollToItem(focusIndex, 'start');
            setTopIndex(focusIndex);
        }
    }, [focusIndex, listWidth, itemCount]);


    useEffect(() => {
        // 量測 scrollbar 寬度 (外層 offsetWidth 含 scrollbar、clientWidth 不含)
        const el = outerRef.current;
        if (!el) return;
        const width = el.offsetWidth - el.clientWidth;
        setScrollbarWidth(prev => prev !== width ? width : prev);
    }, [listWidth, itemCount]);


    const localeWeekDay = useLocaleWeekDay(locale);

    const commonProps = {isDark, format, minYear, maxYear, locale};


    /**
     * 記錄目前頂部可視月份，供年月吸頂使用
     */
    const handleItemsRendered = useCallback((props: {visibleStartIndex: number}) => {
        setTopIndex(props.visibleStartIndex);
    }, []);


    // 吸頂顯示的年月文字
    const topMonth = getMonthByIndex(topIndex);
    const stickyYearMonth = `${i18n(`com.datepicker.month.${topMonth.month() + 1}`)} ${topMonth.year()}`;



    /**
     * 當資料異動
     * @param newValue
     */
    const handleOnChange = (newValue: string) => {
        if (!onChange) return;

        if (isEmpty(value)) {
            onChange({startDate: newValue, endDate: undefined});
            return;
        }

        const {startDate, endDate} = value;
        const isSameAsStart = dayjs(startDate).isSame(newValue);
        const isSameAsEnd = dayjs(endDate).isSame(newValue);
        const isBeforeStart = dayjs(newValue).isBefore(startDate);
        // const isSameAsStartAndEnd = dayjs(startDate).isSame(endDate);

        if (isEmpty(startDate)) {
            onChange({startDate: newValue, endDate: undefined});
            return;
        }

        if (isSameAsStart) {
            onChange({...value, startDate: undefined});
            return;
        }

        if (isEmpty(endDate)) {
            if (isBeforeStart) {
                onChange({...value, startDate: newValue, endDate: undefined});
            } else if (isSameAsStart) {
                onChange({...value, endDate: newValue});
            } else {
                onChange({...value, endDate: newValue});
            }
            return;
        }

        if (isSameAsEnd) {
            onChange({...value, endDate: undefined});
            return;
        }

        // if (isSameAsStartAndEnd) {
        //     onChange({...value, endDate: newValue});
        //     return;
        // }

        onChange({startDate: newValue, endDate: undefined});
    };




    /**
     * 產生週標題
     */
    const renderWeek = useCallback(() => {

        return <>
            {/*<div className={styles.dateWeekRowFill}/>*/}
            {/*右側補上 scrollbar 寬度，讓星期列與下方日期格對齊*/}
            <div
                className={styles.dateWeekRow}
                style={{paddingRight: DATE_CONTENT_PADDING_X + scrollbarWidth}}
            >
                {localeWeekDay.map((week, index) => <div className={styles.dateWeek}
                    key={`localeWeekDay-${index}-${week}`}>{week}</div>)}
            </div>
        </>;

    }, [localeWeekDay, scrollbarWidth]);


    /**
     * 產生日曆表
     */
    const renderDateRange = useCallback((listProps: ListChildComponentProps) => {

        const row = getMonthByIndex(listProps.index);

        return <DatepickerAtom
            {...commonProps}
            key={row.format('YYYY-MM')}
            style={{...listProps.style} as CSS.Properties}
            values={value}
            onChange={handleOnChange}
            // minDate={isEmpty(value?.endDate) ? value?.startDate: undefined}
            yearMonthPanel={row}
            // minDate={minDate}
            // maxDate={value?.endDate ? value?.endDate : maxDate}
        />;
    }, [value, getMonthByIndex]);





    return (
        <div
            // ref={containerRef}
            data-fast={isVisibleFastPicker ? '': undefined}
            className={clsx(
                styles.root,
                className,
                {'dark-theme': isDark}
            )}
            style={style}
        >
            {renderWeek()}

            <div className={styles.scrollWrapper}>

                {/*年月吸頂 (覆蓋頂部月份的年月列，視覺上無縫接續)*/}
                <div className={styles.stickyYearMonth} data-year-month={topMonth.format('YYYY-MM')}>
                    {stickyYearMonth}
                </div>

                <AutoSizer onResize={({width}: IAutoSize) => setListWidth(width)}>
                    {({height, width}: IAutoSize) => {
                        const ListComponent = List as unknown as React.ComponentType<any>;
                        return <ListComponent
                            ref={listRef}
                            outerRef={outerRef}
                            className="List"
                            itemCount={itemCount}
                            itemSize={getItemSize}
                            estimatedItemSize={YEAR_MONTH_ROW_HEIGHT + 6 * DAY_CELL_FALLBACK + 6 * ROW_GAP}
                            height={height}
                            width={width}
                            onItemsRendered={handleItemsRendered}
                        >
                            {renderDateRange}
                        </ListComponent>;
                    }}
                </AutoSizer>
            </div>

        </div>
    );
};

export default ScrollRangeDatepicker;

