import React, {useCallback} from 'react';
import elClassNames from '../el-class-names';

import {DatepickerAtom} from './Datepicker';
import {EDateRange} from '../typing';
import {isEmpty, selectDateRange} from '../utils';
import clsx from 'clsx';
import useLocale from '../locales';
import {IScrollRangeDatepickerProps} from './types';
import {getToday} from './utils';
import styles from './styles.module.scss';
import dayjs from 'dayjs';
import {useLocaleWeekDay} from '../hooks';



/**
 * 日期輸入控件
 *
 * 手機版使用原生輸入框, 電腦版使用自製的Picker選擇
 * supper control & unControl
 *
 * @param className
 * @param style
 * @param label
 * @param value
 * @param value
 * @param onChange
 * @constructor
 */
const ScrollRangeDatepicker = ({
    className,
    style,
    value = {startDate: getToday(), endDate: getToday()},
    onChange,
    format = 'YYYY-MM-DD',
    maxYear,
    minYear,
    locale,
    isVisibleFastPicker = false,
    minDate,
    maxDate,
    isDark,
}: IScrollRangeDatepickerProps) => {
    const {i18n} = useLocale(locale);
    const today = getToday();

    const localeWeekDay = useLocaleWeekDay(locale);

    const commonProps = {isDark, format, minYear, maxYear, locale};


    const setRangeDate = (rangeType: EDateRange) => {
        const newVal = selectDateRange(rangeType, format);
        if(newVal && onChange){
            onChange(newVal);
        }
    };


    /**
     * 快速選擇面板
     */
    const renderRangeFastPicker = () => {
        return <div className={elClassNames.dateRangeLabelCheckCardCreate}>
            <button className={elClassNames.dateRangeButton} type="button" onClick={() => setRangeDate(EDateRange.today)}>
                <span>{i18n('com.datepicker.today', {def: 'today'})}</span>
            </button>
            <button className={elClassNames.dateRangeButton} type="button" onClick={() => setRangeDate(EDateRange.tomorrow)}>
                <span>{i18n('com.datepicker.tomorrow', {def: 'tomorrow'})}</span>
            </button>
            <button className={elClassNames.dateRangeButton} type="button" onClick={() => setRangeDate(EDateRange.twoDay)}>
                <span>{i18n('com.datepicker.twoDay', {def: 'two day'})}</span>
            </button>
            <button className={elClassNames.dateRangeButton} type="button" onClick={() => setRangeDate(EDateRange.thisWeek)}>
                <span>{i18n('com.datepicker.thisWeek', {def: 'this week'})}</span>
            </button>
            <button className={elClassNames.dateRangeButton} type="button" onClick={() => setRangeDate(EDateRange.nextWeek)}>
                <span>{i18n('com.datepicker.nextWeek', {def: 'next week'})}</span>
            </button>
        </div>;
    };




    const handleOnChange = (newValue: string) => {
        if(onChange){
            if(value?.endDate){
                onChange({
                    startDate: newValue,
                    endDate: undefined,
                });
                return;
            }

            onChange({
                ...value,
                endDate: newValue,
            });

        }
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



    const renderDateRange = () => {

        const todayMonth = dayjs().set('date', 1);
        const monthLimit = Array.from({length: 6});
        const months = monthLimit.map((_, idx) => {
            return todayMonth.add(idx, 'month');
        });
        
        console.log('value', value);

        return months.map(row => {
            return <DatepickerAtom
                key={row.format('YYYY-MM')}
                {...commonProps}
                values={value}
                onChange={handleOnChange}
                minDate={isEmpty(value?.endDate) ? value?.startDate: undefined}
                panelYearMonth={row}
                // minDate={minDate}
                // maxDate={value?.endDate ? value?.endDate : maxDate}
            />;
        });

    };


    return (
        <div data-fast={isVisibleFastPicker ? '': undefined}
            className={clsx(
                styles.root,
                className,
                {'dark-theme': isDark}
            )}
            style={style}
        >
            {isVisibleFastPicker && renderRangeFastPicker()}


            {renderWeek()}
            {renderDateRange()}

            {/*<DatepickerAtom*/}
            {/*    {...commonProps}*/}
            {/*    value={value}*/}
            {/*    onChange={handleOnChange}*/}
            {/*    // minDate={minDate}*/}
            {/*    // maxDate={value?.endDate ? value?.endDate : maxDate}*/}
            {/*/>*/}

            {/*<DatepickerAtom*/}
            {/*    {...commonProps}*/}
            {/*    value={value.endDate}*/}
            {/*    onChange={(newValue) => {*/}
            {/*        if(onChange){*/}
            {/*            onChange({*/}
            {/*                startDate: value?.startDate ? value.startDate : today,*/}
            {/*                endDate: newValue*/}
            {/*            });*/}
            {/*        }*/}
            {/*    }}*/}
            {/*    minDate={value?.startDate ? value?.startDate: minDate}*/}
            {/*    maxDate={maxDate}*/}
            {/*/>*/}


        </div>
    );
};

export default ScrollRangeDatepicker;

