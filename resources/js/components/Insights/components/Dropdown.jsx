import { usePopper } from "react-popper";
import { useState, useEffect, useContext, createContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./dropdown.css";

const DropdownContext = createContext();

const Item = ({ children, className = "className", ...props }) => {
    const { close } = useContext(DropdownContext);
    return (
        <div
            onMouseUp={close}
            className={`sp1_dd--item ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

// toggle
const Toggle = ({ children, className, icon }) => {
    const { toggle, isOpen, setToggleRef } = useContext(DropdownContext);

    return (
        <div
            ref={setToggleRef}
            onClick={toggle}
            className={`sp1_dd-toggle ${className}`}
        >
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
    const { isOpen, close, toggleRef, targetRef, setTargetRef } =
        useContext(DropdownContext);

    const { styles, attributes } = usePopper(toggleRef, targetRef, {
        placement: "bottom-start",
        modifiers: [
            { name: "flip", options: ["right", "left", "top", "bottom"] },
        ],
    });

    // out side click action
    useEffect(() => {
        let timeout;

        const outsideClick = (event) => {
            if (targetRef && !targetRef.contains(event.target)) {
                close();
                window.removeEventListener("click", outsideClick);
                clearTimeout(timeout);
            }
        };

        timeout = setTimeout(() => {
            window.addEventListener("click", outsideClick);
        }, 100);

        return () => {
            window.removeEventListener("click", outsideClick);
            clearTimeout(timeout);
        };
    }, [isOpen, targetRef]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`${className}`}
                    ref={setTargetRef}
                    style={styles.popper}
                    {...attributes}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
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
