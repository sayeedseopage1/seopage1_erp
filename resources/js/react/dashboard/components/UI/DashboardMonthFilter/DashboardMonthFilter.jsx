import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useState } from "react";

// icons
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";

// style - css
import style from "./dashboardMonthFilter.module.css";
import Loader from "../../../../global/Loader";
import { useEffect } from "react";
import Switch from "../../../../global/Switch";

const DashboardMonthFilter = ({ setFilter, isLoading }) => {
    const targetedDay = 15;
    const [monthDate, setMonthDate] = useState(dayjs());
    const [direction, setDirection] = useState({
        active: "prev",
        inActive: "",
    }); // ["prev", "next"]

    // format date range
    const formatDateRange = (date) => {
        let startDate = date.date(targetedDay);
        let endDate = date.add(1, "month").date(targetedDay - 1);
        return `${startDate.format("MMMM, YYYY")} - ${endDate.format(
            "MMMM, YYYY"
        )}`;
    };

    // handle month filter navigation
    const handleMonthFilterNavigation = (direction) => {
        setDirection((prevDirection) => {
            return {
                ...prevDirection,
                active: direction,
                inActive: direction === "prev" ? "next" : "prev",
            };
        });
        setMonthDate((prevDate) => {
            if (direction === "prev") {
                return prevDate.subtract(1, "month");
            } else {
                return prevDate.add(1, "month");
            }
        });
    };

    // update filter on month change
    useEffect(() => {
        const startDate = monthDate.date(targetedDay).format("YYYY-MM-DD");
        const endDate = monthDate
            .add(1, "month")
            .date(targetedDay - 1)
            .format("YYYY-MM-DD");
        setFilter((prevFilter) => {
            return {
                ...prevFilter,
                startDate,
                endDate,
            };
        });
    }, [monthDate]);

    return (
        <div className={`${style.sp1_dashboard_month_filter_wrapper}`}>
            <Switch>
                <button
                    className={`${style.sp1_dashboard_month_filter_navigation}`}
                    onClick={() => handleMonthFilterNavigation("prev")}
                    disabled={isLoading}
                >
                    <Switch.Case condition={isLoading}>
                        <Switch.Case condition={direction.active === "prev"}>
                            <div
                                className="spinner-border text-dark"
                                role="status"
                                style={{
                                    width: "14px",
                                    height: "14px",
                                    border: "0.14em solid rgba(0, 0, 0, .25)",
                                    borderRightColor: "transparent",
                                }}
                            />
                        </Switch.Case>
                        <Switch.Case condition={direction.active !== "prev"}>
                            <GrLinkPrevious />
                        </Switch.Case>
                    </Switch.Case>
                    <Switch.Case condition={!isLoading}>
                        <GrLinkPrevious />
                    </Switch.Case>
                </button>
                <h6 className={`${style.sp1_dashboard_month_filter_text}`}>
                    {formatDateRange(monthDate)}
                </h6>
                <button
                    className={`${style.sp1_dashboard_month_filter_navigation}`}
                    onClick={() => handleMonthFilterNavigation("next")}
                    disabled={isLoading}
                >
                    <Switch.Case condition={isLoading}>
                        <Switch.Case condition={direction.active === "next"}>
                            <div
                                className="spinner-border text-dark"
                                role="status"
                                style={{
                                    width: "14px",
                                    height: "14px",
                                    border: "0.14em solid rgba(0, 0, 0, .25)",
                                    borderRightColor: "transparent",
                                }}
                            />
                        </Switch.Case>
                        <Switch.Case condition={direction.active !== "next"}>
                            <GrLinkNext />
                        </Switch.Case>
                    </Switch.Case>
                    <Switch.Case condition={!isLoading}>
                        <GrLinkNext />
                    </Switch.Case>
                </button>
            </Switch>
        </div>
    );
};

export default DashboardMonthFilter;

DashboardMonthFilter.propTypes = {
    setFilter: PropTypes.func,
    isLoading: PropTypes.bool,
};
