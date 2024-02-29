/** @jsxImportSource @emotion/react */

import React, {ChangeEvent, useEffect, useState} from 'react';
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
import Button from "./components/common/Button";

const monthLabel = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
} as const;

export type Label = { id: string; text: string; color: string };
export type Records = { id: string; text: string; labels: Label[] };

export default function App() {
    const [monthYear, setMonthYear] = useState<{ month: keyof typeof monthLabel, year: number }>({
        month: 1,
        year: YEAR
    });
    const [allRecords, setAllRecords] = useState<{ [p: string]: Records[][] }>({
        [`${monthYear.year}-${monthYear.month}`]: getArrayOfDays(monthYear).map(() => []),
    });
    const [records, setRecords] = useState<Records[][]>(getArrayOfDays(monthYear).map(() => []));
    const [searchableText, setSearchableText] = useState<string>('');

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        setRecords(() => {
            if (`${monthYear.year}-${monthYear.month}` in allRecords) {
                return [...allRecords[`${monthYear.year}-${monthYear.month}`]];
            }
            return getArrayOfDays(monthYear).map(() => []);
        });
    }, [monthYear.month]);

    const updateAllRecords = () => {
        setAllRecords((prevState) => {
            return {...prevState, [`${monthYear.year}-${monthYear.month}`]: records}
        });
    }

    const handleNextMonthClick = () => {
        updateAllRecords();
        setMonthYear((prevState) => {
            const month = prevState.month + 1 > 12 ? 1 : prevState.month + 1 as keyof typeof monthLabel;
            return {
                month,
                year: prevState.month + 1 > 12 ? prevState.year++ : prevState.year,
            };
        });
    };
    const handlePrevMonthClick = () => {
        updateAllRecords();
        setMonthYear((prevState) => {
            const month = prevState.month - 1 === 0 ? 12 : prevState.month - 1 as keyof typeof monthLabel;
            return {
                month,
                year: prevState.month - 1 === 0 ? prevState.year-- : prevState.year,
            };
        });
    };

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
        <div css={makeCss({
            width: '100%',
            maxWidth: '1020px',
            margin: '0 auto',
            backgroundColor: '#fdf9f9'
        })}>
            <div css={makeCss({
                height: 92,
                width: '100%',
                maxWidth: 1020,
                position: "fixed",
                top: 0,
                backgroundColor: '#fdf9f9',
                display: "flex",
                flexDirection: "column",
            })}>
                <div css={makeCss({
                    display: 'flex',
                    margin: '10px 0',
                })}>
                    <div css={makeCss({display: "flex", flexGrow: .3,})}>
                        <input
                            type="text"
                            css={makeCss({
                                outline: "none",
                                border: "none",
                                borderRadius: '3px',
                                fontSize: 14,
                                lineHeight: '20px',
                                fontWeight: 400,
                                padding: '8px 12px',
                                boxShadow: 'inset 0 0 0 2px var(--ds-border-input, #091e4224)',
                            })}
                            onChange={handleSearch}
                            placeholder="Search tasks ..."
                        />
                    </div>
                    <div css={makeCss({
                        display: "flex",
                        flexGrow: .7,
                        alignItems: "center",
                    })}>
                        <Button onClick={handlePrevMonthClick} label={'<<'}/>
                        <div css={makeCss({margin: '0 10px'})}>{monthLabel[monthYear.month]}</div>
                        <Button onClick={handleNextMonthClick} label={'>>'}/>
                    </div>
                </div>
                <div css={makeCss({
                    display: "flex"
                })}>{WEEK_DAYS.map(dayName => <div css={makeCss({
                    flexGrow: 1,
                    textAlign: "center",
                })}>{dayName}</div>)}</div>
            </div>
            <div css={makeCss({
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
                marginTop: 92,
            })}>
                <WeekShift monthYear={monthYear}/>
                <DndContext
                    onDragEnd={handleDragEnd}
                    collisionDetection={closestCenter}
                    sensors={sensors}
                >
                    {searchableText.length
                        ? records.map((dayRecords, index) => {
                            return dayRecords.some((record) => record.text && record.text.indexOf(searchableText) > -1)
                                ? (
                                    <>
                                        {index + 1}
                                        <SortableContainer
                                            key={uuidV4()}
                                            index={index}
                                            handleAddRecord={handleAddRecord}
                                            handleUpdateRecord={handleUpdateRecord}
                                            dayRecords={dayRecords}/>
                                    </>
                                ) : <DummyDay key={uuidV4()}/>;
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