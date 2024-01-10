import React from "react";
import ReactDOM from "react-dom";

import SearchBox from "../../global/Searchbox";
import MonthPicker from "./MonthPicker";

const FilterBar = ({ filtering, setFiltering }) => {
    return ReactDOM.createPortal(
        <div className="w-100 bg-white py-2 px-4">
            <div style={{ display: "flex", gap: "10px" }}>
                <div>
                    <MonthPicker />
                </div>
                <div>
                    <SearchBox value={filtering} onChange={setFiltering} />
                    {console.log("filtering", filtering)}
                </div>
            </div>
        </div>,
        document.getElementById("leadTableFilterContainer")
    );
};

export default FilterBar;
