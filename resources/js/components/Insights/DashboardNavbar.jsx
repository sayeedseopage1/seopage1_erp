import { forwardRef } from "react";
import Dropdown from "../UI/Dropdown";
import React, { useEffect, useRef, useState } from "react";
import ReactDatePicker from "react-datepicker";

const DashboardNavbar = () => {
    const [dashboardName, setDashboardName] = useState("My Dashboard");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [titleBoxWidth, setTitleBoxWidth] = useState(0);
    const dashboardTitleRef = useRef(null);

    useEffect(() => {
        const width = dashboardTitleRef.current.offsetWidth + 70;
        setTitleBoxWidth(width);
    }, [dashboardName, dashboardTitleRef]);

    useEffect(() => {
        const width = dashboardTitleRef.current.offsetWidth + 70;
        setTitleBoxWidth(width);
    }, []);

    return (
        <div className="d-flex align-items-center justify-content-between">
            <div className="sp1_d--title">
                <div ref={dashboardTitleRef}>{dashboardName}</div>
                <input
                    type="text"
                    value={dashboardName}
                    onChange={(e) => setDashboardName(e.target.value)}
                    style={{ width: titleBoxWidth }}
                />

                <i className="fa-solid fa-pen" />
            </div>

            <div className="d-flex align-items-center">
                <div className="d-flex">
                    {/* time period filter button */}
                    <Dropdown onClickHide={false}>
                        <Dropdown.Toggle
                            icon={false}
                            className="sp1_d--time-filter-toggle"
                        >
                            <div className="d-flex sp1_d--time-filter">
                                <div className="sp1_d--time-tt">
                                    <i className="fa-solid fa-calendar-day"></i>
                                    <span> Period </span>
                                    <i className="fa-solid fa-caret-down" />
                                </div>
                                <button aria-label="close">
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="sp1_d--time-filter-menu">
                            {/* Dropdown */}
                            <Dropdown>
                                <Dropdown.Toggle className="sp1_d--time-filter py-2 px-3">
                                    Tomorrow
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="">
                                    <React.Fragment>
                                        <ul>
                                            <li>Today</li>
                                            <li>YesterDay</li>
                                        </ul>
                                    </React.Fragment>
                                </Dropdown.Menu>
                            </Dropdown>
                            {/* end dropdown */}

                            <div>
                                <div className="sp1_sell_df--control">
                                    <div className="w-100">
                                        <ReactDatePicker
                                            selected={startDate}
                                            onChange={(date) =>
                                                setStartDate(date)
                                            }
                                            selectsStart
                                            startDate={startDate}
                                            endDate={endDate}
                                            selectsDisabledDaysInRange
                                            customInput={<DateInput />}
                                        />
                                    </div>
                                    <span>-</span>
                                    <div className="position-relative w-100">
                                        <ReactDatePicker
                                            selected={endDate}
                                            onChange={(date) =>
                                                setEndDate(date)
                                            }
                                            selectsEnd
                                            disabledKeyboardNavigation
                                            startDate={startDate}
                                            endDate={endDate}
                                            minDate={startDate}
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
                        </Dropdown.Menu>
                    </Dropdown>
                    {/* end time period filter button */}
                </div>
            </div>
        </div>
    );
};
export default DashboardNavbar;

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
