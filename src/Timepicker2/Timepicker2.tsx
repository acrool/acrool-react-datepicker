import React, {useState, useCallback, createElement} from 'react';
import CSS from 'csstype';
import elClassNames from '../el-class-names';
import {getTimeFormat, getTimeString} from '../utils';
import clsx from 'clsx';
import {ITimeObj} from '../typing';
import useOnlyUpdateEffect from '../hooks/useUpdateEffect';
import useNowTime from '../hooks/useNow';
import useLocale from '../locales';

import './styles.css';


interface IProps {
    className?: string;
    style?: CSS.Properties;
    value?: string;
    onChange?: (value: string) => void;
    onClickOk?: (value: string) => void;
    locale?: string,
    isDark?: boolean
    title?: string
    isVisibleSecond?: boolean,
    isVisibleNow?: boolean,
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
 * @param isEnableSec
 */
export const Timepicker2Atom = ({
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
}: IProps) => {
    const {i18n} = useLocale(locale);
    const now = useNowTime();

    const [time, setTime] = useState<ITimeObj>(getTimeFormat(value));
    const timeString = getTimeString(time, isVisibleSecond);


    useOnlyUpdateEffect(() => {
        handleOnUpdate(getTimeFormat(value), true);
    }, [value]);



    /**
     * 處理異動時動作
     * @param newTime
     * @param isBehaviorSmooth
     */
    const handleOnChange = (newTime: Partial<ITimeObj>, isBehaviorSmooth = true) => {
        const dateObj = {
            ...time,
            ...newTime,
        };
        setTime(dateObj);
        if(onChange){
            onChange(getTimeString(dateObj, isVisibleSecond));
        }
    };


    /**
     * 處理資料更新
     * @param data
     * @param isBehaviorSmooth
     */
    const handleOnUpdate = (data: Partial<ITimeObj>, isBehaviorSmooth = true) => {
        // handleMoveUnit(data, isBehaviorSmooth);
        setTime(curr => {
            return {
                ...curr,
                ...data,
            };
        });
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
     * 渲染表頭
     */
    const renderHeader = () => {
        return <>
            <div className={elClassNames.time2Header}>
                <span className={elClassNames.time2HeaderText}>{title ?? i18n('com.timepicker.time', {def: 'Time'})}</span>
                <span className={elClassNames.time2HeaderTimeStr}>{timeString}</span>
            </div>

        </>;
    };


    /**
     * 渲染選擇器
     */
    const renderTimePicker = useCallback(() => {
        return <div className={elClassNames.time2PickContainer}>
            {/* 時 */}
            <div className={elClassNames.time2InputGroup}>
                <div className="acrool-react-datepicker__date-week">
                    {i18n('com.timepicker.hour', {def: 'H'})}
                </div>

                <input className={elClassNames.time2SelectBox}
                    type="range" min="0" max="23"
                    value={time['hour']}
                    onChange={event => {
                        handleOnChange({hour: parseInt(event.target.value)}, true);
                    }}
                />    
            </div>

            {/* 分 */}
            <div className={elClassNames.time2InputGroup}>
                <div className="acrool-react-datepicker__date-week">
                    {i18n('com.timepicker.minute', {def: 'M'})}
                </div>

                <input className={elClassNames.time2SelectBox}
                    type="range" min="0" max="59"
                    value={time['minute']}
                    onChange={event => {
                        handleOnChange({minute: parseInt(event.target.value)}, true);
                    }}
                />
            </div>

            {/* 秒 */}
            {isVisibleSecond &&
                <div className={elClassNames.time2InputGroup}>
                    <div className="acrool-react-datepicker__date-week">
                        {i18n('com.timepicker.second', {def: 'S'})}
                    </div>

                    <input className={elClassNames.time2SelectBox}
                        type="range" min="0" max="59"
                        value={time['second']}
                        onChange={event => {
                            handleOnChange({second: parseInt(event.target.value)}, true);
                        }}
                    />
                </div>
            }
        </div>;
    }, [time, onChange]);


    const renderButton = () => {
        return <div className={elClassNames.time2ButtonContainer}>
            <button className={elClassNames.time2NowButton} type="button" onClick={handleNowTime}>{i18n('com.timepicker.setNow', {def: 'Set now'})}</button>
            <button className={elClassNames.time2ConfirmButton} type="button" onClick={handleOnClickOk}>{i18n('com.timepicker.ok', {def: 'OK'})}</button>
        </div>;
    };


    return (
        <div className={clsx(
            elClassNames.time2Root,
            className,
            {'dark-theme': isDark, 'is-enable-sec': isVisibleSecond})} style={style}
        >
            {renderHeader()}
            {renderTimePicker()}
            {isVisibleNow && renderButton()}
        </div>
    );
};


const Timepicker2 = (props: IProps) => createElement(Timepicker2Atom, {...props, className: clsx(props.className, elClassNames.root)});
export default Timepicker2;

