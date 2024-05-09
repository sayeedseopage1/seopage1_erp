import React from "react";
import ReactDOM from "react-dom";
import dayjs from "dayjs";
import ReactExport from "react-data-export";
import _, { fill } from "lodash";
import styled from "styled-components";

// import { useExportIndependentTasksMutation } from "../../services/api/independentTaskApiSlice";
import Loader from "../../global/Loader";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const IndependentSubTaskExportButton = ({ filter, subTaskTableData }) => {
    const [isRender, setIsRender] = React.useState(false);
    const queryObject = _.pickBy(filter ?? {}, Boolean);
    const query = new URLSearchParams(queryObject).toString();

    // const [getIndependentTasksData, { data, isLoading }] =
    //     useExportIndependentTasksMutation();

    const IndependentTasks = subTaskTableData;

    // get deals
    const getData = (deals) => {
        let rows = [];

        _.forEach(deals, (d) => {
            const fieldStyle = {
                alignment: {
                    wrapText: true,
                    vertical: "center",
                    horizontal: "center",
                },
            };
            const statusStyle = (row) => {
                if (
                    row.board_column_name ===
                    "Submitted Task for Client Approval"
                ) {
                    return {
                        font: {
                            color: { rgb: "FF84D6" },
                            bold: true,
                        },
                    };
                } else if (row.board_column_name === "To Do") {
                    return {
                        font: {
                            color: { rgb: "F5C71F" },
                            bold: true,
                        },
                    };
                } else if (row.board_column_name === "Doing") {
                    return {
                        font: {
                            color: { rgb: "31A0F4" },
                            bold: true,
                        },
                    };
                } else if (
                    row.board_column_name === "Awaiting Client Approval"
                ) {
                    return {
                        font: {
                            color: { rgb: "0e0bc2" },
                            bold: true,
                        },
                    };
                } else {
                    return {
                        font: {
                            color: { rgb: "f01616" },
                            bold: true,
                        },
                    };
                }
            };
            let row = [
                {
                    value: d?.heading ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.subtasks_timer_active ?? "--",
                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: d?.task_heading ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.existing_client_name ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.creation_date ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.start_date ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.due_date ?? "--",
                    style: fieldStyle,
                },
                {
                    value: "--",
                    style: fieldStyle,
                },
                {
                    value: "--",
                    style: {
                        ...fieldStyle,
                    },
                },

                {
                    value: d?.assigned_by_name ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.assigned_to_name ?? "--",
                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: d?.board_column_name ?? "--",

                    style: {
                        ...fieldStyle,
                        ...statusStyle(d),
                    },
                },
            ];
            rows.push(row);
        });

        return rows;
    };

    // columns
    const columns = [
        { title: "Task", width: { wpx: 200 } },
        { title: "Timer Status" },
        { title: "Parent Task", width: { wpx: 200 } },
        { title: "Client" },
        { title: "Creation Date" },
        { title: "Started Date" },
        { title: "Due Date" },
        { title: "Approved On" },
        { title: "Hours Logged" },
        { title: "Assigned By" },
        { title: "Assigned To" },
        { title: "Task Status", width: { wpx: 200 } },
    ];

    // multi data set
    const multiDataSet = [
        {
            columns: [
                { title: "Filter" },
                { title: "Date" },
                { title: "Assign By" },
                { title: "Assign To" },
                { title: "status" },
            ],
            data: [
                [
                    {
                        value: `--`,
                    },

                    {
                        value: `${dayjs(Object?.startDate).format(
                            "MMM-DD-YYYY"
                        )} to ${dayjs(Object?.endDate).format("MMM-DD-YYYY")}`,
                        style: {
                            font: {
                                bold: true,
                            },
                        },
                    },

                    {
                        value: Object?.assignee_by_name,
                    },
                    {
                        value: Object?.assignee_to_name,
                    },
                    {
                        value: Object?.status_name,
                    },
                ],
            ],
        },
        {
            xSteps: 0,
            ySteps: 2,
            columns: columns,
            data: getData(IndependentTasks),
        },
    ];

    const handleRender = async () => {
        // setIsRender(false);
        // await getIndependentTasksData(query).unwrap();
        setIsRender(true);
    };

    return (
        <React.Fragment>
            <ExportButton onClick={handleRender}>
                {false ? (
                    <>
                        <Loader title="Processing..." />
                    </>
                ) : (
                    <>
                        <i className="fa-solid fa-download" /> Export To Excel
                    </>
                )}
            </ExportButton>

            {isRender && IndependentTasks?.length > 0 && (
                <ExcelFile
                    filename="Independent_sub_task_table"
                    hideElement={true}
                >
                    <ExcelSheet
                        dataSet={multiDataSet}
                        name="Independent subtask table"
                    />
                </ExcelFile>
            )}
        </React.Fragment>
    );
};

export default IndependentSubTaskExportButton;

const ExportButton = styled.button`
    width: 140px;
    padding: 6px 10px;
    border-radius: 3px;
    margin-left: 15px;
    display: flex;
    align-items: center;

    /* color: #DAF7A6; */
    color: #000;
    background-color: #c4de95;
    gap: 8px;
`;
