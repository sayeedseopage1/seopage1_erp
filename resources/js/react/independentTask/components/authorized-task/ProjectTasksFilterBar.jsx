import React from "react";
import _ from "lodash";
import UserFilter from "../Filter-bar/UserFilter";
import StatusFilter from "../Filter-bar/StatusFilter";
import DateTypeFilter from "../Filter-bar/DateTypeFilter";
import Dropdown from "../Dropdown";

const ProjectTasksFilterBar = ({ onFilter, page = "tasks",  }) => {
    const [search, setSearch] = React.useState("");
    const [searchQuery, setSearchQuery] = React.useState("");
    const [developer, setDeveloper] = React.useState(null);
    const [client, setClient] = React.useState(null);
    const [leadDeveloper, setLeadDeveloper] = React.useState(null);
    const [pm, setPm] = React.useState(null);
    const [status, setStatus] = React.useState({
        id: 11,
        column_name: "All",
    });
    const [dateType, setDateType] = React.useState("Created Date");

    const isDev = _.includes([5], Number(window?.Laravel?.user?.role_id));

    // MEMORIZE VALUES
    // const start_date = React.useMemo(() => startDate, [startDate]);
    // const end_date = React.useMemo(() => endDate, [endDate]);
    const _search = React.useMemo(() => search, [search]);
    const _developer = React.useMemo(() => developer, [developer]);
    const _client = React.useMemo(() => client, [client]);
    const _leadDeveloper = React.useMemo(() => leadDeveloper, [leadDeveloper]);
    const _pm = React.useMemo(() => pm, [pm]);
    const _status = React.useMemo(() => status, [status]);
    const date_filter_by = React.useMemo(() => dateType, [dateType]);

    React.useEffect(() => {
        const filter = {
            // start_date,
            // end_date,
            assignee_to: _developer?.id,
            client_id: _client?.id,
            assignee_by: _leadDeveloper?.id,
            pm_id: _pm?.id,
            status: _status?.id,
            date_filter_by,
        };

        onFilter(filter);
    }, [ 
        _developer,
        _client,
        _leadDeveloper,
        _pm,
        _status,
        date_filter_by,
    ]);


    const clear = (e) => {
        e.stopPropagation();
        setDeveloper(null);
        setClient(null)
        setPm(null)
        setLeadDeveloper(null)
        setStatus({ id: 11, column_name: "All"})
        setDateType("Created Date")
    }

    const activeFilter = developer || client || leadDeveloper || pm || status?.id !== 11;

    return (
        <React.Fragment>
            {/* filter selection */}
            <Dropdown className="">
                <Dropdown.Toggle
                    icon={false}
                    className="sp1_table_tab--dd-toggle"
                >
                    <i className="fa-solid fa-filter"></i>
                    <span>Filter</span>
                    {activeFilter && <i className="fa-regular fa-circle-xmark text-danger" onClick={clear}></i>}
                </Dropdown.Toggle>
                <Dropdown.Menu className="sp1_table_tab--dd-menu">
                    <div className="sp1_tasks_filter_container">
                        <React.Fragment>
                            <UserFilter
                                title="Client"
                                state={client}
                                setState={setClient}
                                roleIds={null}
                                selectionBoxClassName="sp1_tasks_filter_item"
                            />

                            <UserFilter
                                title="Project Manager"
                                state={pm}
                                setState={setPm}
                                roleIds={[4]}
                                selectionBoxClassName="sp1_tasks_filter_item"
                            />

                            <UserFilter
                                title="Assignee By"
                                state={leadDeveloper}
                                setState={setLeadDeveloper}
                                roleIds={[1, 4]}
                                selectionBoxClassName="sp1_tasks_filter_item"
                            />

                            {page === "subtasks" ? (
                                <UserFilter
                                    title="Assignee To"
                                    state={developer}
                                    setState={setDeveloper}
                                    roleIds={[5]}
                                    selectionBoxClassName="sp1_tasks_filter_item"
                                />
                            ) : (
                                <UserFilter
                                    title="Assignee To"
                                    state={developer}
                                    setState={setDeveloper}
                                    roleIds={[4, 6, 9, 10]}
                                    selectionBoxClassName="sp1_tasks_filter_item"
                                />
                            )}

                            <StatusFilter
                                state={status} 
                                setState={setStatus}
                                selectionBoxClassName="sp1_tasks_filter_item"
                             />
                             
                            <DateTypeFilter
                                state={dateType}
                                setState={setDateType}
                                selectionBoxClassName="sp1_tasks_filter_item"
                            />
                        </React.Fragment>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
            {/* end filter selection */}
        </React.Fragment>
    );
};

export default ProjectTasksFilterBar;
