import CSS from 'csstype';

export type IRangeDateValue = {startDate?: string, endDate?: string}
export type IRangeDateTimeValue = {date?: string, startTime?: string, endTime?: string}

export enum EDateRange {
    today = 'today',
    tomorrow = 'tomorrow',
    twoDay = 'twoDay',
    thisWeek = 'thisWeek',
    nextWeek = 'nextWeek',
}

export enum EDateTimeRange {
    now = 'now',
    oneHour = 'oneHour',
    twoHour = 'twoHour',
    fourHour = 'fourHour',
}



export interface ICommon {
    className?: string;
    style?: CSS.Properties;
    locale?: string;
    minYear?: number;
    maxYear?: number;
    isDark?: boolean;
    minDate?: string,
    maxDate?: string,
    tagDates?: string[],
}

export interface ITimeObj {
    hour: number,
    minute: number,
    second?: number,
}
