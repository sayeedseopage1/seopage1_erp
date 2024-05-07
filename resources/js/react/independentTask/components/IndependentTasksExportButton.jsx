import React from "react";
import ReactDOM from "react-dom";
import dayjs from "dayjs";
import ReactExport from "react-data-export";
import _, { fill } from "lodash";
import styled from "styled-components";

import { useExportIndependentTasksMutation } from "../../services/api/independentTaskApiSlice";
import Loader from "../../global/Loader";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const IndependentTaskExportButton = ({ filter }) => {
    //converting the filter query into object..
    //this was done since filter data was expected to send as object through props..
    //but that didnt happen, thats why i am converting into object here
    const newFilter = filter?.split("&");

    const Object = {};

    newFilter?.forEach((pair) => {
        const [key, value] = pair.split("=");
        Object[key] = value;
    });
    //filter query to object end

    const [isRender, setIsRender] = React.useState(false);
    const queryObject = _.pickBy(Object ?? {}, Boolean);
    const query = new URLSearchParams(queryObject).toString();

    const [getIndependentTasksData, { data, isFetching, isLoading }] =
        useExportIndependentTasksMutation();

    const IndependentTasks = data?.data;

    console.log("object", Object);
    console.log("independent task", IndependentTasks);

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
        { title: "Client" },
        { title: "Creation Date" },
        { title: "Started Date" },
        { title: "Due Date" },
        { title: "Approved On" },
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
        setIsRender(false);
        await getIndependentTasksData(query).unwrap();
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

            {isRender && !isLoading && IndependentTasks?.length > 0 && (
                <ExcelFile filename="Independent_task_table" hideElement={true}>
                    <ExcelSheet
                        dataSet={multiDataSet}
                        name="Independent task table"
                    />
                </ExcelFile>
            )}
        </React.Fragment>
    );
};

export default IndependentTaskExportButton;

const ExportButton = styled.button`
    width: 140px;
    padding: 6px 10px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    margin-left: 15px;

    /* color: #DAF7A6; */
    color: #000;
    background-color: #c4de95;
    gap: 8px;
`;
