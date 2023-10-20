import * as React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { usePopper } from "react-popper";
import { motion, AnimatePresence } from "framer-motion";

const DropdownContext = React.createContext();

const DropdownProvider = ({ children }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [element, setElement] = React.useState(null);
    const [reference, setReference] = React.useState(null);

    return (
        <DropdownContext.Provider
            value={{
                element,
                setElement,
                reference,
                setReference,
                isOpen,
                setIsOpen,
            }}
        >
            {children}
        </DropdownContext.Provider>
    );
};

// dropdown hooks
const useDropdown = () => {
    const context = React.useContext(DropdownContext);
    if (!context) {
        throw new Error("useDropdown must be used within a DropdownProvider");
    }
    return context;
};

// dropdown item
const DropdownItem = ({
    children,
    className,
    onClick,
    disabled = false,
    ...props
}) => {
    const { setIsOpen } = useDropdown();
    return (
        <div
            onMouseUp={() => (disabled ? null : setIsOpen(false))}
            onClick={(e) => (disabled ? null : onClick ? onClick(e) : null)}
            className={`cnx_dropdown__item ${
                disabled ? "cnx_dropdown__item_disabled}" : ""
            } ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

const DropdownToggle = ({ children, disabled=false, icon = true, className }) => {
    const { setIsOpen, isOpen, setReference } = useDropdown();
    const toggle = () => !disabled && setIsOpen(!isOpen);
    return (
        <div
            ref={setReference}
            className={`cnx_dropdown__toggle ${className}`}
            onClick={toggle}
        >
            {children}
            {icon && (
                <i
                    className={`fas fa-caret-${
                        isOpen ? "up" : "down"
                    } cnx_dropdown__toggle_icon`}
                />
            )}
        </div>
    );
};

// dropdown menu
const DropdownMenu = ({
    children,
    className,
    placement = "bottom-start",
    offset = [0, 3],
    ...props
}) => {
    const { reference, setIsOpen, isOpen } = useDropdown();
    const [popperElement, setPopperElement] = React.useState(null);
    const [width, setWidth] = React.useState(100);

    // generate random id for dropdown menu
    const id = React.useMemo(() => Math.random().toString(36).substr(2, 9), []);

    let DOM = document.getElementById(id);
    const { styles, attributes } = usePopper(reference, popperElement, {
        placement,
        modifiers: [
            {
                name: "offset",
                options: {
                    offset,
                },
            },
            {
                name: "flip",
                options: {
                    fallbackPlacements: ["bottom", "left", "right", "top"],
                },
            },
        ],
    });

    // min width
    React.useEffect(() => {
        if (reference) {
            setWidth(reference.offsetWidth);
        }
    }, [reference]);

    // outside click

    React.useEffect(() => {
        let timeout;
        const handleClickOutside = (event) => {
            if (popperElement && !popperElement.contains(event.target)) {
                setIsOpen(false);
                clearTimeout(timeout);
                window.removeEventListener("click", handleClickOutside);
            }
        };

        if (isOpen) {
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
    }, [isOpen, popperElement]);

    // create element in html body
    React.useEffect(() => {
        const el = document.createElement("div");
        el.id = id;
        document.body.appendChild(el);

        setPopperElement(el);
        return () => {
            document.body.removeChild(el);
        };
    }, []);

    if (!DOM) {
        return null;
    }

    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`cnx_dropdown__menu ${
                        isOpen ? "cnx_dropdown__menu_open" : ""
                    } ${className}`}
                    ref={setPopperElement}
                    style={{ ...styles.popper, minWidth: width }}
                    {...attributes.popper}
                    {...props}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>,
        DOM
    );
};

const Dropdown = ({ children, className = "" }) => {
    return (
        <div className={`cnx_dropdown ${className}`}>
            <DropdownProvider>{children}</DropdownProvider>
        </div>
    );
};

Dropdown.Item = DropdownItem;
Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;

export default Dropdown;

// type

DropdownProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

DropdownItem.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
};

DropdownToggle.propTypes = {
    children: PropTypes.node.isRequired,
    icon: PropTypes.bool,
    className: PropTypes.string,
};

DropdownMenu.propTypes = {
    children:
        PropTypes.node.isRequired ||
        PropTypes.arrayOf(PropTypes.node).isRequired,
    className: PropTypes.string,
    placement: PropTypes.string,
    offset: PropTypes.arrayOf(PropTypes.number),
};

Dropdown.propTypes = {
    className: PropTypes.string,
    children:
        PropTypes.node.isRequired ||
        PropTypes.arrayOf(PropTypes.node).isRequired,
};
