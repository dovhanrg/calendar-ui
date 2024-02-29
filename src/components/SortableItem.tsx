/** @jsxImportSource @emotion/react */

import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import EditableField from "./common/EditableField";
import {css as makeCss } from "@emotion/react";

const css = makeCss({
    height: '40px',
    outline: "none",
    border: "none",
    borderRadius: '3px',
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,
    padding: '1px',
});

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
    };
    return (
        <div ref={setNodeRef} style={style} css={css} {...attributes} {...listeners}>
            <EditableField text={text} onChange={onRecordChange} />
        </div>
    );
}