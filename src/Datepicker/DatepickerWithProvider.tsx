import React, {useState, useCallback, useMemo, useRef, useEffect} from 'react';
import elClassNames from '../el-class-names';
import {ICommon} from '../typing';
import DatePickerProvider from '../DatePickerProvider';
import Datepicker from './Datepicker';




interface IProps extends ICommon{
    value?: string;
    onChange: (newDate: string) => void;
    onChangeYearMonthPanel?: (yearMonth: { year: number, month: number }) => void;
    isVisibleSetToday?: boolean;
}

/**
 * Datepicker
 * 日期選擇器
 */
const DatepickerWithProvider = (props: IProps) => {
    return <DatePickerProvider>
        <Datepicker {...props} className={elClassNames.root}/>
    </DatePickerProvider>;
};


export default DatepickerWithProvider;
