import React from "react";
import ReactDOM from "react-dom";

import SearchBox from "../../global/Searchbox";
import MonthPicker from "./MonthPicker";
import { useDebounce } from "react-use";
const FilterBar = ({ setFiltering }) => {
    const [month, setMonth] = React.useState(null);
    const [year, setYear] = React.useState(null);
    const [search, setSearch] = React.useState("");
    const [searchText, setSearchText] = React.useState("");

    const _month = React.useMemo(() => month, [month]);
    const _year = React.useMemo(() => year, [year]);
    React.useEffect(() => {
        setFiltering((prev) => ({
            ...prev,
            month: _month,
            year: _year,
        }));
    }, [month, year]);

    //search data
    useDebounce(
        () => {
            setSearchText(search);
        },
        500,
        [search]
    );

    React.useEffect(() => {
        setFiltering((prev) => ({ ...prev, search: searchText }));
    }, [searchText]);

    return ReactDOM.createPortal(
        <div className="w-100 bg-white py-2 px-4">
            <div style={{ display: "flex", gap: "10px" }}>
                <div>
                    <MonthPicker setMonth={setMonth} setYear={setYear} />
                </div>
                <div>
                    <SearchBox value={search} onChange={setSearch} />
                </div>
            </div>
        </div>,
        document.getElementById("leadTableFilterContainer")
    );
};

export default FilterBar;
