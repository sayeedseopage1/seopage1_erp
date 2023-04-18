import { createContext, useContext, useState, useRef, useEffect } from "react";
import { usePopper } from "react-popper";
import Modal from "./Modal";

const DropdownContext = createContext();

const Toggle = ({ children, className, icon = true }) => {
    const { toggle, isOpen, setToggleRef } = useContext(DropdownContext);

    return (
        <div
            ref={setToggleRef}
            onClick={toggle}
            className={`mr-2 ${className} ${isOpen ? " active" : ""}`}
        >
            {children}
            {icon ? (
                isOpen ? (
                    <i className="fa-solid fa-caret-up" />
                ) : (
                    <i className="fa-solid fa-caret-down" />
                )
            ) : null}
        </div>
    );
};

const Menu = ({ children, className, asModal = false, ...props }) => {
    const { isOpen, close, onClickHide, toggleRef, targetRef, setTargetRef } =
        useContext(DropdownContext);
    const ref = useRef(null);

    const { styles, attributes } = usePopper(toggleRef, targetRef, {
        placement: "bottom-start",
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [0, 6],
                },
            },
        ],
    });

    // outside click
    useEffect(() => {
        let timeout;
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                close();
                clearTimeout(timeout);
            }
        };

        if (isOpen) {
            timeout = setTimeout(
                () => window.addEventListener("click", handleClickOutside),
                100
            );
        }
        return () => {
            clearTimeout(timeout);
            window.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen]);

    return asModal ? (
        <Modal isOpen={isOpen} close={close}>
            <div ref={ref}>
                <div
                    onClick={() => (onClickHide ? close() : null)}
                    ref={setTargetRef}
                    className={className}
                    style={styles.popper}
                    {...attributes}
                >
                    {children}
                </div>
            </div>
        </Modal>
    ) : isOpen ? (
        <div ref={ref}>
            <div
                onClick={() => (onClickHide ? close() : null)}
                ref={setTargetRef}
                className={className}
                style={styles.popper}
                {...attributes}
            >
                {children}
            </div>
        </div>
    ) : null;
};

const Dropdown = ({ children, className, onClickHide = true }) => {
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
            <div className={className}>{children}</div>
        </DropdownContext.Provider>
    );
};

Dropdown.Toggle = Toggle;
Dropdown.Menu = Menu;

export default Dropdown;
