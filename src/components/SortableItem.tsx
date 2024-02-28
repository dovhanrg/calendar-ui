import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

type Props = {
    id: number;
}
export function SortableItem(props: Props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: props.id
    });

    // console.log({isDragging});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        height: '40px', border: '1px solid blue'
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {`${props.id}`}
        </div>
    );
}