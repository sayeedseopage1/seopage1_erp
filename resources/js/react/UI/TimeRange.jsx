import ReactDatePicker from "react-datepicker";
import "./time-range.css";
import { forwardRef } from "react";
import "react-datepicker/dist/react-datepicker.css";

const TimeRange = ({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    startDatePlaceholder = "MM/DD/YYYY",
    endDatePlaceholder = "MM/DD/YYYY",
}) => {
    return (
        <div className="sp1_time_range--container">
            <div className="w-100">
                <ReactDatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText={startDatePlaceholder}
                    selectsDisabledDaysInRange
                    customInput={<DateInput />}
                />
            </div>
            <span>-</span>
            <div className="position-relative w-100">
                <ReactDatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    disabledKeyboardNavigation
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText={endDatePlaceholder}
                    selectsDisabledDaysInRange
                    customInput={<DateInput />}
                />
            </div>
        </div>
    );
};

export default TimeRange;

const DateInput = forwardRef(
    ({ value, placeholder, onClick, ...props }, ref) => (
        <button
            className="sp1_time_range--input"
            onClick={onClick}
            ref={ref}
            style={{ gap: 0 }}
        >
            {value || placeholder}
        </button>
    )
);
