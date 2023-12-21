import * as React from "react";
import dayjs from "dayjs";
import ReactExport from "react-data-export";
import { convert } from "html-to-text";
import _ from "lodash";
import { convertTime } from "../../../utils/converTime";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const DailySubmissionTableExportToExcel = ({
    data,
    button,
    filter,
    filename,
}) => {
    const fieldStyle = {
        alignment: {
            // wrapText: true,
            vertical: "center",
            horizontal: "top",
        },
    };

    // get data
    const getData = (data) => {
        let rows = [];

        _.forEach(data, (d) => {
            const totalTimeSpent = d?.total_time_spent ? convertTime(d?.total_time_spent) : null;
            const text = convert(d?.comment);
            const reportDate = d?.report_date
                ? dayjs(d?.report_date).format("MMM DD, YYYY [at] hh:mm:ss A")
                : "N/A";
            const reportSubmissionDate = d?.report_submission_date
                ? dayjs(d?.report_date).format("MMM DD, YYYY [at] hh:mm:ss A")
                : "N/A";
            let row = [
                {
                    value: d["employee_name"] ?? "--",
                    style: fieldStyle,
                },
                {
                    value: reportDate,
                    style: fieldStyle,
                },
                {
                    value: d?.client_name ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.pm_name ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.ld_name ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.project_name ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.task_name ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.status_name ?? "--",
                    style: {
                        ...fieldStyle,
                        // fill: {
                        //   fgColor: {
                        //     rgb: _.toUpper(_.replace(d?.status_color,'#','FF'))
                        //   }
                        // },
                        font: {
                            bold: true,
                            color: {
                                rgb: _.toUpper(
                                    _.replace(d?.status_color, "#", "FF")
                                ),
                            },
                        },
                    },
                },
                {
                    value: d?.task_type ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.page_type ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.page_link ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.section ?? "--",
                    style: fieldStyle,
                },
                {
                    value: text ?? "--",
                    style: fieldStyle,
                },
                {
                    value: totalTimeSpent ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.attachments ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.site_url ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.frontend_password ?? "--",
                    style: fieldStyle,
                },
                {
                    value: reportSubmissionDate ?? "--",
                    style: fieldStyle,
                },
            ];

            rows.push(row);
        });
        return rows;
    };

    // columns
    const columns = [
        { title: "Employee Name" },
        { title: "Report Date" },
        { title: "Client" },
        { title: "Project Manager" },
        { title: "Lead Developer" },
        { title: "Project" },
        { title: "Task" },
        { title: "Status" },
        { title: "Task Type" },
        { title: "Page Type" },
        { title: "Page Link" },
        { title: "Sections" },
        { title: "Comment" },
        { title: "Total Time Spent" },
        { title: "Screenshots/Screen records of the sections" },
        { title: "Working/Staging Site's URL" },
        { title: "Frontend Password" },
        { title: "Report Submission Date" },
    ];
 
    // multi data set
    const multiDataSet = [
        {
            columns: [
                { title: "Filter" },
                { title: "Date" },
                { title: "Employee" },
                { title: "Project Manager" },
                { title: "Client" },
                { title: "Project" },
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
                        value: filter?.employee_name ?? '--',
                        style: {
                            font: {
                                bold: true,
                            },
                        },
                    },
                    {
                        value: filter?.pm_name ?? '--',
                        style: {
                            font: {
                                bold: true,
                            },
                        },
                    },
                    {
                        value: filter?.client_name ?? '--',
                        style: {
                            font: {
                                bold: true,
                            },
                        },
                    },
                    {
                        value: filter?.project_name ?? '--',
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
            data: getData(data),
        },
    ];

    return (
        <ExcelFile filename={filename} element={button}>
            <ExcelSheet dataSet={multiDataSet} name={filename} />
        </ExcelFile>
    );
};

export default DailySubmissionTableExportToExcel;
