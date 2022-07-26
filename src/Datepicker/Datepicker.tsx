import React, {useState, useCallback, useMemo, useRef} from 'react';
import dayjs,{Dayjs} from 'dayjs';
import elClassNames from './el-class-names';
import cx from 'classnames';
import {ArrowIcon} from '../Icon';
import translateI18n from '../locales';
import './styles.css';
import {ICommon} from './typing';

const config = {
    weekDay: [1, 2, 3, 4, 5, 6, 7],
    month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
};



interface IProps extends ICommon{
    value?: string;
    onChange: (newDate: string) => void;
}

/**
 * Datepicker
 * 日期選擇器
 */
const Datepicker = ({
    className,
    style,
    value,
    format = 'YYYY-MM-DD',
    onChange,
    isVisibleSetToday = false,
    locale = 'en-US',
    minYear = 1911,
    maxYear,
    isDark = false,
    minDate,
    maxDate,
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    };

    /**
     * 產生年月
     * @returns {*}
     */
    const renderYearMonth = () => {
        const panelPreYearMonth = panelYearMonth.subtract(1, 'month');
        const panelNextYearMonth = panelYearMonth.add(1, 'month');

        const activeYear = localeYear.find(row => String(row.value) === String(panelYearMonth.year()));
        const activeMonth = localeMonth.find(row => row.value === panelYearMonth.month());

        // 產生年月標題
        return (
            <div className={elClassNames.yearMonthRow}>

                <div className={elClassNames.changeControl}>
                    <button className={cx(elClassNames.monthButton, 'pre-month')}
                        type="button"
                        onClick={() => handleChangePanel(
                            panelPreYearMonth.year(),
                            panelPreYearMonth.month(),
                        )}
                    >
                        <ArrowIcon/>
                    </button>

                    <div className={elClassNames.yearMonth}>
                        <div className={elClassNames.yearGroup}>
                            <span className={elClassNames.year}>
                               {activeYear?.text}
                            </span>

                            <select
                                className={elClassNames.yearSelect}
                                onChange={e => handleChangePanel(panelYearMonth.set('year', Number(e.target.value)).year())}
                                value={panelYearMonth.year()}
                            >
                                {localeYear.map(row => {
                                    return <option key={row.value} value={row.value}>{row.text}</option>;
                                })}
                            </select>
                        </div>
                        <div className={elClassNames.monthGroup}>
                            <span className={elClassNames.month}>
                               {activeMonth?.text}
                            </span>

                            <select
                                className={elClassNames.monthSelect}
                                onChange={e => handleChangePanel(undefined, panelYearMonth.set('month', Number(e.target.value)).month())}
                                value={panelYearMonth.month()}
                            >
                                {localeMonth.map(row => {
                                    return <option key={row.value} value={row.value}>{row.text}</option>;
                                })}
                            </select>
                        </div>

                    </div>

                    <button className={cx(elClassNames.monthButton, 'next-month')}
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
    };

    /**
     * 產生週標題
     */
    const renderWeek = useCallback(() => (
        <div className={elClassNames.weekRow}>
            {/* eslint-disable-next-line react/no-array-index-key */}
            {localeWeekDay.map((week, index) => <div className={elClassNames.week} key={`localeWeekDay-${index}-${week}`}>{week}</div>)}
        </div>

        // eslint-disable-next-line react-hooks/exhaustive-deps
    ), []);

    /**
     * 產生上個月的剩餘日期表
     * @returns {Array}
     */
    const renderPreMonthDay = useCallback(() => {
        const currentDate = dayjs(value);

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
            const eachDate = preMonth.set('date', day);
            const isDisable =
                (minDate && eachDate.isBefore(minDate, 'date')) ||
                (maxDate && eachDate.isAfter(maxDate, 'date'));

            preMonFirstDayList[d] = (
                <div
                    className={cx(elClassNames.preDay, {
                        'is-active': currentDate.isSame(eachDate, 'date'),
                        'is-disable': isDisable,
                    })}
                    key={`preMonthDay-${d}`}
                    onClick={() => !isDisable ? handleSelectedDate(preMonth.year(), preMonth.month(), day) : {}}
                >
                    <span>
                        {day}
                    </span>
                </div>
            );
        }

        return preMonFirstDayList;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [panelYearMonth, value, minDate, maxDate]);

    /**
     * 產生下個月的剩餘日期表
     * @returns {Array}
     */
    const renderNextMonthDay = () => {
        const currentDate = dayjs(value);

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
                    className={cx(elClassNames.preDay, {'is-active': currentDate.isSame(nextMonth.set('date', day))})}
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
    };

    /**
     * 產生當月日期表
     */
    const renderCurrentMonthDay = () => {
        const currentDate = dayjs(value);

        // 取 Panel年月 的最後一天
        const currentMonthLastDay = panelYearMonth.endOf('month').get('date');

        // 產生 Panel年月 當月日期表
        const currentDayList = new Array(currentMonthLastDay);
        for (let d = 0; d < currentMonthLastDay; d++) {
            const dayNumber = d + 1;
            const eachDate = panelYearMonth.set('date', dayNumber);
            const isDisable =
                (minDate && eachDate.isBefore(minDate, 'date')) ||
                (maxDate && eachDate.isAfter(maxDate, 'date'));

            currentDayList[d] = (
                <div
                    className={cx(elClassNames.day,
                        {'is-active': currentDate.isSame(eachDate, 'date')},
                        {'is-today': today.isSame(eachDate, 'date')},
                        {'is-disable': isDisable},
                    )}
                    key={`currentDay-${d}`}
                    onClick={() => !isDisable ? handleSelectedDate(panelYearMonth.year(), panelYearMonth.month(), dayNumber) : {}}
                >
                    <span>
                        {dayNumber}
                    </span>
                </div>
            );
        }

        return (
            <div className={elClassNames.dayRow}>
                {renderWeek()}
                {renderPreMonthDay()}
                {currentDayList}
                {renderNextMonthDay()}
            </div>
        );
    };

    const renderTodayButton = () => (
        <div className={elClassNames.labelCheckCardCreate}>
            <button className={elClassNames.todayButton} type="button" onClick={handleSelectedToday}>
                <span>{translateI18n('com.datepicker.setToday', {defaultMessage: 'Set to today', locale: locale})}</span>
            </button>
        </div>
    )

    return (
        <div className={cx(elClassNames.root, className, {'dark-theme': isDark})} style={style}>
            {renderYearMonth()}
            {renderCurrentMonthDay()}

            {isVisibleSetToday && renderTodayButton()}
        </div>
    );

};


export default Datepicker;
