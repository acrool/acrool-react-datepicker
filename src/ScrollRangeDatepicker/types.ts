import {ICommon, IRangeDateValue} from '../typing';
import {Dayjs} from 'dayjs';





export interface ICurrentDayList {
    isStartActive: boolean
    isEndActive: boolean
    isInRange: boolean
    isToday: boolean,
    isTag: boolean,
    isDisable: boolean,
    className: string,
    date: Dayjs,
    dayNumber: number,
    // onClick: () => void
    type: 'preDay'|'currentDay'|'nextDay',
}



export interface IDatepickerProps extends ICommon{
    values?: IRangeDateValue;
    onChange: (newDate: string) => void;
    format?: string
    onChangeYearMonthPanel?: (yearMonth: { year: number, month: number }) => void;
    isVisibleSetToday?: boolean;
    yearMonthPanel: Dayjs,
}





export interface IScrollRangeDatepickerProps extends ICommon{
    value?: IRangeDateValue
    format?: string
    // onChange?: (updater: (current: IRangeDateValue | undefined) => any) => void,
    onChange?: (newValue: IRangeDateValue | undefined) => void,
    isVisibleFastPicker?: boolean
    monthContainerHeight: number
}
