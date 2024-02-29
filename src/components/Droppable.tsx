/** @jsxImportSource @emotion/react */

import {useDroppable} from "@dnd-kit/core";
import React from "react";
import {css as makeCss} from "@emotion/react";

const css = makeCss`
                width: 100%;
                border: 1px solid #f0f;
                min-height: 170px;
            `;

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