import React from 'react';
import { ITimepickerProps } from './types';
/**
 * 時間選擇器
 * @param className
 * @param style
 * @param onChange 選擇視窗當項目異動時
 * @param onClickOk 選擇視窗按下OK時
 * @param value Input Value
 * @param locale
 * @param isDark 暗黑模式
 * @param isEnableSec
 */
declare const TimepickerAtom: ({ className, style, onChange, onClickOk, value, locale, isDark, title, isVisibleSecond, isVisibleNow, }: ITimepickerProps) => JSX.Element;
declare const Timepicker: (props: ITimepickerProps) => React.FunctionComponentElement<ITimepickerProps>;
export { TimepickerAtom };
export default Timepicker;
