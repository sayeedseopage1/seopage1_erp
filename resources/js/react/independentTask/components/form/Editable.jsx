import React, { useState } from 'react';
import styled from 'styled-components';

const EditableField = ({value, onChange, placeholder=""}) => {
    const [content, setContent] = useState(value);
    const [_placeholder, setPlaceholder] = useState(placeholder);

    React.useEffect(()=> {
        setContent(value);
    }, []);

    const handleChange = (e) => {
        const newContent = e.target.innerHTML;
        onChange(newContent)
    };

    const handleBlur = e => {
        const newContent = e.target.innerHTML;
        if(newContent.length){
            setContent(newContent);
        }else setPlaceholder(placeholder);
    }

    return (
        <EditableContent
            onFocus={e => setPlaceholder("")}
            contentEditable={true}
            onInput={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            dangerouslySetInnerHTML={{ __html: content ?? _placeholder }}
        />
    );
};

export default EditableField;

const EditableContent = styled.div`
    background-color: #f8f8f8;
    border: 1px solid lightgrey;
    min-height: 100px;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    white-space: pre-wrap; /* Allows line breaks */
    overflow-y: auto; /* Enable scrolling if content overflows */
`;
