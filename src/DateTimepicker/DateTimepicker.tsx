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
import useNowTime from '../hooks/useNow';


interface IProps extends ICommon{
    className?: string;
    style?: CSS.Properties;
    value?: string;
    dateFormat?: string;
    onChange: (newDate: string) => void;
    onClickOk: (newDate: string) => void;
    isVisibleSecond?: boolean,
}


enum EDateType {
    date,
    time,
    dateTime,
}



/**
 * DateTimepicker
 * 日期選擇器
 */
const DateTimepicker = ({
    className,
    style,
    value,
    dateFormat = defaultFormat.date ,
    onChange,
    onClickOk,
    locale = 'en-US',
    minYear = 1911,
    maxYear,
    isDark = false,
    minDate,
    maxDate,
    isVisibleSecond = true,
}: IProps) => {
    const today = useNowTime();

    const propsDate = getDatetime(value);
    const dateProps = {dateFormat, minDate, maxDate, minYear, maxYear, locale, isDark};
    const timeProps = {locale, isDark, onClickOk, isVisibleSecond};

    /**
     * 取得時間
     * @param dayObj
     */
    const getTime = (dayObj: Dayjs) => {
        return (dayObj.isValid() ? dayObj: dayjs())
            .format(timeProps.isVisibleSecond ? defaultFormat.time : defaultFormat.timeNoSec);
    };

    /**
     * 取得時間
     * @param dayObj
     */
    const getDate = (dayObj: Dayjs) => {
        return (dayObj.isValid() ? dayObj: dayjs())
            .format(dateFormat);
    };



    /**
     * 處理日期異動
     * @param dateType
     */
    const generateOnChange = (dateType?: EDateType) => {
        if(dateType === EDateType.date) {
            return (newValue: string) => {
                onChange(`${newValue} ${getTime(propsDate)}`);
            };
        }

        if(dateType === EDateType.time){
            return (newValue: string) => {
                onChange(`${getDate(propsDate)} ${newValue}`);
            };
        }

        return onChange;
    };

    /**
     * 處理點擊OK按鈕
     */
    const handleOnClickOk = () => {
        const dateStr = `${getDate(propsDate)} ${getTime(propsDate)}`;
        if(onClickOk) onClickOk(dateStr);
    };






    /**
     * 設定為今天日期
     */
    const handleSetNow = () => {
        generateOnChange()(`${getDate(today)} ${getTime(today)}`);
    };


    /**
     * 渲染按鈕的部分
     */
    const renderActionsButtons = () => {
        return <div className={elClassNames.timeButtonContainer}>
            <button className={elClassNames.timeNowButton} type="button" onClick={handleSetNow}>{translateI18n('com.timepicker.setNow', {locale: locale})}</button>
            <button className={elClassNames.timeConfirmButton} type="button" onClick={handleOnClickOk}>{translateI18n('com.timepicker.ok', {locale: locale})}</button>
        </div>;
    };



    return <div className={clsx(
        elClassNames.root,
        elClassNames.dateTimeRoot,
        {'dark-theme': isDark},
        className
    )}
    style={style}
    >
        <div className={elClassNames.dateTimeGroup}>
            <Datepicker {...dateProps} value={getDate(propsDate)} onChange={generateOnChange(EDateType.date)}/>
            <Timepicker {...timeProps} value={getTime(propsDate)} onChange={generateOnChange(EDateType.time)}
                isVisibleSecond={timeProps.isVisibleSecond}
                isVisibleNow={false}/>
        </div>

        {renderActionsButtons()}
    </div>;
};


export default DateTimepicker;
