import React from "react";
import ReactDOM from "react-dom";
import JqueryDateRangePicker from "./JqueryDateRangePicker";
import { Flex } from "./table/ui";
import SearchBox from "../../../../global/Searchbox";
import { useUsers } from "../../../../hooks/useUsers";
import _ from "lodash";
import SalesFilter from "./SalesFilter";

const LeadTableFilterBar = ({ setFilter }) => {
    const { users } = useUsers();
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [search, setSearch] = React.useState("");
    const [sale, setSale] = React.useState(null);

    const searchText = React.useDeferredValue(search);

    const saleId = sale?.id;

    const _startData = React.useMemo(() => startDate, [startDate]);
    const _endData = React.useMemo(() => endDate, [endDate]);
    const _saleId = React.useMemo(() => sale?.id, [saleId]);


    React.useEffect(() => {
        setFilter((prev) => ({
            ...prev,
            start_date: _startData,
            end_date: _endData,
            sales_executive_id: _saleId,
            sale_name: sale?.name
        }));
    }, [_startData, _endData, _saleId]);

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
                    />

                    <div
                        style={{ width: "256px" }}
                        className="px-3 border-left"
                    >
                        <SearchBox value={search} onChange={setSearch} />
                    </div>

                    <SalesFilter
                        value={sale}
                        onChange={setSale}
                        data={_.filter(users, (user) =>
                            _.includes([1, 7, 8], Number(user.role_id))
                        )}
                    />
                </Flex>
            </div>
        </React.Fragment>,
        document.getElementById("leadTableFilterContainer")
    );
};

export default LeadTableFilterBar;
