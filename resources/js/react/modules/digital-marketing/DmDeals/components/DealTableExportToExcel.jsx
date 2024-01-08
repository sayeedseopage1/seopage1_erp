import React from "react";
import ReactDOM from "react-dom";
import dayjs from "dayjs";
import ReactExport from "react-data-export";
import _, { fill } from "lodash";
import styled from "styled-components";
import Loader from "../../../../global/Loader";
import { useExportableDealsMutation } from "../../../../services/api/dealApiSlice";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const DealTableExportButton = ({ filter }) => {
    const [isRender, setIsRender] = React.useState(false);
    const queryObject = _.pickBy(filter ?? {}, Boolean);
    const query = new URLSearchParams(queryObject).toString();

    const [exportableDeals, { data, isLoading, isSuccess, isUninitialized }] =
        useExportableDealsMutation();

    const deals = data?.data;
   

    const fieldStyle = {
        alignment: {
            // wrapText: true,
            vertical: "center",
            horizontal: "top",
        },
    };


    // get deals
    const getData = (deals) => {
        let rows = [];
        _.forEach(deals, (d) => {

          const StatusStyle = (_color) => {
            let c =_color?.toUpperCase();

            if( c === '#FFFF00'){
              return {
                fill: {
                  fgColor: {rgb:'22E6E600'},
                }, 
              }
            }else{
              return {
                fill: {
                  fgColor: {rgb: c.replace(/#/g, '22')},
                },
                font: { 
                  color: {rgb: 'FFFFFFFF' },
                },
              }
            }
          }


            const date = d?.created_at
                ? dayjs(d?.created_at).format(`DD-MM-YYYY hh:mm:ss A`)
                : "--";

            let row = [
                {
                    value: d["id"] ?? "--",
                    style: fieldStyle,
                },
                {
                  value: d["project_name"] ?? "--",
                  style: fieldStyle,
              },
                {
                    value: d["client_username"] ?? "--",
                    style: fieldStyle,
                },
                {
                    value: (d?.lead_id ? d?.lead_project_link : d?.project_link) ?? "--",
                    style: fieldStyle,
                }, 
                {
                    value: `${d?.ammount_currency_symbol} ${d?.amount}` ?? "--",
                    style: {
                        ...fieldStyle,
                        font: {
                            bold: true,
                        },
                    },
                },
                {
                    value:
                        `${d?.actual_amount_currency_symbol} ${d?.actual_amount}` ??
                        "--",
                    style: {
                        ...fieldStyle,
                        font: {
                            bold: true,
                        },
                    },
                },
                {
                    value: date ,
                    style: fieldStyle,
                },
                {
                    value: (d?.lead_id ? d?.added_by_name : d?.lead_added_by_name) ?? '--',
                    style: fieldStyle,
                },

                {
                    value: (d?.deal_stages_converted_by_name &&  d["deal_stages_converted_by_name"] ) ?? '--',
                    style: fieldStyle,
                },
                {
                    value: d["won_lost"] ?? '--',
                    style: {
                        ...fieldStyle,
                        ...StatusStyle(d?.won_lost_bg)
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
        { title: "Deal Name" },
        { title: "Client" },
        { title: "Project Link", width: { wpx: 200 } },
        { title: "Project Budget (USD)" },
        { title: "Project Budget (Original Currency)" },
        { title: "Created Date" },
        { title: "Added By" },
        { title: "Closed By" },
        { title: "Status" }, 
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
            data: getData(deals),
        },
    ];

    const handleRender = async () => {
        setIsRender(false);
        await exportableDeals(query).unwrap();
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
                <ExcelFile filename="dm-deal_table_data" hideElement={true}>
                    <ExcelSheet dataSet={multiDataSet} name="dm-deal_table_data" />
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
