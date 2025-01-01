import dayjs, {Dayjs} from 'dayjs';
import {EDateRange, ITimeObj, EDateTimeRange, ICurrentDayList, IRangeDateValue} from './typing';
import {useCallback} from "react";

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


/**
 * 取得年月範圍
 * @param start
 * @param end
 */
export const getYearMonthRange = (start: number, end: number) => {
    const todayMonth = dayjs().subtract(start, 'month').set('date', 1);
    const monthLimit = Array.from({length: start + end});
    return monthLimit.map((_, idx) => {
        return todayMonth.add(idx, 'month');
    });

};


/**
 * 渲染這個月得資料
 */
export const getCurrentMonthDays = (yearMonth: Dayjs) => {

    // 取 Panel年月 的最後一天
    const currentMonthLastDay = yearMonth.endOf('month').get('date');

    // 產生 Panel年月 當月日期表
    const currentDayList: ICurrentDayList[] = Array.from({length: currentMonthLastDay});
    for (let d = 0; d < currentMonthLastDay; d++) {
        const dayNumber = d + 1;
        const eachDate = yearMonth.set('date', dayNumber);
        // const isDisable: boolean =
        //     !!((minDate && eachDate.isBefore(minDate, 'date')) ||
        //         (maxDate && eachDate.isAfter(maxDate, 'date')));

        currentDayList[d] = {
            // isStartActive: values?.startDate ? eachDate.isSame(values?.startDate, 'date'): false,
            // isEndActive: values?.endDate ? eachDate.isSame(values?.endDate, 'date') : false,
            // isInRange: (!isEmpty(values?.startDate) && !isEmpty(values?.endDate)) && eachDate.isAfter(values?.startDate) && (eachDate.isBefore(values?.endDate) || eachDate.isSame(values?.endDate, 'date')),
            // isToday: today.isSame(eachDate, 'date'),
            // isTag: tagDates?.includes(eachDate.format('YYYY-MM-DD')),
            // isDisable,
            // className: styles.dateDay,
            type: 'thisMonth',
            date: eachDate,
            dayNumber: dayNumber,
            // onClick: () => !isDisable ? handleSelectedDate(panelYearMonth.year(), panelYearMonth.month(), dayNumber) : {}
        };
    }
    return currentDayList;
};



/**
 * 產生下個月的剩餘日期表
 * @returns {Array}
 */
export const getNextMonthDays = (yearMonth: Dayjs) => {
    // const currentDate = dayjs(value);

    // 取得指定年月的第一天是星期幾 (0, 1-6)
    const currentMonFirstWeek = yearMonth.set('date', 1).day();

    // 取 Panel年月 上個月份的已放空間 (星期六 ex: 6-1=5格, 星期日則為7天)
    const preMonthFirstContainer = currentMonFirstWeek === 0 ? 6 : currentMonFirstWeek - 1;

    // 取 Panel年月 這個月的最後一天是幾號
    const panelMonthLastDay = yearMonth.endOf('month').get('date');

    const nextMonth = yearMonth.add(1, 'month');

    // 取得指定年月下個月剩餘月份可放空間
    const nextMonthEndContainer = (7 * 6) % (preMonthFirstContainer + panelMonthLastDay);

    // 產生上個月的剩餘日期表
    const nextMonEndDayList: ICurrentDayList[] = Array.from({length: nextMonthEndContainer});
    for (let d = 0; d < nextMonthEndContainer; d++) {
        const dayNumber = d + 1;
        const eachDate = nextMonth.set('date', dayNumber);
        // const isDisable =
        //     !!((minDate && eachDate.isBefore(minDate, 'date')) ||
        //         (maxDate && eachDate.isAfter(maxDate, 'date')));

        nextMonEndDayList[d] = {
            // isActive: currentDate.isSame(nextMonth.set('date', dayNumber), 'date'),
            // isToday: today.isSame(eachDate, 'date'),
            // isTag: tagDates?.includes(eachDate.format('YYYY-MM-DD')),
            // isDisable,
            // className: elClassNames.datePreDay,
            type: 'nextMonth',
            date: eachDate,
            dayNumber: dayNumber,
            // onClick: () => !isDisable ? handleSelectedDate(nextMonth.year(), nextMonth.month(), dayNumber): {}
        };
    }

    return nextMonEndDayList;
};



/**
 * 產生上個月的剩餘日期表
 * @returns {Array}
 */
export const getPreMonthDays = (yearMonth: Dayjs) => {
    // const currentDate = dayjs(value);

    // 取得指定年月的第一天是星期幾 (0, 1-6)
    const currentMonFirstWeek = yearMonth.set('date', 1).day();

    // 取 Panel年月 剩餘月份的可放空間 (星期六 ex: 6-1=5格, 星期日則為7天)
    const preMonthFirstContainer = currentMonFirstWeek === 0 ? 6 : currentMonFirstWeek - 1;

    // 取 Panel年月 上個月的最後一天是幾號
    const preMonth = yearMonth.subtract(1, 'month');
    const preMonthLastDay = Number(preMonth.endOf('month').get('date'));

    // 取 Panel年月 結束日從幾號開始
    const preMonthFirstDay = preMonthLastDay - preMonthFirstContainer;

    // 產生 Panel年月 上個月的剩餘日期表
    const preMonFirstDayList: ICurrentDayList[] = Array.from({length: preMonthFirstContainer});
    for (let d = 0; d < preMonthFirstContainer; d++) {
        const dayNumber = preMonthFirstDay + d + 1;
        const eachDate = preMonth.set('date', dayNumber);
        // const isDisable =
        //     !!((minDate && eachDate.isBefore(minDate, 'date')) ||
        //         (maxDate && eachDate.isAfter(maxDate, 'date')));

        preMonFirstDayList[d] = {
            // isActive: currentDate.isSame(preMonth.set('date', dayNumber), 'date'),
            // isToday: today.isSame(eachDate, 'date'),
            // isTag: tagDates?.includes(eachDate.format('YYYY-MM-DD')),
            // isDisable,
            // className: styles.datePreDay,
            type: 'lastMonth',
            date: eachDate,
            dayNumber: dayNumber,
            // onClick: () => !isDisable ? handleSelectedDate(preMonth.year(), preMonth.month(), dayNumber) : {}
        };
    }

    return preMonFirstDayList;

    // eslint-disable-next-line react-hooks/exhaustive-deps
};


export const getSameDay = (eachDate: Dayjs, currentDate?: string) => {
    if(!currentDate){
        return false;
    }
    return eachDate.isSame(currentDate, 'date');
};



export const getCheckDateStartEnd= (eachDate: Dayjs, values?: IRangeDateValue) => {
    const isStartActive = values?.startDate ? eachDate.isSame(values?.startDate, 'date'): false;
    if(isStartActive){
        return 'start';
    }
    const isEndActive = values?.endDate ? eachDate.isSame(values?.endDate, 'date') : false;
    if(isEndActive){
        return 'end';
    }
    return undefined;
};

export const getCheckDateRangeKind = (eachDate: Dayjs, values?: IRangeDateValue) => {

    return (!isEmpty(values?.startDate) && !isEmpty(values?.endDate)) &&
    eachDate.isAfter(values?.startDate) &&
        (eachDate.isBefore(values?.endDate) || eachDate.isSame(values?.endDate, 'date')) ? 'range': undefined;

};
