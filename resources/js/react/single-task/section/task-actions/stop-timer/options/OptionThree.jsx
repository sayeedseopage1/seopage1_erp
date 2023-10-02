import React, { useState, useEffect, useMemo } from "react";
import LeaveExplainationOption from "./LeaveExplanationOption";
import LateExplainationOption from "./LateExplanationOption";
import LeavingEarlyExplainationOption from "./LeavingEarlyExplainationOption";
import Button from "../../../../components/Button";
import DidNotWorkForAFewHours from "./DidNotWorkForAFewHours";
import { useSelector } from "react-redux";

const OptionThree = ({ id, onChecked, checked, onSubmit, isSubmitting }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const _checked = useMemo(() => checked, [checked]);
    const {lessTrackDate} = useSelector(s => s.subTask);

    useEffect(() => {
        if (_checked) {
            window.$("#timepicker1").timepicker();
            window.$("#timepicker2").timepicker();
        }
    }, [_checked]);

    const handleOnChange = (e) => {
        if (e.target.checked) {
            onChecked(id);
        } else onChecked(null);
    };

    const parentReason = `I was present less hours at work ${lessTrackDate} `
    return (
        <>
            <div className={checked ? "--option-item mt-3" : "--option-item"}>
                <div
                    className="d-flex align-items-center"
                    style={{ gap: "10px" }}
                >
                    <input
                        type="checkbox"
                        style={{ cursor: "pointer" }}
                        checked={checked}
                        onChange={handleOnChange}
                    />
                    <span className={checked ? "font-weight-bold" : ""}>
                        I was present less hours at work <strong> {lessTrackDate} </strong>
                    </span>
                </div>

                {checked && (
                    <div
                        className="d-flex flex-column pl-4 mt-2"
                        style={{ gap: "10px" }}
                    >
                        <LeaveExplainationOption
                            id="half-leave-option"
                            onChecked={setSelectedOption}
                            onSubmit={onSubmit}
                            isSubmitting={isSubmitting}
                            checked={selectedOption === "half-leave-option"}
                            parentReason={parentReason}
                            lessTrackDate={lessTrackDate}
                        />

                        <LateExplainationOption
                            id="late-option"
                            onChecked={setSelectedOption}
                            onSubmit={onSubmit}
                            isSubmitting={isSubmitting}
                            checked={selectedOption === "late-option"}
                            parentReason={parentReason}
                            lessTrackDate={lessTrackDate}
                        />

                        <LeavingEarlyExplainationOption
                            id="leaving-early-option"
                            onChecked={setSelectedOption}
                            onSubmit={onSubmit}
                            isSubmitting={isSubmitting}
                            checked={selectedOption === "leaving-early-option"}
                            parentReason={parentReason}
                            lessTrackDate={lessTrackDate}
                        />

                        <DidNotWorkForAFewHours
                            id="did-not-work-few-hours"
                            onChecked={setSelectedOption}
                            onSubmit={onSubmit}
                            isSubmitting={isSubmitting}
                            checked={
                                selectedOption === "did-not-work-few-hours"
                            }
                            parentReason={parentReason}
                            lessTrackDate={lessTrackDate}
                        />
                    </div>
                )}

                {checked && !selectedOption && (
                    <div className="mt-3 d-flex align-items-center">
                        <Button
                            variant="tertiary"
                            onClick={() => onChecked(null)}
                            className="ml-auto"
                        >
                            Back
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};

export default OptionThree;
