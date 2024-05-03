import React from "react";
import ReactDOM from "react-dom";
import dayjs from "dayjs";
import ReactExport from "react-data-export";
import _, { fill } from "lodash";
import styled from "styled-components";

import Loader from "../../global/Loader";
import { useExportableQualifiedSalesMutation } from "../../services/api/qualifiedSalesApiSlice";

import { CompareDate } from "../../Insights/utils/dateController";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const QualifiedSalesTableExportButton = ({ filter }) => {
    const dayjs2 = new CompareDate();
    const [isRender, setIsRender] = React.useState(false);
    const queryObject = _.pickBy(filter ?? {}, Boolean);
    const query = new URLSearchParams(queryObject).toString();

    const [getQualifiedSales, { data, isFetching, isLoading }] =
        useExportableQualifiedSalesMutation();

    const qualifiedSales = data;

    console.log("qualified sales", qualifiedSales);

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
                font: {
                    bold: d?.project_type?.toLowerCase() === "hourly",
                    color: {
                        rgb:
                            d?.project_type?.toLowerCase() === "hourly"
                                ? "FF28A745"
                                : "",
                    },
                },
            };

            const statusStyle = (row) => {
                let isPMAccepted = Number(row?.accepted_by_project_manager);

                let isTopMApproved = Number(row?.authorized_by_admin);
                let isSLApproved = Number(row?.authorized_by_sales_lead);
                let date1 = dayjs2.dayjs(row?.date).format("YYYY-MM-DD");
                let curr = dayjs2.dayjs().format("YYYY-MM-DD");
                let diff = dayjs2.dayjs(curr).diff(date1, "day") + 1;

                if (isPMAccepted && isTopMApproved && isSLApproved) {
                    return {
                        fill: {
                            fgColor: { rgb: "00AA00" },
                        },
                        font: {
                            color: { rgb: "FFFFFFFF" },
                        },
                    };
                } else if (!isPMAccepted || !isTopMApproved || !isSLApproved) {
                    // any of two accept
                    if (diff > 5) {
                        return {
                            fill: {
                                fgColor: { rgb: "FCBD01" },
                            },
                            font: {
                                color: { rgb: "FFFFFFFF" },
                            },
                        };
                    }

                    return {
                        fill: {
                            fgColor: { rgb: "1D82F5" },
                        },
                        font: {
                            color: { rgb: "FFFFFFFF" },
                        },
                    };
                }
            };

            const Status = (row) => {
                let isPMAccepted = Number(row?.accepted_by_project_manager);

                let isTopMApproved = Number(row?.authorized_by_admin);
                let isSLApproved = Number(row?.authorized_by_sales_lead);
                let date1 = dayjs2.dayjs(row?.date).format("YYYY-MM-DD");
                let curr = dayjs2.dayjs().format("YYYY-MM-DD");
                let diff = dayjs2.dayjs(curr).diff(date1, "day") + 1;

                if (isPMAccepted && isTopMApproved && isSLApproved) {
                    // all accept
                    return " Qualified";
                } else if (!isPMAccepted || !isTopMApproved || !isSLApproved) {
                    // any of two accept
                    if (diff > 5) {
                        return "On Hold";
                    }

                    return "In Progress";
                }
            };

            const ApprovedOrPending = (row) => {
                if (row) {
                    return "Approved";
                } else {
                    return "Pending";
                }
            };

            const ApprovedOrPendingStyle = (row) => {
                if (row) {
                    return {
                        fill: {
                            fgColor: { rgb: "00AA00" },
                        },
                        font: {
                            color: { rgb: "FFFFFFFF" },
                        },
                    };
                } else {
                    return {
                        fill: {
                            fgColor: { rgb: "1D82F5" },
                        },
                        font: {
                            color: { rgb: "FFFFFFFF" },
                        },
                    };
                }
            };

            // date
            const date = (_data) =>
                _data ? dayjs(_data).format(`DD-MM-YYYY hh:mm:ss A`) : "--";

            let row = [
                {
                    value: date(d["date"]) ?? "--",
                    style: fieldStyle,
                },
                {
                    value:
                        `${d["project_name"]} ${
                            d?.project_type?.toLowerCase() === "hourly"
                                ? " ( Hourly )"
                                : ""
                        }` ?? "--",
                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: d["client_name"] ?? "--",
                    style: fieldStyle,
                },
                {
                    value: `$${d["amount"]}` ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d["closed_by_name"] ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d["pm_name"] ?? "--",
                    style: fieldStyle,
                },
                {
                    value:
                        `$https://seopage1.net/account/deal-url/${d?.["deal_id"]}` ??
                        "--",
                    style: fieldStyle,
                },
                {
                    value: ApprovedOrPending(d?.authorized_by_sales_lead),
                    style: {
                        ...fieldStyle,
                        ...ApprovedOrPendingStyle(d?.authorized_by_sales_lead),
                    },
                },

                {
                    value: ApprovedOrPending(d?.accepted_by_project_manager),
                    style: {
                        ...fieldStyle,
                        ...ApprovedOrPendingStyle(
                            d?.accepted_by_project_manager
                        ),
                    },
                },
                {
                    value: ApprovedOrPending(d?.["authorized_by_admin"]),
                    style: {
                        ...fieldStyle,
                        ...ApprovedOrPendingStyle(d?.["authorized_by_admin"]),
                    },
                },
                {
                    value: Status(d) ?? "--",

                    style: {
                        ...fieldStyle,
                        ...statusStyle(d),
                    },
                },
                {
                    value: d?.["total_points"] ?? "0.00",

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
        { title: "Date" },
        { title: "Project Name" },
        { title: "Client Name" },
        { title: "Amount" },
        { title: "Closed By" },
        { title: "Project Manager" },
        { title: "Contact Form" },
        { title: "Authorized By Sales Lead" },
        { title: "Accepted by Project Manager" },
        { title: "Authorized By Top Management" },
        { title: "Status" },
        { title: "points Earned" },
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
                { title: "Department" },
                { title: "Shift" },
                { title: "Project Name" },
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
                    { value: filter?.pm_Name ?? "--" },
                    { value: filter?.client_Name ?? "--" },
                    { value: filter?.closed_by_name ?? "--" },
                    { value: "Web Development" },
                    { value: "Sales Team" },
                    { value: filter?.project_Name ?? "--" },
                ],
            ],
        },
        {
            xSteps: 0,
            ySteps: 2,
            columns: columns,
            data: getData(qualifiedSales),
        },
    ];

    const handleRender = async () => {
        setIsRender(false);
        await getQualifiedSales(query).unwrap();
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

            {isRender && !isLoading && qualifiedSales?.length > 0 && (
                <ExcelFile filename="qualified_sales_table" hideElement={true}>
                    <ExcelSheet
                        dataSet={multiDataSet}
                        name="qualified sales table"
                    />
                </ExcelFile>
            )}
        </React.Fragment>
    );
};

export default QualifiedSalesTableExportButton;

const ExportButton = styled.button`
    margin-bottom: 20px;
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
