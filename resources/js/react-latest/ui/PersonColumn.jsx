import React, { useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { usePopper } from "react-popper";
import styles from "./person_column.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import Avatar from "../../react/global/Avatar";

const Penel = ({ refElement, isVisible }) => {
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);

    // generate random id for dropdown menu
    const id = React.useMemo(() => Math.random().toString(36).substr(2, 9), []);

    // render dom
    useEffect(() => {
        if (isVisible) {
            const el = document.createElement("div");
            el.id = id;
            document.body.appendChild(el);
        } else if (DOM) {
            document.body.removeChild(DOM);
        }
    }, [isVisible]);

    const { styles, attributes } = usePopper(refElement, popperElement, {
        modifiers: [
            {
                name: "arrow",
                options: {
                    element: arrowElement,
                },
            },
        ],
    });

    let DOM = document.getElementById(id);

    // if(!DOM) return null;

    return ReactDOM.createPortal(
        <AnimatePresence>
            {isVisible && (
                <div
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes.popper}
                >

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                       <div className={styles.profile_details}>
                            <Avatar
                                type="" 
                            />
                       </div>
                        
                    </motion.div>


                    <div
                        ref={setArrowElement}
                        className={styles.arrow}
                        style={styles.arrow}
                    />
                </div>
            )}
        </AnimatePresence>,
        document.querySelector("#body")
    );
};

const PersonColumn = ({ name, avatar, slug, profileLink }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [refElement, setRefElement] = useState(null);

    return (
        <div onMouseLeave={() => setIsVisible(false)}>
            <a
                ref={setRefElement}
                href={profileLink}
                onMouseOver={() => setIsVisible(true)}
                className={`multiline-ellipsis ${styles.person}`}
            >
                {name}
            </a>

            <Penel isVisible={isVisible} refElement={refElement} />
        </div>
    );
};

PersonColumn.propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    profileLink: PropTypes.string.isRequired,
};

export default PersonColumn;
