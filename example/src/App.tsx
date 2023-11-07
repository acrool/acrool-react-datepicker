import {useState} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import {Datepicker, Timepicker, DateTimepicker, RangeDatepicker, IRangeDateValue} from 'bear-react-datepicker';
import dayjs from 'dayjs';

import './App.css';
import 'bear-react-datepicker/dist/index.css';


function App() {
    const [myDateTime, setMyDateTime] = useState('');
    const [myDate, setMyDate] = useState('');
    const [myTime, setMyTime] = useState<string|undefined>();
    const [myDateTimeNoSec, setMyDateTimeNoSec] = useState<string|undefined>();
    const [myRangeDate, setMyRangeDate] = useState<IRangeDateValue>({startDate: undefined, endDate: undefined});


    return (
        <div className="App">
            <div>
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank" rel="noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <input type="text" value={myDate} onChange={(event) => setMyTime(event.target.value)}/>
                <div className="d-flex flex-row my-2">
                    <Datepicker value={myDate} onChange={setMyDate} isVisibleSetToday locale="zh-CN" tagDate={['2022-09-08', '2022-09-11']} format="YYYY/MM/DD" className="mr-3"/>
                    <Datepicker value={myDate} onChange={setMyDate} isVisibleSetToday locale="zh-CN" tagDate={['2022-08-31','2022-09-08', '2022-09-09', '2022-09-11', '2022-10-01']} isDark onChangeYearMonthPanel={yearMonth => console.log('asdasd', yearMonth)}/>
                </div>

                <input type="text" style={{width: 220}} value={`${myRangeDate.startDate ?? ''}~${myRangeDate.endDate ?? ''}`} onChange={(event) => {
                    const dateStr = event.target.value;
                    const dateObj = dateStr.split('~');
                    setMyRangeDate({startDate: dateObj[0], endDate: dateObj[1]});
                }}/>
                <div className="d-flex flex-row my-2">
                    <RangeDatepicker value={myRangeDate} onChange={setMyRangeDate} isVisibleFastPicker locale="zh-TW" format="YYYY/MM/DD"  className="mr-3"/>

                    <RangeDatepicker value={myRangeDate} onChange={setMyRangeDate} locale="zh-CN" isDark minDate={dayjs().subtract(7, 'day').format('YYYY-MM-DD')} maxDate={dayjs().add(7, 'day').format('YYYY-MM-DD')}/>
                </div>

                <input type="text" value={myTime} onChange={(event) => setMyTime(event.target.value)}/>
                <div className="d-flex flex-row my-2">
                    <Timepicker value={myTime} onChange={setMyTime} onClickOk={(timeStr) => console.log('val', timeStr)} className="mr-3"/>
                    <Timepicker value={myTime} onChange={setMyTime} onClickOk={(timeStr) => console.log('val', timeStr)} isDark/>
                </div>

                <input type="text" value={myDateTime} onChange={(event) => setMyDateTime(event.target.value)}/>
                <div className="d-flex flex-row my-2">
                    <DateTimepicker value={myDateTime} onChange={setMyDateTime} onClickOk={timeStr => console.log('val', timeStr)} className="mr-3"/>
                    {/*<DateTimepicker value={myDateTime} onChange={setMyDateTime} onClickOk={timeStr => console.log('val', timeStr)} isDark/>*/}
                </div>


                {/*<input type="text" value={myDateTimeNoSec} onChange={(event) => setMyDateTime(event.target.value)}/>*/}
                {/*<div className="d-flex flex-row my-2">*/}
                {/*    <DateTimepicker value={myDateTimeNoSec} onChange={setMyDateTimeNoSec} onClickOk={timeStr => console.log('val', timeStr)} isEnableSec={false}/>*/}
                {/*    <DateTimepicker value={myDateTimeNoSec} onChange={setMyDateTimeNoSec} onClickOk={timeStr => console.log('val', timeStr)} isDark isEnableSec={false}/>*/}
                {/*</div>*/}


                <p>
          Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
        Click on the Vite and React logos to learn more
            </p>
        </div>
    );
}

export default App;
