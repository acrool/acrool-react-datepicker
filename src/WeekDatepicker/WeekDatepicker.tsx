import React, {useState, useCallback, useMemo, createElement, useRef, useEffect} from 'react';
import dayjs,{Dayjs} from 'dayjs';
import elClassNames from '../el-class-names';
import {ArrowIcon} from '../Icon';
import clsx from 'clsx';
import useOnlyUpdateEffect from '../hooks/useUpdateEffect';
import useNowTime from '../hooks/useNow';
import useLocale from '../locales';
import {ICurrentDayList, IWeekDatepickerProps} from './types';
import {getValue} from './utils';
import {config} from './config';
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
    isVisibleSetToday = false,
    locale = 'en-US',
    minYear = 1911,
    maxYear,
    isDark = false,
    minDate,
    maxDate,
    tagDate = [],
    startWeekDate,
}: IWeekDatepickerProps) => {
    const today = useNowTime();
    const {i18n} = useLocale(locale);
    const [panelYearMonth, setPanelYearMonth] = useState<Dayjs>(getValue(today, startWeekDate, value));

    const initMaxYear = typeof maxYear !== 'undefined' ? maxYear : Number(today.add(1, 'year').year());


    useOnlyUpdateEffect(() => {
        const now = dayjs();
        const targetDate = getValue(now, startWeekDate, value);
        const newYear = targetDate.get('year');
        const newMonth = targetDate.get('month');
        const newDate = targetDate.get('date');
        handleChangePanel(newYear, newMonth, newDate);
    }, [value]);

    /**
     * 產生週星期文字
     */
    const localeWeekDay = useMemo(() => {
        return config.weekDay.map((weekDate: number) => {
            return i18n(`com.datepicker.weekDay.${weekDate}`, {def: String(weekDate)});
        });
    }, [locale]);

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
        if(onChangeYearMonthPanel){
            onChangeYearMonthPanel({year: newPanelDate.year(), month: newPanelDate.month() + 1});
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    };

    /**
     * 設定為今天日期
     */
    const handleSelectedToday = () => {
        const formatDate = today.format(format);

        setPanelYearMonth(today);
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
                        <div className={elClassNames.dateYearGroup}>
                            <span className={elClassNames.dateYear}>
                                {activeYear?.text}
                            </span>

                            <select
                                className={elClassNames.dateYearSelect}
                                onChange={e => handleChangePanel(panelYearMonth.set('year', Number(e.target.value)).year())}
                                value={panelYearMonth.year()}
                            >
                                {localeYear.map(row => {
                                    return <option key={row.value} value={row.value}>{row.text}</option>;
                                })}
                            </select>
                        </div>
                        <div className={elClassNames.dateMonthGroup}>
                            <span className={elClassNames.dateMonth}>
                                {activeMonth?.text}
                            </span>

                            <select
                                className={elClassNames.dateMonthSelect}
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    };


    /**
     * 產生當月日期表
     */
    const renderCurrentMonthDay = () => {
        const currentDate = dayjs(value);

        // 取 Panel年月 的最後一天
        const currentMonthLastDay = 7;
        // const firstDate = panelYearMonth.get('date');

        // 產生 Panel年月 當月日期表
        const currentDayList: ICurrentDayList[] = Array.from({length: currentMonthLastDay});
        for (let d = 0; d < currentMonthLastDay; d++) {
            const eachDate = panelYearMonth.add(d, 'day');
            const dayNumber = eachDate.date();
            const dayInWeek = eachDate.day() + 1;
            const isDisable: boolean =
                !!((minDate && eachDate.isBefore(minDate, 'date')) ||
                    (maxDate && eachDate.isAfter(maxDate, 'date')));

            currentDayList[d] = {
                isActive: currentDate.isSame(eachDate, 'date'),
                isToday: today.isSame(eachDate, 'date'),
                isTag: tagDate?.includes(eachDate.format('YYYY-MM-DD')),
                isDisable,
                className: elClassNames.dateDay,
                date: eachDate,
                dayInWeek,
                dayNumber: dayNumber,
                onClick: () => !isDisable ? handleSelectedDate(eachDate.year(), eachDate.month(), dayNumber) : {}
            };
        }


        const monthDateList = currentDayList;

        const actIndex = monthDateList.findIndex((row) => row.isActive);
        const weekIndex = Math.floor(actIndex / 7);

        return (
            <div className={elClassNames.dateDayRow}>
                {/*{renderWeek()}*/}
                <div className={styles.weekWrapper}>

                    {monthDateList.map(row => {
                        return  <div
                            key={`currentDay-${row.date}`}
                            className={clsx(row.className, styles.currentDay)}
                            data-active={row.isActive}
                            data-today={row.isToday}
                            data-tag={row.isTag}
                            data-disable={row.isDisable}

                            onClick={row.onClick}
                        >
                            <div>
                                {row.dayNumber}
                            </div>
                            <div className={styles.dayInWeek}>
                                {i18n(`com.datepicker.weekDay.${row.dayInWeek}`, {def: String(row.dayInWeek)})}
                            </div>
                        </div>;
                    })}
                </div>
            </div>
        );
    };

    const renderTodayButton = () => (
        <div className={elClassNames.dateLabelCheckCardCreate}>
            <button className={elClassNames.dateTodayButton} type="button" onClick={handleSelectedToday}>
                <span>{i18n('com.datepicker.setToday', {def: 'Set to today'})}</span>
            </button>
        </div>
    );

    return <div className={clsx(
        className, {'dark-theme': isDark},
        styles.root
    )}
    style={style}
    >
        {renderYearMonth()}
        {renderCurrentMonthDay()}

        {isVisibleSetToday && renderTodayButton()}
    </div>;

};



export default WeekDatepicker;
