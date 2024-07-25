import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

// Components - UI- Shared
import JqueryDateRangePicker from "../Shared/JqueryDateRangePicker";
import PersonFilter from "../Shared/PersonFilter";

const PriceQuotationFilterBar = ({ setFilter, clientsData }) => {
    const [client, setClient] = React.useState(null);
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [search /*setSearch*/] = React.useState("");

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

            <PersonFilter
                value={client}
                onChange={setClient}
                title="Client"
                display={(value) => value?.name}
                searchBy={(value) => value?.name}
                data={clientsData}
            />
        </div>,
        document.getElementById("priceQuotationFilterContainer")
    );
};

export default PriceQuotationFilterBar;

PriceQuotationFilterBar.propTypes = {
    setFilter: PropTypes.func,
    clientsData: PropTypes.array,
};
