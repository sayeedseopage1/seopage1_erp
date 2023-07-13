import React from "react";
import "./data-table.css";

class Employee{
    constructor(data){
        this.data = data;
    }


    getEmployee(){
        
    }
}

const Table = ({ 
    data = [],
    columns = [],
    tableName = 'data-table',
    sortBy='',
    height="calc(100vh - 100px)",
    onPaginate,
}) => {
    return (
        <div className="sp1_tlr_table">
            <div className="sp1_tlr_thead">
                <div className="sp1_tlr_tr">
                    <div className="sp1_tlr_th sp1_tlr_td">Employee Name</div>
                    <div className="sp1_tlr_th sp1_tlr_td">Project Name</div>
                    <div className="sp1_tlr_th sp1_tlr_td">Client</div>
                    <div className="sp1_tlr_th sp1_tlr_td">Project Manager</div>
                    <div className="sp1_tlr_th sp1_tlr_td">
                        Number of Session
                    </div>
                    <button className="sp1_tlr_th_column_setting">
                        <i className="fa-solid fa-gear"></i>
                    </button>
                </div>
            </div>

            <div className="sp1_tlr_tbody" style={{height}}>
                {data.map((row, i) => (
                    <React.Fragment key={row.employee_id}>
                        <div className="sp1_tlr_tr">
                            <div className="sp1_tlr_td">{row.employee_id}</div>
                            <div className="sp1_tlr_td">Project Name</div>
                            <div className="sp1_tlr_td">Client</div>
                            <div className="sp1_tlr_td">Project Manager</div>
                            <div className="sp1_tlr_td">Number of Session</div>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Table;
