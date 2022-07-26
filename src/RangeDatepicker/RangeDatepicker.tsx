import React from 'react';
import dayjs from 'dayjs';
import cx from 'classnames';
import elClassNames from './el-class-names';
import './styles.css';

// Component
import Datepicker from '../Datepicker/Datepicker';
import {ICommon} from '../Datepicker/typing';
import {IRangeDateValue} from './typing';


interface IProps extends ICommon{
    value?: IRangeDateValue;
    onChange?: (value: IRangeDateValue) => void;
}
const today = dayjs().format('YYYY-MM-DD');

/**
 * 日期輸入控件
 *
 * 手機版使用原生輸入框, 電腦版使用自製的Picker選擇
 * supper control & unControl
 *
 * @param className
 * @param style
 * @param label
 * @param value
 * @param value
 * @param onChange
 * @constructor
 */
const RangeDatepicker = ({
     className,
     style,
     value = {startDate: today, endDate: today},
     onChange,
     format,
     maxYear,
     minYear,
     locale,
     isVisibleSetToday,
     minDate,
     maxDate,
     isDark,
 }: IProps) => {
    const commonProps = {isDark, format, minYear, maxYear, locale, isVisibleSetToday}

    return (
        <div className={cx(elClassNames.root, className)} style={style}>
            <div className="d-flex flex-column align-items-center">
                <Datepicker
                    {...commonProps}
                    value={value.startDate}
                    onChange={(newValue) => {
                        if(onChange){
                            onChange({
                                startDate: newValue,
                                endDate: value?.endDate ? value.endDate : today
                            });
                        }
                    }}
                    minDate={minDate}
                    maxDate={value?.endDate ? value?.endDate : maxDate}
                />
            </div>

            <div className="d-flex flex-column align-items-center">
                <Datepicker
                    {...commonProps}
                    value={value.endDate}
                    onChange={(newValue) => {
                        if(onChange){
                            onChange({
                                startDate: value?.startDate ? value.startDate : today,
                                endDate: newValue
                            });
                        }
                    }}
                    minDate={value?.startDate ? value?.startDate: minDate}
                    maxDate={maxDate}
                />
            </div>
        </div>

    );
};

export default RangeDatepicker;



//
// const DateRangeFieldRoot = styled.div`
//     display: flex;
//     flex-direction: row;
//     background-color: #272c31;
//     align-items: flex-end;
//     justify-content: center;
//   border-radius: 4px;
//   box-shadow: 3px 8px 9px 1px #00000040;
//
//   .bear-react-datepicker__root.dart-theme{
//     box-sizing: unset;
//   }
//
//   //padding: 10px;
// `;
