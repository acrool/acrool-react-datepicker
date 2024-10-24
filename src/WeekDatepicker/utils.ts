import dayjs, {Dayjs} from 'dayjs';

export const getValue = (defaultValue: Dayjs, startWeekDate: string, val?: string) => {
    const editValue = dayjs(val);

    if(editValue.isValid()){
        return getWeekRange(dayjs(startWeekDate), editValue);
    }
    return getWeekRange(dayjs(startWeekDate), defaultValue);
};


const getWeekRange = (startDate: Dayjs, currentDate: Dayjs) => {
    console.log('startDate', startDate.format('YYYY-MM-DD'));
    const daysDiff = currentDate.diff(startDate, 'day');

    // 第幾週（從0開始）
    const weekNumber = Math.floor(daysDiff / 7);

    // 該週的開始日
    const weekStartDate = startDate.add(weekNumber * 7, 'day');

    // 該週的結束日（開始日加6天）
    const weekEndDate = weekStartDate.add(6, 'day');

    return weekStartDate;
    // return {
    //     weekStartDate: weekStartDate.format('YYYY-MM-DD'),
    //     weekEndDate: weekEndDate.format('YYYY-MM-DD'),
    // };
};
