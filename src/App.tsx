/** @jsxImportSource @emotion/react */

import React, {ChangeEvent, useState} from 'react';
import {v4 as uuidV4} from 'uuid';
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
import {arrayMove, sortableKeyboardCoordinates} from "@dnd-kit/sortable";
import WeekShift from "./components/common/WeekShift";
import SortableContainer from "./components/SortableContainer";
import DummyDay from "./components/common/DummyDay";
import {css as makeCss} from '@emotion/react';

const css = makeCss({display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr'});

export type Records = { id: string; text: string; labels: [] };

export default function App() {
    const [year, setYear] = useState(YEAR);
    const initialDays = getArrayOfDays(year).slice(0, 10);
    const [records, setRecords] = useState<Records[][]>(initialDays.map((_, index) => []));
    const [searchableText, setSearchableText] = useState<string>('');

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
            itemIndexTo = itemIndexTo !== -1 ? itemIndexTo : Number(over.id);
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
                if (text.trim()) {
                    records[recordsIndex][recordIndex].text = text.trim();
                } else {
                    records[recordsIndex].splice(recordIndex, 1);
                }
                return [...records];
            });
        }
    };

    const handleAddRecord = (recordsIndex: number) => {
        setRecords((records) => {
            records[recordsIndex] = [{id: uuidV4(), text: '', labels: []}, ...records[recordsIndex]];
            return [...records];
        });
    };

    const handleSearch = (input: ChangeEvent<HTMLInputElement>) => {
        setSearchableText(input.target.value.trim());
    }


    return (
        <div>
            <div>
                <button onClick={handlePrevYearClick}>{`${year - 1}<<`}</button>
                <button disabled>{year}</button>
                <button onClick={handleNextYearClick}>{`>>${year + 1}`}</button>
                <div style={{height: '50px'}}>{/*// TODO: move to Emotion*/}
                    <input type="text" onChange={handleSearch}/>
                </div>
            </div>
            <div css={css}>
                {WEEK_DAYS.map(dayName => <div>{dayName}</div>)}
                <WeekShift year={year}/>
                <DndContext
                    onDragEnd={handleDragEnd}
                    collisionDetection={closestCenter}
                    sensors={sensors}
                >
                    {searchableText.length
                        ? records.map((dayRecords, index) => {
                            return dayRecords.some((record) => record.text && record.text.indexOf(searchableText) > -1)
                                ? (
                                    <SortableContainer
                                        key={uuidV4()}
                                        index={index}
                                        handleAddRecord={handleAddRecord}
                                        handleUpdateRecord={handleUpdateRecord}
                                        dayRecords={dayRecords}/>
                                ) : <DummyDay key={uuidV4()} />;
                        })
                        : records.map((dayRecords, index) => {
                            return (
                                <SortableContainer
                                    key={uuidV4()}
                                    index={index}
                                    handleAddRecord={handleAddRecord}
                                    handleUpdateRecord={handleUpdateRecord}
                                    dayRecords={dayRecords}/>
                            )
                        })}
                </DndContext>
            </div>
        </div>
    );
};