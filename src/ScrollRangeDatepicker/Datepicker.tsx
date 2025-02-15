import React from 'react';
import dayjs from 'dayjs';
import clsx from 'clsx';
import useNowTime from '../hooks/useNow';
import useLocale from '../locales';
import {IDatepickerProps} from './types';
import {useDatepicker} from '../hooks';
import {
    getCheckDateStartEnd,
    getCurrentMonthDays,
    getCheckDateRangeKind,
    getPreMonthDays,
} from '../utils';
import styles from './scroll-range-datepicker.module.scss';




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

    };



    /**
     * 產生年月
     * @returns {*}
     */
    const renderYearMonth = () => {

        const activeMonth = localeMonth.find(row => row.value === yearMonthPanel.month());

        // 產生年月標題
        return (
            <div className={styles.dateYearMonthRow}>
                {activeMonth?.text} {yearMonthPanel.year()}
            </div>
        );

    };


    /**
     * 產生當月日期表
     */
    const renderCurrentMonthDay = () => {
        const preMonthDay = getPreMonthDays(yearMonthPanel);
        const currentMonthDay = getCurrentMonthDays(yearMonthPanel);

        const monthDateList = [...preMonthDay, ...currentMonthDay];

        return (
            <div className={styles.dateDayRow}>
                <div className={styles.dateDayContent}>

                    {monthDateList.map(row => {

                        return <div
                            key={`currentDay-${row.date}`}
                            className={styles.dateDay}
                            data-active={getCheckDateStartEnd(row.date, values)}
                            data-range-kind={getCheckDateRangeKind(row.date, values)}
                            data-today={today.isSame(row.date, 'date') ? '': undefined}
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




    return <div
        data-year-month={yearMonthPanel.format('YYYY-MM')}
        className={clsx(
            styles.dateRoot,
            className, {'dark-theme': isDark})
        }
        style={style}
    >
        {renderYearMonth()}
        {renderCurrentMonthDay()}

    </div>;

};

const Datepicker = (props: IDatepickerProps) => {
    return <DatepickerAtom
        {...props}
        className={props.className}
    />;
};


export {DatepickerAtom};
export default Datepicker;
