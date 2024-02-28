import {useState} from 'react';


import TextArea from '@atlaskit/textarea';

import InlineEdit from '@atlaskit/inline-edit';
import Droppable from "../Droppable";
import Draggable from "../Draggable";
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    SortingStrategy,
    useSortable,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import {SortableItem} from "../SortableItem";


type Props = {
    draggableIds: number[];
    droppableId: string;
}

const TextField = ({draggableIds, droppableId}: Props) => {

    const [items, setItems] = useState([12121, 12122, 121213,...draggableIds]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    const handleDragEnd = (event: DragEndEvent) => {
        console.log(event.over);
        const {over, active} = event;
        console.log(over, active);
        if (active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.findIndex(i => i === active.id);
                const newIndex = items.findIndex( i => i === over?.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }
    return (
            <DndContext onDragEnd={handleDragEnd} sensors={sensors} collisionDetection={closestCenter}>
                <SortableContext items={items} strategy={verticalListSortingStrategy}>
                   <div style={{border: '1px dotted green', margin: '1px', maxHeight: '200px', overflow: "scroll"}}>
                       {items.map(id => {
                           return (<SortableItem id={id} />)
                       })}
                   </div>
                </SortableContext>
            </DndContext>
    );
};

export default TextField;


