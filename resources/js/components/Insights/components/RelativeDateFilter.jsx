import { createContext, useContext, useState, useRef, useEffect } from "react";
import { usePopper } from "react-popper";
import Modal from "../../UI/Modal";
import CustomScrollbar from "../../UI/CustomScrollbar";
import Search from "../../UI/form/Search";
import "./relativeDateFilter.css";
import _ from "lodash";

const relativeDates = ["Yesterday", "Today", "Tomorrow"];
const relativePeriod = [
    "This Week",
    "Last Week",
    "Next Week",
    "Last Two Week",
    "This Month",
    "Last Month",
    "Next Month",
    "This Quarter",
    "Next Quarter",
    "Last Quarter",
    "This Year",
    "Last Year",
    "Next Year",
];

const rollingPeriod = [
    "Past 7 days",
    "Next 7 days",
    "Past 2 weeks",
    "Next 2 weeks",
    "Past 1 month",
    "Past 3 months",
    "past 6 months",
    "Past 12 months",
    "Next 1 months",
    "Next 3 months",
    "Next 6 months",
    "Next 12 months",
];

const RelativeDateFilter = ({ selected, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [refElement, setRefElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [defaultHover, setDefaultHover] = useState("");

    const searchRef = useRef(null);

    // auto focus
    useEffect(() => {
        if (isOpen && searchRef) {
            searchRef.current?.focus();
        }
    }, [isOpen, searchRef]);

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

    // popper configuration
    const { styles, attributes } = usePopper(refElement, popperElement, {
        placement: "bottom-start",
        modifiers: [
            {
                name: "flip",
                options: {
                    fallbackPlacements: ["top", "right", "left", "bottom"],
                },
            },
        ],
    });

    // end popper configuration

    // relative dates
    const filteredRelativeDates = relativeDates.filter((d) =>
        _.lowerCase(d).includes(_.lowerCase(searchText))
    );

    // relative period
    const filteredPeriod = relativePeriod.filter((p) =>
        _.lowerCase(p).includes(_.lowerCase(searchText))
    );

    // rolling period
    const filteredRollingPeriod = rollingPeriod.filter((r) =>
        _.lowerCase(r).includes(_.lowerCase(searchText))
    );

    // set default hover
    useEffect(() => {
        setDefaultHover(filteredRelativeDates[0]);
    }, []);

    // handle selection
    const handleSelect = (r) => {
        onSelect && onSelect(r);
        setIsOpen(false);
    };

    return (
        <div className="sp1_rdf--container">
            <div
                ref={setRefElement}
                onClick={() => setIsOpen(!isOpen)}
                className="sp1_rdf--toggle"
            >
                {selected}
                {isOpen ? (
                    <i className="fa-solid fa-caret-up" />
                ) : (
                    <i className="fa-solid fa-caret-down" />
                )}
            </div>

            {isOpen && (
                <div
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes}
                >
                    <div className="sp1_rdf--menu">
                        {/* search box */}
                        <div className="p-2">
                            <Search
                                ref={searchRef}
                                value={searchText}
                                onChange={setSearchText}
                            />
                        </div>
                        {/* search box end */}
                        <CustomScrollbar maxH={600}>
                            <div className="mb-2">
                                {/* relative date */}
                                {filteredRelativeDates.length > 0 && (
                                    <>
                                        <div className="sp1_rdf--menu-title">
                                            Relative date
                                        </div>
                                        <ul className="sp1_rdf--menu-list">
                                            {filteredRelativeDates.map((r) => (
                                                <li
                                                    onClick={() =>
                                                        setSelectedDate(r)
                                                    }
                                                    key={`${r}-${Math.random()}`}
                                                    onMouseOver={() =>
                                                        setDefaultHover(r)
                                                    }
                                                    className={`${
                                                        defaultHover === r
                                                            ? "hover"
                                                            : ""
                                                    }`}
                                                >
                                                    {r}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                                {/* relative date */}
                                {filteredPeriod.length > 0 && (
                                    <>
                                        <div className="sp1_rdf--menu-title">
                                            Relative date
                                        </div>
                                        <ul className="sp1_rdf--menu-list">
                                            {filteredPeriod.map((r) => (
                                                <li
                                                    onClick={() =>
                                                        handleSelect(r)
                                                    }
                                                    key={`${r}-${Math.random()}`}
                                                    onMouseOver={() =>
                                                        setDefaultHover(r)
                                                    }
                                                    className={`${
                                                        defaultHover === r
                                                            ? "hover"
                                                            : ""
                                                    }`}
                                                >
                                                    {r}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                                {/* relative date */}
                                {filteredRollingPeriod.length > 0 && (
                                    <>
                                        <div className="sp1_rdf--menu-title">
                                            Relative date
                                        </div>
                                        <ul className="sp1_rdf--menu-list">
                                            {filteredRollingPeriod.map((r) => (
                                                <li
                                                    onClick={() =>
                                                        handleSelect(r)
                                                    }
                                                    key={`${r}-${Math.random()}`}
                                                    onMouseOver={() =>
                                                        setDefaultHover(r)
                                                    }
                                                    className={`${
                                                        defaultHover === r
                                                            ? "hover"
                                                            : ""
                                                    }`}
                                                >
                                                    {r}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                <div className="sp1_rdf--custom">
                                    <ul className="sp1_rdf--menu-list">
                                        <li
                                            onClick={() =>
                                                handleSelect("Custom Period")
                                            }
                                            onMouseOver={() =>
                                                setDefaultHover("Custom Period")
                                            }
                                            className={`${
                                                defaultHover === "Custom Period"
                                                    ? "hover"
                                                    : ""
                                            }`}
                                        >
                                            Custom Period
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </CustomScrollbar>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RelativeDateFilter;
