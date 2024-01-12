
import React from "react";
import ReactDOM from "react-dom";
import dayjs from "dayjs";
import ReactExport from "react-data-export";
import _ from "lodash";
import {
    useAllLeadsQuery,
    useLazyAllLeadsQuery,
} from "../../../../services/api/leadApiSlice";
import styled from "styled-components";
import Loader from '../../../../global/Loader'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const LeadTableExportButton = ({ filter }) => {
    const [isRender, setIsRender] = React.useState(false);
    const queryObject = _.pickBy(filter ?? {}, Boolean);
    const query = new URLSearchParams(queryObject).toString();
    const [allLeads, { data, isFetching, isSuccess }] = useLazyAllLeadsQuery();

    const leads = data?.data;

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
            const date = d?.lead_created_at
                ? dayjs(d?.lead_created_at).format(`DD-MM-YYYY hh:mm:ss A`)
                : "--";

            const status = [
                {
                    label: "Not Applicable",
                    bgColor: "FFB5BABD",
                },
                {
                    label: "Won",
                    bgColor: "FF0AAA29",
                },
                {
                    label: "Lost",
                    bgColor: "FFEC3003",
                },
                {
                    label: "Not Activity Yet",
                    bgColor: "FFFAA700",
                },
            ];

            const s =  status[d?.won_lost] ?? null;
   
            let row = [
                {
                    value: d["id"] ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d["client_name"] ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d["project_link"] ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d["project_id"] ?? "--",
                    style: fieldStyle,
                },
                {
                    value:
                        `${d?.currency_symbol}${d?.bid_value} - ${d?.currency_symbol}${d?.bid_value2}` ??
                        "--",
                    style: {
                        ...fieldStyle,
                        font:{
                            bold: true
                        }
                    },
                },
                {
                    value: `${d?.currency_symbol}${d?.actual_value}` ?? "--",
                    style: {
                        ...fieldStyle,
                        font:{
                            bold: true
                        }
                    },
                },
                {
                    value: date,
                    style: fieldStyle,
                },
                {
                    value: d["agent_name"],
                    style: fieldStyle,
                },
                {
                    value: `${d?.bidding_minutes ?? 0} min ${
                        d?.bidding_seconds ?? 0
                    } sec`,
                    style: fieldStyle,
                },
                {
                    value: `${
                        d.deal_status === 0
                            ? "Not Converted to Deal"
                            : "Converted to Deal"
                    }`,
                    style: {
                        ...fieldStyle,
                        font: {
                            bold: true,
                            color: {rgb: d.deal_status === 0 ? "FFB5BABD" : "FF0AAA29"}
                        }
                    },
                },
                {
                    value: s?.label ?? '--',
                    style: {
                        ...fieldStyle,
                        font:{
                            bold: true,
                            color: {
                                rgb: s?.bgColor ?? 'FFFAA700'
                            }
                        }
                    },
                },
            ];

            rows.push(row);
        });

        return rows;
    };
 
    // columns
    const columns = [
        { title: "#" },
        { title: "Project Name" },
        { title: "Project Link", width: { wpx: 200 } },
        { title: "Project ID" },
        { title: "Project Budget" },
        { title: "Bid Value" },
        { title: "Created At" },
        { title: "Created By" },
        { title: "Bidding Delay Time" },
        { title: "Status" },
        { title: "Deal Status" },
    ];

    // multi data set
    const multiDataSet = [
        {
            columns: [
                { title: "Filter" },
                { title: "Date" }, 
                { title: "Sale"}
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
                    {value: filter?.sale_name ?? '--'}
                ],
            ],
        },
        {
            xSteps: 0,
            ySteps: 2,
            columns: columns,
            data: getData(leads),
        },
    ];

    const handleRender = async () => {
        setIsRender(false);
        await allLeads(`?${query}`).unwrap();
        setIsRender(true);
    };

    return ReactDOM.createPortal(
        <React.Fragment>
            <ExportButton onClick={handleRender}>
                {isFetching ? (
                    <>
                        <Loader title="Processing..." />
                        
                    </>
                ) : (
                    <>
                        <i className="fa-solid fa-download" /> Export To Excel
                    </>
                )}
            </ExportButton>

            {isRender && isSuccess && leads?.length > 0 && (
                <ExcelFile filename="lead_table_data" hideElement={true}>
                    <ExcelSheet dataSet={multiDataSet} name="lead_table_data" />
                </ExcelFile>
            )}
        </React.Fragment>,
        document.getElementById("leadTableExportButton")
    );
};

export default LeadTableExportButton;

const ExportButton = styled.button`
    padding: 5px 10px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 8px;
    /* color: #DAF7A6; */
    color: #000;
    background-color: #c4de95;
    height : 32.5px
`;
