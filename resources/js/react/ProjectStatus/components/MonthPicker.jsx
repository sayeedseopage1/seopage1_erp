import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCaretDown } from "react-icons/fa";
const MonthPicker = () => {
    const [startDate, setStartDate] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(
        "Jan 01, 2023 to Jan 31, 2023"
    );

    const [selectedMonthToDisplay, setSelectedMonthToDisplay] = useState(
        "Jan 01, 2023 to Jan 31, 2023"
    );

    const handleMonthChange = (date) => {
        if (date) {
            const startMonth = date.toLocaleString("en-US", { month: "long" });

            const year = date.getFullYear();

            setSelectedMonthToDisplay(
                ` ${startMonth.slice(0, 3)} 1, ${year} to  ${startMonth.slice(
                    0,
                    3
                )} 31 , ${year}`
            );

            setShowCalendar(false);
        } else {
            setSelectedMonthTODisplay("");
        }

        setStartDate(date);
    };

    const handleButtonClick = () => {
        setShowCalendar(!showCalendar);
        setStartDate(new Date());
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
                style={{
                    display: "flex",
                    gap: "2px",
                }}
            >
                <button
                    onClick={handleButtonClick}
                    style={{
                        backgroundColor: "white",
                        cursor: "pointer",
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
