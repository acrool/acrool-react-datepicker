import React, {useState, useRef, useEffect, useCallback, RefObject} from 'react';
import dayjs from 'dayjs';
import elClassNames from './el-class-names';
import {isEmpty} from 'bear-jsutils/equal';
import cx from 'classnames';
import {getTimeList, getTimeFormat} from '../utils';
import translateI18n from '../locales';

import './styles.css';


interface IProps {
    value?: string;
    onChange?: (value: string) => void;
    onClickOk?: () => void;
    locale?: string,
}

const {hourList, minuteList, secondList} = getTimeList();

const unitHeight = 32;
const halfHeight = (32 * 6) / 2;

interface ITimeObj  {
    hour: string,
    minute: string,
    second: string,
}


/**
 * 時間物件轉自串
 * @param timeObj
 */
const getTimeString = (timeObj: ITimeObj): string => {
    return `${timeObj.hour}:${timeObj.minute}:${timeObj.second}`;
}

/**
 * 時間選擇器
 * @param onChange 選擇視窗當項目異動時
 * @param onClickOk 選擇視窗按下OK時
 * @param value Input Value
 * @param locale
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

    const [time, setTime] = useState<ITimeObj>(initTime);
    const timeString = getTimeString(time);


    /**
     * 當外部值移動時
     */
    useEffect(() => {
        const timeStr = getTimeFormat(value);
        setTime(timeStr);
    }, [value]);


    /**
     * 當時間狀態移動時, 移動到現在的，時
     */
    useEffect(() => {
        if(hourBoxRef.current){
            hourBoxRef.current?.scrollTo({behavior: 'smooth', top: isEmpty(time.hour) ? 0 : (Number(time.hour) * unitHeight) - (halfHeight)});
        }
    }, [time.hour]);

    /**
     * 當時間狀態移動時, 移動到現在的，分
     */
    useEffect(() => {
        if(minuteBoxRef.current){
            minuteBoxRef.current?.scrollTo({behavior: 'smooth', top: isEmpty(time.minute) ? 0 : (Number(time.minute) * unitHeight) - (halfHeight)});
        }

    }, [time.minute]);

    /**
     * 當時間狀態移動時, 移動到現在的，秒
     */
    useEffect(() => {
        if(secondBoxRef.current){
            secondBoxRef.current?.scrollTo({behavior: 'smooth', top: isEmpty(time.second) ? 0 : (Number(time.second) * unitHeight) - (halfHeight)});
        }

    }, [time.second]);


    /**
     * 處理點擊OK
     */
    const handleClickOk = useCallback(() => {
        if(onChange){
            onChange(getTimeString(time));
        }
        if(onClickOk){
            onClickOk();
        }

    }, [timeString, onChange, onClickOk]);

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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * 產生時|分|秒 區塊
     */
    const renderOption = useCallback((unitCode: 'hour'|'minute'|'second', unitList: Array<string>) => {
        return unitList.map(unit => {
            const isActive = time[unitCode] === unit;
            return (
                <span className={cx(elClassNames.fakeOption, {'is-active': isActive})}
                    key={`unit-${unitCode}-${unit}`}
                    onClick={() => {
                        const newTime = {...time, [unitCode]: unit};
                        setTime(newTime);
                        if(unitCode === 'second' && onChange){
                            onChange(getTimeString(newTime));
                        }
                    }}
                >
                    {unit}
                </span>
            );
        });
    }, [timeString, onChange]);


    return (
        <div className={elClassNames.root}>
            <div className={elClassNames.header}>
                <span className={elClassNames.headerText}>時間</span>
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
                <button className={elClassNames.confirmButton} type="button" onClick={handleClickOk}>{translateI18n('com.timepicker.ok', {locale: locale})}</button>
            </div>
        </div>
    );
};

export default Timepicker;

