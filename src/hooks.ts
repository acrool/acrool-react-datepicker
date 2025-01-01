import {useMemo, useCallback, useState} from 'react';
import dayjs, {Dayjs} from 'dayjs';
import useLocale from './locales';
import {config} from './config';
import {ICurrentDayList} from './typing';
import {isEmpty} from './utils';
import styles from './ScrollRangeDatepicker/styles.module.scss';


interface IDatepickerProps {
    format: string
    locale: string
    minYear: number
    maxYear: number
    minDate?: string
    maxDate?: string
    value?: string
    tagDates?: string[]
    today: Dayjs
    onChange: (newDate: string) => void
    yearMonthPanel: Dayjs,
    onChangeYearMonthPanel?: (params: { year: number; month: number }) => void
}

export const useDatepicker = ({
    format = 'YYYY-MM-DD',
    locale,
    minYear,
    maxYear,
    minDate,
    maxDate,
    value,
    tagDates = [],
    today,
    yearMonthPanel,
    onChangeYearMonthPanel,
    onChange,
}: IDatepickerProps) => {
    const {i18n} = useLocale(locale);
    // const [panelYearMonth, setPanelYearMonth] = useState<Dayjs>(dayjs(value || today));
    const initMaxYear = typeof maxYear !== 'undefined' ? maxYear : Number(today.add(1, 'year').year());



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
    // const handleChangePanel = useCallback((year?: number, month?: number) => {
    //     let newPanelDate = panelYearMonth;
    //     if (year) newPanelDate = newPanelDate.set('year', year);
    //     if (month) newPanelDate = newPanelDate.set('month', month);
    //
    //     setPanelYearMonth(newPanelDate);
    //     onChangeYearMonthPanel?.({
    //         year: newPanelDate.year(),
    //         month: newPanelDate.month() + 1,
    //     });
    // }, [panelYearMonth, onChangeYearMonthPanel]);


    /**
     * 渲染這個月得資料
     */
    // const getCurrentMonthDays = () => {
    //
    //     // 取 Panel年月 的最後一天
    //     const currentMonthLastDay = yearMonthPanel.endOf('month').get('date');
    //
    //     // 產生 Panel年月 當月日期表
    //     const currentDayList: ICurrentDayList[] = Array.from({length: currentMonthLastDay});
    //     for (let d = 0; d < currentMonthLastDay; d++) {
    //         const dayNumber = d + 1;
    //         const eachDate = yearMonthPanel.set('date', dayNumber);
    //         const isDisable: boolean =
    //             !!((minDate && eachDate.isBefore(minDate, 'date')) ||
    //                 (maxDate && eachDate.isAfter(maxDate, 'date')));
    //
    //         currentDayList[d] = {
    //             // isStartActive: values?.startDate ? eachDate.isSame(values?.startDate, 'date'): false,
    //             // isEndActive: values?.endDate ? eachDate.isSame(values?.endDate, 'date') : false,
    //             // isInRange: (!isEmpty(values?.startDate) && !isEmpty(values?.endDate)) && eachDate.isAfter(values?.startDate) && (eachDate.isBefore(values?.endDate) || eachDate.isSame(values?.endDate, 'date')),
    //             isToday: today.isSame(eachDate, 'date'),
    //             isTag: tagDates?.includes(eachDate.format('YYYY-MM-DD')),
    //             isDisable,
    //             // className: styles.dateDay,
    //             date: eachDate,
    //             dayNumber: dayNumber,
    //             type: 'current'
    //             // onClick: () => !isDisable ? handleSelectedDate(panelYearMonth.year(), panelYearMonth.month(), dayNumber) : {}
    //         };
    //     }
    //     return currentDayList;
    // };


    /**
     * 產生下個月的剩餘日期表
     * @returns {Array}
     */
    // const getNextMonthDays = useCallback(() => {
    //     // const currentDate = dayjs(value);
    //
    //     // 取得指定年月的第一天是星期幾 (0, 1-6)
    //     const currentMonFirstWeek = yearMonthPanel.set('date', 1).day();
    //
    //     // 取 Panel年月 上個月份的已放空間 (星期六 ex: 6-1=5格, 星期日則為7天)
    //     const preMonthFirstContainer = currentMonFirstWeek === 0 ? 6 : currentMonFirstWeek - 1;
    //
    //     // 取 Panel年月 這個月的最後一天是幾號
    //     const panelMonthLastDay = yearMonthPanel.endOf('month').get('date');
    //
    //     const nextMonth = yearMonthPanel.add(1, 'month');
    //
    //     // 取得指定年月下個月剩餘月份可放空間
    //     const nextMonthEndContainer = (7 * 6) % (preMonthFirstContainer + panelMonthLastDay);
    //
    //     // 產生上個月的剩餘日期表
    //     const nextMonEndDayList: ICurrentDayList[] = Array.from({length: nextMonthEndContainer});
    //     for (let d = 0; d < nextMonthEndContainer; d++) {
    //         const dayNumber = d + 1;
    //         const eachDate = nextMonth.set('date', dayNumber);
    //         const isDisable =
    //             !!((minDate && eachDate.isBefore(minDate, 'date')) ||
    //                 (maxDate && eachDate.isAfter(maxDate, 'date')));
    //
    //         nextMonEndDayList[d] = {
    //             // isActive: currentDate.isSame(nextMonth.set('date', dayNumber), 'date'),
    //             isToday: today.isSame(eachDate, 'date'),
    //             isTag: tagDates?.includes(eachDate.format('YYYY-MM-DD')),
    //             isDisable,
    //             // className: elClassNames.datePreDay,
    //             date: eachDate,
    //             dayNumber: dayNumber,
    //             // onClick: () => !isDisable ? handleSelectedDate(nextMonth.year(), nextMonth.month(), dayNumber): {}
    //             type: 'nextDay',
    //         };
    //     }
    //
    //     return nextMonEndDayList;
    // }, [yearMonthPanel, value, minDate, maxDate, tagDates]);




    /**
     * 產生上個月的剩餘日期表
     * @returns {Array}
     */
    // const getPreMonthDays = useCallback(() => {
    //     // const currentDate = dayjs(value);
    //
    //     // 取得指定年月的第一天是星期幾 (0, 1-6)
    //     const currentMonFirstWeek = yearMonthPanel.set('date', 1).day();
    //
    //     // 取 Panel年月 剩餘月份的可放空間 (星期六 ex: 6-1=5格, 星期日則為7天)
    //     const preMonthFirstContainer = currentMonFirstWeek === 0 ? 6 : currentMonFirstWeek - 1;
    //
    //     // 取 Panel年月 上個月的最後一天是幾號
    //     const preMonth = yearMonthPanel.subtract(1, 'month');
    //     const preMonthLastDay = Number(preMonth.endOf('month').get('date'));
    //
    //     // 取 Panel年月 結束日從幾號開始
    //     const preMonthFirstDay = preMonthLastDay - preMonthFirstContainer;
    //
    //     // 產生 Panel年月 上個月的剩餘日期表
    //     const preMonFirstDayList: ICurrentDayList[] = Array.from({length: preMonthFirstContainer});
    //     for (let d = 0; d < preMonthFirstContainer; d++) {
    //         const dayNumber = preMonthFirstDay + d + 1;
    //         const eachDate = preMonth.set('date', dayNumber);
    //         const isDisable =
    //             !!((minDate && eachDate.isBefore(minDate, 'date')) ||
    //                 (maxDate && eachDate.isAfter(maxDate, 'date')));
    //
    //         preMonFirstDayList[d] = {
    //             // isActive: currentDate.isSame(preMonth.set('date', dayNumber), 'date'),
    //             isToday: today.isSame(eachDate, 'date'),
    //             isTag: tagDates?.includes(eachDate.format('YYYY-MM-DD')),
    //             isDisable,
    //             // className: styles.datePreDay,
    //             date: eachDate,
    //             dayNumber: dayNumber,
    //             // onClick: () => !isDisable ? handleSelectedDate(preMonth.year(), preMonth.month(), dayNumber) : {}
    //             type: 'preDay',
    //         };
    //     }
    //
    //     return preMonFirstDayList;
    //
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [yearMonthPanel, value, minDate, maxDate, tagDates]);




    /**
     * 設定為今天日期
     */
    // const handleSelectedToday = () => {
    //     const formatDate = today.format(format);
    //
    //     setPanelYearMonth(today);
    //     onChange(formatDate);
    // };
    
    return {
        yearMonthPanel,
        localeMonth,
        localeYear,
        // handleChangePanel,
        // handleSelectedToday,
        // getPreMonthDays,
        // getCurrentMonthDays,
        // getNextMonthDays,
    };
};



/**
 * 產生週星期文字
 */
export const useLocaleWeekDay = (locale?: string) => {
    const {i18n} = useLocale(locale);

    return config.weekDay.map((weekDate: number) => {
        return i18n(`com.datepicker.weekDay.${weekDate}`, {def: String(weekDate)});
    });
};
