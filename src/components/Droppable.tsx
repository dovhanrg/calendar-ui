/** @jsxImportSource @emotion/react */

import {useDroppable} from "@dnd-kit/core";
import React from "react";
import {css as makeCss} from "@emotion/react";

const css = makeCss({
    minHeight:'170px',
    boxSizing: 'border-box',
    padding: '4px',
    margin: '2px',
    backgroundColor: '#eee9e9',
    borderRadius: '2px',
});

type Props = {
    children: React.ReactNode;
    id: string;
}
const Droppable = ({children, id}: Props) => {

    const {isOver, setNodeRef} = useDroppable({
        id,
    });
    const style = {
        color: isOver ? 'green' : undefined,
    };


    return (<div ref={setNodeRef} style={style}>
        <div css={css}>
            {children}
        </div>
    </div>);
};

export default Droppable;