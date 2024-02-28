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
            // label="Send feedback"
            editView={({errorMessage, ...fieldProps}, ref) => {

                // console.log(fieldProps);
                return (
                    // @ts-ignore - textarea does not pass through ref as a prop
                    // <TextArea style={{minHeight: '10px', minWidth: '50px',wordBreak: 'break-word', padding: '10px', border: '1px dotted #f0f'}}
                    //           minimumRows={2} isCompact {...fieldProps} ref={ref}/>
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
