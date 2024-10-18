import dayjs from 'dayjs';


export const getToday = () => {
    return dayjs().format('YYYY-MM-DD');
};
