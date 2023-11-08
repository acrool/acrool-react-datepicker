import React, {useState, useRef, useCallback, startTransition, useEffect, createElement} from 'react';
import CSS from 'csstype';
import elClassNames from '../el-class-names';
import {getTimeList, getTimeFormat, paddingLeft, getTimeString} from '../utils';
import translateI18n from '../locales';
import clsx from 'clsx';
import {ITimeObj} from '../typing';
import useOnlyUpdateEffect from '../hooks/useUpdateEffect';
import useNowTime from '../hooks/useNow';



interface IProps {
    className?: string;
    style?: CSS.Properties;
    value?: string;
    onChange?: (value: string) => void;
    onClickOk?: (value: string) => void;
    locale?: string,
    isDark?: boolean
    isVisibleSecond?: boolean,
    isVisibleNow?: boolean,
}

const {hourList, minuteList, secondList} = getTimeList();

const unitHeight = 30;



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
export const TimepickerAtom = ({
    className,
    style,
    onChange,
    onClickOk,
    value,
    locale = 'en-US',
    isDark = false,
    isVisibleSecond = true,
    isVisibleNow = true,
}: IProps) => {
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
                <span className={clsx(elClassNames.timeFakeOption, {'is-active': isActive})}
                    key={`unit-${unitCode}-${unit}`}
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
            <div className={elClassNames.timeHeader}>
                <span className={elClassNames.timeHeaderText}>{translateI18n('com.timepicker.time', {locale: locale})}</span>
            </div>
            <div className="bear-react-datepicker__date-week-row">
                <div className="bear-react-datepicker__date-week">H</div>
                <div className="bear-react-datepicker__date-week">M</div>
                {isVisibleSecond && (
                    <div className="bear-react-datepicker__date-week">S</div>
                )}
            </div>
        </>;
    };


    /**
     * 渲染選擇器
     */
    const renderTimePicker = () => {
        return <div className={elClassNames.timePickContainer}>
            {/* 時 */}
            <div className={elClassNames.timeSelectBox} ref={hourBoxRef}>
                {renderOption('hour', hourList)}
            </div>

            {/* 分 */}
            <div className={elClassNames.timeSelectBox} ref={minuteBoxRef}>
                {renderOption('minute', minuteList)}
            </div>

            {/* 秒 */}
            {isVisibleSecond &&
                <div className={elClassNames.timeSelectBox} ref={secondBoxRef}>
                    {renderOption('second', secondList)}
                </div>
            }
        </div>;
    };


    const renderButton = () => {
        return <div className={elClassNames.timeButtonContainer}>
            <button className={elClassNames.timeNowButton} type="button" onClick={handleNowTime}>{translateI18n('com.timepicker.setNow', {locale: locale})}</button>
            <button className={elClassNames.timeConfirmButton} type="button" onClick={handleOnClickOk}>{translateI18n('com.timepicker.ok', {locale: locale})}</button>
        </div>;
    };


    return (
        <div className={clsx(
            elClassNames.timeRoot,
            className,
            {'dark-theme': isDark, 'is-enable-sec': isVisibleSecond})} style={style}
        >

            {renderHeader()}
            {renderTimePicker()}
            {isVisibleNow && renderButton()}
        </div>
    );
};


const Timepicker = (props: IProps) => createElement(TimepickerAtom, {...props, className: clsx(props.className, elClassNames.root)});
export default Timepicker;

