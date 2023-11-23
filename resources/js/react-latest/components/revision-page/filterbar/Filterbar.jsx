import _ from "lodash";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useWindowSize } from "react-use";
import Avatar from "../../../../react/global/Avatar";
import { useFilter } from "../../../hooks/useFilter";
import styles from "../../../styles/filterbar.module.css";
import Button from '../../../ui/Button';
import JqueryDateRangePicker from "../../../ui/JqueryDateRangePicker";
import Loader from "../../../ui/Loader";
import Select from "../../../ui/Select";
import FilterItem from "./FilterItem";
import ProjectFilter from "./ProjectFilter";

const Filterbar = ({ onFilter, isOwnRevision }) => {
    // UI
    const [expandMenu, setExpandMenu] = useState(false);
    const { width } = useWindowSize();

    // initial Data
    const { getProjects, getClients, getEmployees, isLoading } = useFilter();

    const [projects, setProjects] = useState([]);

    // filter
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [project, setProject] = useState(null);
    const [raisedBy, setRaisedBy] = useState(null);
    const [againstTo, setAgainstTo] = useState(null);
    const [projectManager, setProjectManager] = useState(null);
    const [sale, setSale] = useState(null);
    const [leadDeveloper, setLeadDeveloper] = useState(null);
    const [client, setClient] = useState(null);

    const _startDate = useMemo(() => startDate, [startDate]);
    const _endDate = useMemo(() => endDate, [endDate]);
    const _project = useMemo(() => project, [project]);
    const _raisedBy = useMemo(() => raisedBy, [raisedBy]);
    const _againstTo = useMemo(() => againstTo, [againstTo]);
    const _projectManager = useMemo(() => projectManager, [projectManager]);
    const _sale = useMemo(() => sale, [sale]);
    const _lead = useMemo(() => leadDeveloper, [leadDeveloper]);
    const _client = useMemo(() => client, [client]);

    const filterRef = useRef(null);

    useEffect(() => {
        const filter = {
            startDate: _startDate,
            endDate: _endDate,
            project: _project?.id,
            raised_by: _raisedBy?.id,
            against_to: isOwnRevision ? window?.Laravel?.user?.id : _againstTo?.id,
            project_manager: _projectManager?.id,
            sale: _sale?.id,
            lead: _lead?.id,
            client: _client?.id,
        };

        const queryObject = _.pickBy(filter, Boolean);
        const queryString = new URLSearchParams(queryObject).toString();

        onFilter({ filter: queryObject, query: queryString });
    }, [
        _startDate,
        _endDate,
        _project,
        _raisedBy,
        _againstTo,
        _projectManager,
        _sale,
        _lead,
        _client,
        isOwnRevision
    ]);


    // handle methods
    const handleProjectFetching = async () => {
        if (_.size(projects) === 0) {
            const res = await getProjects();
            setProjects(res);
        }
    };

    return ReactDOM.createPortal(
        <div className={styles.filterbar}>
            {/* render on view  */}

            <FilterItem id="dateRangePicker">
                <JqueryDateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    className={styles.dateRangePicker}
                />
            </FilterItem>

            <button
                aria-label="filterButton"
                className={styles.filterExpandButton}
                onClick={() => setExpandMenu(true)}
            >
            <i className="fa-solid fa-filter"></i>
                Filter
            </button>
            <div className={styles.filterItems} ref={filterRef} data-active-collapse={expandMenu ? 'true': 'false'}>
                {/* Date picker */}
                <div className={styles.filterHead}>
                    <Button variant="tertiary" className="ml-auto" onClick={() => setExpandMenu(false)}>
                        <i className="fa-solid fa-xmark" />
                    </Button>
                </div>

                <FilterItem id="client">
                    <div>
                        <div className={styles.label}>Client:</div>
                        <Select
                            value={client}
                            onChange={(value) => setClient(value)}
                            display={(client) => client?.name || "Select All"}
                            className={styles.selection_menu}
                        >
                            <Select.Options>
                                {isLoading.user ? (
                                    <div
                                        className={`${styles.filterLoader} py-2`}
                                    >
                                        <Loader title="Loading..." />
                                    </div>
                                ) : (
                                    <Select.SearchControllerWrapper>
                                        {(query) => {
                                            const data = _.filter(
                                                getClients(),
                                                (d) =>
                                                    _.includes(
                                                        _.lowerCase(d.name),
                                                        _.lowerCase(query)
                                                    )
                                            );
                                            return _.size(data) > 0 ? (
                                                <React.Fragment>
                                                    <Select.Option value={null}>
                                                        {" "}
                                                        Select All{" "}
                                                    </Select.Option>
                                                    {_.map(data, (client) => (
                                                        <Select.Option
                                                            key={client.id}
                                                            value={client}
                                                        >
                                                            <div
                                                                className="d-flex align-items-center"
                                                                style={{
                                                                    gap: "10px",
                                                                }}
                                                            >
                                                                <Avatar
                                                                    src={
                                                                        client?.image_url ||
                                                                        null
                                                                    }
                                                                    width={24}
                                                                    height={24}
                                                                    type="circle"
                                                                />
                                                                <span className="d-block">
                                                                    {" "}
                                                                    {
                                                                        client.name
                                                                    }{" "}
                                                                </span>
                                                            </div>
                                                        </Select.Option>
                                                    ))}
                                                </React.Fragment>
                                            ) : (
                                                <div
                                                    className={`${styles.filterLoader} py-2`}
                                                >
                                                    Data Not Found
                                                </div>
                                            );
                                        }}
                                    </Select.SearchControllerWrapper>
                                )}
                            </Select.Options>
                        </Select>
                    </div>
                </FilterItem>

                {/* raised By */}
                <FilterItem id="raised_by">
                    <div>
                        <div className={styles.label}>Revision Raised By:</div>
                        <Select
                            value={raisedBy}
                            onChange={(value) => setRaisedBy(value)}
                            display={(raised) => raised?.name || "Select All"}
                            className={styles.selection_menu}
                        >
                            <Select.Options>
                                {isLoading.user ? (
                                    <div
                                        className={`${styles.filterLoader} py-2`}
                                    >
                                        <Loader title="Loading..." />
                                    </div>
                                ) : (
                                    <Select.SearchControllerWrapper>
                                        {(query) => {
                                            const data = _.filter(
                                                getEmployees([
                                                    4, 5, 6, 7, 9, 10,
                                                ]),
                                                (d) =>
                                                    _.includes(
                                                        _.lowerCase(d.name),
                                                        _.lowerCase(query)
                                                    )
                                            );
                                            return _.size(data) > 0 ? (
                                                _.map(data, (employee) => (
                                                    <Select.Option
                                                        key={employee.id}
                                                        value={employee}
                                                    >
                                                        <div
                                                            className="d-flex align-items-center"
                                                            style={{
                                                                gap: "10px",
                                                            }}
                                                        >
                                                            <Avatar
                                                                src={
                                                                    employee?.image_url ||
                                                                    null
                                                                }
                                                                width={24}
                                                                height={24}
                                                                type="circle"
                                                            />
                                                            <span className="d-block">
                                                                {" "}
                                                                {
                                                                    employee.name
                                                                }{" "}
                                                            </span>
                                                        </div>
                                                    </Select.Option>
                                                ))
                                            ) : (
                                                <div
                                                    className={`${styles.filterLoader} py-2`}
                                                >
                                                    Data Not Found
                                                </div>
                                            );
                                        }}
                                    </Select.SearchControllerWrapper>
                                )}
                            </Select.Options>
                        </Select>
                    </div>
                </FilterItem>

                {/* against to */}

                {!isOwnRevision ?
                <FilterItem id="against_to">
                    <div>
                        <div className={styles.label}>Revision Against To:</div>
                        <Select
                            value={againstTo}
                            onChange={(value) => setAgainstTo(value)}
                            display={(againstTo) =>
                                againstTo?.name || "Select All"
                            }
                            className={styles.selection_menu}
                        >
                            <Select.Options>
                                {isLoading.user ? (
                                    <div
                                        className={`${styles.filterLoader} py-2`}
                                    >
                                        <Loader title="Loading..." />
                                    </div>
                                ) : (
                                    <Select.SearchControllerWrapper>
                                        {(query) => {
                                            const data = _.filter(
                                                getEmployees([
                                                    4, 5, 6, 7, 9, 10,
                                                ]),
                                                (d) =>
                                                    _.includes(
                                                        _.lowerCase(d.name),
                                                        _.lowerCase(query)
                                                    )
                                            );
                                            return _.size(data) > 0 ? (
                                                _.map(data, (employee) => (
                                                    <Select.Option
                                                        key={employee.id}
                                                        value={employee}
                                                    >
                                                        <div
                                                            className="d-flex align-items-center"
                                                            style={{
                                                                gap: "10px",
                                                            }}
                                                        >
                                                            <Avatar
                                                                src={
                                                                    employee?.image_url ||
                                                                    null
                                                                }
                                                                width={24}
                                                                height={24}
                                                                type="circle"
                                                            />
                                                            <span className="d-block">
                                                                {" "}
                                                                {
                                                                    employee.name
                                                                }{" "}
                                                            </span>
                                                        </div>
                                                    </Select.Option>
                                                ))
                                            ) : (
                                                <div
                                                    className={`${styles.filterLoader} py-2`}
                                                >
                                                    Data Not Found
                                                </div>
                                            );
                                        }}
                                    </Select.SearchControllerWrapper>
                                )}
                            </Select.Options>
                        </Select>
                    </div>
                </FilterItem> : null}

                {/* Sales*/}
                <FilterItem id="sales">
                    <div>
                        <div className={styles.label}>Sales :</div>
                        <Select
                            value={sale}
                            onChange={(value) => setSale(value)}
                            display={(employee) =>
                                employee?.name || "Select All"
                            }
                            className={styles.selection_menu}
                        >
                            <Select.Options>
                                {isLoading.user ? (
                                    <div
                                        className={`${styles.filterLoader} py-2`}
                                    >
                                        <Loader title="Loading..." />
                                    </div>
                                ) : (
                                    _.map(getEmployees(7), (employee) => (
                                        <Select.Option
                                            key={employee.id}
                                            value={employee}
                                        >
                                            <div
                                                className="d-flex align-items-center"
                                                style={{ gap: "10px" }}
                                            >
                                                <Avatar
                                                    src={
                                                        employee?.image_url ||
                                                        null
                                                    }
                                                    width={24}
                                                    height={24}
                                                    type="circle"
                                                />
                                                <span className="d-block">
                                                    {employee.name}
                                                </span>
                                            </div>
                                        </Select.Option>
                                    ))
                                )}
                            </Select.Options>
                        </Select>
                    </div>
                </FilterItem>

                {/* Project Manager */}
                <FilterItem id="project_manager">
                    <div>
                        <div className={styles.label}>Project Manager:</div>
                        <Select
                            value={projectManager}
                            onChange={(value) => setProjectManager(value)}
                            display={(employee) =>
                                employee?.name || "Select All"
                            }
                            className={styles.selection_menu}
                        >
                            <Select.Options>
                                {isLoading.user ? (
                                    <div
                                        className={`${styles.filterLoader} py-2`}
                                    >
                                        <Loader title="Loading..." />
                                    </div>
                                ) : (
                                    _.map(getEmployees(4), (employee) => (
                                        <Select.Option
                                            key={employee.id}
                                            value={employee}
                                        >
                                            <div
                                                className="d-flex align-items-center"
                                                style={{ gap: "10px" }}
                                            >
                                                <Avatar
                                                    src={
                                                        employee?.image_url ||
                                                        null
                                                    }
                                                    width={24}
                                                    height={24}
                                                    type="circle"
                                                />
                                                <span className="d-block">
                                                    {" "}
                                                    {employee.name}{" "}
                                                </span>
                                            </div>
                                        </Select.Option>
                                    ))
                                )}
                            </Select.Options>
                        </Select>
                    </div>
                </FilterItem>

                {/* Lead Developer*/}
                <FilterItem id="lead developer">
                    <div>
                        <div className={styles.label}>Lead Developer:</div>
                        <Select
                            value={leadDeveloper}
                            onChange={(value) => setLeadDeveloper(value)}
                            display={(employee) =>
                                employee?.name || "Select All"
                            }
                            className={styles.selection_menu}
                        >
                            <Select.Options>
                                {isLoading.user ? (
                                    <div
                                        className={`${styles.filterLoader} py-2`}
                                    >
                                        <Loader title="Loading..." />
                                    </div>
                                ) : (
                                    _.map(getEmployees(6), (employee) => (
                                        <Select.Option
                                            key={employee.id}
                                            value={employee}
                                        >
                                            <div
                                                className="d-flex align-items-center"
                                                style={{ gap: "10px" }}
                                            >
                                                <Avatar
                                                    src={
                                                        employee?.image_url ||
                                                        null
                                                    }
                                                    width={24}
                                                    height={24}
                                                    type="circle"
                                                />
                                                <span className="d-block">
                                                    {employee.name}
                                                </span>
                                            </div>
                                        </Select.Option>
                                    ))
                                )}
                            </Select.Options>
                        </Select>
                    </div>
                </FilterItem>

                {/* project */}
                <FilterItem id="project">
                    <ProjectFilter
                        project={project}
                        setProject={setProject}
                        projects={projects}
                        isLoading={isLoading.project}
                        handleProjectFetching={handleProjectFetching}
                    />
                </FilterItem>
            </div>

            {/* render on menu */}
        </div>,
        document.querySelector("#revisionFilterBar")
    );
};

export default Filterbar;
