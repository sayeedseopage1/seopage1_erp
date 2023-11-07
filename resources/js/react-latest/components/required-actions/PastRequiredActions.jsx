import _ from "lodash";
import React from "react";
import FilterBar from "./FilterBar/FilterBar";
import getCardData from "../../__fake_data__/required-actions/data";
import RequiredActionsCard from "./RequiredActionCards/RequiredActionsCard";

const PastRequiredActions = () => {
    const onFilter = (data) => {
        console.log(data, _.pickBy(data, Boolean));
    };

    return (
        <div>
            <FilterBar onFilter={onFilter} />
            {getCardData(12).map((data, i) => {
                return <RequiredActionsCard key={i} data={data} temp={false} />;
            })}
        </div>
    );
};

export default PastRequiredActions;
