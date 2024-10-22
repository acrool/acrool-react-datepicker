import React from 'react';
import { IDatepickerProps } from './types';
/**
 * Datepicker
 * 日期選擇器
 */
declare const DatepickerAtom: ({ className, style, value, format, onChange, onChangeYearMonthPanel, isVisibleSetToday, locale, minYear, maxYear, isDark, minDate, maxDate, tagDate }: IDatepickerProps) => JSX.Element;
declare const Datepicker: (props: IDatepickerProps) => React.FunctionComponentElement<IDatepickerProps>;
export { DatepickerAtom };
export default Datepicker;
