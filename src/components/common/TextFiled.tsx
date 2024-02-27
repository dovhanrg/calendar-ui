import {useState} from 'react';


import TextArea from '@atlaskit/textarea';

import InlineEdit from '@atlaskit/inline-edit';


const TextField = () => {
    const [editValue, setEditValue] = useState('');

    return (
        <div style={{maxWidth: '150px', width: '100%', border: '1px solid blue'}}>
            <InlineEdit
                defaultValue={editValue}
                // label="Send feedback"
                editView={({ errorMessage, ...fieldProps }, ref) => (
                    // @ts-ignore - textarea does not pass through ref as a prop
                    <TextArea {...fieldProps} ref={ref} />
                )}
                readView={() => (
                    <div>
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