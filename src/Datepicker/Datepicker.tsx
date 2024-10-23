import React, {useState, useCallback, useMemo, createElement} from 'react';
import dayjs,{Dayjs} from 'dayjs';
import elClassNames from '../el-class-names';
import {ArrowIcon} from '../Icon';
import clsx from 'clsx';
import useOnlyUpdateEffect from '../hooks/useUpdateEffect';
import useNowTime from '../hooks/useNow';
import useLocale from '../locales';
import {ICurrentDayList, IDatepickerProps} from './types';
import {getValue} from './utils';
import {config} from './config';




/**
 * Datepicker
 * 日期選擇器
 */
const DatepickerAtom = ({
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
    tagDate = []
}: IDatepickerProps) => {
    const today = useNowTime();
    const {i18n} = useLocale(locale);
    const [panelYearMonth, setPanelYearMonth] = useState<Dayjs>(getValue(today, value));

    const initMaxYear = typeof maxYear !== 'undefined' ? maxYear : Number(today.add(1, 'year').year());


    useOnlyUpdateEffect(() => {
        const dateVal = dayjs(value);
        const now = dayjs();
        const newYear = dateVal.isValid() ? dateVal.get('year') : now.get('year');
        const newMonth = dateVal.isValid() ? dayjs(value).get('month'): now.get('month');
        handleChangePanel(newYear, newMonth);
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
    const handleChangePanel = useCallback((year?: number, month?: number) => {
        let newPanelDate = panelYearMonth;
        if (typeof year !== 'undefined') {
            newPanelDate = newPanelDate.set('year', year);
        }
        if (typeof month !== 'undefined') {
            newPanelDate = newPanelDate.set('month', month);
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
        const panelPreYearMonth = panelYearMonth.subtract(1, 'month');
        const panelNextYearMonth = panelYearMonth.add(1, 'month');

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


                    {/*上個月的按鈕*/}
                    <button className={clsx(elClassNames.dateMonthButton, 'pre-month')}
                        type="button"
                        onClick={() => handleChangePanel(
                            panelPreYearMonth.year(),
                            panelPreYearMonth.month(),
                        )}
                    >
                        <ArrowIcon/>
                    </button>

                    {/*下個月的按鈕*/}
                    <button className={clsx(elClassNames.dateMonthButton, 'next-month')}
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
        <div className={elClassNames.dateWeekRow}>
            {/* eslint-disable-next-line react/no-array-index-key */}
            {localeWeekDay.map((week, index) => <div className={elClassNames.dateWeek} key={`localeWeekDay-${index}-${week}`}>{week}</div>)}
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
        const preMonFirstDayList: ICurrentDayList[] = Array.from({length: preMonthFirstContainer});
        for (let d = 0; d < preMonthFirstContainer; d++) {
            const dayNumber = preMonthFirstDay + d + 1;
            const eachDate = preMonth.set('date', dayNumber);
            const isDisable =
                !!((minDate && eachDate.isBefore(minDate, 'date')) ||
                    (maxDate && eachDate.isAfter(maxDate, 'date')));

            preMonFirstDayList[d] = {
                isActive: currentDate.isSame(preMonth.set('date', dayNumber), 'date'),
                isToday: today.isSame(eachDate, 'date'),
                isTag: tagDate?.includes(eachDate.format('YYYY-MM-DD')),
                isDisable,
                className: elClassNames.datePreDay,
                date: eachDate,
                dayNumber: dayNumber,
                onClick: () => !isDisable ? handleSelectedDate(preMonth.year(), preMonth.month(), dayNumber) : {}
            };
        }

        return preMonFirstDayList;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [panelYearMonth, value, minDate, maxDate, tagDate]);

    /**
     * 產生下個月的剩餘日期表
     * @returns {Array}
     */
    const renderNextMonthDay = useCallback(() => {
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
        const nextMonEndDayList: ICurrentDayList[] = Array.from({length: nextMonthEndContainer});
        for (let d = 0; d < nextMonthEndContainer; d++) {
            const dayNumber = d + 1;
            const eachDate = nextMonth.set('date', dayNumber);
            const isDisable =
                !!((minDate && eachDate.isBefore(minDate, 'date')) ||
                    (maxDate && eachDate.isAfter(maxDate, 'date')));

            nextMonEndDayList[d] = {
                isActive: currentDate.isSame(nextMonth.set('date', dayNumber), 'date'),
                isToday: today.isSame(eachDate, 'date'),
                isTag: tagDate?.includes(eachDate.format('YYYY-MM-DD')),
                isDisable,
                className: elClassNames.datePreDay,
                date: eachDate,
                dayNumber: dayNumber,
                onClick: () => !isDisable ? handleSelectedDate(nextMonth.year(), nextMonth.month(), dayNumber): {}
            };
        }

        return nextMonEndDayList;
    }, [panelYearMonth, value, minDate, maxDate, tagDate]);

    /**
     * 產生當月日期表
     */
    const renderCurrentMonthDay = () => {
        const currentDate = dayjs(value);

        // 取 Panel年月 的最後一天
        const currentMonthLastDay = panelYearMonth.endOf('month').get('date');

        // 產生 Panel年月 當月日期表
        const currentDayList: ICurrentDayList[] = Array.from({length: currentMonthLastDay});
        for (let d = 0; d < currentMonthLastDay; d++) {
            const dayNumber = d + 1;
            const eachDate = panelYearMonth.set('date', dayNumber);
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
                dayNumber: dayNumber,
                onClick: () => !isDisable ? handleSelectedDate(panelYearMonth.year(), panelYearMonth.month(), dayNumber) : {}
            };
        }


        const preMonthDay = renderPreMonthDay();
        const nextMonthDay = renderNextMonthDay();
        const monthDateList = [...preMonthDay, ...currentDayList, ...nextMonthDay];

        const actIndex = monthDateList.findIndex((row) => row.isActive);
        const weekIndex = Math.floor(actIndex / 7);

        return (
            <div className={elClassNames.dateDayRow}>
                {renderWeek()}
                <div className={elClassNames.dateDayContent}>
                    {weekIndex >= 0 && <div className={elClassNames.dateWeekMask} style={{top: weekIndex * 30}}/>}

                    {monthDateList.map(row => {
                        return  <div
                            key={`currentDay-${row.date}`}
                            className={row.className}
                            data-active={row.isActive}
                            data-today={row.isToday}
                            data-tag={row.isTag}
                            data-disable={row.isDisable}

                            onClick={row.onClick}
                        >
                            <span>
                                {row.dayNumber}
                            </span>
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
        elClassNames.dateRoot,
        className, {'dark-theme': isDark})} style={style}>
        {renderYearMonth()}
        {renderCurrentMonthDay()}

        {isVisibleSetToday && renderTodayButton()}
    </div>;

};

const Datepicker = (props: IDatepickerProps) => {
    return <DatepickerAtom
        {...props}
        className={clsx(props.className, elClassNames.root)}
    />;
};


export {DatepickerAtom};
export default Datepicker;
