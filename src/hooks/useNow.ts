import dayjs, {Dayjs} from 'dayjs';
import {useRef} from 'react';



/**
 * 取得現在日期
 */
export const useNowTime = () => {
    const dayRef = useRef<Dayjs>(dayjs());
    return dayRef.current;
};

export default useNowTime;
