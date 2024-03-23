import React from "react";
import Switch from "../../Switch";
import { CustomInputsInput, CustomInputsTextArea, CustomInputsLabel } from "../Styles/ui";

const CustomInputs = ({
    label,
    value,
    onChange,
    error,
    type,
    placeholder,
    name,
    disabled,
    readOnly,
    required,
    className,
    style,
    id,
    ...props
}) => {
    const handleOnkeypress = (e) => {
        const keyCode = e.keyCode || e.which;
        if (
            (keyCode < 48 || keyCode > 57) && // 0-9
            keyCode !== 8 && // Backspace
            keyCode !== 37 && // Left arrow
            keyCode !== 39 // Right arrow
        ) {
            e.preventDefault();
        }
    };

    return (
        <div className="d-flex flex-column mb-4">
            <CustomInputsLabel>
                {label}
            </CustomInputsLabel>
            <Switch>
                <Switch.Case condition={type === "longText"}>
                    <CustomInputsTextArea
                        id={id}
                        name={name}
                        rows={9}
                        cols={50}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        disabled={disabled}
                        readOnly={readOnly}
                        required={required}
                        className={className}
                        style={style}
                        {...props}
                    />  
                </Switch.Case>
                <Switch.Case condition={type === "text"}>
                    <CustomInputsInput
                        id={id}
                        name={name}
                        value={value}
                        type="text"
                        onChange={onChange}
                        placeholder={placeholder}
                        disabled={disabled}
                        readOnly={readOnly}
                        required={required}
                        className={className}
                        style={style}
                        {...props}
                    />
                </Switch.Case>
                <Switch.Case condition={type === "numeric"}>
                    <CustomInputsInput
                        id={id}
                        name={name}
                        value={value}
                        type="number"
                        onKeyDown={handleOnkeypress}
                        onChange={onChange}
                        placeholder={placeholder}
                        disabled={disabled}
                        readOnly={readOnly}
                        required={required}
                        className={className}
                        style={style}
                        {...props}
                    />
                </Switch.Case>
            </Switch>
            {error && <p className="text-danger py-1">Title is required</p>}
        </div>
    );
};

export default CustomInputs;
