import {useState} from 'react';


import TextArea from '@atlaskit/textarea';

import InlineEdit from '@atlaskit/inline-edit';


const TextField = () => {
    const [editValue, setEditValue] = useState('');

    return (
        <div style={{height: '100px',maxWidth: '150px', width: '100%', border: '1px solid blue'}}>
            <InlineEdit
                defaultValue={editValue}
                // label="Send feedback"
                editView={({ errorMessage, ...fieldProps }, ref) => {

                    console.log(fieldProps);
                    return (
                        // @ts-ignore - textarea does not pass through ref as a prop
                        <TextArea style={{minHeight: '10px', wordBreak: 'break-word', padding: '10px'}} minimumRows={2} isCompact {...fieldProps} ref={ref} />
                    )
                }}
                readView={() => (
                    <div style={{padding: '5px 2px'}}>
                        {editValue || ''}
                    </div>
                )}
                onConfirm={setEditValue}
                keepEditViewOpenOnBlur
                readViewFitContainerWidth
            />
        </div>
    );
};

export default TextField;