import React, {useState, useCallback, useMemo} from 'react';
// import styled, {css} from 'styled-components/macro';
import dayjs,{Dayjs} from 'dayjs';
import {elClassName} from '../config';
// import {translateI18n, useLocale} from 'bear-react-locale';
import cx from 'classnames';
import {ArrowIcon} from '../Icon';
import locales from '../locales';
import {type} from 'os';
import '../styles.css';
// Components

const config = {
    weekDay: [1, 2, 3, 4, 5, 6, 7],
    month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
};



/**
 * 取得 value的 Dayjs 物件
 * @param sourceDate
 * @returns {dayjs.Dayjs}
 */
const getConvertDayjs = (sourceDate: any) => dayjs(sourceDate);

interface IProps {
    value?: string;
    format?: string;
    onChange: (newDate: string) => void;
    isVisibleSetToday?: boolean;
    locale?: string;
}


/**
 * Datepicker
 * 日期選擇器
 */
const Datepicker = ({
    value,
    format = 'YYYY-MM-DD',
    onChange,
    isVisibleSetToday = false,
    locale = 'en-US',
}: IProps) => {

    const today = useMemo(() => dayjs(), []);
    const [panelYearMonth, setPanelYearMonth] = useState<Dayjs>(value ? dayjs(value) : today);

    const translateI18n = (id: string, options?: {defaultMessage: string}) => {
        const localeMap = locales[locale];
        if(typeof localeMap !== 'undefined' && typeof localeMap[id] !== 'undefined'){
            return localeMap[id];
        }

        if(typeof options?.defaultMessage !== 'undefined'){
            return options?.defaultMessage;
        }

        return id;
    }

    const getLocaleWeekDay = () => {
        return config.weekDay.map((weekDate: number) => {
            return translateI18n(`com.datepicker.weekDay.${weekDate}`, {defaultMessage: String(weekDate)});
        });
    };

    const getLocaleMonth = () => {
        return config.month.map((month: number) => {
            return {text: translateI18n(`com.datepicker.month.${month}`), value: month - 1};
        });
    };

    const localeWeekDay = useMemo(() => getLocaleWeekDay(), []);
    const localeMonth = useMemo(() => getLocaleMonth(), []);


    console.log('locale', locale);





    /**
     * 處理選擇日期
     * @param year
     * @param month
     */
    const handleChangePanel = useCallback((year?: number, month?: number) => {
        let newPanelDate = panelYearMonth;
        if (typeof year !== 'undefined') {
            newPanelDate = newPanelDate.set('year', year);
        }
        if (typeof month !== 'undefined') {
            newPanelDate = newPanelDate.set('month', month);
        }

        setPanelYearMonth(newPanelDate);
    }, [panelYearMonth]);


    /**
     * 處理彈出提問年份
     */
    const handleConformYear = useCallback(() => {
        const currentYear = panelYearMonth.get('year');

        const localeText = translateI18n('com.datepicker.pleaseInputYear', {defaultMessage: 'Please enter the first year'});
        // @ts-ignore
        const newYear = parseInt(prompt(localeText, panelYearMonth.get('year')));
        if (newYear && newYear !== currentYear) {
            handleChangePanel(newYear, );
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [panelYearMonth]);

    /**
     * 處理選擇日期
     * @param year
     * @param month
     * @param day
     */
    const handleSelectedDate = useCallback((year?: number, month?: number, day?: number) => {
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
    }, [panelYearMonth]);

    /**
     * 設定為今天日期
     */
    const handleSelectedToday = useCallback(() => {
        const formatDate = today.format(format);

        setPanelYearMonth(today);
        onChange(formatDate);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * 產生年月
     * @returns {*}
     */
    const renderYearMonth = useCallback(() => {
        const panelPreYearMonth = panelYearMonth.subtract(1, 'month');
        const panelNextYearMonth = panelYearMonth.add(1, 'month');

        const activeMonth = localeMonth.find(row => row.value === panelYearMonth.month());

        // 產生年月標題
        return (
            <div className={elClassName.yearMonthRow}>

                <div className={elClassName.changeControl}>
                    <button className={cx(elClassName.monthButton, 'pre-month')}
                        type="button"
                        onClick={() => handleChangePanel(
                            panelPreYearMonth.year(),
                            panelPreYearMonth.month(),
                        )}
                    >
                        <ArrowIcon/>
                    </button>

                    <div className={elClassName.yearMonth}>
                        <span className={elClassName.year} onClick={handleConformYear}>
                            {panelYearMonth.year()}
                            {translateI18n('com.datepicker.unit.year', {defaultMessage: ''})}
                        </span>
                        <div className={elClassName.monthGroup}>
                            <span className={elClassName.month}>
                               {activeMonth?.text}
                            </span>

                            <select
                                className={elClassName.monthSelect}
                                onChange={e => handleChangePanel(undefined, panelYearMonth.set('month', Number(e.target.value)).month())}
                                value={panelYearMonth.month()}
                            >
                                {localeMonth.map(row => {
                                    return <option value={row.value}>{row.text}</option>;
                                })}
                            </select>
                        </div>

                    </div>

                    <button className={cx(elClassName.monthButton, 'next-month')}
                        type="button"
                        onClick={() => handleChangePanel(
                            panelNextYearMonth.year(),
                            panelNextYearMonth.month(),
                        )}
                    >
                        <ArrowIcon/>
                    </button>
                </div>

            </div>
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [panelYearMonth]);

    /**
     * 產生週標題
     */
    const renderWeek = useCallback(() => (
        <div className={elClassName.weekRow}>
            {/* eslint-disable-next-line react/no-array-index-key */}
            {localeWeekDay.map((week, index) => <div className={elClassName.week} key={`localeWeekDay-${index}-${week}`}>{week}</div>)}
        </div>

        // eslint-disable-next-line react-hooks/exhaustive-deps
    ), []);

    /**
     * 產生上個月的剩餘日期表
     * @returns {Array}
     */
    const renderPreMonthDay = useCallback(() => {
        const currentDate = getConvertDayjs(value);

        // 取得指定年月的第一天是星期幾 (0, 1-6)
        const currentMonFirstWeek = panelYearMonth.set('date', 1).day();

        // 取 Panel年月 剩餘月份的可放空間 (星期六 ex: 6-1=5格, 星期日則為7天)
        const preMonthFirstContainer = currentMonFirstWeek === 0 ? 6 : currentMonFirstWeek - 1;

        // 取 Panel年月 上個月的最後一天是幾號
        const preMonth = panelYearMonth.subtract(1, 'month');
        const preMonthLastDay = Number(preMonth.endOf('month').get('date'));

        // 取 Panel年月 結束日從幾號開始
        const preMonthFirstDay = preMonthLastDay - preMonthFirstContainer;

        // 產生 Panel年月 上個月的剩餘日期表
        const preMonFirstDayList = new Array(preMonthLastDay);
        for (let d = 0; d < preMonthFirstContainer; d++) {
            const day = preMonthFirstDay + d + 1;
            preMonFirstDayList[d] = (
                <div
                    className={cx(elClassName.preDay, {'is-active': currentDate.isSame(preMonth.set('date', day), 'date')})}
                    key={`preMonthDay-${d}`}
                    onClick={() => handleSelectedDate(preMonth.year(), preMonth.month(), day)}
                >
                    <span>
                        {day}
                    </span>
                </div>
            );
        }

        return preMonFirstDayList;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [panelYearMonth, value]);

    /**
     * 產生下個月的剩餘日期表
     * @returns {Array}
     */
    const renderNextMonthDay = useCallback(() => {
        const currentDate = getConvertDayjs(value);

        // 取得指定年月的第一天是星期幾 (0, 1-6)
        const currentMonFirstWeek = panelYearMonth.set('date', 1).day();

        // 取 Panel年月 上個月份的已放空間 (星期六 ex: 6-1=5格, 星期日則為7天)
        const preMonthFirstContainer = currentMonFirstWeek === 0 ? 6 : currentMonFirstWeek - 1;

        // 取 Panel年月 這個月的最後一天是幾號
        const panelMonthLastDay = panelYearMonth.endOf('month').get('date');

        const nextMonth = panelYearMonth.add(1, 'month');

        // 取得指定年月下個月剩餘月份可放空間
        const nextMonthEndContainer = (7 * 6) % (preMonthFirstContainer + panelMonthLastDay);

        // 產生上個月的剩餘日期表
        const nextMonEndDayList = new Array(nextMonthEndContainer);
        for (let d = 0; d < nextMonthEndContainer; d++) {
            const day = d + 1;
            nextMonEndDayList[d] = (
                <div
                    className={cx(elClassName.preDay, {'is-active': currentDate.isSame(nextMonth.set('date', day))})}
                    key={`nextMonthDay-${d}`}
                    onClick={() => handleSelectedDate(nextMonth.year(), nextMonth.month(), day)}
                >
                    <span>
                        {day}
                    </span>
                </div>
            );
        }

        return nextMonEndDayList;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[panelYearMonth, value]);

    /**
     * 產生當月日期表
     */
    const renderCurrentMonthDay = useCallback(() => {
        const currentDate = getConvertDayjs(value);

        // 取 Panel年月 的最後一天
        const currentMonthLastDay = panelYearMonth.endOf('month').get('date');

        // 產生 Panel年月 當月日期表
        const currentDayList = new Array(currentMonthLastDay);
        for (let d = 0; d < currentMonthLastDay; d++) {
            const dayNumber = d + 1;
            const eachDate = panelYearMonth.set('date', dayNumber);
            currentDayList[d] = (
                <div
                    className={cx(elClassName.day,
                        {'is-active': currentDate.isSame(eachDate, 'date')},
                        {'is-today': today.isSame(eachDate, 'date')},
                    )}
                    key={`currentDay-${d}`}
                    onClick={() => handleSelectedDate(panelYearMonth.year(), panelYearMonth.month(), dayNumber)}
                >
                    <span>
                        {dayNumber}
                    </span>
                </div>
            );
        }

        return (
            <div className={elClassName.dayRow}>
                {renderWeek()}
                {renderPreMonthDay()}
                {currentDayList}
                {renderNextMonthDay()}
            </div>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [panelYearMonth, value]);

    const renderTodayButton = useCallback(() => (
        <div className={elClassName.labelCheckCardCreate}>
            <button className={elClassName.todayButton} type="button" onClick={handleSelectedToday}>
                <span>{translateI18n('com.datepicker.setToday', {defaultMessage: 'Set to today'})}</span>
            </button>
        </div>

        // eslint-disable-next-line react-hooks/exhaustive-deps
    ), []);

    return (
        <div className={elClassName.root}>
            {renderYearMonth()}
            {renderCurrentMonthDay()}

            {isVisibleSetToday && renderTodayButton()}
        </div>
    );

};


export default Datepicker;
