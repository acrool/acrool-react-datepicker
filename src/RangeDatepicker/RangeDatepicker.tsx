import React from 'react';
import dayjs from 'dayjs';
import cx from 'classnames';
import elClassNames from './el-class-names';
import './styles.css';

// Component
import Datepicker from '../Datepicker/Datepicker';
import {ICommon} from '../Datepicker/typing';
import {IRangeDateValue, EDateRange} from './typing';
import translateI18n from '../locales';
import {selectDateRange} from '../utils';


interface IProps extends ICommon{
    value?: IRangeDateValue
    onChange?: (value: IRangeDateValue) => void
    isVisibleFastPicker?: boolean
}
const today = dayjs().format('YYYY-MM-DD');

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
    value = {startDate: today, endDate: today},
    onChange,
    format,
    maxYear,
    minYear,
    locale,
    isVisibleFastPicker = false,
    minDate,
    maxDate,
    isDark,
}: IProps) => {
    const commonProps = {isDark, format, minYear, maxYear, locale};


    const setRangeDate = (rangeType: EDateRange) => {
        const newVal = selectDateRange(rangeType, format);
        if(newVal){
            onChange(newVal);
        }
    };


    /**
     * 快速選擇面板
     */
    const renderRangeFastPicker = () => {
        return <div className={elClassNames.labelCheckCardCreate}>
            <button className={elClassNames.todayButton} type="button" onClick={() => setRangeDate(EDateRange.today)}>
                <span>{translateI18n('com.datepicker.today', {defaultMessage: 'today', locale: locale})}</span>
            </button>
            <button className={elClassNames.todayButton} type="button" onClick={() => setRangeDate(EDateRange.tomorrow)}>
                <span>{translateI18n('com.datepicker.tomorrow', {defaultMessage: 'tomorrow', locale: locale})}</span>
            </button>
            <button className={elClassNames.todayButton} type="button" onClick={() => setRangeDate(EDateRange.twoDay)}>
                <span>{translateI18n('com.datepicker.twoDay', {defaultMessage: 'two day', locale: locale})}</span>
            </button>
            <button className={elClassNames.todayButton} type="button" onClick={() => setRangeDate(EDateRange.thisWeek)}>
                <span>{translateI18n('com.datepicker.thisWeek', {defaultMessage: 'this week', locale: locale})}</span>
            </button>
            <button className={elClassNames.todayButton} type="button" onClick={() => setRangeDate(EDateRange.nextWeek)}>
                <span>{translateI18n('com.datepicker.nextWeek', {defaultMessage: 'next week', locale: locale})}</span>
            </button>
        </div>;
    };


    return (
        <div className={cx(elClassNames.root, className)} style={style}>
            <div className="d-flex flex-column align-items-center">
                <Datepicker
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
            </div>

            <div className="d-flex flex-column align-items-center">
                <Datepicker
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

            {isVisibleFastPicker && renderRangeFastPicker()}

        </div>

    );
};

export default RangeDatepicker;

