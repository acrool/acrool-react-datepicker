import React, {useState} from 'react';
import {Datepicker} from 'bear-react-datepicker';
import {Timepicker} from 'bear-react-datepicker';
import {Button} from 'bear-components/atoms';




const BaseUsed = () => {
    const [myDate, setMyDate] = useState('');
    const [myTime, setMyTime] = useState('');


    return (
        <div>
            <input type="text" value={myDate}/>
            <input type="text" value={myTime} onChange={(event) => setMyTime(event.target.value)}/>
            {/*<Datepicker onChange={setMyDate} value={myDate}/>*/}
            <Datepicker onChange={setMyDate} value={myDate} isVisibleSetToday locale="zh-CN"/>
            <Timepicker onChange={setMyTime} value={myTime} />



        </div>
    );

};

export default BaseUsed;
