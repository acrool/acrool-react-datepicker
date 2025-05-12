import clsx from 'clsx';
import React from 'react';

import {DatepickerAtom} from '../Datepicker';
import elClassNames from '../el-class-names';
import useLocale from '../locales';
import {EDateRange} from '../typing';
import {selectDateRange} from '../utils';
import {IRangeDatepickerProps} from './types';
import {getToday} from './utils';



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
const RangeDatepicker = ({
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
}: IRangeDatepickerProps) => {
    const {i18n} = useLocale(locale);
    const today = getToday();

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


    return (
        <div data-fast={isVisibleFastPicker ? '': undefined}
            className={clsx(
                elClassNames.root,
                elClassNames.dateRangeRoot,
                className,
                {'dark-theme': isDark}
            )}
            style={style}
        >
            {isVisibleFastPicker && renderRangeFastPicker()}

            <DatepickerAtom
                {...commonProps}
                value={value.startDate}
                onChange={(newValue) => {
                    if(onChange){
                        onChange({
                            startDate: newValue,
                            endDate: value?.endDate ? value.endDate : today
                        });
                    }
                }}
                minDate={minDate}
                maxDate={value?.endDate ? value?.endDate : maxDate}
            />

            <DatepickerAtom
                {...commonProps}
                value={value.endDate}
                onChange={(newValue) => {
                    if(onChange){
                        onChange({
                            startDate: value?.startDate ? value.startDate : today,
                            endDate: newValue
                        });
                    }
                }}
                minDate={value?.startDate ? value?.startDate: minDate}
                maxDate={maxDate}
            />


        </div>
    );
};

export default RangeDatepicker;

