import {Dayjs} from 'dayjs';

import {ICommon} from '../typing';

export interface ICurrentDayList {
    isActive: boolean
    isToday: boolean
    isTag: boolean
    isDisable: boolean
    className: string
    date: Dayjs
    dayNumber: number
    dayInWeek: number
    onClick: () => void
}



export interface IWeekDatepickerProps extends ICommon{
    value?: string
    onChange: (newDate: string) => void
    format?: string
    onChangeYearMonthPanel?: (newStartDate: string, newEndDate: string) => void
    // isVisibleSetToday?: boolean;
    startWeekDate: string
}
