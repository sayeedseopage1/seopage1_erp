import React, {useState, useEffect, useContext} from "react";
import Tabbar from "../components/Tabbar";
import SubTasksTable from "../components/SubtaskTable";
import FilterContainer from "../components/Filter-bar/FilterContainer";
import Filterbar from "../components/Filter-bar/Filterbar";

const Subtasks = () => {
    return (
        <React.Fragment>
            <FilterContainer>
                <Filterbar /> 
            </FilterContainer>
            <div className="sp1_tlr_container">
                <div className="sp1_tlr_tbl_container">
                    <div className="mb-3">
                        <Tabbar/>
                    </div>
                    
                    <SubTasksTable />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Subtasks;
