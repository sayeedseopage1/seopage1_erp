import { forwardRef } from "react";
import Dropdown from "./components/Dropdown";
import React, { useEffect, useRef, useState } from "react";
import ReactDatePicker from "react-datepicker";
import PeriodFilter from "./components/PeriodFilter";
import UsersFilterDropdown from "./components/UsersFilterDropdown";
import FilterButton from "./components/FilterButton";

const DashboardNavbar = () => {
    const [dashboardName, setDashboardName] = useState("My Dashboard");
    const [titleBoxWidth, setTitleBoxWidth] = useState(0);
    const dashboardTitleRef = useRef(null);
    const [filteredUser, setFilteredUser] = useState({});
    const [selectedPeriod, setSelectedPeriod] = useState("Today");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

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
                <div className="d-flex border-right">
                    {/* time period filter button */}
                    <div className="mr-2">
                        <PeriodFilter
                            selectedPeriod={selectedPeriod}
                            setSelectedPeriod={setSelectedPeriod}
                            startDate={startDate}
                            endDate={endDate}
                            setStartDate={setStartDate}
                            setEndDate={setEndDate}
                        />
                    </div>
                    <div className="mr-3">
                        <UsersFilterDropdown
                            filteredUser={filteredUser}
                            setFilteredUser={setFilteredUser}
                        />
                    </div>
                </div>

                <div className="d-flex ml-3">
                    {/* time period filter button */}
                    <div className="mr-2">
                        <FilterButton>
                            <i className="bi bi-share" />
                            <span>Share</span>
                        </FilterButton>
                    </div>
                    <div className="mr-2">
                        <Dropdown>
                            <Dropdown.Toggle className="sp1_db--export">
                                <i className="bi bi-printer-fill" />
                                <span>Export</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="sp1_db--export-menu">
                                <Dropdown.Item>PDF</Dropdown.Item>
                                <Dropdown.Item>PNG</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div className="mr-2">
                        <Dropdown>
                            <Dropdown.Toggle
                                icon={false}
                                className="sp1_db--export"
                            >
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="sp1_db--export-menu">
                                <Dropdown.Item>
                                    <div className="d-flex align-items-center">
                                        <i className="fa-solid fa-copy mr-2"></i>
                                        <span>Duplicate</span>
                                    </div>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-trash mr-2" />
                                        <span>Delete</span>
                                    </div>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DashboardNavbar;
