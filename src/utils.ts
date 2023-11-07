import dayjs from 'dayjs';
import {EDateRange} from './typing';

export const defaultFormat = {
    date: 'YYYY-MM-DD',
    time: 'HH:mm:ss',
    timeNoSec: 'HH:mm',
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
