import React, {useState} from 'react';
import {WEEK_DAYS, YEAR} from "./consts";
import {getArrayOfDays, getWeekShift} from "./helpers/dates";
import TextFiled from "./components/common/TextFiled";




export default function App() {
    const [year, setYear] = useState(YEAR);
    const days = getArrayOfDays(year);
    const handlePrevYearClick = () => setYear(year-1);
    const handleNextYearClick = () => setYear(year+1);
    return (
        <div>
            <div>
                <button onClick={handlePrevYearClick}>{`${year-1}<<`}</button>
                <button disabled>{year}</button>
                <button onClick={handleNextYearClick}>{`>>${year+1}`}</button>
                <div style={{height: '50px'}} />
            </div>
            <div
                style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr'}}
            >
                {WEEK_DAYS.map(dayName => <div>{dayName}</div>)}
                {new Array(getWeekShift(year)).fill(null).map(() => <div />)}
                {days.map((day) => (<div>{day}<TextFiled /></div>))}
            </div>
        </div>
    );
};