import React from "react";
import ReactDOM from "react-dom";
import dayjs from "dayjs";
import ReactExport from "react-data-export";
import _ from "lodash";
import styled from "styled-components";
import Loader from "../../../../global/Loader";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const DealTableExportButton = ({ filter }) => {
    const [isRender, setIsRender] = React.useState(false);
    const queryObject = _.pickBy(filter ?? {}, Boolean);
    const query = new URLSearchParams(queryObject).toString();

    const fieldStyle = {
        alignment: {
            // wrapText: true,
            vertical: "center",
            horizontal: "top",
        },
    };

    // get leads
    const getData = (leads) => {
        let rows = [];
        _.forEach(leads, (d) => {
            // let row = [
            //     {
            //         value: d["id"] ?? "--",
            //         style: fieldStyle,
            //     },
            //     {
            //         value: d["client_name"] ?? "--",
            //         style: fieldStyle,
            //     },
            //     {
            //         value: d["project_link"] ?? "--",
            //         style: fieldStyle,
            //     },
            //     {
            //         value: d["project_id"] ?? "--",
            //         style: fieldStyle,
            //     },
            //     {
            //         value:
            //             `${d?.currency_symbol}${d?.bid_value} - ${d?.currency_symbol}${d?.bid_value2}` ??
            //             "--",
            //         style: {
            //             ...fieldStyle,
            //             font:{
            //                 bold: true
            //             }
            //         },
            //     },
            //     {
            //         value: `${d?.currency_symbol}${d?.actual_value}` ?? "--",
            //         style: {
            //             ...fieldStyle,
            //             font:{
            //                 bold: true
            //             }
            //         },
            //     },
            //     {
            //         value: date,
            //         style: fieldStyle,
            //     },
            //     {
            //         value: d["agent_name"],
            //         style: fieldStyle,
            //     },
            //     {
            //         value: `${d?.bidding_minutes ?? 0} min ${
            //             d?.bidding_seconds ?? 0
            //         } sec`,
            //         style: fieldStyle,
            //     },
            //     {
            //         value: `${
            //             d.deal_status === 0
            //                 ? "Not Converted to Deal"
            //                 : "Converted to Deal"
            //         }`,
            //         style: {
            //             ...fieldStyle,
            //             font: {
            //                 bold: true,
            //                 color: {rgb: d.deal_status === 0 ? "FFB5BABD" : "FF0AAA29"}
            //             }
            //         },
            //     },
            //     {
            //         value: s?.label ?? '--',
            //         style: {
            //             ...fieldStyle,
            //             font:{
            //                 bold: true,
            //                 color: {
            //                     rgb: s?.bgColor ?? 'FFFAA700'
            //                 }
            //             }
            //         },
            //     },
            // ];
            // rows.push(row);
        });

        return rows;
    };

    // columns
    const columns = [
        { title: "#" },
        { title: "Deal Name" },
        { title: "Client" },
        { title: "Project Link", width: { wpx: 200 } },
        { title: "Project Budget (USD)" },
        { title: "Project Budget (Original Currency)" },
        { title: "Created Date" },
        { title: "Added By" },
        { title: "Closed By" },
        { title: "Status" },
        { title: "Action" },
    ];

    // multi data set
    const multiDataSet = [
        {
            columns: [
                { title: "Filter" },
                { title: "Date" },
                { title: "Client" },
                { title: "Closed By" },
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
                    { value: filter?.client_username ?? "--" },
                    { value: filter?.closed_by_name ?? "--" },
                    { value: filter?.status_title ?? "--" },
                ],
            ],
        },
        {
            xSteps: 0,
            ySteps: 2,
            columns: columns,
            data: [],
        },
    ];

    const handleRender = async () => {
        // setIsRender(false);
        // await allLeads(`?${query}`).unwrap();
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

            {isRender && (
                <ExcelFile filename="lead_table_data" hideElement={true}>
                    <ExcelSheet dataSet={multiDataSet} name="lead_table_data" />
                </ExcelFile>
            )}
        </React.Fragment>
    );
};

export default DealTableExportButton;

const ExportButton = styled.button`
    padding: 10px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 8px;
    /* color: #DAF7A6; */
    color: #000;
    background-color: #c4de95;
`;
