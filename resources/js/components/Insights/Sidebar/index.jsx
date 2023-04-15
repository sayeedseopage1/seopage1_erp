import Accordion from "../../UI/Accordion";
import React, { useState } from "react";
import Dropdown from "../../UI/Dropdown";
import { Link, NavLink } from "react-router-dom";
import { openModal } from "../services/modals/salesDashboardModalSlice";
import { openDashboardCreatingModal } from "../services/modals/newDashboardCreatingModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { salesDashboardModalData } from "../constant/salesDashboardModalData";
import { openSectionModal } from "../services/modals/sectionModalSlice";

const Sidebar = () => {
    const dispatch = useDispatch();
    const { dashboards } = useSelector((s) => s.dashboards);
    const { reports } = useSelector((s) => s.reports);
    const { goals } = useSelector((s) => s.goals);

    // handle sales dashboard modal
    const handleSalesDashboardModal = (e, type, data) => {
        e.preventDefault();
        dispatch(openModal({ type, data }));
    };
    // end handling sales dashboard modal

    // handle dashboard adding modal
    const handleDashboardAddingModal = (e) => {
        e.preventDefault();
        dispatch(openDashboardCreatingModal());
    };
    // end handle dashboard adding modal

    // handle section modal
    const handleSectionModal = (e, type) => {
        e.preventDefault();
        dispatch(openSectionModal({ type }));
    };
    // end handle section modal

    return (
        <div className="sp1_ins_sidebar">
            {/* search */}
            <div className="sp1_ins_sidebar--search-wrapper">
                <div className="sp1_ins_sidebar--search-box">
                    <i className="fa-solid fa-magnifying-glass" />
                    <input type="text" placeholder="Search From Insights" />
                </div>
                {/* dropdown */}
                <Dropdown>
                    <Dropdown.Toggle
                        icon={false}
                        className="sp1_ins_sidebar--action-icon"
                    >
                        {/* action */}
                        <div className="sp1_ins_sidebar--action-btn">
                            <i className="fa-solid fa-plus" />
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                        asModal={true}
                        className="sp1_ins_sidebar--action-dd-menu sp1_ins_sidebar--search-box-dd-menu"
                    >
                        <Link
                            to="#"
                            aria-label="SalesDashboardModal"
                            onClick={(e) =>
                                handleSalesDashboardModal(
                                    e,
                                    "reports",
                                    salesDashboardModalData.reports
                                )
                            }
                        >
                            <i className="fa-solid fa-chart-simple" />
                            Report
                        </Link>
                        <Link
                            aria-label="addDashboard"
                            to="#"
                            onClick={handleDashboardAddingModal}
                        >
                            <i className="bi bi-columns-gap" /> Dashboard
                        </Link>
                        <Link
                            to="#"
                            aria-label="salesDashboardModal"
                            onClick={(e) =>
                                handleSalesDashboardModal(
                                    e,
                                    "goal",
                                    salesDashboardModalData.goals
                                )
                            }
                        >
                            <i className="fa-solid fa-bullseye" /> Goals
                        </Link>
                    </Dropdown.Menu>
                </Dropdown>
                {/* end dropdown */}
            </div>
            {/* search end */}

            {/* Accordion Sidebar items */}

            <div className="mt-2">
                {/* dashboards */}
                <Accordion>
                    <Accordion.Toggle>
                        {(isOpen, toggle) => (
                            <div className="sp1_ins_sidebar--acc-toggle">
                                <div
                                    className="sp1_ins_sidebar--acc-title"
                                    onClick={toggle}
                                >
                                    <span>Dashboards</span>
                                    <i
                                        className={`fa-solid fa-chevron-${
                                            isOpen ? "down" : "right"
                                        }`}
                                    />
                                </div>

                                {/* dropdown */}
                                <Dropdown>
                                    <Dropdown.Toggle
                                        icon={false}
                                        className="sp1_ins_sidebar--action-icon"
                                    >
                                        <i className="fa-solid fa-ellipsis" />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu
                                        asModal={true}
                                        className="sp1_ins_sidebar--action-dd-menu"
                                    >
                                        <Link
                                            to="#"
                                            onClick={handleDashboardAddingModal}
                                        >
                                            <i className="fa-solid fa-plus" />
                                            Dashboard
                                        </Link>
                                        <Link
                                            to="#"
                                            onClick={(e) =>
                                                handleSectionModal(
                                                    e,
                                                    "dashboard"
                                                )
                                            }
                                        >
                                            <i className="fa-solid fa-plus" />
                                            Section
                                        </Link>
                                        <hr className="my-1" />
                                        <Link to="#" className="delete_disable">
                                            <i className="bi bi-trash" /> Bulk
                                            delete dashboards
                                        </Link>
                                    </Dropdown.Menu>
                                </Dropdown>
                                {/* end dropdown */}
                            </div>
                        )}
                    </Accordion.Toggle>

                    <Accordion.Content>
                        {dashboards.map((dashboard) => (
                            <React.Fragment key={Math.random()}>
                                {/* Dashboard Session List */}
                                <Accordion>
                                    <Accordion.Toggle>
                                        {(isOpen, toggle) => (
                                            <div className="sp1_ins_sidebar--acc-toggle section">
                                                <div
                                                    onClick={toggle}
                                                    className="sp1_ins_sidebar--acc-title section"
                                                >
                                                    <i
                                                        className={`fa-solid fa-chevron-${
                                                            isOpen
                                                                ? "down"
                                                                : "right"
                                                        }`}
                                                        style={{
                                                            fontSize: "10px",
                                                        }}
                                                    />
                                                    <span>
                                                        {dashboard.section}
                                                    </span>
                                                </div>

                                                {/* dropdown */}
                                                <Dropdown>
                                                    <Dropdown.Toggle
                                                        icon={false}
                                                        className="sp1_ins_sidebar--action-icon"
                                                    >
                                                        <i className="fa-solid fa-ellipsis" />
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu
                                                        asModal={true}
                                                        className="sp1_ins_sidebar--action-dd-menu"
                                                    >
                                                        <Link
                                                            to="#"
                                                            onClick={
                                                                handleDashboardAddingModal
                                                            }
                                                        >
                                                            <i className="fa-solid fa-plus" />
                                                            Dashboard
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            onClick={(e) =>
                                                                handleSectionModal(
                                                                    e,
                                                                    "dashboard"
                                                                )
                                                            }
                                                        >
                                                            <i className="fa-solid fa-plus" />
                                                            Section
                                                        </Link>
                                                        <hr className="my-1" />
                                                        <Link to="#">
                                                            <i className="bi bi-pen" />
                                                            Rename
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="delete_disable"
                                                        >
                                                            <i className="bi bi-trash" />
                                                            Bulk delete
                                                            dashboards
                                                        </Link>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                {/* end dropdown */}
                                            </div>
                                        )}
                                    </Accordion.Toggle>
                                    {/* sub dashboard list */}
                                    <Accordion.Content>
                                        {dashboard.dashboards.map((d) => (
                                            <NavLink
                                                to={`dashboard/${d}`}
                                                key={Math.random()}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "sp1_ins_sidebar--link active"
                                                        : "sp1_ins_sidebar--link"
                                                }
                                            >
                                                <i className="bi bi-columns" />
                                                <span className="mr-auto">
                                                    {d}
                                                </span>
                                                <i className="bi bi-arrows-move move" />
                                            </NavLink>
                                        ))}
                                    </Accordion.Content>
                                </Accordion>
                            </React.Fragment>
                        ))}
                    </Accordion.Content>
                </Accordion>
                {/* end dashboard */}

                {/* goals */}
                <Accordion>
                    <Accordion.Toggle>
                        {(isOpen, toggle) => (
                            <div className="sp1_ins_sidebar--acc-toggle">
                                <div
                                    className="sp1_ins_sidebar--acc-title"
                                    onClick={toggle}
                                >
                                    <span>Goals</span>
                                    <i
                                        className={`fa-solid fa-chevron-${
                                            isOpen ? "down" : "right"
                                        }`}
                                    />
                                </div>

                                {/* dropdown */}
                                <Dropdown>
                                    <Dropdown.Toggle
                                        icon={false}
                                        className="sp1_ins_sidebar--action-icon"
                                    >
                                        <i className="fa-solid fa-ellipsis" />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu
                                        asModal={true}
                                        className="sp1_ins_sidebar--action-dd-menu"
                                    >
                                        <Link to="#">
                                            <i className="fa-solid fa-plus" />
                                            Goal
                                        </Link>
                                        <hr className="my-1" />
                                        <Link to="#" className="delete_disable">
                                            <i className="bi bi-trash" /> Bulk
                                            delete dashboards
                                        </Link>
                                    </Dropdown.Menu>
                                </Dropdown>
                                {/* end dropdown */}
                            </div>
                        )}
                    </Accordion.Toggle>

                    <Accordion.Content>
                        {goals.map((goal) => (
                            <React.Fragment key={Math.random()}>
                                {/* Dashboard Session List */}
                                <Accordion>
                                    <Accordion.Toggle>
                                        {(isOpen, toggle) => (
                                            <div className="sp1_ins_sidebar--acc-toggle section">
                                                <div
                                                    onClick={toggle}
                                                    className="sp1_ins_sidebar--acc-title section"
                                                >
                                                    <i
                                                        className={`fa-solid fa-chevron-${
                                                            isOpen
                                                                ? "down"
                                                                : "right"
                                                        }`}
                                                        style={{
                                                            fontSize: "10px",
                                                        }}
                                                    />
                                                    <span>{goal.section}</span>
                                                </div>

                                                {/* dropdown */}
                                                <Dropdown>
                                                    <Dropdown.Toggle
                                                        icon={false}
                                                        className="sp1_ins_sidebar--action-icon"
                                                    >
                                                        <i className="fa-solid fa-ellipsis" />
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu
                                                        asModal={true}
                                                        className="sp1_ins_sidebar--action-dd-menu"
                                                    >
                                                        <Link to="#">
                                                            <i className="fa-solid fa-plus" />
                                                            Goal
                                                        </Link>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                {/* end dropdown */}
                                            </div>
                                        )}
                                    </Accordion.Toggle>
                                    {/* sub dashboard list */}
                                    <Accordion.Content>
                                        {goal.goals.length > 0 ? (
                                            goal.goals.map((d) => (
                                                <NavLink
                                                    to={`goals/${d}`}
                                                    key={Math.random()}
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? "sp1_ins_sidebar--link active"
                                                            : "sp1_ins_sidebar--link"
                                                    }
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        width={24}
                                                        height={24}
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                    <span className="mr-auto">
                                                        {d}
                                                    </span>
                                                    <i className="bi bi-arrows-move move" />
                                                </NavLink>
                                            ))
                                        ) : (
                                            <span className="sp1_ins_sidebar--link empty">
                                                No Goal
                                            </span>
                                        )}
                                    </Accordion.Content>
                                </Accordion>
                            </React.Fragment>
                        ))}
                    </Accordion.Content>
                </Accordion>
                {/* end goals */}

                {/* reports */}
                <Accordion>
                    <Accordion.Toggle>
                        {(isOpen, toggle) => (
                            <div className="sp1_ins_sidebar--acc-toggle">
                                <div
                                    className="sp1_ins_sidebar--acc-title"
                                    onClick={toggle}
                                >
                                    <span>Reports</span>
                                    <i
                                        className={`fa-solid fa-chevron-${
                                            isOpen ? "down" : "right"
                                        }`}
                                    />
                                </div>

                                {/* dropdown */}
                                <Dropdown>
                                    <Dropdown.Toggle
                                        icon={false}
                                        className="sp1_ins_sidebar--action-icon"
                                    >
                                        <i className="fa-solid fa-ellipsis" />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu
                                        asModal={true}
                                        className="sp1_ins_sidebar--action-dd-menu"
                                    >
                                        <Link to="#">
                                            <i className="fa-solid fa-plus" />
                                            Reports
                                        </Link>
                                        <Link to="#">
                                            <i className="fa-solid fa-plus" />
                                            Section
                                        </Link>
                                        <hr className="my-1" />
                                        <Link to="#" className="delete_disable">
                                            <i className="bi bi-trash" /> Bulk
                                            delete dashboards
                                        </Link>
                                    </Dropdown.Menu>
                                </Dropdown>
                                {/* end dropdown */}
                            </div>
                        )}
                    </Accordion.Toggle>

                    <Accordion.Content>
                        {reports.map((report) => (
                            <React.Fragment key={Math.random()}>
                                {/* Dashboard Session List */}
                                <Accordion>
                                    <Accordion.Toggle>
                                        {(isOpen, toggle) => (
                                            <div className="sp1_ins_sidebar--acc-toggle section">
                                                <div
                                                    onClick={toggle}
                                                    className="sp1_ins_sidebar--acc-title section"
                                                >
                                                    <i
                                                        className={`fa-solid fa-chevron-${
                                                            isOpen
                                                                ? "down"
                                                                : "right"
                                                        }`}
                                                        style={{
                                                            fontSize: "10px",
                                                        }}
                                                    />
                                                    <span>
                                                        {report.section}
                                                    </span>
                                                </div>

                                                {/* dropdown */}
                                                <Dropdown>
                                                    <Dropdown.Toggle
                                                        icon={false}
                                                        className="sp1_ins_sidebar--action-icon"
                                                    >
                                                        <i className="fa-solid fa-ellipsis" />
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu
                                                        asModal={true}
                                                        className="sp1_ins_sidebar--action-dd-menu"
                                                    >
                                                        <Link to="#">
                                                            <i className="fa-solid fa-plus" />
                                                            Reports
                                                        </Link>
                                                        <Link to="#">
                                                            <i className="fa-solid fa-plus" />
                                                            Section
                                                        </Link>
                                                        <hr className="my-1" />
                                                        <Link to="#">
                                                            <i className="bi bi-pen" />
                                                            Rename
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="delete_disable"
                                                        >
                                                            <i className="bi bi-trash" />
                                                            Bulk delete
                                                            dashboards
                                                        </Link>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                {/* end dropdown */}
                                            </div>
                                        )}
                                    </Accordion.Toggle>
                                    {/* sub dashboard list */}
                                    <Accordion.Content>
                                        {/* <SidebarItemList contents={report.reports} namespace="reports" /> */}
                                        {report.reports.length > 0 ? (
                                            report.reports.map((d) => (
                                                <NavLink
                                                    to={`reports/${d.text}`}
                                                    key={Math.random()}
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? "sp1_ins_sidebar--link active"
                                                            : "sp1_ins_sidebar--link"
                                                    }
                                                >
                                                    {d.type === "activity" && (
                                                        <i className="bi bi-calendar-event" />
                                                    )}
                                                    {d.type === "deal" && (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            width={24}
                                                            height={24}
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                    )}
                                                    {d.type === "leads" && (
                                                        <i className="fa-solid fa-location-crosshairs"></i>
                                                    )}
                                                    {d.type === "forecast" && (
                                                        <i className="bi bi-arrow-repeat" />
                                                    )}
                                                    <span className="mr-auto">
                                                        {d.text}
                                                    </span>
                                                    <i className="bi bi-arrows-move move" />
                                                </NavLink>
                                            ))
                                        ) : (
                                            <span className="sp1_ins_sidebar--link empty">
                                                No Goal
                                            </span>
                                        )}
                                    </Accordion.Content>
                                </Accordion>
                            </React.Fragment>
                        ))}
                    </Accordion.Content>
                </Accordion>
                {/* end reports */}
            </div>
        </div>
    );
};

export default Sidebar;
