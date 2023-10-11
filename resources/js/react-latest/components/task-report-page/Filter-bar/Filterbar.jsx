import React from "react";
import JqueryDateRangePicker from "./JqueryDateRangePicker";
import UserFilter from "./UserFilter";
import _ from "lodash";
import StatusFilter from "./StatusFilter";
import FilterSidebar from "./FilterSidebar";
import { useWindowSize } from "react-use";
import DateTypeFilter from "./DateTypeFilter";
import ProjectFilterItem from "./ProjectFilter";
import { useGetProjectsOptionsQuery } from "../../../../react/services/api/FilterBarOptionsApiSlice";
import { User } from "../../../utils/user-details";
import ReadOnlyUserFilter from "./ReadOnlyUserFilter";

const Filterbar = ({ onFilter, page = "tasks" }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [search, setSearch] = React.useState("");
    const [searchQuery, setSearchQuery] = React.useState("");
    const [developer, setDeveloper] = React.useState(null);
    const [client, setClient] = React.useState(null);
    const [reportIssuer, setReportIssuer] = React.useState(null);
    const [accountableIndividual, setAccountableIndividual] = React.useState(null);
    const [status, setStatus] = React.useState({ id: "1_ts_r_1", column_name: 'All', title: 'all' });
    const [dateType, setDateType] = React.useState("Created Date");
    const [selectedProject, setSelectedProject] = React.useState(null);
    const { data: getProjectsOptions, isFetching } = useGetProjectsOptionsQuery('');


    const { width } = useWindowSize();

    const isDev = _.includes([5], Number(window?.Laravel?.user?.role_id));

    // MEMORIZE VALUES
    const start_date = React.useMemo(() => startDate, [startDate]);
    const end_date = React.useMemo(() => endDate, [endDate]);
    const _search = React.useMemo(() => search, [search]);
    const _developer = React.useMemo(() => developer, [developer]);
    const _client = React.useMemo(() => client, [client]);
    const _reportIssuer = React.useMemo(() => reportIssuer, [reportIssuer]);
    const _accountableIndividual = React.useMemo(() => accountableIndividual, [accountableIndividual]);
    const _status = React.useMemo(() => status, [status]);
    const date_filter_by = React.useMemo(() => dateType, [dateType]);
    const _selectedProject = React.useMemo(() => selectedProject, [selectedProject]);

    React.useEffect(() => {
        const filter = {
            // assignee_to: _developer?.id,
            start_date,
            end_date,
            client_id: _client?.id,
            project_id: _selectedProject ? _selectedProject.id : null,
            report_issuer_id: _reportIssuer?.id,
            accountable_individual_id: _accountableIndividual?.id,
            // status: _status?.id,
            // date_filter_by,
        };

        onFilter(filter, _status);
    }, [
        start_date,
        end_date,
        _developer,
        _client,
        _reportIssuer,
        _accountableIndividual,
        _status,
        date_filter_by,
        _selectedProject
    ]);

    const handleProjectFilter = (e, data) => {
        if (data) {
            setSelectedProject(data);
        } else {
            setSelectedProject(null)
        }
    }

    const loggedUser = new User(window.Laravel.user);

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

                    {/* client filter */}
                    <UserFilter
                        title="Client"
                        state={client}
                        setState={setClient}
                        roleIds={null}
                    />

                    <HDivider />


                    {/* projects filter */}
                    <ProjectFilterItem
                        title="Projects"
                        items={getProjectsOptions ? [...getProjectsOptions] : []}
                        isLoading={isFetching}
                        selected={selectedProject}
                        onSelect={handleProjectFilter}
                    />


                    <HDivider />

                    {/* Report Issuer */}
                    {
                        _.includes([5, 6, 9, 10], loggedUser.getRoleId()) ?
                            <ReadOnlyUserFilter
                                title={"Report Issuer"}
                                text={window.Laravel.user.name}
                            /> :
                            <UserFilter
                                title="Report Issuer"
                                state={reportIssuer}
                                setState={setReportIssuer}
                                roleIds={[5, 6, 9, 10]}
                            />
                    }

                    <HDivider />


                    {/* Accountable Individual */}
                    <UserFilter
                        title="Accountable Individual"
                        state={accountableIndividual}
                        setState={setAccountableIndividual}
                        roleIds={[4, 6, 8]}
                    />


                    <HDivider />


                    {/* status */}
                    <StatusFilter
                        state={status}
                        setState={setStatus}
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
                                // developer={developer}
                                // setDeveloper={setDeveloper}
                                client={client}
                                setClient={setClient}
                                reportIssuer={reportIssuer}
                                setReportIssuer={setReportIssuer}
                                accountableIndividual={accountableIndividual}
                                setAccountableIndividual={setAccountableIndividual}
                                status={status}
                                setStatus={setStatus}
                                selectedProject={selectedProject}
                                handleProjectFilter={handleProjectFilter}
                                getProjectsOptions={getProjectsOptions}
                                isFetching={isFetching}
                                close={() => setIsOpen(false)}
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
