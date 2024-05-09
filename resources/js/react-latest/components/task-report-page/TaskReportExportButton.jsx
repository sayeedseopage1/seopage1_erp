import React from "react";

import dayjs from "dayjs";
import ReactExport from "react-data-export";
import _, { fill } from "lodash";
import styled from "styled-components";

import Loader from "../../../react/global/Loader";
import { CompareDate } from "../../../react/Insights/utils/dateController";
import { useExportTaskReportMutation } from "../../services/api/taskReportApiSlice";
import { convert } from "html-to-text";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const TaskReportExportButton = ({ filter }) => {
    const [isRender, setIsRender] = React.useState(false);
    const queryObject = _.pickBy(filter ?? {}, Boolean);
    const query = new URLSearchParams(queryObject).toString();

    const [getTaskReport, { data, isLoading }] = useExportTaskReportMutation();

    const Revisions = data?.report_issue;
    // get deals
    const getData = (deals) => {
        let rows = [];

        _.forEach(deals, (d) => {
            const fieldStyle = {
                alignment: {
                    wrapText: true,
                    vertical: "center",
                    horizontal: "left",
                },
            };

            const convertHTMLToText = (html) => {
                const tempElement = document.createElement("div");
                tempElement.innerHTML = html;
                const text =
                    tempElement.textContent || tempElement.innerText || "";
                return text;
            };
            const date = (_data) =>
                _data ? dayjs(_data).format(`DD-MM-YYYY hh:mm:ss A`) : "--";

            let row = [
                {
                    value:
                        `TSKRPTP${d?.projectId}T${d?.taskId}R
                    ${d?.id}` ?? "--",
                    style: fieldStyle,
                },
                {
                    value: dayjs(d?.report_date).format("DD-MMM-YYYY") ?? "--",
                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: d?.resolved_by_name ?? "Not Resolved Yet",
                    style: fieldStyle,
                },
                {
                    value:
                        dayjs(d?.resolved_on).format("DD-MMM-YYYY") ??
                        "Not Resolved Yet",
                    style: fieldStyle,
                },
                {
                    value: d?.client_name ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.project_name ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.task_heading ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.report_issuer_name,
                    style: {
                        ...fieldStyle,
                    },
                },

                {
                    value: d?.accountable_name ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.report_reason ?? "--",
                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: convertHTMLToText(d?.report_reason_details) ?? "--",

                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: d?.previousNotedIssue.toUpperCase() ?? "--",

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
        { title: "Report No.", width: { wpx: 100 } },
        { title: "Report Date" },
        { title: "Resolved By", width: { wpx: 120 } },
        { title: "Resolved On" },
        { title: "Client" },
        { title: "Project Name", width: { wpx: 160 } },
        { title: "Task Name", width: { wpx: 160 } },
        { title: "Report Issuer", width: { wpx: 150 } },
        { title: "Accountable Individual", width: { wpx: 150 } },
        { title: "Report Reason", width: { wpx: 300 } },
        { title: "Report Reason Details", width: { wpx: 500 } },
        { title: "Previously Reported" },
    ];

    // multi data set
    const multiDataSet = [
        {
            columns: [
                { title: "Filter" },
                { title: "Date" },
                { title: "Projects" },
                { title: "Client" },
                { title: "Report Issuer" },
                { title: "Accountable Individual" },
                { title: "Status" },
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
                    { value: filter?.project_name ?? "--" },
                    { value: filter?.client_name ?? "--" },
                    { value: filter?.report_issuer_name ?? "--" },
                    { value: filter?.accountable_individual_name ?? "--" },
                    { value: filter?.status_name ?? "--" },
                ],
            ],
        },
        {
            xSteps: 0,
            ySteps: 2,
            columns: columns,
            data: getData(Revisions),
        },
    ];

    const handleRender = async () => {
        setIsRender(false);
        await getTaskReport(query).unwrap();
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

            {isRender && !isLoading && Revisions?.length > 0 && (
                <ExcelFile filename="Task_Report_table" hideElement={true}>
                    <ExcelSheet
                        dataSet={multiDataSet}
                        name="Task Report table"
                    />
                </ExcelFile>
            )}
        </React.Fragment>
    );
};

export default TaskReportExportButton;

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
