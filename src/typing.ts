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



export interface ICommon {
    className?: string;
    style?: CSS.Properties;
    locale?: string;
    minYear?: number;
    maxYear?: number;
    isDark?: boolean;
    format?: string;
    minDate?: string,
    maxDate?: string,
    tagDate?: string[],
}

export interface ITimeObj {
    hour: number,
    minute: number,
    second?: number,
}
