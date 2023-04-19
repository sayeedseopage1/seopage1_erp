import { useState } from "react";
import { usePopper } from "react-popper";
import RelativeDateFilter from "./RelativeDateFilter";
import "./period-filter.css";
import TimeRange from "../../UI/TimeRange";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const UsersFilterDropdown = ({ filteredUser, setFilteredUser }) => {
    const { users, teams } = useSelector((s) => s.assignee);
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("User");
    const [refElement, setRefElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);

    const [closeButton, setCloseButton] = useState(false);

    const { styles, attributes } = usePopper(refElement, popperElement, {
        placement: "bottom-start",
        modifiers: [
            { name: "flip", options: ["right", "top", "left", "bottom"] },
            { name: "offset", options: { offset: [0, 3] } },
        ],
    });

    // close outside click
    useEffect(() => {
        let timer;

        const outsideClick = (e) => {
            if (popperElement && !popperElement.contains(e.target)) {
                setIsOpen(false);
                window.removeEventListener("click", outsideClick);
                clearTimeout(timer);
            }
        };

        if (isOpen && popperElement) {
            timer = setTimeout(
                () => window.addEventListener("click", outsideClick),
                100
            );
        }

        return () => {
            window.removeEventListener("click", outsideClick);
            clearTimeout(timer);
        };
    }, [popperElement]);

    const clearState = () => {
        setTitle("Users");
        setCloseButton(false);
    };

    // handle time selection
    const handleTimePeriodSelect = (v) => {
        setTitle(v);
        setCloseButton(true);
    };

    return (
        <div className="sp1_period--container">
            <div className="sp1_period--toggle-wrapper">
                <div
                    ref={setRefElement}
                    onClick={() => setIsOpen(!isOpen)}
                    className="sp1_period--toggle"
                >
                    <i className="fa-solid fa-user"></i>
                    {title}
                    <i className="fa-solid fa-caret-down ml-2" />
                </div>
                {closeButton && (
                    <button aria-label="close" onClick={clearState}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                )}
            </div>

            {isOpen && (
                <div
                    ref={setPopperElement}
                    className="sp1_period--menu"
                    style={styles.popper}
                    {...attributes}
                >
                    {users.length > 0 ? (
                        <React.Fragment></React.Fragment>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default UsersFilterDropdown;
