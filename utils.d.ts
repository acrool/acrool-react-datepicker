import dayjs from 'dayjs';
import { EDateRange, ITimeObj, EDateTimeRange } from './typing';
export declare const defaultFormat: {
    date: string;
    time: string;
    timeNoSec: string;
    dateTime: string;
};
/**
 * 時間物件轉自串
 * @param timeObj
 * @param isEnableSec
 */
export declare const getTimeString: (timeObj: Partial<ITimeObj>, isEnableSec?: boolean) => string;
/**
 * 判定是否為空
 * @param value
 * @returns {boolean}
 */
export declare function isEmpty(value: any): boolean;
/**
 * 依需求位數補0
 * ex: 69 -> 0069
 *
 * @param val 需要轉換得字串|數字
 * @param length 補滿長度
 */
export declare function paddingLeft(val: string | number, length: number): string;
export declare const getHour: (hour: string) => string;
export declare const getMinuteSecond: (MinuteSecond: string) => string;
export declare const getTimeFormat: (time?: string) => {
    hour: number;
    minute: number;
    second: number;
};
/**
 * 產生 時分秒陣列
 */
export declare function getTimeList(): {
    hourList: Array<number>;
    minuteList: Array<number>;
    secondList: Array<number>;
};
export declare const getDatetime: (newValue?: string) => dayjs.Dayjs;
/**
 * 取得日期區間
 * @param rangeType
 * @param format
 */
export declare const selectDateRange: (rangeType: EDateRange, format: string) => {
    startDate: string;
    endDate: string;
} | undefined;
export declare const selectDateTimeRange: (rangeType: EDateTimeRange, format: string, isVisibleSecond: boolean) => {
    date: string;
    startTime: string;
    endTime: string;
} | undefined;
