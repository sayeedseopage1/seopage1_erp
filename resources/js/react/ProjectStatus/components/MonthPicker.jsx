import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCaretDown } from "react-icons/fa";

const MonthPicker = ({ setMonth, setYear }) => {
    const [startDate, setStartDate] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [endDate, setEndDate] = React.useState("31");
    const [selectedMonthToDisplay, setSelectedMonthToDisplay] = useState(
        "Jan 01, 2023 to Jan 31, 2023"
    );

    const handleMonthChange = (date) => {
        if (date) {
            const month = date.toLocaleString("en-US", { month: "long" });

            const year = date.getFullYear();

            // Create a copy of the date object to avoid mutating it
            const lastDayOfMonth = new Date(date);

            // Set the date to the first day of the next month
            lastDayOfMonth.setMonth(date.getMonth() + 1, 1);

            // Subtract one day to get the last day of the current month
            lastDayOfMonth.setDate(lastDayOfMonth.getDate() - 1);

            // Get the end date of the selected month
            const lastDate = lastDayOfMonth.getDate();
            setEndDate(lastDate);

            setMonth(month);
            setYear(year);

            setSelectedMonthToDisplay(
                ` ${month.slice(0, 3)} 1, ${year} to  ${month.slice(
                    0,
                    3
                )} ${lastDate} , ${year}`
            );

            setShowCalendar(false);
        } else {
            setSelectedMonthToDisplay("");
        }

        setStartDate(date);
    };

    const handleButtonClick = () => {
        setShowCalendar(!showCalendar);
    };

    return (
        <div
            style={{
                display: "flex",
                gap: "10px",
                position: "relative",
            }}
        >
            <div
                onClick={handleButtonClick}
                style={{
                    display: "flex",
                    gap: "2px",
                    cursor: "pointer",
                }}
            >
                <button
                    style={{
                        backgroundColor: "white",
                        height: "35px",
                    }}
                >
                    {selectedMonthToDisplay}
                </button>

                <div style={{ marginTop: "6px" }}>
                    <FaCaretDown />
                </div>
            </div>

            {showCalendar && (
                <div
                    style={{
                        position: "absolute",
                        zIndex: 10000,
                        top: "40px",
                        left: "-5px",
                        width: "250px",
                    }}
                >
                    <DatePicker
                        style={{ width: "250px" }}
                        selected={startDate}
                        onChange={handleMonthChange}
                        showMonthYearPicker
                        inline
                    />
                </div>
            )}
        </div>
    );
};

export default MonthPicker;
