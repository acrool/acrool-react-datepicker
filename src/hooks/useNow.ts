import {useRef} from 'react';
import dayjs, {Dayjs} from 'dayjs';



/**
 * 取得現在日期
 */
export const useNowTime = () => {
    const dayRef = useRef<Dayjs>(dayjs());
    return dayRef.current;
};

export default useNowTime;
