import {useMemo, useCallback, useState} from 'react';
import dayjs, {Dayjs} from 'dayjs';
import useLocale from './locales';
import {config} from './config';

export const useDatepicker = ({
    format = 'YYYY-MM-DD',
    locale,
    minYear,
    maxYear,
    value,
    today,
    onChangeYearMonthPanel,
    onChange,
}: {
    format: string;
    locale: string;
    minYear: number;
    maxYear: number;
    value?: string;
    today: Dayjs;
    onChange: (newDate: string) => void;
    onChangeYearMonthPanel?: (params: { year: number; month: number }) => void;
}) => {
    const {i18n} = useLocale(locale);
    const [panelYearMonth, setPanelYearMonth] = useState<Dayjs>(dayjs(value || today));
    const initMaxYear = typeof maxYear !== 'undefined' ? maxYear : Number(today.add(1, 'year').year());



    /**
     * 產生週星期文字
     */
    const localeWeekDay = useMemo(() => {
        return config.weekDay.map((weekDate: number) => {
            return i18n(`com.datepicker.weekDay.${weekDate}`, {def: String(weekDate)});
        });
    }, [locale]);


    /**
     * 產生月文字
     */
    const localeMonth = useMemo(() => {
        return config.month.map((month: number) => {
            return {text: i18n(`com.datepicker.month.${month}`), value: month - 1};
        });
    }, [locale]);


    /**
     * 產生年文字
     */
    const localeYear = useMemo(() => {
        const length = initMaxYear - minYear + 1;
        const yearList: number[]  = Array.from({length})
            .map(row => initMaxYear);
        const yearText = i18n('com.datepicker.unit.year', {def: 'Year'});
        return yearList.map((year, index) => {
            const calcYear = year - (index);
            return {text: `${calcYear}${yearText}`, value: calcYear};
        });
    }, [locale]);



    /**
     * 處理選擇日期
     * @param year
     * @param month
     */
    const handleChangePanel = useCallback((year?: number, month?: number) => {
        let newPanelDate = panelYearMonth;
        if (year) newPanelDate = newPanelDate.set('year', year);
        if (month) newPanelDate = newPanelDate.set('month', month);

        setPanelYearMonth(newPanelDate);
        onChangeYearMonthPanel?.({
            year: newPanelDate.year(),
            month: newPanelDate.month() + 1,
        });
    }, [panelYearMonth, onChangeYearMonthPanel]);



    /**
     * 設定為今天日期
     */
    const handleSelectedToday = () => {
        const formatDate = today.format(format);

        setPanelYearMonth(today);
        onChange(formatDate);
    };
    
    return {
        panelYearMonth,
        localeWeekDay,
        localeMonth,
        localeYear,
        handleChangePanel,
        handleSelectedToday,
    };
};
