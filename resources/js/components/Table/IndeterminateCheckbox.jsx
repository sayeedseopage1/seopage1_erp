import React from "react";

const IndeterminateCheckbox = ({ indeterminate, className = "", ...rest }) => {
    const ref = React.useRef(null);

    React.useEffect(() => {
        if (typeof indeterminate === "boolean") {
            ref.current.indeterminate = !rest.checked && indeterminate;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref, indeterminate]);

    return (
        <input
            type="checkbox"
            ref={ref}
            className={className + " cursor-pointer"}
            {...rest}
        />
    );
};

export default IndeterminateCheckbox;
