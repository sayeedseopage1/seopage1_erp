import React, { useState } from "react";
const TimeLogHIstoryModal = React.lazy(() =>
    import("./TimeLogHistoryModal")
);

const MissedDayCount = ({ row }) => {
    const [isOpen, setIsOpen] = useState(false);
    const close = (e) => {
        e.preventDefault();
        setIsOpen(false);
    };
    return (
        <React.Fragment>
            <button
                type="button"
                aria-level="MissedDayCountModalToggleButton"
                onClick={() => setIsOpen(true)}
                className="px-2 bg-transparent hover-bold"
            >
                32
            </button>
            <React.Suspense fallback={<>Loading...</>}>
            <TimeLogHIstoryModal isOpen={isOpen} close={close} row={row} />
            </React.Suspense>
        </React.Fragment>
    );
};

export default MissedDayCount;
