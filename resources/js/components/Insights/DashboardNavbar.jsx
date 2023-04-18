import { forwardRef } from "react";
import Dropdown from "../UI/Dropdown";
import React, { useEffect, useRef, useState } from "react";
import ReactDatePicker from "react-datepicker";
import PeriodFilter from "./components/PeriodFilter";
import Selection from "../UI/form/Selection";

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
                    <PeriodFilter />
                    {/* end time period filter button */}
                    <Selection />
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
