import React from "react";
import ReactDOM from "react-dom";
import dayjs from "dayjs";
import ReactExport from "react-data-export";
import _, { fill } from "lodash";
import styled from "styled-components";

import Loader from "../../global/Loader";
import { useExportableQualifiedSalesMutation } from "../../services/api/qualifiedSalesApiSlice";

import { CompareDate } from "../../Insights/utils/dateController";
import { convert } from "html-to-text";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const QualifiedSalesTableExportButton = ({ filter }) => {
    const dayjs2 = new CompareDate();
    const [isRender, setIsRender] = React.useState(false);
    const queryObject = _.pickBy(filter ?? {}, Boolean);
    const query = new URLSearchParams(queryObject).toString();

    const [getQualifiedSales, { data, isLoading }] =
        useExportableQualifiedSalesMutation();

    const qualifiedSales = data;

    // get deals
    const getData = (deals) => {
        let rows = [];

        _.forEach(deals, (d) => {
            const fieldStyle = {
                alignment: {
                    wrapText: true,
                    vertical: "center",
                    horizontal: "top",
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
                        font: {
                            color: { rgb: "00AA00" },
                            bold: true,
                        },
                    };
                } else if (!isPMAccepted || !isTopMApproved || !isSLApproved) {
                    // any of two accept
                    if (diff > 5) {
                        return {
                            font: {
                                color: { rgb: "FCBD01" },
                                bold: true,
                            },
                        };
                    }

                    return {
                        font: {
                            color: { rgb: "1D82F5" },
                            bold: true,
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
                        font: {
                            color: { rgb: "00AA00" },
                            bold: true,
                        },
                    };
                } else {
                    return {
                        font: {
                            color: { rgb: "1D82F5" },
                            bold: true,
                        },
                    };
                }
            };

            const convertHTMLToText = (html) => {
                const tempElement = document.createElement("div");
                tempElement.innerHTML = html;
                const text =
                    tempElement.textContent || tempElement.innerText || "";
                return text;
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
                    value: `$${Number(d["amount"]).toFixed(2)}` ?? "--",
                    style: {
                        ...fieldStyle,
                        font: {
                            bold: true,
                        },
                    },
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
                    value:
                        `Question for Sales Lead:
                         Did the sales executive defined requirements for this project properly?\n
                         Sales Lead's Comment: (By ${
                             Number(d?.sales_lead_id) === 208
                                 ? "Mohammad Sayeed Ullah"
                                 : "--"
                         })
                         ${convertHTMLToText(d?.sales_lead_need_define)} 
                         \n \n
                         Question for Project Manager: 
                         Did the sales team defined requirements for this project properly?\n
                         Project Manager's Comment: (By ${d?.pm_name})
                         ${convertHTMLToText(
                             d?.project_manager_needs_define
                         )}` ?? "--",

                    style: {
                        alignment: {
                            wrapText: true,
                            vertical: "top",
                            horizontal: "left",
                        },
                    },
                },
                {
                    value:
                        `Question for sales Lead:
                         Did the sales executive defined requirements for this project properly?\n
                         Sales Lead's Comment: (By ${
                             Number(d?.sales_lead_id) === 208
                                 ? "Mohammad Sayeed Ullah"
                                 : "--"
                         })
                         ${convertHTMLToText(
                             d?.sales_lead_price_authorization
                         )} 
                    ` ?? "--",

                    style: {
                        alignment: {
                            wrapText: true,
                            vertical: "top",
                            horizontal: "left",
                        },
                    },
                },
                {
                    value:
                        `Question for sales lead:
                        Did the sales executive set deadline for this project correctly?\n
                        Sales Lead's Comment: (By ${
                            Number(d?.sales_lead_id) === 208
                                ? "Mohammad Sayeed Ullah"
                                : "--"
                        })
                         ${convertHTMLToText(d?.sales_lead_deadline_comment)} 
                         \n \n
                         Question for project manager: 
                         Did the sales team set deadline for this project correctly?\n
                         Project Manager's Comment: (By ${d?.pm_name})
                         ${convertHTMLToText(
                             d?.project_manager_deadline_comment
                         )}` ?? "--",

                    style: {
                        alignment: {
                            wrapText: true,
                            vertical: "top",
                            horizontal: "left",
                        },
                    },
                },
                {
                    value:
                        `Question for Top management:
                        Was the sale authorized by the top management?\n
                         Top Management's Comment: (By ${
                             Number(d?.admin_id) === 62
                                 ? "Rajat Chakraborty"
                                 : "--"
                         })
                         ${convertHTMLToText(d?.admin_authorization_comment)} 
                         ` ?? "--",

                    style: {
                        alignment: {
                            wrapText: true,
                            vertical: "top",
                            horizontal: "left",
                        },
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
        { title: "Project Name", width: { wpx: 170 } },
        { title: "Client Name" },
        { title: "Amount" },
        { title: "Closed By", width: { wpx: 90 } },
        { title: "Project Manager", width: { wpx: 90 } },
        { title: "Contact Form", width: { wpx: 110 } },
        { title: "Authorized By Sales Lead" },
        { title: "Accepted by Project Manager" },
        { title: "Authorized By Top Management" },
        { title: "Status" },
        { title: "Needs Defined", width: { wpx: 550 } },
        { title: "Prices", width: { wpx: 550 } },
        { title: "Deadline", width: { wpx: 500 } },
        { title: "Top Management", width: { wpx: 550 } },
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
