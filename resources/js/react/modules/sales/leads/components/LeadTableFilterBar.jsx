import React from "react";
import ReactDOM from "react-dom";
import JqueryDateRangePicker from "./JqueryDateRangePicker";
import { Flex } from "./table/ui";
import SearchBox from "../../../../global/Searchbox";

const LeadTableFilterBar = ({ setFilter }) => {
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [search, setSearch] = React.useState("");

    const searchText = React.useDeferredValue(search);

    // on date picker apply
    const handleDatePicker = (start, end, cb) => {
        setFilter((prev) => ({
            ...prev,
            start_date: start,
            end_date: end,
        }));
        cb();
    };

    // search data
    React.useEffect(() => {
        setFilter((prev) => ({ ...prev, search: searchText }));
    }, [searchText]);

    return ReactDOM.createPortal(
        <React.Fragment>
            <div className="w-100 bg-white py-2">
                <Flex justifyContent="flex-start" className="px-3">
                  
                    <JqueryDateRangePicker
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        onApply={handleDatePicker}
                    />

                    <div
                        style={{ width: "256px" }}
                        className="px-3 border-left"
                    >
                        <SearchBox value={search} onChange={setSearch} />
                    </div>
                </Flex>
            </div>
        </React.Fragment>,
        document.getElementById("leadTableFilterContainer")
    );
};

export default LeadTableFilterBar;
