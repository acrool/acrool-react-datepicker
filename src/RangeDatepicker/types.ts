import {ICommon, IRangeDateValue} from '../typing';





export interface IRangeDatepickerProps extends ICommon{
    value?: IRangeDateValue
    format?: string
    onChange?: (value: IRangeDateValue) => void
    isVisibleFastPicker?: boolean
}
