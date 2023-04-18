import Modal from "../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeGoalFormModal } from "./services/modals/goalFormModalSlice";
import ReactDatePicker from "react-datepicker";
import { BiRepeat } from "react-icons/bi";
import Selection from "../UI/form/Selection";
import "react-datepicker/dist/react-datepicker.css";
import "./salesDashboardForm.css";
import React, { forwardRef, useState, useEffect } from "react";
import Radio from "../UI/form/Radio";
import Input from "../UI/form/Input";
import Checkbox from "../UI/form/Cheeckbox";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import WeekOfYear from "dayjs/plugin/weekOfYear";
import { closeModal } from "./services/modals/salesDashboardModalSlice";
import _ from "lodash";
import PeriodInput from "./PeriodInput";
import axios from "axios";
import AssigneeForDropdown from "./components/AssigneeForDropdown";

const GoalFormModal = ({ isOpen }) => {
    const { title, entry, entryType, edit, showPrevious } = useSelector(
        (s) => s.goalFormModal
    );

    const dispatch = useDispatch();

    const [periodFilter, setPeriodFilter] = useState(false);

    // form data
    const [assigneeType, setAssigneeType] = useState("User");
    const [assigneeFor, setAssigneeFor] = useState({
        id: 0,
        name: "Select User",
    });
    const [pipeline, setPipeline] = useState(["Pipeline"]);
    const [frequency, setFrequency] = useState("Monthly");
    const [durationStart, setDurationStart] = useState(new Date());
    const [durationEnd, setDurationEnd] = useState(null);
    const [currency, setCurrency] = useState("USD");
    const [tracking, setTracking] = useState("");
    const [trackingType, setTrackingType] = useState("value");
    const [dealStage, setDealStage] = useState("Contact Mode");
    const [recurring, setRecurring] = useState([]);

    const [period, setPeriod] = useState([]);

    React.useEffect(() => {
        if (!durationEnd) setPeriodFilter(false);
    }, [durationEnd]);

    // time period control
    React.useEffect(() => {
        dayjs.extend(utc);
        dayjs.extend(quarterOfYear);
        dayjs.extend(isSameOrBefore);
        dayjs.extend(WeekOfYear);

        setRecurring([]);

        // yearly
        const yearly = () => {
            let years = [];
            const yearStart = dayjs(durationStart).startOf("year");
            const yearEnd = dayjs(durationEnd).endOf("year");
            let current = yearStart;

            while (current <= yearEnd) {
                years.push({
                    title: `${current.format("YYYY")}`,
                    start: dayjs(durationStart).format(),
                    end: dayjs(durationEnd).format(),
                });
                current = dayjs(current).add(1, "year");
            }

            setPeriod([...years]);
        };

        // quarterly
        const quarterly = () => {
            let quarters = [];
            const qs = dayjs(durationStart).startOf("quarter");
            const qe = dayjs(durationEnd).endOf("quarter");

            let curr = qs;
            while (curr <= qe) {
                const quarterNumber = dayjs(curr).quarter(); // number of quarter
                let quarterStart = dayjs(curr).format(); // get first date of a quarter start
                let quarterEnd = dayjs(curr)
                    .quarter(quarterNumber)
                    .endOf("quarter")
                    .format(); // get last date of a quarter end

                /*
                 ** if quarter start date less then or equal
                 ** duration start date then start date is duration start date
                 ** else start date is quarter start date
                 */
                quarterStart = dayjs(quarterStart).isSameOrBefore(durationStart)
                    ? dayjs(durationStart).format()
                    : quarterStart;

                /*
                 ** if duration end date less then or equal
                 ** duration end date then end date is duration end date
                 ** else end date is quarter end date
                 */
                quarterEnd = dayjs(durationEnd).isSameOrBefore(quarterEnd)
                    ? dayjs(durationEnd).format()
                    : quarterEnd;

                // create title for period
                const title = `Q${quarterNumber} (${dayjs(quarterStart).format(
                    `MMM DD`
                )} - ${dayjs(quarterEnd).format("MMM DD")}, ${dayjs(
                    quarterEnd
                ).format("YYYY")})`;

                // push quarters
                quarters.push({
                    quarterNumber,
                    title,
                    start: quarterStart,
                    end: quarterEnd,
                });

                curr = dayjs(curr).add(1, "quarter");
            }

            setPeriod([...quarters]);
        };

        // divide by month
        const monthly = () => {
            const months = [];
            const ms = dayjs(durationStart).startOf("month");
            const me = dayjs(durationEnd).endOf("month");

            let curr = ms;

            while (curr <= me) {
                let monthStartDay = dayjs(curr).format();
                let monthEndDay = dayjs(curr).endOf("month").format();

                /*
                 ** if monthStartDay less then or equal
                 ** duration start date then return duration start
                 ** else return monthStartDay
                 */

                monthStartDay = dayjs(monthStartDay).isSameOrBefore(
                    durationStart
                )
                    ? dayjs(durationStart).format()
                    : monthStartDay;

                /*
                 ** if duration end less then or equal
                 ** monthEndDay date then return duration end
                 ** else return monthEndDay
                 */

                monthEndDay = dayjs(durationEnd).isSameOrBefore(monthEndDay)
                    ? dayjs(durationEnd).format()
                    : monthEndDay;

                // push month
                months.push({
                    title: dayjs(curr).format("MMM YYYY"),
                    start: monthStartDay,
                    end: monthEndDay,
                });

                curr = dayjs(curr).add(1, "month");
            }

            setPeriod([...months]);
        };

        // weekly
        const weekly = () => {
            const weeks = [];
            const ws = dayjs(durationStart).startOf("week");
            const we = dayjs(durationEnd).endOf("week");

            let curr = ws;
            while (curr <= we) {
                const weekNumber = dayjs(curr).week();
                let weekStart = dayjs(curr).format();
                let weekEnd = dayjs(curr).endOf("week").format();

                /*
                 ** if week start less then or equal
                 ** duration start then return duration start
                 ** else return week start
                 */
                weekStart = dayjs(weekStart).isSameOrBefore(durationStart)
                    ? dayjs(durationStart).format()
                    : weekStart;

                /*
                 ** if duration end less then or equal
                 ** week end then return duration end
                 ** else return week end
                 */
                weekEnd = dayjs(durationEnd).isSameOrBefore(weekEnd)
                    ? dayjs(durationEnd).format()
                    : weekEnd;

                // title
                const title = `Week ${weekNumber} (${dayjs(weekStart).format(
                    "MMM DD"
                )} - ${dayjs(weekEnd).format("MMM DD")}, ${dayjs(
                    weekEnd
                ).format("YYYY")})`;

                // push
                weeks.push({
                    title,
                    start: weekStart,
                    end: weekEnd,
                });

                curr = dayjs(curr).add(1, "week");
            }

            setPeriod([...weeks]);
        };

        if (durationEnd) {
            if (_.toLower(frequency) === "monthly") {
                monthly();
            } else if (_.toLower(frequency) === "quarterly") {
                quarterly();
            } else if (_.toLower(frequency) === "yearly") {
                yearly();
            } else if (_.toLower(frequency) === "weekly") {
                weekly();
            }
        }
    }, [durationEnd, frequency, durationStart]);
    // end time period control

    // handle recurring
    const handleRecurringChange = (value, period) => {
        setRecurring((prevState) => [...prevState, { ...period, value }]);
    };

    // handle on save
    const handleSave = async (e) => {
        e.preventDefault();
        const data = {
            assigneeType,
            assigneeFor,
            pipeline,
            frequency,
            durationStart,
            durationEnd,
            currency,
            tracking,
            trackingType,
            dealStage,
            recurring,
        };

        let response = await axios.post("/account/insights", data);

        console.log(response);
    };

    // close modal
    const close = () => {
        dispatch(closeGoalFormModal());
        dispatch(closeModal());
    };

    return (
        <Modal isOpen={isOpen}>
            <div className="sp1_ins_sell_dm--container">
                <div>
                    <div className="card sp1_ins_sell_dm--card">
                        {/* header */}
                        <div className="card-header">
                            {title}
                            <button
                                type="button"
                                className="close"
                                aria-label="Close"
                                onClick={close}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {/* end header */}
                        <div className="card-body sp1_ins_sell_dm--card_body">
                            <div className="sp1_sell_df--container">
                                {/* item */}
                                <div className="sp1_sell_df--item">
                                    <div className="sp1_sell_df--title">
                                        Assignee
                                    </div>
                                    <div className="sp1_sell_df--control">
                                        <Selection
                                            value={assigneeType}
                                            onSelected={setAssigneeType}
                                            options={[
                                                "Company(everyone)",
                                                "Team",
                                                "User",
                                            ]}
                                        />
                                        <AssigneeForDropdown
                                            assigneeFor={assigneeFor}
                                            setAssigneeFor={setAssigneeFor}
                                            assigneeType={assigneeType}
                                        />
                                    </div>
                                </div>
                                {/* end item */}

                                {/* item */}
                                <div className="sp1_sell_df--item">
                                    <div className="sp1_sell_df--title">
                                        Pipeline
                                    </div>
                                    <div className="sp1_sell_df--control">
                                        <Selection
                                            value={pipeline}
                                            onSelected={setPipeline}
                                            options={[
                                                "Pipeline",
                                                "New Pipeline",
                                            ]}
                                            searchEnable={true}
                                            removeAble={true}
                                            multiple={
                                                entryType !== "Progressed"
                                            }
                                            placeholder="Select pipeline"
                                            namespace="Pipeline"
                                            enableAllSelection={
                                                entryType !== "Progressed"
                                            }
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
                                    <div className="sp1_sell_df--title">
                                        Frequency
                                    </div>
                                    <div className="sp1_sell_df--control">
                                        <Selection
                                            value={frequency}
                                            onSelected={setFrequency}
                                            options={[
                                                "Weekly",
                                                "Monthly",
                                                "Quarterly",
                                                "Yearly",
                                            ]}
                                        />
                                    </div>
                                </div>
                                {/* end item */}

                                {/* item */}
                                <div className="sp1_sell_df--item">
                                    <div className="sp1_sell_df--title">
                                        Duration
                                    </div>
                                    <div className="sp1_sell_df--control">
                                        <div className="w-100">
                                            <ReactDatePicker
                                                selected={durationStart}
                                                onChange={(date) =>
                                                    setDurationStart(date)
                                                }
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
                                                onChange={(date) =>
                                                    setDurationEnd(date)
                                                }
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
                                                onClick={() =>
                                                    setDurationEnd(null)
                                                }
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
                                    <div className="sp1_sell_df--title">
                                        Tracking metric
                                    </div>
                                    <div className="sp1_sell_df--control pt-2">
                                        <Radio
                                            name="tracking_metric"
                                            defaultChecked={true}
                                            title="Value"
                                            value="value"
                                            onChange={(e) =>
                                                setTrackingType(e.target.value)
                                            }
                                        />
                                        <Radio
                                            name="tracking_metric"
                                            title="Count"
                                            value="count"
                                            onChange={(e) =>
                                                setTrackingType(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                {/* end item */}

                                {/* item */}
                                <div className="sp1_sell_df--item">
                                    <div className="sp1_sell_df--title mt-2 mb-auto">
                                        {trackingType === "value"
                                            ? `Value, ${currency}`
                                            : "Count"}
                                    </div>
                                    <div className="w-100">
                                        <div className="sp1_sell_df--control">
                                            <Input
                                                type="number"
                                                value={tracking}
                                                onChange={(e) =>
                                                    setTracking(e.target.value)
                                                }
                                                placeholder="Insert value"
                                                className="w-auto"
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
                                                onChange={(e) =>
                                                    setPeriodFilter(
                                                        e.target.checked
                                                    )
                                                }
                                                label="Specify individual period goals"
                                            />
                                        </div>
                                        {periodFilter ? (
                                            <React.Fragment>
                                                <div className="d-flex align-items-center justify-content-between mt-3 mb-1">
                                                    <div className="">
                                                        Period
                                                    </div>
                                                    <div className="sp1_sell_df--period-input">
                                                        {trackingType ===
                                                        "value"
                                                            ? `Value, ${currency}`
                                                            : "Count"}
                                                    </div>
                                                </div>

                                                {period?.map((p) => (
                                                    <div
                                                        key={p.title}
                                                        className="sp1_sell_df--control time_period mb-3"
                                                    >
                                                        <div className="sp1_sell_df--period">
                                                            {p.title}
                                                        </div>
                                                        <PeriodInput
                                                            period={p}
                                                            handleRecurringChange={
                                                                handleRecurringChange
                                                            }
                                                        />
                                                    </div>
                                                ))}
                                            </React.Fragment>
                                        ) : null}
                                    </div>
                                </div>
                                {/* end item */}
                            </div>
                        </div>

                        <div className="card-footer d-flex align-items-center justify-content-end">
                            {showPrevious ? (
                                <button
                                    onClick={() =>
                                        dispatch(closeGoalFormModal())
                                    }
                                    className="btn btn-sm btn-outline-secondary mr-auto d-flex align-items-center"
                                >
                                    <i
                                        className="bi bi-arrow-left-short"
                                        style={{ fontSize: "18px" }}
                                    ></i>
                                    Previous
                                </button>
                            ) : null}
                            <button
                                onClick={close}
                                className="btn btn-sm btn-outline-secondary mr-2"
                            >
                                Close
                            </button>

                            <button
                                type="button"
                                onClick={handleSave}
                                className="btn btn-sm btn-success"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default GoalFormModal;

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
