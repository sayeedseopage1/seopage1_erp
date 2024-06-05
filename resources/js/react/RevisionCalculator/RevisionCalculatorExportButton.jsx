import React from "react";
import ReactDOM from "react-dom";
import dayjs from "dayjs";
import ReactExport from "react-data-export";
import _, { fill } from "lodash";
import styled from "styled-components";

import Loader from "../global/Loader";

import { useExportTableRevisionCalculatorMutation } from "../services/api/revisionCalculatorApiSlice";
import { convertTime } from "../utils/converTime";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const RevisionCalculatorExportButton = ({ filter }) => {
    const [isRender, setIsRender] = React.useState(false);
    const queryObject = _.pickBy(filter ?? {}, Boolean);
    const query = new URLSearchParams(queryObject).toString();

    const [getRevisionCalculatorData, { data, isLoading }] =
        useExportTableRevisionCalculatorMutation();

    const RevisionCalculator = data?.data;

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
                    value:
                        ` $ ${Number(d?.total_project_value).toFixed(2)}` ??
                        "--",
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
                    value: convertTime(d?.minutes_spent) ?? "--",
                    style: fieldStyle,
                },
                {
                    value: Number(d?.sales_issues).toFixed(2) ?? "--",
                    style: fieldStyle,
                },
                {
                    value: Number(d?.client_issues).toFixed(2) ?? "--",
                    style: {
                        ...fieldStyle,
                    },
                },

                {
                    value: Number(d?.pm_issues).toFixed(2) ?? "--",
                    style: fieldStyle,
                },
                {
                    value: Number(d?.lead_developer_issues).toFixed(2) ?? "--",
                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: Number(d?.developer_issues).toFixed(2) ?? "--",

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
                    value: Number(d?.total_disputes).toFixed(2) ?? "--",

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
        { title: "Project Manager Name", width: { wpx: 150 } },
        { title: "Assigned projects count" },
        { title: "Project budget" },
        { title: "Number of tasks" },
        { title: "Total no of revisions" },
        {
            title: "Hours spent in revisions (On developers/designers end",
            width: { wpx: 150 },
        },
        { title: "Sales Issues" },
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
                {isLoading ? (
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
