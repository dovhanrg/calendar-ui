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
    droppableId: string;
}

const TextField = ({droppableId}: Props) => {

    const [items, setItems] = useState([1,2,3,4]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    const handleDragEnd = (event: DragEndEvent) => {
        // console.log(event.over);
        const {over, active} = event;
        // console.log(over, active);
        if (active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.findIndex(i => i === active.id);
                const newIndex = items.findIndex(i => i === over?.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }
    return (
        <div style={{maxWidth: '200px'}}>
            <DndContext
                onDragEnd={handleDragEnd}
                sensors={sensors}
                collisionDetection={closestCenter}
            >
                <Droppable id={droppableId}>
                    <SortableContext items={items} strategy={verticalListSortingStrategy}>
                            {items.map(id => {
                                return (<SortableItem id={id}/>)
                            })}
                    </SortableContext>
                </Droppable>
            </DndContext>
        </div>
    );
};

export default TextField;


