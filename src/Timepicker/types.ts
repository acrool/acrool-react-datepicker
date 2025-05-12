import CSS from 'csstype';
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
    onClick: () => void
}



export interface ITimepickerProps extends ICommon{
    className?: string
    style?: CSS.Properties
    value?: string
    onChange?: (value: string) => void
    onClickOk?: (value: string) => void
    locale?: string
    isDark?: boolean
    title?: string
    isVisibleSecond?: boolean
    isVisibleNow?: boolean
}
