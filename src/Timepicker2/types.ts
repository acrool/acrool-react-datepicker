import CSS from 'csstype';

export interface ITimepicker2Props{
    className?: string
    style?: CSS.Properties
    value?: string
    onChange?: (value: string) => void
    onClickOk?: (value: string) => void
    locale?: string
    isDark?: boolean
    title?: string
    isVisibleSecond?: boolean
    isVisibleNow?: boolean
}

