import { useState } from "react";
import { usePopper } from "react-popper";
import RelativeDateFilter from "./RelativeDateFilter";
import "./period-filter.css";
import TimeRange from "../../UI/TimeRange";
import { useEffect } from "react";

const PeriodFilter = ({
    selectedPeriod,
    setSelectedPeriod,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("Period");
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
        setSelectedPeriod("Today");
        setStartDate(null);
        setEndDate(null);
        setTitle("Period");
        setCloseButton(false);
    };

    // change title
    useEffect(() => {
        if (startDate || endDate) {
            setTitle("Custom Period");
            setSelectedPeriod("Custom Period");
            setCloseButton(true);
            return;
        }
    }, [startDate, endDate]);

    // handle time selection
    const handleTimePeriodSelect = (v) => {
        setSelectedPeriod(v);
        setTitle(v);
        setEndDate(null);
        setStartDate(null);
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
                    <i className="fa-solid fa-calendar-day"></i>
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
                    <RelativeDateFilter
                        selected={selectedPeriod}
                        onSelect={handleTimePeriodSelect}
                    />

                    <div className="mt-2">
                        <TimeRange
                            startDate={startDate}
                            setStartDate={setStartDate}
                            endDate={endDate}
                            setEndDate={setEndDate}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PeriodFilter;
