import { isEmpty } from 'bear-jsutils/equal';
import {paddingLeft} from 'bear-jsutils/string';
import dayjs from 'dayjs';


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


export const getTimeFormat = (time: string) => {
    const dayObj = time.split(':');
    return {
        hour: getHour(dayObj[0]),
        minute: getMinuteSecond(dayObj[1]),
        second: getMinuteSecond(dayObj[2]),
    };
};

/**
 * 產生 時分秒陣列
 */
export function getTimeList(): {
    hourList: Array<string>,
    minuteList: Array<string>,
    secondList: Array<string>,
    } {
    const hourList = [];
    const minuteList = [];
    const secondList = [];

    for (let h = 0; h < 24; h += 1) {
        hourList.push(paddingLeft(h, 2));
    }

    for (let m = 0; m < 60; m += 1) {
        minuteList.push(paddingLeft(m, 2));
    }

    for (let s = 0; s < 60; s += 1) {
        secondList.push(paddingLeft(s, 2));
    }

    return {hourList, minuteList, secondList};
}
