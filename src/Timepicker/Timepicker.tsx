import React, {useState, useRef, useCallback, startTransition, useEffect} from 'react';
import dayjs from 'dayjs';
import CSS from 'csstype';
import elClassNames from './el-class-names';
import cx from 'classnames';
import { paddingLeft } from 'bear-jsutils/string';
import {getTimeList, getTimeFormat} from '../utils';
import translateI18n from '../locales';

import './styles.css';


interface IProps {
    className?: string;
    style?: CSS.Properties;
    value?: string;
    onChange?: (value: string) => void;
    onClickOk?: (value: string) => void;
    locale?: string,
    isDark?: boolean,
}

const {hourList, minuteList, secondList} = getTimeList();

const unitHeight = 32;

interface ITimeObj  {
    hour: number,
    minute: number,
    second: number,
}


/**
 * 時間物件轉自串
 * @param timeObj
 */
const getTimeString = (timeObj: ITimeObj): string => {
    return `${paddingLeft(timeObj.hour, 2)}:${paddingLeft(timeObj.minute, 2)}:${paddingLeft(timeObj.second, 2)}`;
}

/**
 * 時間選擇器
 * @param className
 * @param style
 * @param onChange 選擇視窗當項目異動時
 * @param onClickOk 選擇視窗按下OK時
 * @param value Input Value
 * @param locale
 * @param isDark 暗黑模式
 */
const Timepicker = ({
    className,
    style,
    onChange,
    onClickOk,
    value = '00:00:00',
    locale = 'en-US',
    isDark = false,
}: IProps) => {
    const hourBoxRef = useRef<HTMLDivElement>(null);
    const minuteBoxRef = useRef<HTMLDivElement>(null);
    const secondBoxRef = useRef<HTMLDivElement>(null);

    const [time, setTime] = useState<ITimeObj>(getTimeFormat(value));
    const timeString = getTimeString(time);


    useEffect(() => {
        handleMoveUnit(time, false);

    }, [])


    /**
     * 處理異動時動作
     * @param data
     * @param isBehaviorSmooth
     */
    const handleOnChange = (data: ITimeObj, isBehaviorSmooth = true) => {
        handleMoveUnit(data, isBehaviorSmooth);

        startTransition(() => {
            setTime(data);

            if(onChange){
                onChange(getTimeString(data));
            }
        });
    }


    /**
     * 處理點擊OK按鈕
     */
    const handleOnClickOk = () => {
        if(onClickOk) onClickOk(timeString);
    }

    /**
     * 處理移動時間
     */
    const handleMoveUnit = (data: {hour: number, minute: number, second: number}, isBehaviorSmooth = true) => {
        const behavior = isBehaviorSmooth ? 'smooth':'auto';
        if(data.hour && hourBoxRef.current){
            hourBoxRef.current?.scrollTo({behavior, top: data.hour * unitHeight});
        }

        if(data.minute && minuteBoxRef.current){
            minuteBoxRef.current?.scrollTo({behavior, top: data.minute * unitHeight});
        }

        if(data.second && secondBoxRef.current){
            secondBoxRef.current?.scrollTo({behavior, top: data.second * unitHeight});
        }
    }

    /**
     * 處理按下現在時間
     */
    const handleNowTime = useCallback(() => {
        const reToday = dayjs();

        const data = {
            hour: reToday.hour(),
            minute: reToday.minute(),
            second: reToday.second(),
        };

        // 設定 時、分、秒
        handleOnChange(data, true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * 產生時|分|秒 區塊
     */
    const renderOption = useCallback((unitCode: 'hour'|'minute'|'second', unitList: Array<number>) => {
        return unitList.map(unit => {
            const isActive = time[unitCode] === unit;
            return (
                <span className={cx(elClassNames.fakeOption, {'is-active': isActive})}
                    key={`unit-${unitCode}-${unit}`}
                    onClick={() => {
                        const newTime = {...time, [unitCode]: unit};
                        handleOnChange(newTime, true);
                    }}
                >
                    {paddingLeft(unit, 2)}
                </span>
            );
        });
    }, [timeString, onChange]);


    return (
        <div className={cx(elClassNames.root, className, {'dark-theme': isDark})} style={style}>
            <div className={elClassNames.header}>
                <span className={elClassNames.headerText}>{translateI18n('com.timepicker.time', {locale: locale})}</span>
            </div>
            <div className={elClassNames.pickContainer}>
                {/* 時 */}
                <div className={elClassNames.fakeSelectContainer}>
                    <div className={elClassNames.selectBox} ref={hourBoxRef}>
                        {renderOption('hour', hourList)}
                    </div>
                </div>

                {/* 分 */}
                <div className={elClassNames.fakeSelectContainer}>
                    <div className={elClassNames.selectBox} ref={minuteBoxRef}>
                        {renderOption('minute', minuteList)}
                    </div>
                </div>

                {/* 秒 */}
                <div className={elClassNames.fakeSelectContainer}>
                    <div className={elClassNames.selectBox} ref={secondBoxRef}>
                        {renderOption('second', secondList)}
                    </div>
                </div>
            </div>

            <div className={elClassNames.buttonContainer}>
                <button className={elClassNames.nowButton} type="button" onClick={handleNowTime}>{translateI18n('com.timepicker.setNow', {locale: locale})}</button>
                <button className={elClassNames.confirmButton} type="button" onClick={handleOnClickOk}>{translateI18n('com.timepicker.ok', {locale: locale})}</button>
            </div>
        </div>
    );
};

export default Timepicker;

