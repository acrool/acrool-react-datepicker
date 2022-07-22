import React, {useState} from 'react';
import {Datepicker, Timepicker, DateTimepicker} from 'bear-react-datepicker';




const BaseUsed = () => {
    const [myDateTime, setMyDateTime] = useState('');
    const [myDate, setMyDate] = useState('');
    const [myTime, setMyTime] = useState('');


    return (
        <div>
            <input type="text" value={myDate} onChange={(event) => setMyTime(event.target.value)}/>
            <div className="d-flex flex-row my-2">
                <Datepicker value={myDate} onChange={setMyDate} isVisibleSetToday locale="zh-CN" className="mr-3"/>
                <Datepicker value={myDate} onChange={setMyDate} isVisibleSetToday locale="zh-CN" isDark/>
                <Datepicker value={myDate} onChange={setMyDate} isVisibleSetToday locale="zh-CN" isDark startDate="2022-07-22" endDate="2022-07-28"/>
            </div>

            <input type="text" value={myTime} onChange={(event) => setMyTime(event.target.value)}/>
            <div className="d-flex flex-row my-2">
                <Timepicker value={myTime} onChange={setMyTime} onClickOk={() => {}} className="mr-3"/>
                <Timepicker value={myTime} onChange={setMyTime} onClickOk={() => {}} isDark/>
            </div>

            <input type="text" value={myDateTime} onChange={(event) => setMyDateTime(event.target.value)}/>
            <div className="d-flex flex-row my-2">
                <DateTimepicker value={myDateTime} onChange={setMyDateTime} className="mr-3"/>
                <DateTimepicker value={myDateTime} onChange={setMyDateTime} isDark/>
            </div>



        </div>
    );

};

export default BaseUsed;
