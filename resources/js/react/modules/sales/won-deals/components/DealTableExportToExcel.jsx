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
