import React, {useState} from 'react';
import {WEEK_DAYS, YEAR} from "./consts";
import {getArrayOfDays, getWeekShift} from "./helpers/dates";




export default function App() {
    const [year, setYear] = useState(YEAR);
    const days = getArrayOfDays(year);
    const handlePrevYearClick = () => setYear(year-1);
    const handleNextYearClick = () => setYear(year+1);
    return (
        <div>
            <div>
                <button onClick={handlePrevYearClick}>{`${year-1}<<`}</button>
                <button onClick={handleNextYearClick}>{`>>${year+1}`}</button>
            </div>
            <div
                style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr'}}
            >
                {WEEK_DAYS.map(dayName => <div>{dayName}</div>)}
                {new Array(getWeekShift(year)).fill(null).map(() => <div />)}
                {days.map((day) => <div>{day}</div>)}
            </div>
        </div>
    );
};