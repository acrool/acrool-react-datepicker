import React, {useState, useRef, useCallback, useEffect, createElement} from 'react';
import elClassNames from '../el-class-names';
import {getTimeFormat, paddingLeft, getTimeString} from '../utils';
import clsx from 'clsx';
import {ITimeObj} from '../typing';
import useOnlyUpdateEffect from '../hooks/useUpdateEffect';
import useNowTime from '../hooks/useNow';
import useLocale from '../locales';
import styles from './timepicker.module.scss';
import {ITimepickerProps} from './types';
import {hourList, minuteList, secondList, unitHeight} from './config';






/**
 * 時間選擇器
 * @param className
 * @param style
 * @param onChange 選擇視窗當項目異動時
 * @param onClickOk 選擇視窗按下OK時
 * @param value Input Value
 * @param locale
 * @param isDark 暗黑模式
 * @param isEnableSec
 */
const TimepickerAtom = ({
    className,
    style,
    onChange,
    onClickOk,
    value,
    locale = 'en-US',
    isDark = false,
    title,
    isVisibleSecond = true,
    isVisibleNow = true,
}: ITimepickerProps) => {
    const {i18n} = useLocale(locale);
    const now = useNowTime();

    const hourBoxRef = useRef<HTMLDivElement>(null);
    const minuteBoxRef = useRef<HTMLDivElement>(null);
    const secondBoxRef = useRef<HTMLDivElement>(null);

    const [time, setTime] = useState<ITimeObj>(getTimeFormat(value));
    const timeString = getTimeString(time, isVisibleSecond);


    useOnlyUpdateEffect(() => {
        handleOnUpdate(getTimeFormat(value), true);
    }, [value]);


    useEffect(() => {
        handleMoveUnit(time, false);
    }, []);


    /**
     * 處理異動時動作
     * @param data
     * @param isBehaviorSmooth
     */
    const handleOnChange = (data: ITimeObj, isBehaviorSmooth = true) => {
        handleOnUpdate(data, isBehaviorSmooth);

        if(onChange){
            onChange(getTimeString(data, isVisibleSecond));
        }
    };


    /**
     * 處理資料更新
     * @param data
     * @param isBehaviorSmooth
     */
    const handleOnUpdate = (data: ITimeObj, isBehaviorSmooth = true) => {
        handleMoveUnit(data, isBehaviorSmooth);
        setTime(data);
    };

    /**
     * 處理點擊OK按鈕
     */
    const handleOnClickOk = () => {
        if(onClickOk) onClickOk(timeString);
    };


    /**
     * 處理按下現在時間
     */
    const handleNowTime = useCallback(() => {

        const data = {
            hour: now.hour(),
            minute: now.minute(),
            second: now ? now.second() : undefined,
        };

        // 設定 時、分、秒
        handleOnChange(data, true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * 處理移動時間
     */
    const handleMoveUnit = (data: {hour: number, minute: number, second?: number}, isBehaviorSmooth = true) => {
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
    };


    /**
     * 產生時|分|秒 區塊
     */
    const renderOption = useCallback((unitCode: 'hour'|'minute'|'second', unitList: Array<number>) => {
        return unitList.map(unit => {
            const isActive = time[unitCode] === unit;
            return (
                <span className={styles.timeFakeOption}
                    key={`unit-${unitCode}-${unit}`}
                    data-active={isActive ? '': undefined}
                    onClick={() => {
                        handleOnChange({...time, [unitCode]: unit}, true);
                    }}
                >
                    {paddingLeft(unit, 2)}
                </span>
            );
        });
    }, [timeString, onChange]);


    /**
     * 渲染表頭
     */
    const renderHeader = () => {
        return <>
            <div className={styles.timeHeader}>
                <span className={styles.timeHeaderText}>{title ?? i18n('com.timepicker.time', {def: 'Time'})}</span>
            </div>
            <div className="acrool-react-datepicker__date-week-row">
                <div className="acrool-react-datepicker__date-week">
                    {i18n('com.timepicker.hour', {def: 'H'})}
                </div>
                <div className="acrool-react-datepicker__date-week">
                    {i18n('com.timepicker.minute', {def: 'M'})}
                </div>
                {isVisibleSecond && (
                    <div className="acrool-react-datepicker__date-week">
                        {i18n('com.timepicker.second', {def: 'S'})}
                    </div>
                )}
            </div>
        </>;
    };


    /**
     * 渲染選擇器
     */
    const renderTimePicker = () => {
        return <div className={styles.timePickContainer}>
            {/* 時 */}
            <div className={styles.timeSelectBox} ref={hourBoxRef}>
                {renderOption('hour', hourList)}
            </div>

            {/* 分 */}
            <div className={styles.timeSelectBox} ref={minuteBoxRef}>
                {renderOption('minute', minuteList)}
            </div>

            {/* 秒 */}
            {isVisibleSecond &&
                <div className={styles.timeSelectBox} ref={secondBoxRef}>
                    {renderOption('second', secondList)}
                </div>
            }
        </div>;
    };


    const renderButton = () => {
        return <div className={styles.timeButtonContainer}>
            <button className={styles.timeNowButton} type="button" onClick={handleNowTime}>{i18n('com.timepicker.setNow', {def: 'Set now'})}</button>
            <button className={styles.timeConfirmButton} type="button" onClick={handleOnClickOk}>{i18n('com.timepicker.ok', {def: 'OK'})}</button>
        </div>;
    };


    return (
        <div
            className={clsx(
                styles.root,
                className,
                {'dark-theme': isDark})
            }
            style={style}
            data-enable-sec={isVisibleSecond ? '': undefined}
        >

            {renderHeader()}
            {renderTimePicker()}
            {isVisibleNow && renderButton()}
        </div>
    );
};



const Timepicker = (props: ITimepickerProps) => {
    return <TimepickerAtom
        {...props}
        className={clsx(props.className, elClassNames.root)}
    />;
};

export {TimepickerAtom};
export default Timepicker;

