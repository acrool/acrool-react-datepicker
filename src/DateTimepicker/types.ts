import CSS from 'csstype';

import {ICommon} from '../typing';

export interface IDateTimepickerProps extends ICommon{
    className?: string
    style?: CSS.Properties
    value?: string
    dateFormat?: string
    onChange: (newDate: string) => void
    onClickOk: (newDate: string) => void
    isVisibleSecond?: boolean
}


export enum EDateType {
    date,
    time,
    dateTime,
}
