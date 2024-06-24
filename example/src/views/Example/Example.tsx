import {useCallback, useRef, useState} from 'react';
import styled from 'styled-components';
import {
    Datepicker, DateTimepicker, DateTimepicker2,
    IRangeDateTimeValue,
    IRangeDateValue,
    RangeDatepicker, RangeTimeDatepicker,
    Timepicker,
    Timepicker2
} from '@acrool/react-datepicker';
import {Flex} from '@acrool/react-grid';
import dayjs from 'dayjs';



const Example = () => {
    const [myDate, setMyDate] = useState('2023-10-08');
    const [myTime, setMyTime] = useState<string>('12:00:08');
    const [myDateTime, setMyDateTime] = useState('2023-10-02 12:00:08');
    const [myDateTimeNoSec, setMyDateTimeNoSec] = useState<string>('2023-10-02 12:00');
    const [myRangeDate, setMyRangeDate] = useState<IRangeDateValue>({startDate: '2023-10-02', endDate: '2023-10-08'});
    const [myRangeDateTime, setMyRangeDateTime] = useState<IRangeDateTimeValue>({date: '2023-10-02', startTime: '08:00:10', endTime: '10:10:00'});
    const [myRangeDateTimeNoSec, setMyRangeDateTimeNoSec] = useState<IRangeDateTimeValue>({date: '2023-10-02', startTime: '08:00', endTime: '10:10'});


    /**
     * 渲染日期選擇器
     */
    const renderDatePicker = useCallback(() => {
        return <FormControlGroup className="gap-2" data-label="DatePicker">

            <Flex className="gap-2">
                <input type="text" value={myDate} onChange={(event) => setMyTime(event.target.value)}/>
                <button type="button" onClick={() => setMyDate('')}>Clear</button>
            </Flex>
            <Flex className="gap-3">
                <Datepicker value={myDate} onChange={setMyDate} isVisibleSetToday locale="zh-TW" tagDate={['2022-09-08', '2022-09-11']} format="YYYY/MM/DD"/>
                <Datepicker value={myDate} onChange={setMyDate} isVisibleSetToday locale="zh-CN" tagDate={['2022-08-31','2022-09-08', '2022-09-09', '2022-09-11', '2022-10-01']} isDark onChangeYearMonthPanel={yearMonth => console.log('asdasd', yearMonth)}/>

            </Flex>
        </FormControlGroup>;
    }, [myDate]);


    /**
     * 渲染日期選擇器
     */
    const renderRangeDatePicker = useCallback(() => {
        return <FormControlGroup className="gap-2" data-label="RangeDatePicker">
            <Flex className="gap-2">
                <input type="text"
                    value={[myRangeDate.startDate, myRangeDate.endDate].filter(row => row).join('~')}
                    onChange={(event) => {
                        const dateStr = event.target.value;
                        const dateObj = dateStr.split('~');
                        setMyRangeDate({startDate: dateObj[0], endDate: dateObj[1]});
                    }}/>
                <button type="button" onClick={() => setMyRangeDate('')}>Clear</button>
            </Flex>
            <Flex className="gap-3">
                <RangeDatepicker value={myRangeDate} onChange={setMyRangeDate} isVisibleFastPicker isDark locale="en-US" format="YYYY/MM/DD" />
                <RangeDatepicker value={myRangeDate} onChange={setMyRangeDate} locale="zh-CN" isDark minDate={dayjs().subtract(7, 'day').format('YYYY-MM-DD')} maxDate={dayjs().add(7, 'day').format('YYYY-MM-DD')}/>

            </Flex>

        </FormControlGroup>;
    }, [myRangeDate]);

    /**
     * 渲染日期時間選擇器
     */
    const renderTimePicker = useCallback(() => {
        return <FormControlGroup className="gap-2" data-label="TimePicker">
            <Flex className="gap-2">
                <input type="text" value={myTime} onChange={(event) => setMyTime(event.target.value)}/>
                <button type="button" onClick={() => setMyTime('')}>Clear</button>
            </Flex>

            <Flex className="gap-3">
                <Timepicker locale="ja-JP" value={myTime} onChange={setMyTime} onClickOk={(timeStr) => console.log('val', timeStr)}/>
                <Timepicker locale="ja-JP" value={myTime} onChange={setMyTime} onClickOk={(timeStr) => console.log('val', timeStr)} isDark/>

            </Flex>
        </FormControlGroup>;
    }, [myTime]);

    /**
     * 渲染日期時間選擇器2
     */
    const renderTimePicker2 = useCallback(() => {
        return <FormControlGroup className="gap-2" data-label="TimePicker2">
            <Flex className="gap-2">
                <input type="text" value={myTime} onChange={(event) => setMyTime(event.target.value)}/>
                <button type="button" onClick={() => setMyTime('')}>Clear</button>
            </Flex>

            <Flex className="gap-3">
                <Timepicker2 locale="ja-JP" value={myTime} isVisibleSecond={false} onChange={setMyTime} onClickOk={(timeStr) => console.log('val', timeStr)}/>
                <Timepicker2 locale="ja-JP" value={myTime} onChange={setMyTime} onClickOk={(timeStr) => console.log('val', timeStr)} isDark/>

            </Flex>
        </FormControlGroup>;
    }, [myTime]);


    /**
     * 渲染日期時間選擇器
     */
    const renderDateTimePicker = useCallback(() => {
        return <FormControlGroup className="gap-2" data-label="DateTimePicker">
            <Flex className="gap-2">
                <input type="text" value={myDateTime} onChange={(event) => setMyDateTime(event.target.value)}/>
                <button type="button" onClick={() => setMyDateTime('')}>Clear</button>
            </Flex>

            <Flex className="gap-3">
                <DateTimepicker value={myDateTime} onChange={setMyDateTime} onClickOk={timeStr => console.log('val', timeStr)}/>
                <DateTimepicker value={myDateTime} onChange={setMyDateTime} onClickOk={timeStr => console.log('val', timeStr)} isDark/>

            </Flex>
        </FormControlGroup>;
    }, [myDateTime]);


    /**
     * 渲染日期時間選擇器2
     */
    const renderDateTimePicker2 = useCallback(() => {
        return <FormControlGroup className="gap-2" data-label="DateTimePicker">
            <Flex className="gap-2">
                <input type="text" value={myDateTime} onChange={(event) => setMyDateTime(event.target.value)}/>
                <button type="button" onClick={() => setMyDateTime('')}>Clear</button>
            </Flex>

            <Flex className="gap-3">
                <DateTimepicker2 value={myDateTime} onChange={setMyDateTime} onClickOk={timeStr => console.log('val', timeStr)}/>
                <DateTimepicker2 value={myDateTime} isVisibleSecond={false} onChange={setMyDateTime} onClickOk={timeStr => console.log('val', timeStr)} isDark/>

            </Flex>
        </FormControlGroup>;
    }, [myDateTime]);

    /**
     * 渲染日期時間選擇器
     */
    const renderDateTimeHiddenSecondPicker = useCallback(() => {
        return <FormControlGroup className="gap-2" data-label="DateTimePicker(No Second)">
            <Flex className="gap-2">
                <input type="text" value={myDateTimeNoSec} onChange={(event) => setMyDateTime(event.target.value)}/>
                <button type="button" onClick={() => setMyDateTimeNoSec('')}>Clear</button>
            </Flex>
            
            <Flex className="gap-3">
                <DateTimepicker value={myDateTimeNoSec} onChange={setMyDateTimeNoSec} locale="zh-TW" onClickOk={timeStr => console.log('val', timeStr)} isVisibleSecond={false}/>
                <DateTimepicker value={myDateTimeNoSec} onChange={setMyDateTimeNoSec} onClickOk={timeStr => console.log('val', timeStr)} isDark isVisibleSecond={false}/>

            </Flex>
        </FormControlGroup>;
    }, [myDateTimeNoSec]);


    /**
     * 渲染日期時間選擇器
     */
    const renderRangeTimePicker = useCallback(() => {
        return <FormControlGroup className="gap-2" data-label="Range DateTimePicker">
            <Flex className="gap-2">
                <input type="text" value={`${myRangeDateTime.date ?? ''} ${myRangeDateTime.startTime ?? ''}~${myRangeDateTime.endTime ?? ''}`} />
                <button type="button" onClick={() => setMyRangeDateTime('')}>Clear</button>
            </Flex>
            <Flex className="gap-3">
                <RangeTimeDatepicker value={myRangeDateTime} onChange={setMyRangeDateTime} onClickOk={timeStr => console.log('val', timeStr)} />
                <RangeTimeDatepicker value={myRangeDateTime} onChange={setMyRangeDateTime} onClickOk={timeStr => console.log('val', timeStr)} isDark/>

            </Flex>
        </FormControlGroup>;
    }, [myRangeDateTime]);


    /**
     * 渲染日期時間選擇器
     */
    const renderRangeTimeHiddenSecondPicker = useCallback(() => {
        return <FormControlGroup className="gap-2" data-label="Range DateTimePicker(No Second)">
            <Flex className="gap-2">
                <input type="text"
                    value={[`${myRangeDateTimeNoSec?.date ?? ''} ${myRangeDateTimeNoSec?.startTime ?? ''}`, myRangeDateTimeNoSec?.endTime].filter(row => row).join('~')}
                />
                <button type="button" onClick={() => setMyRangeDateTimeNoSec('')}>Clear</button>
            </Flex>
            
            <Flex className="gap-3">
                <RangeTimeDatepicker value={myRangeDateTimeNoSec} locale="zh-TW" onChange={setMyRangeDateTimeNoSec} onClickOk={timeStr => console.log('val', timeStr)} isVisibleSecond={false} isVisibleFastPicker/>
                <RangeTimeDatepicker value={myRangeDateTimeNoSec} onChange={setMyRangeDateTimeNoSec} onClickOk={timeStr => console.log('val', timeStr)} isDark isVisibleSecond={false}/>

            </Flex>
        </FormControlGroup>;
    }, [myRangeDateTimeNoSec]);





    return <div style={{display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start', width: '100%'}}>
        {renderDatePicker()}
        {renderRangeDatePicker()}
        {renderTimePicker()}
        {renderTimePicker2()}
        {renderDateTimePicker()}
        {renderDateTimePicker2()}
        {renderDateTimeHiddenSecondPicker()}
        {renderRangeTimePicker()}
        {renderRangeTimeHiddenSecondPicker()}

    </div>;
};

export default Example;





const FormControlGroup = styled(Flex)`
  gap: 1rem;
  flex-direction: column;
  margin-bottom: 1.5rem;
  
  :before{
    content: attr(data-label);
    font-size: 1.5rem;
    color: #00a3e0;
  }
  
  
  input{
    width: 220px;
  }
`;
