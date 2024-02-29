import React, { useLayoutEffect } from "react";
import JqueryDateRangePicker from "./JqueryDateRangePicker";
import UserFilter from "./UserFilter";
import _ from "lodash";
import StatusFilter from "./StatusFilter";
import FilterSidebar from "./FilterSidebar";
import { useWindowSize } from "react-use";
import DateTypeFilter from "./DateTypeFilter";
import { useAuth } from "../../../hooks/useAuth";
import SearchBox from "../Searchbox";

const Filterbar = ({ onFilter, page = "tasks" }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [search, setSearch] = React.useState("");
    const [searchQuery, setSearchQuery] = React.useState("");
    const [developer, setDeveloper] = React.useState(null);
    const [client, setClient] = React.useState(null);
    const [leadDeveloper, setLeadDeveloper] = React.useState(null);
    const [pm, setPm] = React.useState(null);
    const [status, setStatus] = React.useState({
        id: 10,
        column_name: "Hide completed task",
    });
    const [dateType, setDateType] = React.useState("Created Date");

    const { width } = useWindowSize();

    const isDev = _.includes([5], Number(window?.Laravel?.user?.role_id));
    const auth = useAuth();

    // MEMORIZE VALUES
    const start_date = React.useMemo(() => startDate, [startDate]);
    const end_date = React.useMemo(() => endDate, [endDate]);
    const _search = React.useMemo(() => search, [search]);
    const _developer = React.useMemo(() => developer, [developer]);
    const _client = React.useMemo(() => client, [client]);
    const _leadDeveloper = React.useMemo(() => leadDeveloper, [leadDeveloper]);
    const _pm = React.useMemo(() => pm, [pm]);
    const _status = React.useMemo(() => status, [status]);
    const date_filter_by = React.useMemo(() => dateType, [dateType]);

    React.useEffect(() => {
        const filter = {
            start_date,
            end_date,
            search: _search,
            client_id: _client?.id,
            pm_id: _pm?.id,
        };

        onFilter(filter);
    }, [
        start_date,
        end_date,
        _search,
        _developer,
        _client,
        _leadDeveloper,
        _pm,
        _status
    ]);

    // console.log(developer)
    useLayoutEffect(() => {
        if(page === "subtasks" && auth.getRoleId() === 5 && window !== undefined) {
            setDeveloper(window.Laravel.user);
        }
    }, [])

    return (
        <div className="sp1_task_filter_bar">
            <JqueryDateRangePicker
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                onApply={() => null}
            />
            <HDivider />

            {width > 1400 && (
                <React.Fragment>
                    {/* Client Dropdown */}
                    <UserFilter
                        title="Client"
                        state={client}
                        setState={setClient}
                        roleIds={null}
                    />

                    <HDivider />
                    {/* Project Manager Dropdown */}
                    <UserFilter
                        title="Project Manager"
                        state={pm}
                        setState={setPm}
                        roleIds={[4]}
                    />
                    <HDivider />
                    {/* Search box */}
                    <SearchBox
                        value={search}
                        onChange={setSearch}
                        className="tasks_search_bar"
                    />
                    <HDivider />

                </React.Fragment>
            )}

            {width < 1400 && (
                <React.Fragment>
                    <HDivider className="ml-auto" />
                    <div>
                        <div
                            className="sp1_filter_button"
                            onClick={() => setIsOpen(true)}
                            style={{ gap: "10px" }}
                        >
                            <i className="fa-solid fa-filter"></i>
                            <span>Filter</span>
                        </div>

                        {isOpen && (
                            <FilterSidebar
                                page={page}
                                developer={developer}
                                setDeveloper={setDeveloper}
                                client={client}
                                setClient={setClient}
                                leadDeveloper={leadDeveloper}
                                setLeadDeveloper={setLeadDeveloper}
                                pm={pm}
                                setPm={setPm}
                                status={status}
                                setStatus={setStatus}
                                search={search}
                                setSearch={setSearch}
                                dateType={dateType}
                                setDateType={setDateType}
                                close={() => setIsOpen(false)}
                                isDev={isDev}
                            />
                        )}
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

export default Filterbar;

const HDivider = ({ className = "" }) => {
    return <div className={`filter_divider ${className}`} />;
};
