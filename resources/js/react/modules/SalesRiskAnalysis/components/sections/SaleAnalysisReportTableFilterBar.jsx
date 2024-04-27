import React from "react";
import ReactDOM from "react-dom";
import { useWindowSize } from "react-use";
import PropTypes from "prop-types";

// Ui components
import JqueryDateRangePicker from "../../../sales/leads/components/JqueryDateRangePicker";
import Button from "../Button";
import SearchBox from "../SearchBox";

// hooks
import UserFilter from "../UserFilter";

const SaleAnalysisReportTableFilterBar = ({ setFilter }) => {
    const { width } = useWindowSize();
    const [isOpen, setIsOpen] = React.useState(false);
    const [client, setClient] = React.useState(null);
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [search, setSearch] = React.useState("");

    const searchText = React.useDeferredValue(search);

    const _startData = React.useMemo(() => startDate, [startDate]);
    const _endData = React.useMemo(() => endDate, [endDate]);

    React.useEffect(() => {
        setFilter((prev) => ({
            ...prev,
            start_date: _startData,
            end_date: _endData,
            client_id: client?.id,
        }));
    }, [_startData, _endData, client]);

    // search data
    React.useEffect(() => {
        setFilter((prev) => ({ ...prev, search: searchText }));
    }, [searchText]);

    return ReactDOM.createPortal(
        <div className="sp1_task_filter_bar">
            <JqueryDateRangePicker
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                customDayRange={60}
                onApply={() => {}}
            />
            <HDivider />

            {width > 1400 && (
                <React.Fragment>
                    <UserFilter
                        title="Client"
                        state={client}
                        setState={setClient}
                        roleIds={null}
                    />
                    <HDivider />
                    <div style={{ maxWidth: "256px" }}>
                        <SearchBox value={search} onChange={setSearch} />
                </div>
                </React.Fragment>
            )}
            {width < 1400 && (
                <React.Fragment>
                    <HDivider className="ml-auto" />
                    <div>
                        <button
                            className="sp1_filter_button"
                            onClick={() => setIsOpen(true)}
                            style={{ gap: "10px", backgroundColor: "transparent"}}
                            onKeyDown={() => setIsOpen(true)}
                        >
                            <i className="fa-solid fa-filter"></i>
                            <span>Filter</span>
                        </button>

                        {isOpen && (
                            <div className="sp1_filter_sidebar">
                                <div className="sp1_filter_sidebar_header">
                                    <h4>Filter</h4>
                                    <Button
                                        variant="tertiary"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <i className="fa-solid fa-xmark" />
                                    </Button>
                                </div>

                                <div
                                    className="p-3 d-flex flex-column"
                                    style={{ gap: "10px" }}
                                >
                                    <UserFilter
                                        title="Client"
                                        state={client}
                                        setState={setClient}
                                        roleIds={null}
                                        sidebarIsOpen={true}
                                    />
                                    <div style={{ maxWidth: "256px" }}>
                                        <SearchBox
                                            value={search}
                                            onChange={setSearch}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </React.Fragment>
            )}
        </div>,
        document.getElementById("salesAnalysisReportTableFilter")
    );
};

export default SaleAnalysisReportTableFilterBar;

const HDivider = ({ className = "" }) => {
    return <div className={`filter_divider ${className}`} />;
};

SaleAnalysisReportTableFilterBar.propTypes = {
    setFilter: PropTypes.func,
};

HDivider.propTypes = {
    className: PropTypes.string,
};
