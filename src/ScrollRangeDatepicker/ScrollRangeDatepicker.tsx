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
import {useInfiniteScroll} from './useInfiniteScroll';
import {FixedSizeList as List, ListChildComponentProps} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import CSS from 'csstype';


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
        console.log('listRef.current', listRef.current);
        setTimeout(() => {
            if(listRef.current){
                console.log('xxx');
                listRef.current?.scrollToItem(500);
            }
        }, 0);
        // listRef.current;

    }, [listRef.current]);
    
    
    const localeWeekDay = useLocaleWeekDay(locale);

    const commonProps = {isDark, format, minYear, maxYear, locale};



    const setRangeDate = (rangeType: EDateRange) => {
        const newVal = selectDateRange(rangeType, format);
        if(newVal && onChange){
            onChange(newVal);
        }
    };
    const rowHeights = new Array(1000)
        .fill(true)
        .map(() => 25 + Math.round(Math.random() * 50));

    const getItemSize = (index: number) => rowHeights[index];


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
            <div className={styles.dateWeekRowFill}/>
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
        

        // const months = getYearMonthRange(beforeData, afterData);

        const todayMonth = dayjs().set('date', 1);
        // const monthLimit = Array.from({length: listProps.index});
        // const months = monthLimit.map((_, idx) => {
        //     console.log('idx', idx);
        //     return todayMonth.add(idx, 'month');
        // });

        const row = dayjs()
            .set('date', 1)
            .add(listProps.index, 'month');

        // console.log('months', months);
        console.log('row', row.format('YYYY-MM-DD'));

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
        // return <>
        //     {months.map(row => {
        //         return <DatepickerAtom
        //             key={row.format('YYYY-MM')}
        //             {...commonProps}
        //             values={value}
        //             onChange={handleOnChange}
        //             // minDate={isEmpty(value?.endDate) ? value?.startDate: undefined}
        //             yearMonthPanel={row}
        //             // minDate={minDate}
        //             // maxDate={value?.endDate ? value?.endDate : maxDate}
        //         />;
        //     })}
        // </>;

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

            <button onClick={() => listRef.current?.scrollToItem(200)}>
                DDDD
            </button>
            {renderWeek()}

            <AutoSizer>
                {({height, width}: IAutoSize) => {
                    console.log('height', height);
                    return <List
                        ref={listRef}
                        className="List"
                        itemCount={1000}
                        itemSize={200}
                        height={height}
                        // height={getItemSize}
                        width={width}
                    >
                        {renderDateRange}
                    </List>;
                }}
            </AutoSizer>

        </div>
    );
};

export default ScrollRangeDatepicker;

