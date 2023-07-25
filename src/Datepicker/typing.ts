import CSS from 'csstype';

export interface ICommon {
    className?: string;
    style?: CSS.Properties;
    locale?: string;
    minYear?: number;
    maxYear?: number;
    isDark?: boolean;
    format?: string;
    minDate?: string,
    maxDate?: string,
    tagDate?: string[],
}
