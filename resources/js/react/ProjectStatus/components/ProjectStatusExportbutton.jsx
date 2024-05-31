import React from "react";

import dayjs from "dayjs";
import ReactExport from "react-data-export";
import _, { fill } from "lodash";
import styled from "styled-components";

import Loader from "../../../react/global/Loader";
import { useExportProjectStatusMutation } from "../../services/api/projectStatusApiSlice";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ProjectStatusExportButton = ({ filter }) => {
    const [isRender, setIsRender] = React.useState(false);
    const queryObject = _.pickBy(filter ?? {}, Boolean);
    const query = new URLSearchParams(queryObject).toString();

    const [getProjectStatus, { data, isLoading }] =
        useExportProjectStatusMutation();

    const Revisions = data?.data;
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

            const date = (_data) =>
                _data ? dayjs(_data).format(`DD-MM-YYYY hh:mm:ss A`) : "--";

            let row = [
                {
                    value: d?.clientName,
                    style: fieldStyle,
                },
                {
                    value: d?.project_name ?? "--",
                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: `${d?.project_budget} ${d?.currency_symbol}`,
                    style: fieldStyle,
                },
                {
                    value: d?.pmName ?? "__",
                    style: fieldStyle,
                },
                {
                    value: d?.project_category ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.goal_start_date ?? "--",
                    style: fieldStyle,
                },
                {
                    value: `${d?.goal_progress}%` ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.goal_end_date,
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
        { title: "Client Name" },
        { title: "Project Name", width: { wpx: 200 } },
        { title: "Project Bugdet" },
        { title: "Project Manger" },
        { title: "Project Category" },
        { title: "Start Date" },
        { title: "Percentage og Goals Met" },
        { title: "Next Goal Date" },
        { title: "Next Goal Details" },
    ];

    // multi data set
    const multiDataSet = [
        {
            columns: [
                { title: "Filter" },
                { title: "Date" },
                { title: "Project Manager" },
                { title: "Client" },
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
                    { value: filter?.pm_name ?? "--" },
                    { value: filter?.client_name ?? "--" },
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
        await getProjectStatus(query).unwrap();
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
                <ExcelFile filename="Project_Status_table" hideElement={true}>
                    <ExcelSheet
                        dataSet={multiDataSet}
                        name="Project Status table"
                    />
                </ExcelFile>
            )}
        </React.Fragment>
    );
};

export default ProjectStatusExportButton;

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
