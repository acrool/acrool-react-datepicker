import { isEmpty } from 'bear-jsutils/equal';
import {paddingLeft} from 'bear-jsutils/string';
import dayjs from 'dayjs';

export const defaultFormat = {
    date: 'YYYY-MM-DD',
    time: 'HH:mm:ss',
    timeNoSec: 'HH:mm',
};


export const getHour = (hour: string) => {
    if(isEmpty(hour)){
        return '00';
    }
    const hourNum = Number(hour);
    if(hourNum > 23 && hourNum < 0){
        return '00';
    }
    return paddingLeft(hour, 2);
}
export const getMinuteSecond = (MinuteSecond: string) => {
    if(isEmpty(MinuteSecond)){
        return '00';
    }
    const hourNum = Number(MinuteSecond);
    if(hourNum > 60 && hourNum < 0){
        return '00';
    }
    return paddingLeft(MinuteSecond, 2);
}


export const getTimeFormat = (time?: string) => {
    const dayObj = dayjs(`1989-01-01 ${time ?? '00:00:00'}`)
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
}

