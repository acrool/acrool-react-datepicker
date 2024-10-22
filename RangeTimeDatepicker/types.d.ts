import { ICommon, IRangeDateTimeValue } from '../typing';
export interface IRangeTimeDatepickerProps extends ICommon {
    value?: IRangeDateTimeValue;
    onChange?: (value: IRangeDateTimeValue) => void;
    dateFormat?: string;
    isVisibleFastPicker?: boolean;
    isVisibleSecond?: boolean;
    onClickOk?: (value: string) => void;
}
