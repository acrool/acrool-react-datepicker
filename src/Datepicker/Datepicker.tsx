import React, {useState, useCallback, useMemo, useRef} from 'react';
import dayjs,{Dayjs} from 'dayjs';
import elClassName from './config';
import cx from 'classnames';
import {ArrowIcon} from '../Icon';
import translateI18n from '../locales';
import './styles.css';

const config = {
    weekDay: [1, 2, 3, 4, 5, 6, 7],
    month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
};



/**
 * 取得 value的 Dayjs 物件
 * @param sourceDate
 * @returns {dayjs.Dayjs}
 */
const getConvertDayjs = (sourceDate?: string) => dayjs(sourceDate);

interface IProps {
    value?: string;
    format?: string;
    onChange: (newDate: string) => void;
    isVisibleSetToday?: boolean;
    locale?: string;
    minYear?: number;
    maxYear?: number;
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
    minYear = 1911,
    maxYear,
}: IProps) => {

    const dayRef = useRef<Dayjs>(dayjs());
    const today = dayRef.current;
    const [panelYearMonth, setPanelYearMonth] = useState<Dayjs>(value ? dayjs(value) : today);

    const initMaxYear = typeof maxYear !== 'undefined' ? maxYear : Number(today.add(1, 'year').year());

    /**
     * 產生週星期文字
     */
    const localeWeekDay = useMemo(() => {
        return config.weekDay.map((weekDate: number) => {
            return translateI18n(`com.datepicker.weekDay.${weekDate}`, {defaultMessage: String(weekDate), locale: locale});
        });
    }, [locale]);

    /**
     * 產生月文字
     */
    const localeMonth = useMemo(() => {
        return config.month.map((month: number) => {
            return {text: translateI18n(`com.datepicker.month.${month}`, {locale: locale}), value: month - 1};
        });
    }, [locale]);


    /**
     * 產生年文字
     */
    const localeYear = useMemo(() => {
        const length = initMaxYear - minYear + 1;
        const yearList = new Array(length).fill(initMaxYear);
        const yearText = translateI18n('com.datepicker.unit.year', {defaultMessage: '', locale: locale});
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

        const activeYear = localeYear.find(row => String(row.value) === String(panelYearMonth.year()));
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
                        <div className={elClassName.yearGroup}>
                            <span className={elClassName.year}>
                               {activeYear?.text}
                            </span>

                            <select
                                className={elClassName.yearSelect}
                                onChange={e => handleChangePanel(panelYearMonth.set('year', Number(e.target.value)).year())}
                                value={panelYearMonth.year()}
                            >
                                {localeYear.map(row => {
                                    return <option key={row.value} value={row.value}>{row.text}</option>;
                                })}
                            </select>
                        </div>
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
                                    return <option key={row.value} value={row.value}>{row.text}</option>;
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
                <span>{translateI18n('com.datepicker.setToday', {defaultMessage: 'Set to today', locale: locale})}</span>
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
