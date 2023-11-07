import React, {createContext, useCallback, useRef, useState, ReactNode, useContext} from 'react';
import dayjs, {Dayjs} from 'dayjs';
import {defaultFormat, getDatetime} from './utils';

interface IContextProps {
    today?: string,
    onSetToday?: () => void
    panelYearMonth?: Dayjs
    setPanelYearMonth?: (value: Dayjs) => void
    format?: string
}

export const DatePickerContext = createContext<IContextProps>({});

export const useDatePicker = () => useContext(DatePickerContext);




// const hasProperty = (object, key) => (object ? Object.hasOwnProperty.call(object, key) : false);
// const hasProps = (arg) => hasProperty(arg, 'provider') && hasProperty(arg, 'props');
//
// export const withContextProviders = (...providers) => (Component) => (props) =>
//     providers.reduceRight((acc, prov) => {
//         let Provider = prov;
//         if (hasProps(prov)) {
//             Provider = prov.context;
//             const providerProps = prov.props;
//             return <Provider {...providerProps}>{acc}</Provider>;
//         }
//         return <Provider>{acc}</Provider>;
//     }, <Component {...props} />);



interface IProps {
    children: ReactNode
    format?: string
    value?: string
    onChange?: (newDate: string) => void
}

const DatePickerProvider = ({
    children,
    format = 'YYYY-MM-DD',
    onChange,
    value,
}: IProps) => {

    const dayRef = useRef<Dayjs>(dayjs());
    const today = dayRef.current;
    const [panelYearMonth, setPanelYearMonth] = useState<Dayjs>(today);
    const propsDate = getDatetime(value);


    const handleSetPanelYearMonth = (value) => {
        setPanelYearMonth(value);
    };

    /**
     * 取得時間
     * @param dayObj
     */
    const getTime = (dayObj: Dayjs) => {
        if(propsDate.isValid()){
            return dayObj.format(isEnableSec ? defaultFormat.time : defaultFormat.timeNoSec);
        }
        return dayjs().format(isEnableSec ? defaultFormat.time : defaultFormat.timeNoSec);
    };


    /**
     * 處理選擇日期
     * @param year
     * @param month
     * @param day
     */
    const handleSelectedDate = (year?: number, month?: number, day?: number) => {
        let newDate = panelYearMonth;
        if (year) {
            newDate = newDate.set('year', year);
        }

        if (month) {
            newDate = newDate.set('month', month);
        }

        if (day) {
            newDate = newDate.set('date', day);
        }

        const formatDate = newDate.format(format);
        onChange(formatDate);
    };



    /**
     * 設定為今天日期
     */
    const onSetToday = () => {
        console.log('onChange', onChange);
        const formatDate = today.format(format);

        setPanelYearMonth(today);

        if(onChange){
            onChange(formatDate);
        }
    };
    
    
    

    return (
        <DatePickerContext.Provider value={{
            today: 'xxx',
            onSetToday,
            panelYearMonth,
            setPanelYearMonth: handleSetPanelYearMonth,
            format,
        }}>
            {children}
        </DatePickerContext.Provider>
    );
};



export default DatePickerProvider;

