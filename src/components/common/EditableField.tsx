/** @jsxImportSource @emotion/react */

import InlineEdit from "@atlaskit/inline-edit";
import TextField from "@atlaskit/textfield";
import {css as makeCss} from "@emotion/react";

const css = makeCss`padding: 5px 2px;`


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
                <div css={css}>
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
