import React from "react";
import ReactDOM from "react-dom";
import dayjs from "dayjs";
import ReactExport from "react-data-export";
import _, { fill } from "lodash";
import styled from "styled-components";

import { useExportTasksMutation } from "../../services/api/tasksApiSlice";
import Loader from "../../global/Loader";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const TaskExportButton = ({ filter }) => {
    const [isRender, setIsRender] = React.useState(false);
    const queryObject = _.pickBy(filter ?? {}, Boolean);
    const query = new URLSearchParams(queryObject).toString();

    const [getTasksData, { data, isFetching, isLoading }] =
        useExportTasksMutation();

    const Tasks = data?.tasks;

    // console.log("filter", filter);
    // console.log(" task", Tasks);

    // get deals
    const getData = (deals) => {
        let rows = [];

        _.forEach(deals, (d) => {
            const fieldStyle = {
                alignment: {
                    vertical: "center",
                    horizontal: "top",
                },
                font: {
                    bold: d?.project_type?.toLowerCase() === "hourly",
                    color: {
                        rgb:
                            d?.project_type?.toLowerCase() === "hourly"
                                ? "FF28A745"
                                : "",
                    },
                },
            };

            const statusStyle = (row) => {
                if (row.column_name === "Submitted Task for Client Approval") {
                    return {
                        fill: {
                            fgColor: { rgb: "FF84D6" },
                        },
                        font: {
                            color: { rgb: "FFFFFFFF" },
                        },
                    };
                } else if (row.column_name === "To Do") {
                    return {
                        fill: {
                            fgColor: { rgb: "F5C71F" },
                        },
                        font: {
                            color: { rgb: "FFFFFFFF" },
                        },
                    };
                } else if (row.column_name === "Doing") {
                    return {
                        fill: {
                            fgColor: { rgb: "31A0F4" },
                        },
                        font: {
                            color: { rgb: "FFFFFFFF" },
                        },
                    };
                } else if (row.column_name === "Awaiting Client Approval") {
                    return {
                        fill: {
                            fgColor: { rgb: "0e0bc2" },
                        },
                        font: {
                            color: { rgb: "FFFFFFFF" },
                        },
                    };
                } else {
                    return {
                        fill: {
                            fgColor: { rgb: "f01616" },
                        },
                        font: {
                            color: { rgb: "FFFFFFFF" },
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
                    value: d?.milestone_title ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.deliverable_title ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.project_name ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.client_name ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.pm_id_name ?? "--",
                    style: fieldStyle,
                },
                {
                    value: dayjs(d?.creation_date).isValid()
                        ? dayjs(d?.creation_date).format("DD-MM-YYYY")
                        : "--",
                    style: {
                        ...fieldStyle,
                    },
                },

                {
                    value: dayjs(d?.due_date).isValid()
                        ? dayjs(d?.due_date).format("DD-MM-YYYY")
                        : "--",
                    style: fieldStyle,
                },
                {
                    value: dayjs(data?.task_approval_date).isValid()
                        ? dayjs(data?.task_approval_date).format("DD-MM-YYYY")
                        : "--",
                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: dayjs(d?.completion_date).isValid()
                        ? dayjs(d?.completion_date).format("DD-MM-YYYY")
                        : "--",

                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: dayjs(d?.task_submission_date).isValid()
                        ? dayjs(d?.task_submission_date).format("DD-MM-YYYY")
                        : "--",

                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: dayjs(d?.task_approval_date).isValid()
                        ? dayjs(d?.task_approval_date).format("DD-MM-YYYY")
                        : "Not Completed Yet",

                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value:
                        `${d?.estimate_hours} hrs ${d?.estimate_minutes} mins` ??
                        "--",

                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: d?.subtasks_hours_logged ?? "--",

                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: d?.added_by_name ?? "--",

                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: d?.assigned_to_name ?? "--",

                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: d?.column_name ?? "--",

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
        { title: "Task" },
        { title: "Timer Status" },
        { title: "Milestone" },
        { title: "Deliverable" },
        { title: "Project" },
        { title: "Client" },
        { title: "Project Manager" },
        { title: "Creation Date" },
        { title: "Due Date" },
        { title: "Started Date" },
        { title: "Completion Date" },
        { title: "Submission Date" },
        { title: "Approved On" },
        { title: "Estimated Time" },
        { title: "Hours Logged" },
        { title: "Assigned By" },
        { title: "Assigned To" },
        { title: "Task Status" },
    ];

    // multi data set
    const multiDataSet = [
        {
            columns: [
                { title: "Filter" },
                { title: "Date" },
                { title: "Project Manager" },
                { title: "Client" },
                { title: "Assign By" },
                { title: "Assign To" },
                { title: "status" },
                { title: "Date Filter By" },
            ],
            data: [
                [
                    {
                        value: `--`,
                    },

                    {
                        value: `${dayjs(filter?.start_date).format(
                            "MMM-DD-YYYY"
                        )} to ${dayjs(filter?.end_date).format("MMM-DD-YYYY")}`,
                        style: {
                            font: {
                                bold: true,
                            },
                        },
                    },

                    {
                        value: filter?.pm_name,
                    },
                    {
                        value: filter?.client_name,
                    },
                    {
                        value: filter?.assignee_by_name,
                    },
                    {
                        value: filter?.assignee_to_name,
                    },
                    {
                        value: filter?.status_name,
                    },
                    {
                        value: filter?.date_filter_by,
                    },
                ],
            ],
        },
        {
            xSteps: 0,
            ySteps: 2,
            columns: columns,
            data: getData(Tasks),
        },
    ];

    const handleRender = async () => {
        setIsRender(false);
        await getTasksData(query).unwrap();
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

            {isRender && !isLoading && Tasks?.length > 0 && (
                <ExcelFile filename="Task_table" hideElement={true}>
                    <ExcelSheet dataSet={multiDataSet} name=" task table" />
                </ExcelFile>
            )}
        </React.Fragment>
    );
};

export default TaskExportButton;

const ExportButton = styled.button`
    width: 140px;
    padding: 6px 10px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    /* margin-left: 15px; */

    /* color: #DAF7A6; */
    color: #000;
    background-color: #c4de95;
    gap: 8px;
`;
