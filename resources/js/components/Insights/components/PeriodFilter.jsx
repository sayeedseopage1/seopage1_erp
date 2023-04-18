import { useState } from "react";
import { usePopper } from "react-popper";
import RelativeDateFilter from "./RelativeDateFilter";

const PeriodFilter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [refElement, setRefElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState("");

    const { styles, attributes } = usePopper(refElement, popperElement, {
        placement: "bottom-start",
        modifiers: [
            { name: "flip", options: ["right", "top", "left", "bottom"] },
        ],
    });

    return (
        <div className="sp1_period--container">
            <div onClick={() => setIsOpen(true)} className="sp1_period--toggle">
                toggle
            </div>

            {isOpen && (
                <div
                    className="sp1_period--menu"
                    style={styles.popper}
                    {...attributes}
                >
                    <RelativeDateFilter
                        selected={selectedPeriod}
                        onSelect={setSelectedPeriod}
                    />

                    <div className=""></div>
                </div>
            )}
        </div>
    );
};

export default PeriodFilter;
