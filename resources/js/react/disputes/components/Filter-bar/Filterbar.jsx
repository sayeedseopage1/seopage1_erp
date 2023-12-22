import React from "react";
import JqueryDateRangePicker from "./JqueryDateRangePicker";
import UserFilter from "./UserFilter";
import _ from "lodash";
import StatusFilter from "./StatusFilter";
import FilterSidebar from "./FilterSidebar";
import { useWindowSize } from "react-use";
import DateTypeFilter from "./DateTypeFilter";

const Filterbar = ({ onFilter, page = "tasks" }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [search, setSearch] = React.useState("");
    const [searchQuery, setSearchQuery] = React.useState("");
    const [disputeRasiedBy, setDisputeRasiedBy] = React.useState(null);
    const [client, setClient] = React.useState(null);
    const [disputeRaisedAgainst, setDisputeRaisedAgainst] = React.useState(null);
    const [pm, setPm] = React.useState(null);
    const [status, setStatus] = React.useState({
        id: 12,
        column_name: "All",
    });
    const [dateType, setDateType] = React.useState("Due Date");

    const { width } = useWindowSize();

    const isDev = _.includes([5], Number(window?.Laravel?.user?.role_id));

    // MEMORIZE VALUES
    const start_date = React.useMemo(() => startDate, [startDate]);
    const end_date = React.useMemo(() => endDate, [endDate]);
    const _search = React.useMemo(() => search, [search]);
    const _dispute_rasied_by = React.useMemo(() => disputeRasiedBy, [disputeRasiedBy]);
    const _client = React.useMemo(() => client, [client]);
    const _disputeRaisedAgainst = React.useMemo(() => disputeRaisedAgainst, [disputeRaisedAgainst]);
    const _pm = React.useMemo(() => pm, [pm]);
    const _status = React.useMemo(() => status, [status]);
    const date_filter_by = React.useMemo(() => dateType, [dateType]);

    React.useEffect(() => {
        
        const filter = {
            start_date,
            end_date,
            dispute_rasied_by: _dispute_rasied_by?.id,
            client_id: _client?.id,
            dispute_raised_against: _disputeRaisedAgainst?.id,
            pm_id: _pm?.id,
            status: _status?.column_name, 
        };

        onFilter(filter);
    }, [
        start_date,
        end_date,
        _dispute_rasied_by,
        _client,
        _disputeRaisedAgainst,
        _pm,
        _status,
    ]);

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
                    <UserFilter
                        title="Dispute Raised By"
                        state={disputeRasiedBy}
                        setState={setDisputeRasiedBy}
                        roleIds={[4,5,6, 7, 9, 10]}
                    />  
                    <HDivider />
                    <UserFilter
                        title="Dispute Raised Against"
                        state={disputeRaisedAgainst}
                        setState={setDisputeRaisedAgainst}
                        roleIds={[3,4,5,6, 7, 9, 10]}
                    />
                     
                    <HDivider />

                    <UserFilter
                        title="Client"
                        state={client}
                        setState={setClient}
                        roleIds={null}
                    />

                    <HDivider />

                    <UserFilter
                        title="Project Manager"
                        state={pm}
                        setState={setPm}
                        roleIds={[4]}
                    />
                    <HDivider /> 

                    <StatusFilter state={status} setState={setStatus} />
                    {/* <HDivider />  */}
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
                                disputeRasiedBy={disputeRasiedBy}
                                setDisputeRasiedBy={setDisputeRasiedBy}
                                client={client}
                                setClient={setClient}
                                disputeRaisedAgainst={disputeRaisedAgainst}
                                setDisputeRaisedAgainst={setDisputeRaisedAgainst}
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
