import ReactDatePicker from "react-datepicker";
import { BiRepeat } from "react-icons/bi";
import Selection from "../UI/form/Selection";
import "react-datepicker/dist/react-datepicker.css";
import "./salesDashboardForm.css";
import { forwardRef, useState } from "react";
import Radio from "../UI/form/Radio";
import Input from "../UI/form/Input";
import Checkbox from "../UI/form/Cheeckbox";
import React from "react";

const SalesDashboardForm = ({ entry, entryType }) => {
    // ui
    const [periodFilter, setPeriodFilter] = useState(false);

    // form data
    const [assigneeType, setAssigneeType] = useState("User");
    const [assigneeFor, setAssigneeFor] = useState("Md Mehedi Hasan");
    const [pipeline, setPipeline] = useState(["Pipeline"]);
    const [frequency, setFrequency] = useState("Monthly");
    const [durationStart, setDurationStart] = useState(new Date());
    const [durationEnd, setDurationEnd] = useState(null);
    const [currency, setCurrency] = useState("USD");
    const [tracking, setTracking] = useState("");
    const [trackingType, setTrackingType] = useState("value");
    const [dealStage, setDealStage] = useState("Contact Mode");

    React.useEffect(() => {
        if (!durationEnd) {
            setPeriodFilter(false);
        }
    }, [durationEnd]);

    return (
        <div className="sp1_sell_df--container">
            {/* item */}
            <div className="sp1_sell_df--item">
                <div className="sp1_sell_df--title">Assignee</div>
                <div className="sp1_sell_df--control">
                    <Selection
                        value={assigneeType}
                        onSelected={setAssigneeType}
                        options={["Company(everyone)", "Team", "User"]}
                    />
                    <Selection
                        value={assigneeFor}
                        onSelected={setAssigneeFor}
                        options={[
                            "Abut Sayeed",
                            "Billba Mergu",
                            "Md Mehedi Hasan",
                        ]}
                        searchEnable={true}
                    />
                </div>
            </div>
            {/* end item */}

            {/* item */}
            <div className="sp1_sell_df--item">
                <div className="sp1_sell_df--title">Pipeline</div>
                <div className="sp1_sell_df--control">
                    <Selection
                        value={pipeline}
                        onSelected={setPipeline}
                        options={["Pipeline", "New Pipeline"]}
                        searchEnable={true}
                        removeAble={true}
                        multiple={entryType !== "Progressed"}
                        placeholder="Select pipeline"
                        namespace="Pipeline"
                        enableAllSelection={entryType !== "Progressed"}
                    />

                    {entryType === "Progressed" ? (
                        <Selection
                            value={dealStage}
                            onSelected={setDealStage}
                            options={[
                                "Contact Mode",
                                "Qualified",
                                "Requirements Defined",
                                "Proposal Made",
                                "Negotiations Started",
                            ]}
                        />
                    ) : null}
                </div>
            </div>
            {/* end item */}

            {/* item */}
            <div className="sp1_sell_df--item">
                <div className="sp1_sell_df--title">Frequency</div>
                <div className="sp1_sell_df--control">
                    <Selection
                        value={frequency}
                        onSelected={setFrequency}
                        options={["Weekly", "Monthly", "Quarterly", "Yearly"]}
                    />
                </div>
            </div>
            {/* end item */}

            {/* item */}
            <div className="sp1_sell_df--item">
                <div className="sp1_sell_df--title">Duration</div>
                <div className="sp1_sell_df--control">
                    <div className="w-100">
                        <ReactDatePicker
                            selected={durationStart}
                            onChange={(date) => setDurationStart(date)}
                            selectsStart
                            startDate={durationStart}
                            endDate={durationEnd}
                            selectsDisabledDaysInRange
                            customInput={<DateInput />}
                        />
                    </div>
                    <span>-</span>
                    <div className="position-relative w-100">
                        <ReactDatePicker
                            selected={durationEnd}
                            onChange={(date) => setDurationEnd(date)}
                            selectsEnd
                            disabledKeyboardNavigation
                            startDate={durationStart}
                            endDate={durationEnd}
                            minDate={durationStart}
                            placeholderText="No end date"
                            selectsDisabledDaysInRange
                            customInput={<DateInput />}
                        />
                        <button
                            onClick={() => setDurationEnd(null)}
                            className="sp1_clear_time"
                            aria-describedby="clearEndDate"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            </div>
            {/* end item */}

            {/* item */}
            <div className="sp1_sell_df--item">
                <div className="sp1_sell_df--title">Tracking metric</div>
                <div className="sp1_sell_df--control pt-2">
                    <Radio
                        name="tracking_metric"
                        defaultChecked={true}
                        title="Value"
                        value="value"
                        onChange={(e) => setTrackingType(e.target.value)}
                    />
                    <Radio
                        name="tracking_metric"
                        title="Count"
                        value="count"
                        onChange={(e) => setTrackingType(e.target.value)}
                    />
                </div>
            </div>
            {/* end item */}

            {/* item */}
            <div className="sp1_sell_df--item">
                <div className="sp1_sell_df--title mt-2 mb-auto">
                    {trackingType === "value" ? `Value, ${currency}` : "Count"}
                </div>
                <div className="w-100">
                    <div className="sp1_sell_df--control">
                        <Input
                            type="number"
                            value={tracking}
                            onChange={(e) => setTracking(e.target.value)}
                            placeholder="Insert value"
                        />
                        {periodFilter ? (
                            <button className="btn btn-sm btn-light text-primary font-weight-bold">
                                Apply to all
                            </button>
                        ) : (
                            <div
                                className="p-1"
                                data-toggle="tooltip"
                                data-placement="right"
                                title="Recurring"
                            >
                                <BiRepeat
                                    style={{
                                        rotate: "180deg",
                                        fontSize: "18px",
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <div
                        className="mt-2"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Select duration end date to enable this feature"
                        style={{ width: "fit-content" }}
                    >
                        <Checkbox
                            value=""
                            disabled={!durationEnd}
                            checked={periodFilter}
                            onChange={(e) => setPeriodFilter(e.target.checked)}
                            label="Specify individual period goals"
                        />
                    </div>
                    {periodFilter ? (
                        <React.Fragment>
                            <div className="d-flex align-items-center justify-content-between mt-3 mb-1">
                                <div className="">Period</div>
                                <div className="sp1_sell_df--period-input">
                                    {trackingType === "value"
                                        ? `Value, ${currency}`
                                        : "Count"}
                                </div>
                            </div>

                            {/* period item */}
                            <div className="sp1_sell_df--control time_period mb-3">
                                <div className="sp1_sell_df--period">
                                    April-2023
                                </div>
                                <Input
                                    type="number"
                                    value={tracking}
                                    className="sp1_sell_df--period-input"
                                    onChange={(e) =>
                                        setTracking(e.target.value)
                                    }
                                    placeholder="Insert value"
                                />
                            </div>
                            {/* end period item */}

                            {/* period item */}
                            <div className="sp1_sell_df--control time_period mb-3">
                                <div className="sp1_sell_df--period">
                                    April-2023
                                </div>
                                <Input
                                    type="number"
                                    value={tracking}
                                    className="sp1_sell_df--period-input"
                                    onChange={(e) =>
                                        setTracking(e.target.value)
                                    }
                                    placeholder="Insert value"
                                />
                            </div>
                            {/* end period item */}

                            {/* period item */}
                            <div className="sp1_sell_df--control time_period mb-3">
                                <div className="sp1_sell_df--period">
                                    April-2023
                                </div>
                                <Input
                                    type="number"
                                    value={tracking}
                                    className="sp1_sell_df--period-input"
                                    onChange={(e) =>
                                        setTracking(e.target.value)
                                    }
                                    placeholder="Insert value"
                                />
                            </div>
                            {/* end period item */}
                        </React.Fragment>
                    ) : null}
                </div>
            </div>
            {/* end item */}
        </div>
    );
};

export default SalesDashboardForm;

const DateInput = forwardRef(
    ({ value, placeholder, onClick, ...props }, ref) => (
        <button
            className="sp1_selection--toggle sp1_sell_df--datepicker"
            onClick={onClick}
            ref={ref}
            style={{ gap: 0 }}
        >
            {value || placeholder}
        </button>
    )
);
