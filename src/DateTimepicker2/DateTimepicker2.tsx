import React, {ForwardedRef} from 'react';
import CSS from 'csstype';
import dayjs,{Dayjs} from 'dayjs';
import {defaultFormat, getDatetime, onButtonMouseDown} from '../utils';
import elClassNames from '../el-class-names';
import {DatepickerAtom as Datepicker} from '../Datepicker';
import {Timepicker2Atom as Timepicker2} from '../Timepicker2';

import {ICommon} from '../typing';

import clsx from 'clsx';
import useNowTime from '../hooks/useNow';
import useLocale from '../locales';
import './styles.css';


interface IProps extends ICommon{
    className?: string;
    style?: CSS.Properties;
    value?: string;
    dateFormat?: string;
    onChange: (newDate: string) => void;
    onClickOk: (newDate: string) => void;
    isVisibleSecond?: boolean,
    hourForwardedRef?: ForwardedRef<HTMLInputElement>
    minuteForwardedRef?: ForwardedRef<HTMLInputElement>
    secondForwardedRef?: ForwardedRef<HTMLInputElement>
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
const DateTimepicker2 = ({
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

    hourForwardedRef,
    minuteForwardedRef,
    secondForwardedRef
}: IProps) => {
    const {i18n} = useLocale(locale);
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
            <button className={elClassNames.timeNowButton} type="button"
                onMouseDown={onButtonMouseDown}
                tabIndex={-1}
                onClick={handleSetNow}
            >
                {i18n('com.timepicker.setNow', {def: 'Set now'})}
            </button>
            <button className={elClassNames.timeConfirmButton}
                type="button"
                onMouseDown={onButtonMouseDown}
                tabIndex={-1}
                onClick={handleOnClickOk}
            >
                {i18n('com.timepicker.ok', {def: 'OK'})}
            </button>
        </div>;
    };



    return <div className={clsx(
        elClassNames.root,
        elClassNames.dateTime2Root,
        {'dark-theme': isDark},
        className
    )}
    style={style}
    >
        <div className={elClassNames.dateTime2Group}>
            <Datepicker {...dateProps} value={getDate(propsDate)} onChange={generateOnChange(EDateType.date)}/>
            <Timepicker2 {...timeProps} value={getTime(propsDate)} onChange={generateOnChange(EDateType.time)}
                isVisibleSecond={timeProps.isVisibleSecond}
                title={i18n('com.timepicker.time', {def: 'Time'})}
                isVisibleNow={false}
                hourForwardedRef={hourForwardedRef}
                minuteForwardedRef={minuteForwardedRef}
                secondForwardedRef={secondForwardedRef}
            />
        </div>

        {renderActionsButtons()}
    </div>;
};


export default DateTimepicker2;
