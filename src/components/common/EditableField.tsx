import InlineEdit from "@atlaskit/inline-edit";
import TextField from "@atlaskit/textfield";


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
            }}// TODO: move to Emotion
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
