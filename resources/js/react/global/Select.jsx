import * as React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./select.module.css";
import { useClickAway } from "react-use";
import _ from "lodash";
import { usePopper } from "react-popper";
const css = styles;

const SelectionCtx = React.createContext(null);
const useSelect = () => React.useContext(SelectionCtx);

const Select = ({
    value,
    onChange,
    children,
    display,
    onClick,
    icon = true,
    className = "",
    ...props
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(value);
    const [elementRef, setElementRef] = React.useState(null);
    
    React.useEffect(() => {
        setSelected(value);
    }, [value])

    const toggle = () => setIsOpen(!isOpen);
    const close = () => setIsOpen(false);

    const onSelect = (option) => {
        setSelected(option);
        onChange(option);
    };

    const handleClick = (e) => {
        e.preventDefault()
        toggle();
        onClick && onClick();
    };

    const selectedValue = display(selected);

    return (
        <SelectionCtx.Provider
            value={{
                toggle,
                visible: isOpen,
                close,
                selected,
                onSelect,
                elementRef,
            }}
        >
            <React.Fragment>
                <div ref={setElementRef}>
                    <div
                        className={`${css.select} ${className}`}
                        onMouseDown={handleClick}
                    >
                        <div className={css.content} title={selectedValue}>
                            {selectedValue}
                        </div>
                        {icon && (
                            <i
                                className={`fas fa-caret-${
                                    isOpen ? "up" : "down"
                                } ${css.icon}`}
                            />
                        )}
                    </div>
                    {isOpen ? children : null}
                </div>
            </React.Fragment>
        </SelectionCtx.Provider>
    );
};

const Options = ({ children, className = "",}) => {
    const { elementRef,visible, close } = useSelect();
    const [popperElement, setPopperElement] = React.useState(null);
    // popper
    const { styles, attributes } = usePopper(elementRef, popperElement, {
        placement: "bottom-start",
    });

    React.useEffect(() => {
        let timeout;
        const handleClickOutside = (event) => {
            if (popperElement && !popperElement.contains(event.target)) {
                close();
                clearTimeout(timeout);
                window.removeEventListener("click", handleClickOutside);
            }
        };

        if (visible) {
            timeout = setTimeout(() => {
                window.addEventListener("click", handleClickOutside);
            }, 100);
        } else {
            window.removeEventListener("click", handleClickOutside);
        }
        return () => {
            window.removeEventListener("click", handleClickOutside);
            clearTimeout(timeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible, popperElement]);

    return ReactDOM.createPortal(
        <div
            ref={setPopperElement}
            className={`${css.options} ${className}`}
            style={{ ...styles.popper }}
            {...attributes.popper}
        >
            {children}
        </div>,
        document.getElementById("body")
    );
};

const Search = ({children}) => {
    const [query, setQuery] = React.useState('');
    return(
        <React.Fragment>
            <div className={css.search_box}>
                <input type="search" value={query} placeholder="Search..." onChange={e=>setQuery(e.target.value)} />
            </div>
            <div className={css.wrapper}>
                {children(query)}
            </div>
        </React.Fragment>
    )
}

// option
const Option = ({ value, className = "", children }) => {
    const { selected, visible, close, onSelect } = useSelect();

    let active = false;

    // comparison
    if (typeof value === "object") {
        active = _.isEqual(value, selected);
    } else {
        active = value === selected;
    }

    // className
    const classes = () => {
        if (typeof className === "function") {
            return className({ selected: active });
        } else return className;
    };

    const childNode = () => {
        if (typeof children === "function") {
            return children({ selected: active });
        } else return children;
    };

    // handle click
    const onClick = () => {
        onSelect(value);
        close();
    };

    return (
        <div
            className={`${css.option} ${visible ? css.visible : ""} ${
                active ? css.selected : ""
            } ${classes()}`}
            onMouseDown={onClick}
        >
            {childNode()}
        </div>
    );
};

Select.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
        PropTypes.number,
    ]),
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    display: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
    icon: PropTypes.bool,
};

Options.propType = {
    className: PropTypes.string,
    children: PropTypes.node,
};

Option.propType = {
    value: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
        PropTypes.number,
    ]),
    className: PropTypes.string,
    children: PropTypes.node,
};

Select.Options = Options;
Select.Option = Option;
Select.SearchControllerWrapper = Search;

export default Select;
