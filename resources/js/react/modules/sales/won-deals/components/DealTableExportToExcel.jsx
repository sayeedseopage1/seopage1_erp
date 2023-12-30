import React from "react";
import ReactDOM from "react-dom";
import dayjs from "dayjs";
import ReactExport from "react-data-export";
import _, { fill } from "lodash";
import styled from "styled-components";
import Loader from "../../../../global/Loader";
import { useExportableWonDealsMutation } from "../../../../services/api/wonDealsApiSlice";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const DealTableExportButton = ({ filter }) => {
    const [isRender, setIsRender] = React.useState(false);
    const queryObject = _.pickBy(filter ?? {}, Boolean);
    const query = new URLSearchParams(queryObject).toString();

    const [exportableWonDeals, { data, isLoading, isSuccess, isUninitialized }] =
    useExportableWonDealsMutation();

    const deals = data?.data;

    console.log({data});
   


    // get deals
    const getData = (deals) => {
        let rows = []; 


        _.forEach(deals, (d) => { 
            
            const fieldStyle = {
                alignment: {
                    // wrapText: true,
                    vertical: "center",
                    horizontal: "top",
                }, 
                font:{
                    bold: d?.project_type?.toLowerCase() === 'hourly',
                    color: {
                        rgb: d?.project_type?.toLowerCase() === 'hourly' ? 'FF28A745' : ''
                    }
                }
            };


            const clientContactForm = (d) => {
                if(d?.toLowerCase() === 'submitted'){
                    return {
                        fill: {
                            fgColor: {rgb: 'FF28A745'},
                        },
                        font: { 
                            color: {rgb: 'FFFFFFFF' },
                        },
                    }
                }else{
                    return {
                        fill: {
                            fgColor: {rgb: 'FFFCBD01'},
                        }, 
                        font: { 
                            color: {rgb: 'FF000000' },
                        },
                    }
                }
            }
           
            // status
            const statusStyle = (status) => {
                const s = status?.toLowerCase();
                if(s === 'accepted'){
                    return {
                        fill: {
                            fgColor: {rgb: 'FF28A745'},
                        },
                        font: { 
                            color: {rgb: 'FFFFFFFF' },
                        },
                    }
                }else if (s === 'denied'){
                    return {
                        fill: {
                            fgColor: {rgb: 'FFD30000'},
                        },
                        font: { 
                            color: {rgb: 'FFFFFFFF' },
                        },
                    }
                }else {
                    return {
                        fill: {
                            fgColor: {rgb: 'FFFCBD01'},
                        }, 
                        font: { 
                            color: {rgb: 'FF000000' },
                        },
                    }
                }
            }

            // date 
            const date = (_data) => _data 
                ? dayjs(_data).format(`DD-MM-YYYY hh:mm:ss A`)
                : "--";

            let row = [
                {
                    value: d["deal_id"] ?? "--",
                    style: fieldStyle,
                },
                {
                    value: `${d["project_name"]} ${d?.project_type?.toLowerCase() === 'hourly' ? ' ( Hourly )' : ''}` ?? "--",
                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: d["cms_name"] ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d["value"] ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d["client_name"] ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d["pm_name"] ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.["deal_creation_date"] ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.submission_status?.toLowerCase() === 'submitted' ? 'Submitted' : 'Awaiting for client Response',
                    style: {
                        ...fieldStyle,
                        ...clientContactForm(d?.submission_status)
                    },
                },
                {
                    value: date(d?.created_at) ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.["added_by_name"] ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.status?.toLowerCase() === 'accepted' ? 'Accepted' : d?.status?.toLowerCase() === 'denied' ? 'Denied' : 'Pending',
                    style: {
                        ...fieldStyle,
                        ...statusStyle(d?.status)
                    },
                },
            ];
            rows.push(row);
        });

        return rows;
    };

    // columns
    const columns = [
        { title: "Short Code" },
        { title: "Project Name" },
        { title: "CMS Name" },
        { title: "Amount" },
        { title: "Client" },
        { title: "Project Manager"},
        { title: "Closing Date" },
        { title: "Client Contract Form" },
        { title: "Created Date" }, 
        { title: "Closed By" },
        { title: "Status" }, 
    ];

    // multi data set
    const multiDataSet = [
        {
            columns: [
                { title: "Filter" },
                { title: "Date" },
                { title: "Project Manager" },
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
                    { value: filter?.pm_name ?? "--" },
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
            data: getData(deals),
        },
    ];

    const handleRender = async () => {
        setIsRender(false);
        await exportableWonDeals(query).unwrap();
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

            {isRender && !isLoading && deals?.length > 0 && (
                <ExcelFile filename="won_deals_table" hideElement={true}>
                    <ExcelSheet dataSet={multiDataSet} name="won_deals_table" />
                </ExcelFile>
            )}
        </React.Fragment>
    );
};

export default DealTableExportButton;

const ExportButton = styled.button`
    padding: 6px 10px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    gap: 8px;
    /* color: #DAF7A6; */
    color: #000;
    background-color: #c4de95;
`;
