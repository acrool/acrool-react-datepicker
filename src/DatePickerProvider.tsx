import React, {
    createContext,
    useCallback,
    useRef,
    useState,
    ReactNode,
    useContext,
    useEffect,
    startTransition
} from 'react';
import dayjs, {Dayjs} from 'dayjs';
import {defaultFormat, getDatetime, getTimeFormat, paddingLeft} from './utils';
import clsx from 'clsx';
import elClassNames from './el-class-names';
import {ITimeObj} from './typing';

interface IContextProps {
    today?: Dayjs,
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

const unitHeight = 30;



/**
 * 時間物件轉自串
 * @param timeObj
 * @param isEnableSec
 */
export const getTimeString = (timeObj: ITimeObj, isEnableSec?: boolean): string => {
    if(isEnableSec){
        return `${paddingLeft(timeObj?.hour ?? '00', 2)}:${paddingLeft(timeObj?.minute ?? '00', 2)}:${paddingLeft(timeObj?.second ?? '00', 2)}`;
    }
    return `${paddingLeft(timeObj?.hour ?? '00', 2)}:${paddingLeft(timeObj?.minute ?? '00', 2)}`;
};



interface IProps {
    children: ReactNode
    format?: string
    value?: string
    onChange?: (newDate: string) => void,
    isEnableSec?: boolean
}

const DatePickerProvider = ({
    children,
    format = 'YYYY-MM-DD',
    onChange,
    value,
    isEnableSec = true,
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




    const hourBoxRef = useRef<HTMLDivElement>(null);
    const minuteBoxRef = useRef<HTMLDivElement>(null);
    const secondBoxRef = useRef<HTMLDivElement>(null);

    const [time, setTime] = useState<ITimeObj>(getTimeFormat(value));


    useEffect(() => {
        handleMoveUnit(time, false);

    }, []);



    /**
     * 處理移動時間
     */
    const handleMoveUnit = (data: {hour: number, minute: number, second?: number}, isBehaviorSmooth = true) => {
        const behavior = isBehaviorSmooth ? 'smooth':'auto';
        if(data.hour && hourBoxRef.current){
            hourBoxRef.current?.scrollTo({behavior, top: data.hour * unitHeight});
        }

        if(data.minute && minuteBoxRef.current){
            minuteBoxRef.current?.scrollTo({behavior, top: data.minute * unitHeight});
        }

        if(data.second && secondBoxRef.current){
            secondBoxRef.current?.scrollTo({behavior, top: data.second * unitHeight});
        }
    };


    


    return (
        <DatePickerContext.Provider value={{
            today,
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

