import { IRangeDatepickerProps } from './types';
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
declare const RangeDatepicker: ({ className, style, value, onChange, format, maxYear, minYear, locale, isVisibleFastPicker, minDate, maxDate, isDark, }: IRangeDatepickerProps) => JSX.Element;
export default RangeDatepicker;
