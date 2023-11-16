import React from 'react';

/**
 * * Textarea component
 * * This component is used to render a textarea
 * * This component height increases automatically based on the content
 */

const Textarea = (props) => {
    const ref = React.useRef(null);

    // use layout effect to set the height of the textarea
    React.useLayoutEffect(() => {
        // set the height of the textarea
        ref.current.style.height = "auto";
        ref.current.style.height = ref.current.scrollHeight + "px";
    }, [props.value]);

    return(
        <React.Fragment>
            <textarea ref={ref} {...props} />
        </React.Fragment>
    )
}

export default Textarea;