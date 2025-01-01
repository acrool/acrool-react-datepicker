import React, {useCallback, useRef, useState} from 'react';
import elClassNames from '../el-class-names';

import {DatepickerAtom} from './Datepicker';
import {EDateRange} from '../typing';
import {getYearMonthRange, isEmpty, selectDateRange} from '../utils';
import clsx from 'clsx';
import useLocale from '../locales';
import {IScrollRangeDatepickerProps} from './types';
import {getToday} from './utils';
import styles from './styles.module.scss';
import dayjs from 'dayjs';
import {useLocaleWeekDay} from '../hooks';
import {useInfiniteScroll} from './useInfiniteScroll';



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
const ScrollRangeDatepicker = ({
    className,
    style,
    value = {startDate: getToday(), endDate: getToday()},
    onChange,
    format = 'YYYY-MM-DD',
    maxYear,
    minYear,
    locale,
    isVisibleFastPicker = false,
    minDate,
    maxDate,
    isDark,
}: IScrollRangeDatepickerProps) => {
    const {i18n} = useLocale(locale);
    const today = getToday();


    const [beforeData, setBeforeData] = useState<number>(3);
    const [afterData, setAfterData] = useState<number>(3);

    const loadMoreTop = async () => {
        setBeforeData(curr => curr + 3);
        setAfterData(curr => curr - 3);
    };

    const loadMoreBottom = async () => {
        setBeforeData(curr => curr - 3);
        setAfterData(curr => curr + 3);
    };

    const {containerRef, topRef, bottomRef, isLoadingTop, isLoadingBottom} = useInfiniteScroll({
        loadMoreTop,
        loadMoreBottom,
    });
    
    
    
    
    const localeWeekDay = useLocaleWeekDay(locale);

    const commonProps = {isDark, format, minYear, maxYear, locale};

    

    const setRangeDate = (rangeType: EDateRange) => {
        const newVal = selectDateRange(rangeType, format);
        if(newVal && onChange){
            onChange(newVal);
        }
    };


    /**
     * 當資料異動
     * @param newValue
     */
    const handleOnChange = (newValue: string) => {
        if(onChange){
            if(dayjs(value?.startDate).isSame(newValue)){
                onChange({
                    startDate: undefined,
                    endDate: undefined,
                });
                return;
            }
            if(value?.endDate || dayjs(value?.startDate).isAfter(newValue)){
                onChange({
                    startDate: newValue,
                    endDate: undefined,
                });
                return;
            }

            onChange({
                ...value,
                endDate: newValue,
            });

        }
    };

    /**
     * 產生週標題
     */
    const renderWeek = useCallback(() => (
        <div className={styles.dateWeekRow}>
            {localeWeekDay.map((week, index) => <div className={styles.dateWeek} key={`localeWeekDay-${index}-${week}`}>{week}</div>)}
        </div>

    ), []);


    /**
     * 產生日曆表
     */
    const renderDateRange = () => {

        const months = getYearMonthRange(beforeData, afterData);

        return months.map(row => {
            return <DatepickerAtom
                key={row.format('YYYY-MM')}
                {...commonProps}
                values={value}
                onChange={handleOnChange}
                // minDate={isEmpty(value?.endDate) ? value?.startDate: undefined}
                yearMonthPanel={row}
                // minDate={minDate}
                // maxDate={value?.endDate ? value?.endDate : maxDate}
            />;
        });

    };



    return (
        <div
            ref={containerRef}
            data-fast={isVisibleFastPicker ? '': undefined}
            className={clsx(
                styles.root,
                className,
                {'dark-theme': isDark}
            )}
            style={style}
        >
            {renderWeek()}

            {(isLoadingTop) && <p>top loading...</p>}

            {!isLoadingTop &&
                <div ref={topRef} style={{height: '1px', width: '100%', flex: '0 0 auto', marginBottom: '50px', background: 'red'}} />
            }

            {renderDateRange()}

            <div ref={bottomRef} style={{height: '1px', background: 'transparent'}} />

            {(isLoadingBottom) && <p>bottom loading...</p>}

            {/*<DatepickerAtom*/}
            {/*    {...commonProps}*/}
            {/*    value={value}*/}
            {/*    onChange={handleOnChange}*/}
            {/*    // minDate={minDate}*/}
            {/*    // maxDate={value?.endDate ? value?.endDate : maxDate}*/}
            {/*/>*/}

            {/*<DatepickerAtom*/}
            {/*    {...commonProps}*/}
            {/*    value={value.endDate}*/}
            {/*    onChange={(newValue) => {*/}
            {/*        if(onChange){*/}
            {/*            onChange({*/}
            {/*                startDate: value?.startDate ? value.startDate : today,*/}
            {/*                endDate: newValue*/}
            {/*            });*/}
            {/*        }*/}
            {/*    }}*/}
            {/*    minDate={value?.startDate ? value?.startDate: minDate}*/}
            {/*    maxDate={maxDate}*/}
            {/*/>*/}


        </div>
    );
};

export default ScrollRangeDatepicker;

