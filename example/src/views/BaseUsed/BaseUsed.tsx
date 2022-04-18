import React, {useState} from 'react';
import Datepicker from 'bear-react-datepicker';
import {Button} from 'bear-components/atoms';




const BaseUsed = () => {
    const [myDate, setMyDate] = useState('2020-12-14');


    return (
        <div>
            <input type="text" value={myDate}/>
            <Datepicker onChange={setMyDate} value={myDate}/>
            <Datepicker onChange={setMyDate} value={myDate} locale="zh-CN"/>



        </div>
    );

};

export default BaseUsed;
