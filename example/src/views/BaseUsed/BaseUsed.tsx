import React, {useState} from 'react';
import {Datepicker, Timepicker, DateTimepicker, RangeDatepicker, IRangeDateValue} from 'bear-react-datepicker';
import dayjs from 'dayjs';




const BaseUsed = () => {
    const [myDateTime, setMyDateTime] = useState('');
    const [myDate, setMyDate] = useState('');
    const [myTime, setMyTime] = useState<string|undefined>();
    const [myRangeDate, setMyRangeDate] = useState<IRangeDateValue>({startDate: undefined, endDate: undefined});

    return (
        <div>
            <input type="text" value={myDate} onChange={(event) => setMyTime(event.target.value)}/>
            <div className="d-flex flex-row my-2">
                <Datepicker value={myDate} onChange={setMyDate} isVisibleSetToday locale="zh-CN" format="YYYY/MM/DD" className="mr-3"/>
                <Datepicker value={myDate} onChange={setMyDate} isVisibleSetToday locale="zh-CN" isDark/>
            </div>

            <input type="text" style={{width: 220}} value={`${myRangeDate.startDate ?? ''}~${myRangeDate.endDate ?? ''}`} onChange={(event) => {
                const dateStr = event.target.value;
                const dateObj = dateStr.split('~');
                setMyRangeDate({startDate: dateObj[0], endDate: dateObj[1]});
            }}/>
            <div className="d-flex flex-row my-2">
                <RangeDatepicker value={myRangeDate} onChange={setMyRangeDate} isVisibleSetToday locale="zh-CN" format="YYYY/MM/DD"  className="mr-3"/>

                <RangeDatepicker value={myRangeDate} onChange={setMyRangeDate} isVisibleSetToday locale="zh-CN" isDark minDate={dayjs().subtract(7, 'day').format('YYYY-MM-DD')} maxDate={dayjs().add(7, 'day').format('YYYY-MM-DD')}/>
            </div>

            <input type="text" value={myTime} onChange={(event) => setMyTime(event.target.value)}/>
            <div className="d-flex flex-row my-2">
                <Timepicker value={myTime} onChange={setMyTime} onClickOk={() => {}} className="mr-3"/>
                <Timepicker value={myTime} onChange={setMyTime} onClickOk={() => {}} isDark/>
            </div>

            <input type="text" value={myDateTime} onChange={(event) => setMyDateTime(event.target.value)}/>
            <div className="d-flex flex-row my-2">
                <DateTimepicker value={myDateTime} onChange={setMyDateTime} onClickOk={() => {}} className="mr-3"/>
                <DateTimepicker value={myDateTime} onChange={setMyDateTime} onClickOk={() => {}} isDark/>
            </div>



        </div>
    );

};

export default BaseUsed;
