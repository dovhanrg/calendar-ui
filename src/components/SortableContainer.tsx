/** @jsxImportSource @emotion/react */

import Droppable from "./Droppable";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {SortableItem} from "./SortableItem";
import React from "react";
import {Records} from "../App";
import {css} from "@emotion/react";
import Button from "./common/Button";


type Props = {
    index: number;
    handleAddRecord: (index: number) => void;
    handleUpdateRecord: (recordsIndex: number, recordId: string) => (text: string) => void;
    dayRecords: Records[]
}
const SortableContainer = ({dayRecords, index, handleAddRecord, handleUpdateRecord}: Props) => {
    return (
        <Droppable id={index.toString(10)}>
            <span css={css({
                padding: '0 2px 0 0',
            })}>{index+1}</span>
            <Button label={'Add'} onClick={() => handleAddRecord(index)} />
            <SortableContext items={dayRecords} strategy={verticalListSortingStrategy}>
                {dayRecords.map((text) => {
                    return (<SortableItem
                        onRecordChange={handleUpdateRecord(index, text.id)}
                        id={text.id}
                        text={text.text}
                        key={text.id}
                    />)
                })}
            </SortableContext>
        </Droppable>
    );
}

export default SortableContainer;
