import React, { useState } from "react";
import TimeLogHIstoryModal from "./TimeLogHistoryModal";


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
                className="px-2 font-weight-bold sp1_tlh_resolve_btn"
            >
                <span className="">{row?.missed_hours_count}</span>
            </button>
            <TimeLogHIstoryModal isOpen={isOpen} close={close} row={row} />
        </React.Fragment>
    );
};

export default MissedDayCount;
