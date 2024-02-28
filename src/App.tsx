import React, {useState} from 'react';
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
    const days = getArrayOfDays(year);
    const [ids, setIds] = useState<number[][]>(days.map((_, index) => []));
    const [items, setItems] = useState([[1, 2, 3, 4], [5, 6, 7, 8], [9]]);

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
            const itemIndexFrom = items.findIndex((item) => item.includes(Number(active.id)));
            const itemIndexTo = items.findIndex((item) => item.includes(Number(over.id)));
            setItems((items) => {
                const updatedItems = [...items];
                if (itemIndexFrom === itemIndexTo) {
                    const oldItem = items[itemIndexFrom];
                    const oldIndex = oldItem.indexOf(Number(active.id));
                    const newIndex = oldItem.indexOf(Number(over.id));
                    updatedItems[itemIndexFrom] = arrayMove(oldItem, oldIndex, newIndex);
                } else {
                    const itemsToRemoveFrom = items[itemIndexFrom];
                    const itemsToPlaceTo = items[itemIndexTo];
                    const oldIndex = itemsToRemoveFrom.indexOf(Number(active.id));
                    const newIndex = itemsToPlaceTo.indexOf(Number(over.id));
                    itemsToPlaceTo.splice(newIndex, 0, ...itemsToRemoveFrom.splice(oldIndex, 1));
                    updatedItems[itemIndexFrom] = itemsToRemoveFrom;
                    updatedItems[itemIndexTo] = itemsToPlaceTo;
                }
                return updatedItems;
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
                style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr'}}
            >
                {WEEK_DAYS.map(dayName => <div>{dayName}</div>)}
                <WeekShift year={year}/>
                <DndContext
                    onDragEnd={handleDragEnd}
                    collisionDetection={closestCenter}
                    sensors={sensors}
                >
                    {items.map((item, index) => {
                        return (
                            <Droppable id={(index + 1).toString(10)}>
                                <SortableContext items={item} strategy={verticalListSortingStrategy}>
                                    {item.map(id => {
                                        return (<SortableItem id={id}/>)
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