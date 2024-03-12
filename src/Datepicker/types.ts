import {Dayjs} from "dayjs";

export interface ICurrentDayList {
    isActive: boolean
    isToday: boolean,
    isTag: boolean,
    isDisable: boolean,
    className: string,
    date: Dayjs,
    dayNumber: number,
    onClick: () => void
}
