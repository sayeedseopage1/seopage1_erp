import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

import { Flex } from "./Table/ui";
import SearchBox from "../../global/Searchbox";
import { useUsers } from "../../hooks/useUsers";
import JqueryDateRangePicker from "./Table/JqueryDateRangePicker";

import FilterItemEvaluation from "./FilterItemEvaluation";

const EvaluationTableFilterBar = ({ setFilter, tableType, setTableType }) => {
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [search, setSearch] = React.useState("");
    const [sale, setSale] = React.useState(null);

    const searchText = React.useDeferredValue(search);

    const _startData = React.useMemo(() => startDate, [startDate]);
    const _endData = React.useMemo(() => endDate, [endDate]);

    React.useEffect(() => {
        setFilter((prev) => ({
            ...prev,
            start_date: _startData,
            end_date: _endData,
        }));
    }, [_startData, _endData]);

    // search data
    React.useEffect(() => {
        setFilter((prev) => ({ ...prev, search: searchText }));
    }, [searchText]);

    return (
        <React.Fragment>
            <div className="w-100 bg-white py-2">
                <Flex
                    justifyContent="flex-start"
                    className="px-3"
                    flexWrap="wrap"
                >
                    <JqueryDateRangePicker
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                    />

                    <div
                        style={{ width: "256px" }}
                        className="px-3 border-left"
                    >
                        <SearchBox value={search} onChange={setSearch} />
                    </div>

                    <FilterItemEvaluation
                        title="Evaluation Type"
                        items={[
                            "Developer",
                            "Project Manager",
                            "Lead Developer",
                            "Sales Executive",
                        ]}
                        selected={tableType}
                        isLoading={false}
                        onSelect={setTableType}
                    />
                </Flex>
            </div>
        </React.Fragment>
    );
};

export default EvaluationTableFilterBar;
