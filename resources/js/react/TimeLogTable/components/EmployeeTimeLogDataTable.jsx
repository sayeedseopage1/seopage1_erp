import React, {useState, useEffect} from "react";
import "./data-table.css";
import UserRender from "./UserRender";
import { convertTime } from "../../utils/converTime";
import TableFooter from "./TableFooter";

const DataTable = ({
    data,
    columns = [],
    tableName = "data-table",
    sortBy = "",
    height = "calc(100vh - 100px)",
    onPaginate,
    perpageData,
    handlePerPageData,
    totalEntry,
    currentPage
}) => {
    const [columnOrder, setColumnOrder] = useState([]);
    
    // get columns keys
    useEffect(() => {
        const column_ids = _.map(columns, 'id');
        setColumnOrder([...column_ids]);
    }, []);



    const _columns = _.sortBy(columns, item => _.indexOf(columnOrder, item.id));

    const renderRow = (data) => {
        const rows = [];
        if (data) {
            for (const [key, value] of data) {
                {
                    value?.map((item, index) => {
                        const className =
                            value.length === index + 1
                                ? "sp1_tlr_td f-14 sp1_tlr_td_border"
                                : "sp1_tlr_td f-14";
                        rows.push(
                            <React.Fragment key={item.time_log_start_time}>
                                <tr className="sp1_tlr_tr">
                                    {index === 0 && (
                                        
                                        <td
                                            className={`sp1_tlr_td sp1_tlr_td_border ${ value.length > 1 ? "sp1_tlr_td_hover-disable" : ""}`}
                                            rowSpan={value.length}
                                        >
                                            <UserRender
                                                name={item?.employee_name}
                                                profileUrl={`/account/employees/${item?.employee_id}`}
                                                image={item?.employee_image}
                                                role={item?.employee_designation}
                                                id={item?.employee_id}
                                            />
                                        </td>
                                    )}

                                    <td className={className}>
                                        <a href={`/account/projects/${item?.project_id}`}>
                                            {item?.project_name}
                                        </a>
                                    </td>
                                    <td className={className}>
                                        <UserRender
                                            name={item?.client_name}
                                            profileUrl={`/account/clients/${item?.client_id}`}
                                            image={item?.client_image}
                                            role="Freelancer.com"
                                            roleLink={item?.client_from}
                                            id={item?.client_id}
                                        />
                                    </td>
                                    <td className={className}>
                                        <UserRender
                                            name={item?.pm_name}
                                            profileUrl={`/account/employees/${item?.pm_id}`}
                                            image={item?.pm_image}
                                            role={item?.pm_roles}
                                            id={item?.pm_id}
                                        />
                                    </td>
                                    <td className={className}>
                                        {item?.number_of_session}
                                    </td>
                                    <td className={className}>
                                        {item?.total_minutes ? (
                                            convertTime(item?.total_minutes)
                                        ) : (
                                            <span className="text-danger">
                                                <i className="fa-solid fa-chevron-left mr-1" style={{ fontSize: "10px" }}/>
                                                1 min
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            </React.Fragment>
                        );
                    });
                }
            }
        }
        return rows;
    };

    return (
        <React.Fragment>
            <div className="p-3">
                <div
                    className="position-relative sp1_tlr_tbl_wrapper"
                    style={{ height}}
                >
                    <table className="sp1_tlr_table">
                        <thead className="sp1_tlr_thead">
                            <tr className="sp1_tlr_tr">
                                {
                                    _.map(_columns, (column) => {
                                        return(
                                            <th key={column.id} className="sp1_tlr_th">{column.header}</th>
                                        )
                                    })
                                }
                                {/* <th className="sp1_tlr_th ">Employee Name</th>
                                <th className="sp1_tlr_th ">Project Name</th>
                                <th className="sp1_tlr_th ">Client</th>
                                <th className="sp1_tlr_th ">Project Manager</th>
                                <th className="sp1_tlr_th ">
                                    Number of Session
                                </th>
                                <th className="sp1_tlr_th ">
                                    Total Track Time
                                </th> */}
                            </tr>
                        </thead>
                        <tbody className="sp1_tlr_tbody">
                            {renderRow(data)}
                        </tbody>
                    </table>
                </div>

                <TableFooter
                    onPaginate={onPaginate}
                    perpageData={perpageData}
                    totalEntry={totalEntry}
                    currentPage={currentPage}
                    handlePerPageData={handlePerPageData}
                />
            </div>
        </React.Fragment>
    );
};

export default DataTable;
