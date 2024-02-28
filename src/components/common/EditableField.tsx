import InlineEdit from "@atlaskit/inline-edit";
import TextArea from "@atlaskit/textarea";
import TextField from "@atlaskit/textfield";
import {useEffect, useState} from "react";


type Props = {
    text: string;
    onChange: (value: string) => void;
}

const EditableField = ({text, onChange}: Props) => {
    return (
        <InlineEdit
            defaultValue={text}
            editView={({errorMessage, ...fieldProps}, ref) => {
                return (
                    <TextField {...fieldProps} autoFocus />
                )
            }}
            readView={() => (
                <div style={{padding: '5px 2px'}}>
                    {text || ''}
                </div>
            )}
            onConfirm={onChange}
            keepEditViewOpenOnBlur
            readViewFitContainerWidth
        />
    )
};

export default EditableField;
