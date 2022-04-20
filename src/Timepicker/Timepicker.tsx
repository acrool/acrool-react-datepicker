import React, {useState, useRef, useEffect, useCallback, RefObject} from 'react';
import dayjs from 'dayjs';
import elClassName from './config';
import {isEmpty} from 'bear-jsutils/equal';
import cx from 'classnames';
import {getTimeList, getTimeFormat} from './utils';
import translateI18n from '../locales';

import './styles.css';


type updateTimeType = string;
interface IProps {
    value?: string;
    onChange?: (updateTime: updateTimeType) => void;
    onClickOk?: (updateTime: updateTimeType) => void;
    locale?: string,
}

const {hourList, minuteList, secondList} = getTimeList();

const unitHeight = 32;

/**
 * 時間選擇器
 * @param onChange 選擇視窗當項目異動時
 * @param onClickOk 選擇視窗按下OK時
 * @param value Input Value
 */
const Timepicker = ({
    onChange,
    onClickOk,
    value = '00:00:00',
    locale = 'en-US'
}: IProps) => {
    const hourBoxRef = useRef<HTMLDivElement>(null);
    const minuteBoxRef = useRef<HTMLDivElement>(null);
    const secondBoxRef = useRef<HTMLDivElement>(null);
    const initTime = getTimeFormat(value);

    const [time, setTime] = useState<{
        hour: string,
        minute: string,
        second: string,
    }>(initTime);

    /**
     * 當外部值移動時
     */
    useEffect(() => {
        const timeStr = getTimeFormat(value);
        setTime(timeStr);
    }, [value]);


    /**
     * 當時間狀態移動時, 移動到現在的，時、分、秒
     */
    useEffect(() => {
        if(hourBoxRef.current){
            hourBoxRef.current?.scrollTo({behavior: 'smooth', top: Number(isEmpty(time.hour) ? 0 : time.hour) * unitHeight});
        }
        if(minuteBoxRef.current){
            minuteBoxRef.current?.scrollTo({behavior: 'smooth', top: Number(isEmpty(time.minute) ? 0 : time.minute) * unitHeight});
        }
        if(secondBoxRef.current){
            secondBoxRef.current?.scrollTo({behavior: 'smooth', top: Number(isEmpty(time.second) ? 0 : time.second) * unitHeight});
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time]);


    /**
     * 選取秒的時候直接關閉
     */
    useEffect(() => {
        handleClickOk();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time.second]);



    /**
     * 處理點擊OK
     */
    const handleClickOk = useCallback(() => {
        const timeStr = `${time.hour}:${time.minute}:${time.second}`;

        if(onChange){
            onChange(timeStr);
        }
        if(onClickOk){
            onClickOk(timeStr);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time]);

    /**
     * 處理按下現在時間
     */
    const handleNowTime = useCallback(() => {
        const reToday = dayjs();

        // 設定 時、分、秒
        setTime({
            hour: reToday.format('HH'),
            minute: reToday.format('mm'),
            second: reToday.format('ss'),
        });
        // handleClickOk();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    /**
     * 產生時|分|秒 區塊
     */
    const renderOption = useCallback((unitCode: 'hour'|'minute'|'second', unitList: Array<string>) => {
        return unitList.map(unit => {
            const isActive = time[unitCode] === unit;
            return (
                <span className={cx(elClassName.fakeOption, {'is-active': isActive})}
                    key={`unit-${unitCode}-${unit}`}
                    onClick={() => setTime({
                        ...time,
                        [unitCode]: unit
                    })}
                >
                    {unit}
                </span>
            );
        });
    }, [time]);


    return (
        <div className={elClassName.root}>
            <div className={elClassName.pickContainer}>
                {/* 時 */}
                <div className={elClassName.fakeSelectContainer}>
                    <div className={elClassName.selectBox} ref={hourBoxRef}>
                        {renderOption('hour', hourList)}
                    </div>
                </div>

                {/* 分 */}
                <div className={elClassName.fakeSelectContainer}>
                    <div className={elClassName.selectBox} ref={minuteBoxRef}>
                        {renderOption('minute', minuteList)}
                    </div>
                </div>

                {/* 秒 */}
                <div className={elClassName.fakeSelectContainer}>
                    <div className={elClassName.selectBox} ref={secondBoxRef}>
                        {renderOption('second', secondList)}
                    </div>
                </div>
            </div>

            <div className={elClassName.buttonContainer}>
                <button className={elClassName.nowButton} type="button" onClick={handleNowTime}>{translateI18n('com.timepicker.setNow', {locale: locale})}</button>
                <button className={elClassName.confirmButton} type="button" onClick={handleClickOk}>{translateI18n('com.timepicker.ok', {locale: locale})}</button>
            </div>
        </div>
    );
};

export default Timepicker;

