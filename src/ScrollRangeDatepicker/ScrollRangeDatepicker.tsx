import React, {useCallback, useEffect, useRef, useState} from 'react';

import {DatepickerAtom} from './Datepicker';
import {EDateRange} from '../typing';
import {getYearMonthRange, selectDateRange} from '../utils';
import clsx from 'clsx';
import useLocale from '../locales';
import {IScrollRangeDatepickerProps} from './types';
import {getToday} from './utils';
import styles from './scroll-range-datepicker.module.scss';
import dayjs from 'dayjs';
import {useLocaleWeekDay} from '../hooks';
import {FixedSizeList as List, ListChildComponentProps} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import CSS from 'csstype';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);


interface IAutoSize {
    width: number;
    height: number
}



const Row = (listProps: ListChildComponentProps) => {
    return <div className={listProps.index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={{
        ...listProps.style,
        height: '100px',
    }}>
        Row {listProps.index}
    </div>;
};


const MONTH_COUNT = 10 * 12;
const CENTER_ITEM = MONTH_COUNT / 2;
const DAY_HEIGHT = 30;
const DAY_GAP = 2;
const MONTH_PADDING = 10;

const MONTH_HEIGHT = (DAY_HEIGHT + ((DAY_HEIGHT + DAY_GAP) * 6)) + (MONTH_PADDING * 2);


function getWeeksInMonth(year: number, month: number) {
    const firstDay = dayjs(`${year}-${month}-01`);
    const lastDay = firstDay.endOf('month');

    const firstWeek = firstDay.isoWeek();
    const lastWeek = lastDay.isoWeek();

    return lastWeek - firstWeek + 1;
}



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
    const today = getToday();
    const listRef = useRef<List>(null);


    // const [beforeData, setBeforeData] = useState<number>(3);
    // const [afterData, setAfterData] = useState<number>(3);
    //
    // const loadMoreTop = async () => {
    //     setBeforeData(curr => curr + 3);
    //     setAfterData(curr => curr - 3);
    // };
    //
    // const loadMoreBottom = async () => {
    //     setBeforeData(curr => curr - 3);
    //     setAfterData(curr => curr + 3);
    // };

    // const {containerRef, topRef, bottomRef, isLoadingTop, isLoadingBottom} = useInfiniteScroll({
    //     loadMoreTop,
    //     loadMoreBottom,
    // });


    useEffect(() => {
        // 預設移動位置
        setTimeout(() => {
            if(listRef.current){
                listRef.current.scrollToItem(CENTER_ITEM);
            }
        }, 0);

    }, [listRef.current]);
    
    
    const localeWeekDay = useLocaleWeekDay(locale);

    const commonProps = {isDark, format, minYear, maxYear, locale};


    const getItemSize = (index: number) => {

        const row = dayjs()
            .set('date', 1)
            .subtract(CENTER_ITEM, 'month')
            .add(index, 'month');

        const week = getWeeksInMonth(row.year(), row.month() + 1);

        console.log('week', row.year(), row.month() + 1, week);


        return (week + 1) * (DAY_HEIGHT + DAY_GAP);

    };


    /**
     * 當資料異動
     * @param newValue
     */
    const handleOnChange = (newValue: string) => {
        if(onChange){
            if(dayjs(value?.startDate).isSame(newValue)){
                onChange({
                    startDate: undefined,
                    endDate: undefined,
                });
                return;
            }
            if(value?.endDate || dayjs(value?.startDate).isAfter(newValue)){
                onChange({
                    startDate: newValue,
                    endDate: undefined,
                });
                return;
            }

            onChange({
                ...value,
                endDate: newValue,
            });

        }
    };

    /**
     * 產生週標題
     */
    const renderWeek = useCallback(() => {
    
        return <>
            {/*<div className={styles.dateWeekRowFill}/>*/}
            <div className={styles.dateWeekRow}>
                {localeWeekDay.map((week, index) => <div className={styles.dateWeek}
                    key={`localeWeekDay-${index}-${week}`}>{week}</div>)}
            </div>
        </>;

    }, []);


    /**
     * 產生日曆表
     */
    const renderDateRange = useCallback((listProps: ListChildComponentProps) => {


        const row = dayjs()
            .set('date', 1)
            .subtract(CENTER_ITEM, 'month')
            .add(listProps.index, 'month');

        return <DatepickerAtom
            style={{...listProps.style} as CSS.Properties}
            key={row.format('YYYY-MM')}
            {...commonProps}
            values={value}
            onChange={handleOnChange}
            // minDate={isEmpty(value?.endDate) ? value?.startDate: undefined}
            yearMonthPanel={row}
            // minDate={minDate}
            // maxDate={value?.endDate ? value?.endDate : maxDate}
        />;
    }, []);





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

            <div style={{flex: '1 1 auto'}}>

                <AutoSizer>
                    {({height, width}: IAutoSize) => {
                        console.log('height', height);
                        return <List
                            ref={listRef}
                            className="List"
                            itemCount={MONTH_COUNT}
                            itemSize={MONTH_HEIGHT}
                            // itemSize={getItemSize}
                            height={height}
                            // height={getItemSize}
                            width={width}
                        >
                            {renderDateRange}
                        </List>;
                    }}
                </AutoSizer>
            </div>

        </div>
    );
};

export default ScrollRangeDatepicker;

