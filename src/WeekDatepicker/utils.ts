import dayjs, {Dayjs} from 'dayjs';

export const getValueInWeekStartDate = (defaultValue: Dayjs, startWeekDate: Dayjs|string, val?: Dayjs|string) => {
    const editValue = dayjs(val);

    if(editValue.isValid()){
        return getWeekRange(dayjs(startWeekDate), editValue);
    }
    return getWeekRange(dayjs(startWeekDate), defaultValue);
};


/**
 * 由週開始日，計算目前日期的週開始日
 * @param startDate
 * @param currentDate
 */
export const getWeekRange = (startDate: Dayjs, currentDate: Dayjs) => {
    const daysDiff = currentDate.diff(startDate, 'day');

    // 第幾週（從0開始）
    const weekNumber = Math.floor(daysDiff / 7);

    // 該週的開始日
    const weekStartDate = startDate.add(weekNumber * 7, 'day');

    // 該週的結束日（開始日加6天）
    const weekEndDate = weekStartDate.add(6, 'day');

    return weekStartDate;
};
