import React from 'react';
import dayjs from 'dayjs';
import elClassNames from '../el-class-names';

import {DatepickerAtom as Datepicker} from '../Datepicker';
import {TimepickerAtom as Timepicker} from '../Timepicker';
import {IRangeDateValue, EDateRange, ICommon, IRangeDateTimeValue} from '../typing';
import translateI18n from '../locales';
import {selectDateRange, getDatetime} from '../utils';
import clsx from 'clsx';
import useLocale from '../locales';


interface IProps extends ICommon{
    value?: IRangeDateTimeValue
    onChange?: (value: IRangeDateTimeValue) => void
    dateFormat?: string
    isVisibleFastPicker?: boolean
    isVisibleSecond?: boolean
    onClickOk?: (value: string) => void
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
const RangeTimeDatepicker = ({
    className,
    style,
    value = {date: today, startTime: '00:00:00', endTime: '00:00:00'},
    dateFormat = 'YYYY-MM-DD',
    onChange,
    format,
    maxYear,
    minYear,
    locale,
    isVisibleFastPicker = false,
    isVisibleSecond = true,
    onClickOk,
    minDate,
    maxDate,
    isDark,
}: IProps) => {
    const {i18n} = useLocale(locale);
    const dateProps = {dateFormat, locale, isDark};
    const timeProps = {locale, isDark, onClickOk, isVisibleSecond};


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
            <Datepicker
                {...dateProps}
                value={value.date}
                onChange={newValue => {
                    if(onChange){
                        onChange({
                            ...value,
                            date: newValue,
                        });
                    }
                }}
            />
            <Timepicker {...timeProps}
                title={i18n('com.timepicker.start', {def: 'Start'})}
                value={value.startTime} onChange={newValue => {
                    if(onChange){
                        onChange({
                            ...value,
                            startTime: newValue,
                        });
                    }
                }}
                isVisibleSecond={timeProps.isVisibleSecond}
                isVisibleNow={false}/>
            <Timepicker {...timeProps}
                title={i18n('com.timepicker.end', {def: 'End'})}
                value={value.endTime} onChange={newValue => {
                    if(onChange){
                        onChange({
                            ...value,
                            endTime: newValue,
                        });
                    }
                }}
                isVisibleSecond={timeProps.isVisibleSecond}
                isVisibleNow={false}/>

        </div>
    );
};

export default RangeTimeDatepicker;

