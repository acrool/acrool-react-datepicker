import clsx from 'clsx';
import dayjs,{Dayjs} from 'dayjs';
import React, {createElement, useCallback, useEffect,useMemo, useRef, useState} from 'react';

import elClassNames from '../el-class-names';
import useNowTime from '../hooks/useNow';
import useOnlyUpdateEffect from '../hooks/useUpdateEffect';
import {ArrowIcon} from '../Icon';
import useLocale from '../locales';
import {config} from './config';
import {ICurrentDayList, IWeekDatepickerProps} from './types';
import {getValueInWeekStartDate} from './utils';
import styles from './week-datepicker.module.scss';




/**
 * Week Date picker
 * 週日期選擇器
 */
const WeekDatepicker = ({
    className,
    style,
    value,
    format = 'YYYY-MM-DD',
    onChange,
    onChangeYearMonthPanel,
    // isVisibleSetToday = false,
    locale = 'en-US',
    minYear = 1911,
    maxYear,
    isDark = false,
    minDate,
    maxDate,
    tagDates = [],
    startWeekDate,
}: IWeekDatepickerProps) => {
    const today = useNowTime();
    const {i18n} = useLocale(locale);
    const [panelYearMonth, setPanelYearMonth] = useState<Dayjs>(dayjs(startWeekDate));

    const initMaxYear = typeof maxYear !== 'undefined' ? maxYear : Number(today.add(1, 'year').year());


    useOnlyUpdateEffect(() => {
        const now = dayjs();
        const targetDate = getValueInWeekStartDate(now, startWeekDate, value);
        const newYear = targetDate.get('year');
        const newMonth = targetDate.get('month');
        const newDate = targetDate.get('date');
        handleChangePanel(newYear, newMonth, newDate);
    }, [value]);


    /**
     * 產生月文字
     */
    const localeMonth = useMemo(() => {
        return config.month.map((month: number) => {
            return {text: i18n(`com.datepicker.month.${month}`), value: month - 1};
        });
    }, [locale]);


    /**
     * 產生年文字
     */
    const localeYear = useMemo(() => {
        const length = initMaxYear - minYear + 1;
        const yearList: number[]  = Array.from({length})
            .map(row => initMaxYear);
        const yearText = i18n('com.datepicker.unit.year', {def: 'Year'});
        return yearList.map((year, index) => {
            const calcYear = year - (index);
            return {text: `${calcYear}${yearText}`, value: calcYear};
        });
    }, [locale]);


    /**
     * 處理選擇日期
     * @param year
     * @param month
     */
    const handleChangePanel = useCallback((year?: number, month?: number, date?: number) => {
        let newPanelDate = panelYearMonth;
        if (typeof year !== 'undefined') {
            newPanelDate = newPanelDate.set('year', year);
        }
        if (typeof month !== 'undefined') {
            newPanelDate = newPanelDate.set('month', month);
        }
        if (typeof date !== 'undefined') {
            newPanelDate = newPanelDate.set('date', date);
        }

        // 發出事件
        if(!newPanelDate.isSame(panelYearMonth, 'date') && onChangeYearMonthPanel){
            onChangeYearMonthPanel(
                newPanelDate.format('YYYY-MM-DD'),
                newPanelDate.add(6, 'day').format('YYYY-MM-DD'),
            );
        }

        setPanelYearMonth(newPanelDate);
    }, [panelYearMonth]);


    /**
     * 處理選擇日期
     * @param year
     * @param month
     * @param day
     */
    const handleSelectedDate = (year?: number, month?: number, day?: number) => {
        let newDate = panelYearMonth;
        if (year) {
            newDate = newDate.set('year', year);
        }

        if (month) {
            newDate = newDate.set('month', month);
        }

        if (day) {
            newDate = newDate.set('date', day);
        }

        const formatDate = newDate.format(format);
        onChange(formatDate);

    };


    /**
     * 產生年月
     * @returns {*}
     */
    const renderYearMonth = () => {
        const panelPreYearMonth = panelYearMonth.subtract(7, 'day');
        const panelNextYearMonth = panelYearMonth.add(7, 'day');


        const activeYear = localeYear.find(row => String(row.value) === String(panelYearMonth.year()));
        const activeMonth = localeMonth.find(row => row.value === panelYearMonth.month());

        // 產生年月標題
        return (
            <div className={elClassNames.dateYearMonthRow}>

                <div className={elClassNames.dateChangeControl}>


                    {/*年月的按鈕*/}
                    <div className={elClassNames.dateYearMonth}>
                        <div className={styles.dateYearMonthWrapper}>
                            <span className={styles.dateYearMonth}>
                                {activeYear?.text}
                            </span>

                            <select
                                className={styles.dateYearMonthSelect}
                                onChange={e => handleChangePanel(panelYearMonth.set('year', Number(e.target.value)).year())}
                                value={panelYearMonth.year()}
                            >
                                {localeYear.map(row => {
                                    return <option key={row.value} value={row.value}>{row.text}</option>;
                                })}
                            </select>
                        </div>
                        <div className={styles.dateYearMonthWrapper}>
                            <span className={styles.dateYearMonth}>
                                {activeMonth?.text}
                            </span>

                            <select
                                className={styles.dateYearMonthSelect}
                                onChange={e => handleChangePanel(undefined, panelYearMonth.set('month', Number(e.target.value)).month())}
                                value={panelYearMonth.month()}
                            >
                                {localeMonth.map(row => {
                                    return <option key={row.value} value={row.value}>{row.text}</option>;
                                })}
                            </select>
                        </div>

                    </div>


                    {/*上一週的按鈕*/}
                    <button className={clsx(elClassNames.dateMonthButton, 'pre-month')}
                        type="button"
                        onClick={() => handleChangePanel(
                            panelPreYearMonth.year(),
                            panelPreYearMonth.month(),
                            panelPreYearMonth.date(),
                        )}
                    >
                        <ArrowIcon/>
                    </button>

                    {/*下一週的按鈕*/}
                    <button className={clsx(elClassNames.dateMonthButton, 'next-month')}
                        type="button"
                        onClick={() => handleChangePanel(
                            panelNextYearMonth.year(),
                            panelNextYearMonth.month(),
                            panelNextYearMonth.date(),
                        )}
                    >
                        <ArrowIcon/>
                    </button>
                </div>

            </div>
        );

    };


    /**
     * 產生日期表
     */
    const renderCurrentMonthDay = () => {
        const currentDate = dayjs(value);

        // 一週天數
        const currentMonthLastDay = 7;

        // 產生 Panel年月週日期表
        const currentDayList: ICurrentDayList[] = Array.from({length: currentMonthLastDay});
        for (let d = 0; d < currentMonthLastDay; d++) {
            const eachDate = panelYearMonth.add(d, 'day');
            const dayNumber = eachDate.date();
            const dayInWeek = eachDate.day();
            const isDisable: boolean =
                !!((minDate && eachDate.isBefore(minDate, 'date')) ||
                    (maxDate && eachDate.isAfter(maxDate, 'date')));

            currentDayList[d] = {
                isActive: currentDate.isSame(eachDate, 'date'),
                isToday: today.isSame(eachDate, 'date'),
                isTag: tagDates?.includes(eachDate.format('YYYY-MM-DD')),
                isDisable,
                className: styles.dateDay,
                date: eachDate,
                dayInWeek,
                dayNumber: dayNumber,
                onClick: () => !isDisable ? handleSelectedDate(eachDate.year(), eachDate.month(), dayNumber) : {}
            };
        }


        return (
            <div className={elClassNames.dateDayRow}>
                {/*{renderWeek()}*/}
                <div className={styles.weekWrapper}>

                    {currentDayList.map(row => {
                        return  <div
                            key={`currentDay-${row.date}`}
                            className={styles.dateDay}
                            data-active={row.isActive ? '':undefined}
                            data-today={row.isToday ? '': undefined}
                            data-tag={row.isTag ? '' : undefined}
                            data-disable={row.isDisable ? '':undefined}

                            onClick={row.onClick}
                        >
                            <div className={styles.dateDayText} data-week-date={i18n(`com.datepicker.weekDay.${row.dayInWeek}`, {def: String(row.dayInWeek)})}>
                                {row.dayNumber}
                            </div>
                        </div>;
                    })}
                </div>
            </div>
        );
    };


    return <div className={clsx(
        className, {'theme-dark': isDark},
        styles.root
    )}
    style={style}
    >
        {renderYearMonth()}
        {renderCurrentMonthDay()}
    </div>;

};



export default WeekDatepicker;
