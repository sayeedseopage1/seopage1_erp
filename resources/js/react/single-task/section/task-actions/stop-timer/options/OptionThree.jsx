import React, { useState, useEffect, useMemo } from "react";
import LeaveExplainationOption from "./LeaveexplanationOption";
import LateExplainationOption from "./LateExplanationOption";
import LeavingEarlyExplainationOption from "./LeavingEarlyExplainationOption";
import Button from "../../../../components/Button";
import DidNotWorkForAFewHours from "./DidNotWorkForAFewHours";

const OptionThree = ({ id, onChecked, checked, onSubmit, isSubmitting }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const _checked = useMemo(() => checked, [checked]);

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
                        I Had Less Hours To Work Today
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
                            parentReason="I Had Less Hours To Work Today"
                        />

                        <LateExplainationOption
                            id="late-option"
                            onChecked={setSelectedOption}
                            onSubmit={onSubmit}
                            isSubmitting={isSubmitting}
                            checked={selectedOption === "late-option"}
                            parentReason="I Had Less Hours To Work Today"
                        />

                        <LeavingEarlyExplainationOption
                            id="leaving-early-option"
                            onChecked={setSelectedOption}
                            onSubmit={onSubmit}
                            isSubmitting={isSubmitting}
                            checked={selectedOption === "leaving-early-option"}
                            parentReason="I Had Less Hours To Work Today"
                        />

                        <DidNotWorkForAFewHours
                            id="did-not-work-few-hours"
                            onChecked={setSelectedOption}
                            onSubmit={onSubmit}
                            isSubmitting={isSubmitting}
                            checked={
                                selectedOption === "did-not-work-few-hours"
                            }
                            parentReason="I Had Less Hours To Work Today"
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
