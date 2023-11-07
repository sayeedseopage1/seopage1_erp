import React from "react";
import getCardData from "../../../__fake_data__/required-actions/data";
import RequiredActionsCard from "../RequiredActionCards/RequiredActionsCard";
import FilterBar from "../FilterBar/FilterBar";

const ExpireRequiredAction = () => {
    const onFilter = (data) => {
        console.log(data, _.pickBy(data, Boolean));
    };

    return (
        <div>
            <FilterBar onFilter={onFilter} change={true} />
            {getCardData(12).map((data, i) => {
                return <RequiredActionsCard key={i} data={data} />;
            })}
        </div>
    );
};

export default ExpireRequiredAction;
