import React from "react";
import ReactDOM from "react-dom";
import dayjs from "dayjs";
import ReactExport from "react-data-export";
import _, { fill } from "lodash";
import styled from "styled-components";

import Loader from "../global/Loader";

import { useExportTableRevisionCalculatorMutation } from "../services/api/revisionCalculatorApiSlice";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const RevisionCalculatorExportButton = ({ filter }) => {
    const [isRender, setIsRender] = React.useState(false);
    const queryObject = _.pickBy(filter ?? {}, Boolean);
    const query = new URLSearchParams(queryObject).toString();

    const [getRevisionCalculatorData, { data, isFetching, isLoading }] =
        useExportTableRevisionCalculatorMutation();

    const RevisionCalculator = data?.data;

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
                    value: d?.project_manager_name ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.total_projects ?? "--",
                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: d?.total_project_value ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.total_tasks ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.total_revisions ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.minutes_spent ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.sales_issues ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.client_issues,
                    style: {
                        ...fieldStyle,
                    },
                },

                {
                    value: d?.pm_issues ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.lead_developer_issues ?? "--",
                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: d?.developer_issues ?? "--",

                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: d?.pending_issues ?? "0.00",

                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: d?.total_disputes ?? "--",

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
        { title: "Project Manager Name" },
        { title: "Assigned projects count" },
        { title: "Project budget" },
        { title: "Number of tasks" },
        { title: "Total no of revisions" },
        { title: "Hours spent in revisions (On developers/designers end" },
        { title: "Revision Breakdown" },
        { title: "Client Side Issues" },
        { title: "Project Manager Issues" },
        { title: "Lead Developers/Designers Issues" },
        { title: "Developers/Designers Issues" },
        { title: "Rev. Accept/Deny Pending" },
        { title: "Total Disputed" },
    ];

    // multi data set
    const multiDataSet = [
        {
            columns: [{ title: "Filter" }, { title: "Date" }],
            data: [
                [
                    {
                        value: `--`,
                    },

                    {
                        value: `${dayjs(filter?.startDate).format(
                            "MMM-DD-YYYY"
                        )} to ${dayjs(filter?.endDate).format("MMM-DD-YYYY")}`,
                        style: {
                            font: {
                                bold: true,
                            },
                        },
                    },
                ],
            ],
        },
        {
            xSteps: 0,
            ySteps: 2,
            columns: columns,
            data: getData(RevisionCalculator),
        },
    ];

    const handleRender = async () => {
        setIsRender(false);
        await getRevisionCalculatorData(query).unwrap();
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

            {isRender && !isLoading && RevisionCalculator?.length > 0 && (
                <ExcelFile
                    filename="Revision_Calculator_table"
                    hideElement={true}
                >
                    <ExcelSheet
                        dataSet={multiDataSet}
                        name="Revision calculator table"
                    />
                </ExcelFile>
            )}
        </React.Fragment>
    );
};

export default RevisionCalculatorExportButton;

const ExportButton = styled.button`
    margin-bottom: 20px;
    width: 140px;
    padding: 6px 10px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    gap: 8px;
    /* color: #DAF7A6; */
    color: #000;
    background-color: #c4de95;
`;
