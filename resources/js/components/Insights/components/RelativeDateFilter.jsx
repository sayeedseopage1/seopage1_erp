import { createContext, useContext, useState, useRef, useEffect } from "react";
import { usePopper } from "react-popper";
import Modal from "../../UI/Modal";
import CustomScrollbar from "../../UI/CustomScrollbar";
import "./relativeDateFilter.css";

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

const RelativeDateFilter = () => {
    const [selectedDate, useSelectedDate] = useState("This year");
    const [isOpen, setIsOpen] = useState(false);
    const [refElement, setRefElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);

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

    return (
        <div className="sp1_rdf--container">
            <div
                ref={setRefElement}
                onClick={() => setIsOpen(!isOpen)}
                className="sp1_rdf--toggle"
            >
                {selectedDate}
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
                        <CustomScrollbar maxH={600}>
                            {/* relative date */}
                            <div className="sp1_rdf--menu-title">
                                Relative date
                            </div>
                            <ul className="sp1_rdf--menu-list">
                                {relativeDates.map((r) => (
                                    <li key={`${r}-${Math.random()}`}>{r}</li>
                                ))}
                            </ul>

                            {/* relative date */}
                            <div className="sp1_rdf--menu-title">
                                Relative date
                            </div>
                            <ul className="sp1_rdf--menu-list">
                                {relativePeriod.map((r) => (
                                    <li key={`${r}-${Math.random()}`}>{r}</li>
                                ))}
                            </ul>

                            {/* relative date */}
                            <div className="sp1_rdf--menu-title">
                                Relative date
                            </div>
                            <ul className="sp1_rdf--menu-list">
                                {rollingPeriod.map((r) => (
                                    <li key={`${r}-${Math.random()}`}>{r}</li>
                                ))}
                            </ul>
                        </CustomScrollbar>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RelativeDateFilter;
