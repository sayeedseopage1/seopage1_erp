import * as React from 'react';
import PropTypes from 'prop-types';

const EditAbleBox = ({text, onSave}) => {
    const [value, setValue] = React.useState(text);
    const wrapperRef = React.useRef(null);
    const inputRef = React.useRef(null); 


    React.useEffect(() => {
        // change input width to fit text
        const width = wrapperRef.current.offsetWidth;
        inputRef.current.style.width = `${width}px`; 

    }, [wrapperRef, value]);

    React.useEffect(() => {
        setValue(text);
    }, [text])


    const onBlur = (e) => {
        if (e.target.value !== text) {
            onSave(e.target.value);
        } 
    }

    return(
        <div className="cnx__editable_box">
            <div ref={wrapperRef} > {value} </div>
            <input 
                type="text" 
                ref={inputRef}
                value={value} 
                onChange={e => setValue(e.target.value)} 
                onBlur={onBlur}
                className='cnx__editable_box__input'
            />
            <i className="fas fa-pencil-alt cnx__editable_box__icon"></i>
        </div>
    )
}

EditAbleBox.propTypes = {
    text: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired
}

export default EditAbleBox;