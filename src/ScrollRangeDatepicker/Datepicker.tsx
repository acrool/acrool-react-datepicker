import React, {useCallback} from 'react';
import dayjs from 'dayjs';
import elClassNames from '../el-class-names';
import {ArrowIcon} from '../Icon';
import clsx from 'clsx';
import useOnlyUpdateEffect from '../hooks/useUpdateEffect';
import useNowTime from '../hooks/useNow';
import useLocale from '../locales';
import {ICurrentDayList, IDatepickerProps} from './types';
import {useDatepicker} from '../hooks';
import {
    getCheckDateStartEnd,
    getCurrentMonthDays,
    getCheckDateRangeKind,
    getNextMonthDays,
    getPreMonthDays,
    isEmpty
} from '../utils';
import styles from './styles.module.scss';




/**
 * Datepicker
 * 日期選擇器
 */
const DatepickerAtom = ({
    className,
    style,
    values,
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
    yearMonthPanel,
    tagDates = []
}: IDatepickerProps) => {
    const today = useNowTime();
    const {i18n} = useLocale(locale);


    const {
        localeMonth,
        localeYear,
        // getPreMonthDays,
        // getNextMonthDays,
        // getCurrentMonthDays,
        // panelYearMonth,
        // handleChangePanel,
        // handleSelectedToday,
    } = useDatepicker({
        format,
        locale,
        minDate,
        maxDate,
        minYear: minYear,
        maxYear: maxYear || dayjs().year() + 1,
        tagDates,
        // value: value,
        today: dayjs(),
        yearMonthPanel,
        // onChangeYearMonthPanel: onChangeYearMonthPanel,
        onChange,
    });



    // useOnlyUpdateEffect(() => {
    //     const dateVal = dayjs(values?.startDate);
    //     const now = dayjs();
    //     const newYear = dateVal.isValid() ? dateVal.get('year') : now.get('year');
    //     const newMonth = dateVal.isValid() ? dayjs(values?.startDate).get('month'): now.get('month');
    //     handleChangePanel(newYear, newMonth);
    // }, [values]);



    /**
     * 處理選擇日期
     * @param year
     * @param month
     * @param day
     */
    const handleSelectedDate = (year?: number, month?: number, day?: number) => {
        let newDate = yearMonthPanel;
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
     * 產生年月
     * @returns {*}
     */
    const renderYearMonth = () => {

        const activeYear = localeYear.find(row => String(row.value) === String(yearMonthPanel.year()));
        const activeMonth = localeMonth.find(row => row.value === yearMonthPanel.month());

        // 產生年月標題
        return (
            <div className={styles.dateYearMonthRow}>
                {activeMonth?.text} {activeYear?.text}
            </div>
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    };


    /**
     * 產生當月日期表
     */
    const renderCurrentMonthDay = () => {
        // const current1Date =
        //     [
        //         values?.startDate,
        //         values?.endDate,
        //     ].filter(row => !isEmpty(row));

        // 取 Panel年月 的最後一天
        // const currentMonthLastDay = panelYearMonth.endOf('month').get('date');
        //
        // // 產生 Panel年月 當月日期表
        // const currentDayList: ICurrentDayList[] = Array.from({length: currentMonthLastDay});
        // for (let d = 0; d < currentMonthLastDay; d++) {
        //     const dayNumber = d + 1;
        //     const eachDate = panelYearMonth.set('date', dayNumber);
        //     const isDisable: boolean =
        //         !!((minDate && eachDate.isBefore(minDate, 'date')) ||
        //             (maxDate && eachDate.isAfter(maxDate, 'date')));
        //
        //     currentDayList[d] = {
        //         isStartActive: values?.startDate ? eachDate.isSame(values?.startDate, 'date'): false,
        //         isEndActive: values?.endDate ? eachDate.isSame(values?.endDate, 'date') : false,
        //         isInRange: (!isEmpty(values?.startDate) && !isEmpty(values?.endDate)) && eachDate.isAfter(values?.startDate) && (eachDate.isBefore(values?.endDate) || eachDate.isSame(values?.endDate, 'date')),
        //         isToday: today.isSame(eachDate, 'date'),
        //         isTag: tagDates?.includes(eachDate.format('YYYY-MM-DD')),
        //         isDisable,
        //         className: styles.dateDay,
        //         date: eachDate,
        //         dayNumber: dayNumber,
        //         // onClick: () => !isDisable ? handleSelectedDate(panelYearMonth.year(), panelYearMonth.month(), dayNumber) : {}
        //     };
        // }

        const preMonthDay = getPreMonthDays(yearMonthPanel);
        const currentMonthDay = getCurrentMonthDays(yearMonthPanel);
        const nextMonthDays = getNextMonthDays(yearMonthPanel);

        const monthDateList = [...preMonthDay, ...currentMonthDay, ...nextMonthDays];

        // const actIndex = monthDateList.findIndex((row) => row.isStartActive || row.isEndActive);
        // const weekIndex = Math.floor(actIndex / 7);

        return (
            <div className={styles.dateDayRow}>
                <div className={styles.dateDayContent}>

                    {monthDateList.map(row => {

                        // isStartActive: values?.startDate ? eachDate.isSame(values?.startDate, 'date'): false,
                        // isEndActive: values?.endDate ? eachDate.isSame(values?.endDate, 'date') : false,
                        // isInRange: (!isEmpty(values?.startDate) && !isEmpty(values?.endDate)) && eachDate.isAfter(values?.startDate) && (eachDate.isBefore(values?.endDate) || eachDate.isSame(values?.endDate, 'date')),
                        // isToday: today.isSame(eachDate, 'date'),
                        // isTag: tagDates?.includes(eachDate.format('YYYY-MM-DD')),
                        // isDisable,
                        // className: styles.dateDay,


                        return <div
                            key={`currentDay-${row.date}`}
                            className={styles.dateDay}
                            data-active={getCheckDateStartEnd(row.date, values)}
                            data-range-kind={getCheckDateRangeKind(row.date, values)}
                            // data-start-active={row.isStartActive ? '': undefined}
                            // data-end-active={row.isEndActive ? '': undefined}
                            // data-range={row.isInRange}
                            data-today={today.isSame(row.date, 'date') ? '': undefined}
                            // data-tag={row.isTag}
                            // data-disable={row.isDisable}
                            data-type={row.type}
                            onClick={() => handleSelectedDate(row.date.year(), row.date.month(), row.dayNumber)}
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




    return <div className={clsx(
        elClassNames.dateRoot,
        className, {'dark-theme': isDark})} style={style}>
        {renderYearMonth()}
        {renderCurrentMonthDay()}

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
