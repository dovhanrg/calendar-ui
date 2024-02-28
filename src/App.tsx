import React, {useEffect, useState} from 'react';
import { v4 as uuidV4 } from 'uuid';
import {WEEK_DAYS, YEAR} from "./consts";
import {getArrayOfDays} from "./helpers/dates";
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from "@dnd-kit/sortable";
import Droppable from "./components/Droppable";
import {SortableItem} from "./components/SortableItem";
import WeekShift from "./components/common/WeekShift";


export default function App() {
    const [year, setYear] = useState(YEAR);
    const initialDays = getArrayOfDays(year).slice(0, 10);
    const [records, setRecords] = useState<{id: string; text: string}[][]>(initialDays.map((_, index) => []));

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );


    const handlePrevYearClick = () => setYear(year - 1);
    const handleNextYearClick = () => setYear(year + 1);

    const handleDragEnd = (event: DragEndEvent) => {
        const {over, active} = event;
        if (over && active.id !== over.id) {
            const itemIndexFrom = records.findIndex((item) => item.some((text) => text.id === active.id));
            let itemIndexTo = records.findIndex((item) => item.some((text) => text.id === over.id));
            itemIndexTo = itemIndexTo !== -1 ? itemIndexTo :  Number(over.id);
            setRecords((dayRecords) => {
                const updatedRecords = [...dayRecords];
                if (itemIndexFrom === itemIndexTo) {
                    const oldRecords = dayRecords[itemIndexFrom];
                    const oldRecordIndex = oldRecords.findIndex((text) => text.id === active.id);
                    const newRecordIndex = oldRecords.findIndex((text) => text.id === over.id);
                    updatedRecords[itemIndexFrom] = arrayMove(oldRecords, oldRecordIndex, newRecordIndex);
                } else {
                    const recordsToRemoveFrom = dayRecords[itemIndexFrom];
                    const recordsToPlaceTo = dayRecords[itemIndexTo];
                    const oldRecordIndex = recordsToRemoveFrom.findIndex((text) => text.id === active.id);
                    const newRecordIndex = recordsToPlaceTo.findIndex((text) => text.id === over.id);
                    recordsToPlaceTo.splice(newRecordIndex, 0, ...recordsToRemoveFrom.splice(oldRecordIndex, 1));
                    updatedRecords[itemIndexFrom] = recordsToRemoveFrom;
                    updatedRecords[itemIndexTo] = recordsToPlaceTo;
                }
                return updatedRecords;
            });
        }
    };

    const handleUpdateRecord = (recordsIndex: number, recordId: string) => {
        return (text: string) => {
            setRecords((records) => {
                const recordIndex = records[recordsIndex].findIndex((record) => record.id === recordId);
                records[recordsIndex][recordIndex].text = text;
                return [...records];
            });
        }
    };



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
                    onDragEnd={handleDragEnd}
                    collisionDetection={closestCenter}
                    sensors={sensors}
                >
                    {records.map((dayRecords, index) => {
                        return (
                            <Droppable id={(index).toString(10)}>
                                {/*{dayRecords.length === 0*/}
                                {/*    ? <div style={{height: '40px', border: '1px solid blue'}}>*/}
                                {/*        <button>add record</button>*/}
                                {/*    </div>*/}
                                    <SortableContext items={dayRecords} strategy={verticalListSortingStrategy}>
                                        {dayRecords.map((text) => {
                                            const onRecordChange = handleUpdateRecord(index, text.id);
                                            return (<SortableItem onRecordChange={onRecordChange} id={text.id} text={text.text} key={text.id} />)
                                        })}
                                    </SortableContext>
                            </Droppable>
                        );
                    })}
                </DndContext>
            </div>
        </div>
    );
};