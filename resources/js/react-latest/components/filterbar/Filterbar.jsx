import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useFilter } from "../../hooks/useFilter";
import styles from "../../styles/filterbar.module.css";
import JqueryDateRangePicker from "../../ui/JqueryDateRangePicker";
import FilterItem from "./FilterItem";
import Dropdown from "../../ui/Dropdown";
import _ from "lodash";

const initialOptions = {
    date: true,
    projects: {
        title: "Projects",
        show: true,
    },
    clients: {
        title: "Clients",
        show: true,
    },
    developers: {
        title: "Developers",
        show: true,
    },
    sales: {
        title: "Sales Executive",
        show: true,
    },
};

const Filterbar = ({ onFilter, options = initialOptions }) => {
    // UI
    const [expandManu, setExpandManu] = useState([]);

    // initial Data
    const { getProjects, getClients, getEmployees } = useFilter();

    const [projects, setProjects] = useState([]);
    const [employees, setEmeployees] = useState([]);
    const [clients, setClients] = useState();

    // filter
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [project, setProject] = useState(null);

    // handle methods
    const handleProjectFetching = async (e) => {
        e.preventDefault();
        const res = await getProjects();
        console.log({res})
        setProjects(res);
    };

    return ReactDOM.createPortal(
        <div className={styles.filterbar}>
            {/* render on view  */}
            <div className={styles.filterItems}>
                {/* Date picker */}
                <FilterItem id="dateRangePicker">
                    <JqueryDateRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        className={styles.dateRangePicker}
                    />
                </FilterItem>

                <FilterItem id="projects">
                    <Dropdown className={styles.filterDropdown}>
                        <div className={styles.filterDropdownToggleContainer}>
                            <div className={styles.filterItemTitle}>
                                Projects:
                            </div>
                            <Dropdown.Toggle
                                className={styles.filterDropdownToggle}
                            >
                                <button
                                    onClick={handleProjectFetching}
                                    className={styles.filterItemValue}
                                >
                                    {project?.project_name ?? "All"}
                                </button>
                            </Dropdown.Toggle>
                        </div>

                        <Dropdown.Menu>
                            <div className={styles.fiterOptions}>
                                {_.map(projects, (project) => (
                                    <Dropdown.Item
                                        key={project.id}
                                        className={styles.fitlerOption}
                                        onClick={() => setProject(project)}
                                    >
                                        {project.project_name}
                                    </Dropdown.Item>
                                ))}
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>
                </FilterItem>

                {/* Developer */}
            </div>

            {/* render on menu */}
        </div>,
        document.querySelector("#revisionFilterBar")
    );
};

export default Filterbar;
