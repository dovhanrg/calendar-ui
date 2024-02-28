import {useDroppable} from "@dnd-kit/core";
import React from "react";

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


        return (
            <div ref={setNodeRef} style={style}>
                <div style={{
                    width: '100%',
                    // height: '20px',
                    border: '1px solid',
                    borderColor: '#f0f'
                }}>
                {children}
                </div>
            </div>
        );
};

export default Droppable;