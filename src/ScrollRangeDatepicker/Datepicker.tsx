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
import {isEmpty} from '../utils';
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
    panelYearMonth,
    tagDates = []
}: IDatepickerProps) => {
    const today = useNowTime();
    const {i18n} = useLocale(locale);


    const {
        localeMonth,
        localeYear,
        // panelYearMonth,
        handleChangePanel,
        // handleSelectedToday,
    } = useDatepicker({
        format,
        locale,
        minYear: minYear,
        maxYear: maxYear || dayjs().year() + 1,
        // value: value,
        today: dayjs(),
        onChangeYearMonthPanel: onChangeYearMonthPanel,
        onChange,
    });



    useOnlyUpdateEffect(() => {
        const dateVal = dayjs(values?.startDate);
        const now = dayjs();
        const newYear = dateVal.isValid() ? dateVal.get('year') : now.get('year');
        const newMonth = dateVal.isValid() ? dayjs(values?.startDate).get('month'): now.get('month');
        handleChangePanel(newYear, newMonth);
    }, [values]);



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
     * 產生年月
     * @returns {*}
     */
    const renderYearMonth = () => {

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



                </div>

            </div>
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    };



    /**
     * 產生當月日期表
     */
    const renderCurrentMonthDay = () => {
        const current1Date =
            [
                values?.startDate,
                values?.endDate,
            ].filter(row => !isEmpty(row));

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
                isStartActive: values?.startDate ? eachDate.isSame(values?.startDate, 'date'): false,
                isEndActive: values?.endDate ? eachDate.isSame(values?.endDate, 'date') : false,
                isInRange: (!isEmpty(values?.startDate) && !isEmpty(values?.endDate)) && eachDate.isAfter(values?.startDate) && (eachDate.isBefore(values?.endDate) || eachDate.isSame(values?.endDate, 'date')),
                isToday: today.isSame(eachDate, 'date'),
                isTag: tagDates?.includes(eachDate.format('YYYY-MM-DD')),
                isDisable,
                className: styles.dateDay,
                date: eachDate,
                dayNumber: dayNumber,
                onClick: () => !isDisable ? handleSelectedDate(panelYearMonth.year(), panelYearMonth.month(), dayNumber) : {}
            };
        }


        const monthDateList = [...currentDayList];

        const actIndex = monthDateList.findIndex((row) => row.isStartActive || row.isEndActive);
        const weekIndex = Math.floor(actIndex / 7);

        return (
            <div className={elClassNames.dateDayRow}>
                <div className={elClassNames.dateDayContent}>
                    {weekIndex >= 0 && <div className={elClassNames.dateWeekMask} style={{top: weekIndex * 30}}/>}

                    {monthDateList.map(row => {
                        return  <div
                            key={`currentDay-${row.date}`}
                            className={row.className}
                            data-start-active={row.isStartActive ? '': undefined}
                            data-end-active={row.isEndActive ? '': undefined}
                            data-range={row.isInRange}
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
