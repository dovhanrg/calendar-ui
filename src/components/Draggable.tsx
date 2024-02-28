import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';

type Props = {
    children: React.ReactNode;
    id: string;
}
const Draggable = ({children, id}: Props) => {
    const {
        attributes,
        listeners,
        setNodeRef, transform
    } = useDraggable({
        id,
    });
    const style = {
        transform: CSS.Translate.toString(transform),
        borderColor: '#0f0',
        border: '1px solid',
    };


    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {children}
        </div>
    );
};

export default Draggable;
