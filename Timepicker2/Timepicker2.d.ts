import React from 'react';
import { ITimepicker2Props } from './types';
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
declare const Timepicker2Atom: ({ className, style, onChange, onClickOk, value, locale, isDark, title, isVisibleSecond, isVisibleNow, }: ITimepicker2Props) => JSX.Element;
declare const Timepicker2: (props: ITimepicker2Props) => React.FunctionComponentElement<ITimepicker2Props>;
export { Timepicker2Atom };
export default Timepicker2;
