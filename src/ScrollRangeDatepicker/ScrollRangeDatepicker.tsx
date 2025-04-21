import React, {ReactNode, useCallback, useEffect, useRef, useState} from 'react';

import {DatepickerAtom} from './Datepicker';
import {isEmpty} from '../utils';
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


interface IAutoSize {
    width: number;
    height: number
}




const MONTH_COUNT = 10 * 12;
const CENTER_ITEM = MONTH_COUNT / 2;
const DAY_HEIGHT = 30;
const DAY_GAP = 2;
const MONTH_PADDING = 10;

const MONTH_HEIGHT = (DAY_HEIGHT + ((DAY_HEIGHT + DAY_GAP) * 6)) + (MONTH_PADDING * 2);




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
    monthContainerHeight = 300,
}: IScrollRangeDatepickerProps) => {
    const {i18n} = useLocale(locale);
    // const today = getToday();
    const listRef = useRef<List>(null);
    const [focusDate, setFocusDate] = useState<string|undefined>(defaultFocusDate);



    useEffect(() => {
        // 預設移動位置
        setTimeout(() => {
            if(listRef.current){
                listRef.current.scrollToItem(CENTER_ITEM);
            }
        }, 0);

    }, [focusDate]);


    const localeWeekDay = useLocaleWeekDay(locale);

    const commonProps = {isDark, format, minYear, maxYear, locale};



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


        const row = dayjs(isEmpty(focusDate) ? undefined: focusDate)
            .set('date', 1)
            .subtract(CENTER_ITEM, 'month')
            .add(listProps.index, 'month');

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
    }, [value, focusDate]);





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
                        const ListComponent = List as unknown as React.ComponentType<any>;
                        return <ListComponent
                            ref={listRef}
                            className="List"
                            itemCount={MONTH_COUNT}
                            itemSize={monthContainerHeight}
                            height={height}
                            width={width}
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

