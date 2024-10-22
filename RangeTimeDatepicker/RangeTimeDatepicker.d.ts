import { IRangeTimeDatepickerProps } from './types';
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
declare const RangeTimeDatepicker: ({ className, style, value, dateFormat, onChange, maxYear, minYear, locale, isVisibleFastPicker, isVisibleSecond, onClickOk, minDate, maxDate, isDark, }: IRangeTimeDatepickerProps) => JSX.Element;
export default RangeTimeDatepicker;
