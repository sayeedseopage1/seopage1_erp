import React, { useMemo } from "react";
import JqueryDateRangePicker from "./JqueryDateRangePicker";
import { useUsers } from "../../hooks/useUsers";
import PersonFilter from "./PersonFilter";
import {
    useGetAllFilterOptionQuery,
    useGetProjectsOptionsQuery,
} from "../../services/api/FilterBarOptionsApiSlice";
import DepartmentFilter from "./DepartmentFilter";
import ShiftFilterOption from "./ShiftFilterOption";
import LiveSearch from "./LiveSearch";
import ProjectFilterItem from "./ProjectFilter";

const QualifiedSalesFilterbar = ({ onFilter }) => {
    const { users, usersObject, usersIsFetching } = useUsers();
    const [departments, setDepartments] = React.useState([]);
    const [teams, setTeams] = React.useState([]);
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [status, setStatus] = React.useState("in progress");
    const [shiftMembers, setShiftMembers] = React.useState([]);
    const [search, setSearch] = React.useState("");

    // employee
    const [selectedEmployeeId, setSelectedEmployeeId] = React.useState(null);
    const [selectedPMId, setSelectedPMId] = React.useState(null);
    const [selectedClientId, setSelectedClientId] = React.useState(null);
    const [selectedProject, setSelectedProject] = React.useState(null);
    const [dept, setDept] = React.useState({});
    const [shift, setShift] = React.useState(null);
    const [closedBy, setClosedBy] = React.useState(null);

    const logged_user = window?.Laravel?.user;

    const { data, isFetching } = useGetAllFilterOptionQuery("", {
        refetchOnMountOrArgChange: true,
        skip: departments.length && teams.length,
    });

    const { data: getProjectsOptions, isFetching: projectIsFetching } =
        useGetProjectsOptionsQuery("");

    let getMembers = (t) => {
        if (!users.length) return;
        let members = t?.members?.split(",")?.filter((d) => d !== "");
        let employees = [];
        if (members && members.length) {
            for (let i = 0; i < members.length; i++) {
                const id = Number(members[i]);
                employees.push(usersObject[id]);
            }
        }
        return employees;
    };

    React.useEffect(() => {
        if (data && !isFetching) {
            setDept(
                data?.department?.find((d) => d.team_name === "Web Development")
            );
            setDepartments(data.department);
            setTeams(data.team);
        }
    }, [data, isFetching]);

    React.useEffect(() => {
        if (!users.length) return;
        let t = teams?.find((s) => s.department_id === dept?.id);
        let members = getMembers(t);
        setShift(t);
        setShiftMembers(members);
    }, [dept]);

    const handleTeamSelection = (d) => {
        let members = getMembers(d);
        setShift(d);
        setShiftMembers(members);
    };

    const _closedBy = useMemo(() => closedBy, [closedBy]);
    const pmID = useMemo(() => selectedPMId, [selectedPMId]);
    const _clientID = useMemo(() => selectedClientId, [selectedClientId]);
    const _startDate = useMemo(() => startDate, [startDate]);
    const _endDate = useMemo(() => endDate, [endDate]);
    const _project = useMemo(() => selectedProject, [selectedProject]);

    React.useEffect(() => {
        if (_startDate && _endDate) {
            let data = {
                closed_by: _closedBy,
                pm_id: pmID,
                client_id: _clientID,
                start_date: _startDate,
                end_date: _endDate,
                search: search || null,
                project_id: _project?.id || null,
            };

            onFilter(data);
        }
    }, [_closedBy, pmID, _clientID, _startDate, _endDate, _project]);

    const handleSearch = () => {
        let data = {
            closed_by: _closedBy,
            pm_id: pmID,
            client_id: _clientID,
            start_date: _startDate,
            end_date: _endDate,
            search: search || null,
            project_id: _project?.id || null,
        };

        onFilter(data);
    };

    if (usersIsFetching || isFetching) return null;
    return (
        <div className="bg-white w-100 py-2 px-3">
            <div className="sp1_qualified_navbar d-flex align-item-center flex-wrap">
                <JqueryDateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />
                <div className="px-3 border-left border-right">
                    <div className="">
                        <LiveSearch
                            searchTerm={search}
                            setSearchTerm={setSearch}
                            handleSearch={handleSearch}
                        />
                    </div>
                </div>

                {[1, 8].includes(Number(logged_user?.role_id)) && (
                    <>
                        {/* project manager */}
                        <PersonFilter
                            title="Project Manager"
                            items={
                                users
                                    ? [
                                          ...users?.filter(
                                              (user) =>
                                                  user.role_id &&
                                                  Number(user.role_id) === 4
                                          ),
                                      ]
                                    : []
                            }
                            selected={
                                selectedPMId
                                    ? users?.find(
                                          (u) => Number(u.id) === selectedPMId
                                      )
                                    : null
                            }
                            isLoading={usersIsFetching}
                            onSelect={(e, d) => setSelectedPMId(d.id)}
                        />

                        {/* client */}
                        <PersonFilter
                            title="Client"
                            items={
                                users
                                    ? [
                                          ...users?.filter(
                                              (user) => !user.role_id
                                          ),
                                      ]
                                    : []
                            }
                            selected={
                                selectedClientId
                                    ? users?.find(
                                          (u) =>
                                              Number(u.id) === selectedClientId
                                      )
                                    : null
                            }
                            isLoading={usersIsFetching}
                            onSelect={(e, d) => setSelectedClientId(d.id)}
                        />

                        <DepartmentFilter
                            data={departments.filter((d) => d.id == 1) || []}
                            selected={dept}
                            setSelectedDept={setDept}
                            loading={isFetching}
                            onSelect={() => {}}
                        />

                        <ShiftFilterOption
                            data={
                                dept
                                    ? teams.filter(
                                          (s) =>
                                              s.id === 1 &&
                                              s.department_id === dept.id
                                      )
                                    : []
                            }
                            loading={!dept}
                            selected={shift}
                            onSelect={handleTeamSelection}
                        />

                        {/* project manager */}
                        <PersonFilter
                            title="Closed by"
                            items={shiftMembers}
                            selected={
                                shiftMembers.length
                                    ? shiftMembers?.find(
                                          (d) => d.id === closedBy
                                      )
                                    : null
                            }
                            isLoading={usersIsFetching}
                            onSelect={(e, d) => setClosedBy(d.id)}
                        />

                        <ProjectFilterItem
                            title="Project"
                            items={
                                getProjectsOptions
                                    ? [...getProjectsOptions]
                                    : []
                            }
                            isLoading={isFetching}
                            selected={selectedProject}
                            onSelect={(e, d) => setSelectedProject(d)}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default QualifiedSalesFilterbar;
