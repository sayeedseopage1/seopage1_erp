import { usePopper } from "react-popper";
import { useState, useEffect, useContext, createContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DropdownContext = createContext();

const Item = ({ children, className }) => {
    const { close } = useContext(DropdownContext);
    return (
        <div onClick={close} className={className}>
            {children}
        </div>
    );
};

// toggle
const Toggle = ({ children, className, icon }) => {
    const { toggle, isOpen, setToggleRef } = useContext(DropdownContext);

    return (
        <div className={`sp1_dd-toggle ${className}`}>
            {children}{" "}
            {isOpen ? (
                <i className="fa-solid fa-caret-up" />
            ) : (
                <i className="fa-solid fa-caret-down" />
            )}
        </div>
    );
};

// menu
const Menu = ({ children, className = "" }) => {
    const { isOpen, close, onClickHide, toggleRef, targetRef, setTargetRef } =
        useContext(DropdownContext);

    return (
        <div className={`sp1_dd--menu ${className}`} ref={setTargetRef}></div>
    );
};

const Dropdown = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [toggleRef, setToggleRef] = useState(null);
    const [targetRef, setTargetRef] = useState(null);

    // toggle
    const toggle = () => setIsOpen(!isOpen);

    // close
    const close = () => setIsOpen(false);
    return (
        <DropdownContext.Provider
            value={{
                isOpen,
                setIsOpen,
                toggle,
                close,
                toggleRef,
                setToggleRef,
                targetRef,
                setTargetRef,
                onClickHide,
            }}
        >
            {children}
        </DropdownContext.Provider>
    );
};

Dropdown.Item = Item;
Dropdown.Toggle = Toggle;
Dropdown.Menu = Menu;

export default Dropdown;
