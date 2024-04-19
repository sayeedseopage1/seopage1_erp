import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./popover.module.css";
import { usePopper } from "react-popper";
import { AnimatePresence, motion } from "framer-motion";
import _ from "lodash";

const css = styles;

const PopoverCtx = React.createContext(null);
const usePopover = () => React.useContext(PopoverCtx);

// popover Panel

const Panel = ({ children, className, placement = "auto", ...props }) => {
    const { isVisible, refElement, popperElement, setPopperElement } =
        usePopover();

    // generate random id for dropdown menu
    const [dom, setDom] = useState(null);

    React.useEffect(() => {
        const el = document.createElement("div");
        el.setAttribute("id", "sp1_popover");
        const body = document.querySelector("body");
        if (isVisible) {
            body.appendChild(el);
            setDom(el);
        } else {
            let element = body.querySelector(`#sp1_popover`);
            if (element) {
                body.removeChild(element);
            }
        }
    }, [isVisible]);

    const { styles, attributes } = usePopper(refElement, popperElement, {
        placement,
    });

    if (!dom) return null;

    const element = isVisible && (
        <div
            ref={setPopperElement}
            style={{
                ...styles.popper,
                zIndex: 999,
                width: "fit-content",
                paddingTop: "10px",
            }}
            {...attributes.popper}
        >
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                    >
                        {_.isFunction(children)
                            ? children({ isVisible })
                            : children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

    return ReactDOM.createPortal(element, dom);
};

// popover toggle
const Toggle = ({ children, className, ...props }) => {
    const { setRefElement, isVisible, setIsVisible } = usePopover();
    return (
        <div
            ref={setRefElement}
            className={`${css.popover_toggle} ${className}`}
            onMouseOver={() => {
                setIsVisible(true);
            }}
            tabIndex={0}
            onKeyDown={() => {
                setIsVisible(true);
            }}
            role="button"
            {...props}
        >
            {_.isFunction(children) ? children({ isVisible }) : children}
        </div>
    );
};

// popover
const Popover = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [refElement, setRefElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);

    const popoverValue = useMemo(() => {
        return {
            isVisible,
            setIsVisible,
            refElement,
            setRefElement,
            popperElement,
            setPopperElement,
            arrowElement,
            setArrowElement,
        };
    });

    return (
        <PopoverCtx.Provider value={popoverValue}>
            <div
                onMouseLeave={() => setIsVisible(false)}
                tabIndex={0}
                role="button"
                className="singleline-ellipsis"
            >
                {children}
            </div>
        </PopoverCtx.Provider>
    );
};

Popover.Panel = Panel;
Popover.Button = Toggle;

export default Popover;

Popover.propTypes = {
    children: PropTypes.node.isRequired,
};

Panel.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    placement: PropTypes.string,
};

Toggle.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};
