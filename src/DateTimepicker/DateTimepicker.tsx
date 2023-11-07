import React from 'react';
import CSS from 'csstype';
import dayjs,{Dayjs} from 'dayjs';
import {defaultFormat, getDatetime} from '../utils';
import elClassNames from '../el-class-names';
import Datepicker from '../Datepicker/Datepicker';
import Timepicker from '../Timepicker/Timepicker';
import {ICommon} from '../typing';
import translateI18n from '../locales';

import clsx from 'clsx';


interface IProps extends ICommon{
    className?: string;
    style?: CSS.Properties;
    value?: string;
    dateFormat?: string;
    onChange: (newDate: string) => void;
    onClickOk: (newDate: string) => void;
    isEnableSec?: boolean,
}



/**
 * DateTimepicker
 * 日期選擇器
 */
const DateTimepicker = ({
    className,
    style,
    value,
    dateFormat = defaultFormat.date,
    onChange,
    onClickOk,
    locale = 'en-US',
    minYear = 1911,
    maxYear,
    isDark = false,
    minDate,
    maxDate,
    isEnableSec = true,
}: IProps) => {
    const propsDate = getDatetime(value);
    const dateProps = {dateFormat, minDate, maxDate, minYear, maxYear, locale, isDark};
    const timeProps = {locale, isDark, onClickOk, isEnableSec};

    /**
     * 取得時間
     * @param dayObj
     */
    const getTime = (dayObj: Dayjs) => {
        if(propsDate.isValid()){
            return dayObj.format(isEnableSec ? defaultFormat.time : defaultFormat.timeNoSec);
        }
        return dayjs().format(isEnableSec ? defaultFormat.time : defaultFormat.timeNoSec);
    };

    /**
     * 取得日期
     * @param dayObj
     */
    const getDate = (dayObj: Dayjs) => {
        if(propsDate.isValid()){
            return dayObj.format(dateFormat);
        }
        return dayjs().format(dateFormat);
    };


    /**
     * 處理日期異動
     * @param newValue
     */
    const handleChangeDate = (newValue: string) => {
        const oldTime = getTime(propsDate);
        onChange(`${newValue} ${oldTime}`);
    };

    /**
     * 處理點擊OK按鈕
     */
    const handleOnClickOk = (newValue: string) => {
        const oldDate = getDate(propsDate);
        if(onClickOk) onClickOk(`${oldDate} ${newValue}`);
    };


    /**
     * 處理時間異動
     * @param newValue
     */
    const handleChangeTime = (newValue: string) => {
        const oldDate = getDate(propsDate);
        onChange(`${oldDate} ${newValue}`);
    };




    return (
        <div className={clsx(elClassNames.dateTimeRoot,
            {'dark-theme': isDark},
            className
        )}
        style={style}
        >
            <div className={elClassNames.dateTimeGroup}>
                <Datepicker {...dateProps} value={getDate(propsDate)} onChange={handleChangeDate} />
                <Timepicker {...timeProps} value={getTime(propsDate)} onChange={handleChangeTime} onClickOk={handleOnClickOk}/>
            </div>

            <div className={elClassNames.timeButtonContainer}>
                <button className={elClassNames.timeNowButton} type="button" onClick={() => {}}>{translateI18n('com.timepicker.setNow', {locale: locale})}</button>
                <button className={elClassNames.timeConfirmButton} type="button" onClick={() => {}}>{translateI18n('com.timepicker.ok', {locale: locale})}</button>
            </div>
        </div>
    );

};


export default DateTimepicker;
