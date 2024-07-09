import dayjs from 'dayjs';
import {EDateRange, ITimeObj, EDateTimeRange} from './typing';

export const defaultFormat = {
    date: 'YYYY-MM-DD',
    time: 'HH:mm:ss',
    timeNoSec: 'HH:mm',
    dateTime: 'YYYY-MM-DD HH:mm:ss'
};





/**
 * 時間物件轉自串
 * @param timeObj
 * @param isEnableSec
 */
export const getTimeString = (timeObj: Partial<ITimeObj>, isEnableSec?: boolean): string => {
    if(isEnableSec){
        return `${paddingLeft(timeObj?.hour ?? '00', 2)}:${paddingLeft(timeObj?.minute ?? '00', 2)}:${paddingLeft(timeObj?.second ?? '00', 2)}`;
    }
    return `${paddingLeft(timeObj?.hour ?? '00', 2)}:${paddingLeft(timeObj?.minute ?? '00', 2)}`;
};


/**
 * 判定是否為空
 * @param value
 * @returns {boolean}
 */
export function isEmpty(value: any): boolean {
    return (
        value === undefined
        || value === null
        || (typeof value === 'string' && value.trim().length === 0)
        || (!(value instanceof Date) && typeof value === 'object' && Object.keys(value).length === 0)
    );
}


/**
 * 依需求位數補0
 * ex: 69 -> 0069
 *
 * @param val 需要轉換得字串|數字
 * @param length 補滿長度
 */
export function paddingLeft(val: string|number, length: number): string {
    const replaceStr = String(val);
    if (replaceStr.length < length) {
        return paddingLeft(`0${replaceStr}`, length);
    }
    return replaceStr;
}

export const getHour = (hour: string) => {
    if(isEmpty(hour)){
        return '00';
    }
    const hourNum = Number(hour);
    if(hourNum > 23 && hourNum < 0){
        return '00';
    }
    return paddingLeft(hour, 2);
};
export const getMinuteSecond = (MinuteSecond: string) => {
    if(isEmpty(MinuteSecond)){
        return '00';
    }
    const hourNum = Number(MinuteSecond);
    if(hourNum > 60 && hourNum < 0){
        return '00';
    }
    return paddingLeft(MinuteSecond, 2);
};


export const getTimeFormat = (time?: string) => {
    const dayObj = dayjs(`1989-01-01 ${time ?? '00:00:00'}`);
    return {
        hour: dayObj.hour(),
        minute: dayObj.minute(),
        second: dayObj.second(),
    };
};

/**
 * 產生 時分秒陣列
 */
export function getTimeList(): {
    hourList: Array<number>,
    minuteList: Array<number>,
    secondList: Array<number>,
    } {
    let hourList = new Array(24).fill(0);
    let minuteList = new Array(60).fill(0);
    let secondList = new Array(60).fill(0);

    hourList = hourList.map((num, index) => num + index);
    minuteList = minuteList.map((num, index) => num + index);
    secondList = secondList.map((num, index) => num + index);

    return {hourList, minuteList, secondList};
}


export const getDatetime = (newValue?: string) => {
    return dayjs(isEmpty(newValue) ? undefined: newValue);
};


/**
 * 取得日期區間
 * @param rangeType
 * @param format
 */
export const selectDateRange = (rangeType: EDateRange, format: string) => {
    
    const today = dayjs();
    switch (rangeType){
    case EDateRange.today:
        return {
            startDate: today.format(format),
            endDate: today.format(format),
        };
    case EDateRange.tomorrow:
        return {
            startDate: today.add(1, 'day').format(format),
            endDate: today.add(1, 'day').format(format),
        };
    case EDateRange.twoDay:
        return {
            startDate: today.format(format),
            endDate: today.add(1, 'day').format(format),
        };
    case EDateRange.thisWeek:
        return {
            startDate: today.format(format),
            endDate: today.add(1, 'week').format(format),
        };
    case EDateRange.nextWeek:
        return {
            startDate: today.add(1, 'week').format(format),
            endDate: today.add(2, 'week').format(format),
        };
    }
    return undefined;

};


export const selectDateTimeRange = (rangeType: EDateTimeRange, format: string, isVisibleSecond: boolean) => {
    const now = dayjs();
    const nowTimeObj = {
        hour: now.get('hour'),
        minute: now.get('minute'),
        second: now.get('second'),
    };

    switch (rangeType){
    case EDateTimeRange.now:
        return {
            date: now.format(format),
            startTime: getTimeString(nowTimeObj, isVisibleSecond),
            endTime: getTimeString(nowTimeObj, isVisibleSecond),
        };
    case EDateTimeRange.oneHour:
        const oneHour = now.add(1, 'hour');
        const oneHourObj = {
            hour: oneHour.get('hour'),
            minute: oneHour.get('minute'),
            second: oneHour.get('second'),
        };

        return {
            date: now.format(format),
            startTime: getTimeString(nowTimeObj, isVisibleSecond),
            endTime: getTimeString(oneHourObj, isVisibleSecond),
        };
    case EDateTimeRange.twoHour:
        const twoHour = now.add(2, 'hour');
        const twoHourObj = {
            hour: twoHour.get('hour'),
            minute: twoHour.get('minute'),
            second: twoHour.get('second'),
        };

        return {
            date: now.format(format),
            startTime: getTimeString(nowTimeObj, isVisibleSecond),
            endTime: getTimeString(twoHourObj, isVisibleSecond),
        };
    case EDateTimeRange.fourHour:
        const fourHourHour = now.add(4, 'hour');
        const fourHourHourObj = {
            hour: fourHourHour.get('hour'),
            minute: fourHourHour.get('minute'),
            second: fourHourHour.get('second'),
        };

        return {
            date: now.format(format),
            startTime: getTimeString(nowTimeObj, isVisibleSecond),
            endTime: getTimeString(fourHourHourObj, isVisibleSecond),
        };
    }
    return undefined;

};
