import {ICommon, IRangeDateValue} from '../typing';
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



export interface IDatepickerProps extends ICommon{
    value?: string;
    onChange: (newDate: string) => void;
    format?: string
    onChangeYearMonthPanel?: (yearMonth: { year: number, month: number }) => void;
    isVisibleSetToday?: boolean;
}





export interface IScrollRangeDatepickerProps extends ICommon{
    value?: IRangeDateValue
    format?: string
    onChange?: (value: IRangeDateValue) => void
    isVisibleFastPicker?: boolean
}
