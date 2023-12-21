import * as React from "react";
import dayjs from "dayjs";
import ReactExport from "react-data-export";
import _ from "lodash";
import { convertTime } from "../../../utils/converTime";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ExportEmployeeTimeLogHistoryToExcel = ({
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
            const idealTrackTime = convertTime(d["ideal_minutes"]);
            const missedTime = convertTime(d["missed_hours"]);

            let row = [
                {
                    value: d["employee_name"] ?? "--",
                    style: fieldStyle,
                },
                {
                    value: idealTrackTime,
                    style: fieldStyle,
                },
                {
                    value: d["hours"],
                    style: fieldStyle,
                },
                {
                    value: missedTime,
                    style: fieldStyle,
                },
                {
                    value: d["missed_hours_count"],
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
        { title: "Ideal Tracked Hours" },
        { title: "Actual Logged Hours" },
        { title: "Missed Hours" },
        { title: "Missed Day Count" },
    ];

    // multi data set
    const multiDataSet = [
        {
            columns: [
                { title: "Filter" },
                { title: "Date" },
                { title: "Employee" },
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
                                color: "#ffffff",
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

export default ExportEmployeeTimeLogHistoryToExcel;
