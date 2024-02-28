import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import EditableField from "./common/EditableField";

type Props = {
    id: string;
    text: string;
    onRecordChange: (text: string) => void;
}
export function SortableItem({id, text, onRecordChange}: Props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: id
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        height: '40px', border: '1px solid blue' // TODO: move to Emotion
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <EditableField text={text} onChange={onRecordChange} />
        </div>
    );
}