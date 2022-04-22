import React, {useState} from 'react';
import {Datepicker, Timepicker, DateTimepicker} from 'bear-react-datepicker';
import {Button} from 'bear-components/atoms';




const BaseUsed = () => {
    const [myDateTime, setMyDateTime] = useState('');
    const [myDate, setMyDate] = useState('');
    const [myTime, setMyTime] = useState('');


    return (
        <div>
            <input type="text" value={myDate} onChange={(event) => setMyTime(event.target.value)}/>
            <Datepicker value={myDate} onChange={setMyDate} isVisibleSetToday locale="zh-CN"/>

            <hr/>
            <input type="text" value={myTime} onChange={(event) => setMyTime(event.target.value)}/>
            <Timepicker value={myTime} onChange={setMyTime} onClickOk={() => {}}/>

            <hr/>
            <input type="text" value={myDateTime} onChange={(event) => setMyDateTime(event.target.value)}/>
            <DateTimepicker value={myDateTime} onChange={setMyDateTime}  />



        </div>
    );

};

export default BaseUsed;
