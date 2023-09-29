import React, { useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { usePopper } from "react-popper";
import styles from "./person_column.module.css";
import { AnimatePresence, motion } from "framer-motion";
import Avatar from "../../react/global/Avatar";

const css = styles;

const Penel = ({ refElement, isVisible, data }) => {
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);

    const { styles, attributes } = usePopper(refElement, popperElement, {
        placement: "bottom-start",
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [0, 8],
                },
            },
            {
                name: "arrow",
                options: {
                    element: arrowElement,
                },
            },
        ],
    });

    // if(!DOM) return null;

    return ReactDOM.createPortal(
        <AnimatePresence>
            {isVisible && (
                <div
                    ref={setPopperElement}
                    className={`${css.person_container} ${css.popper}`}
                    style={{ ...styles.popper, zIndex: "999" }}
                    {...attributes.popper}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        <div className={css.profile_details}>
                            <>
                                <Avatar
                                    width={45}
                                    height={45}
                                    type="circle"
                                    className={css.avatar}
                                    name={data.name}
                                    src={
                                        data.avatar
                                            ? `/user-uploads/avatar/${data.avatar}`
                                            : null
                                    }
                                />
                            </>
                            <div className={css.profile} style={{ flex: "1" }}>
                                <p className="mb-0">{data.name}</p>
                                <span>{data.slug}</span>
                            </div>
                        </div>
                    </motion.div>

                    <div
                        ref={setArrowElement}
                        className={css.arrow}
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
        <React.Fragment>
            <div className={css.person}>
                <Avatar
                    type="circle"
                    name={name}
                    src={avatar ? `/user-uploads/avatar/${avatar}` : null}
                />
                <a
                    ref={setRefElement}
                    href={profileLink}
                    onMouseOver={() => setIsVisible(true)}
                    onMouseLeave={() => setIsVisible(false)}
                    className={`multiline-ellipsis ${css.person_info} ${css.person}`}
                >
                    {name}
                </a>
            </div>

            <Penel
                data={{ name, avatar, slug, profileLink }}
                isVisible={isVisible}
                refElement={refElement}
            />
        </React.Fragment>
    );
};

PersonColumn.propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    slug: PropTypes.string.isRequired,
    profileLink: PropTypes.string.isRequired,
};

export default PersonColumn;
