import dayjs, {Dayjs} from 'dayjs';

export const getValue = (defaultValue: Dayjs, val?: string[]) => {
    // const editValue = dayjs(val);
    // if(editValue.isValid()){
    //     return editValue;
    // }
    return defaultValue;
};


export const getToday = () => {
    return dayjs().format('YYYY-MM-DD');
};
