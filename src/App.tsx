import React, {useEffect, useState} from 'react';
import {WEEK_DAYS, YEAR} from "./consts";
import {getArrayOfDays, getWeekShift} from "./helpers/dates";
import TextFiled from "./components/common/TextFiled";
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import WeekShift from "./components/common/WeekShift";
import {sortableKeyboardCoordinates, verticalListSortingStrategy} from "@dnd-kit/sortable";
import Droppable from "./components/Droppable";


export default function App() {
    const [year, setYear] = useState(YEAR);
    const days = getArrayOfDays(year);
    const [ids, setIds] = useState<number[][]>(days.map((_, index) => [index]));

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );


    const handlePrevYearClick = () => setYear(year - 1);
    const handleNextYearClick = () => setYear(year + 1);

    const handleDragEnd = (event: DragEndEvent) => {
        // console.log(event.over);
        const {over, active} = event;
        console.log(over, active);
        // if (active.id !== over?.id) {
        //
        // }
    }


    return (
        <div>
            <div>
                <button onClick={handlePrevYearClick}>{`${year - 1}<<`}</button>
                <button disabled>{year}</button>
                <button onClick={handleNextYearClick}>{`>>${year + 1}`}</button>
                <div style={{height: '50px'}}/>
            </div>
            <div
                style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr'}}
            >
                {WEEK_DAYS.map(dayName => <div>{dayName}</div>)}
                <WeekShift year={year}/>
                <DndContext
                    onDragOver={(event) => {
                        console.log(event.over, event.active)
                    }}
                    onDragEnd={handleDragEnd}
                    collisionDetection={closestCenter}
                    sensors={sensors}
                >
                    {days.map((day, index) => {
                        return (
                                <TextFiled droppableId={index.toString(10)} draggableIds={ids[index]} />
                        )
                    })}
                </DndContext>
            </div>
        </div>
    );
};