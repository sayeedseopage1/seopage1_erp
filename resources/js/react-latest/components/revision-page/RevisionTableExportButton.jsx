import React from "react";
import ReactDOM from "react-dom";
import dayjs from "dayjs";
import ReactExport from "react-data-export";
import _, { fill } from "lodash";
import styled from "styled-components";

import Loader from "../../../react/global/Loader";
import { CompareDate } from "../../../react/Insights/utils/dateController";
import { useExportableQualifiedSalesMutation } from "../../../react/services/api/qualifiedSalesApiSlice";
import { useExportTableRevisionMutation } from "../../services/api/revisionApiSlice";
import Switch from "../../ui/Switch";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const RevisionTableExportButton = ({ filter }) => {
    const dayjs2 = new CompareDate();
    const [isRender, setIsRender] = React.useState(false);
    const queryObject = _.pickBy(filter ?? {}, Boolean);
    const query = new URLSearchParams(queryObject).toString();

    const [getRevisions, { data, isFetching, isLoading }] =
        useExportTableRevisionMutation();

    const Revisions = data?.data;

    // get deals
    const getData = (deals) => {
        let rows = [];

        _.forEach(deals, (d) => {
            const fieldStyle = {
                alignment: {
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
                const data = row;
                const user = window?.Laravel?.user;

                const actionAlreadyTaken =
                    data.dispute_between === "SPR"
                        ? data.sale_accept || data.sale_deny
                        : data.is_accept || data.is_deny;

                const hasPermissionToTakeAction =
                    Number(user.id) === Number(data?.deal_added_by.id);

                if (!hasPermissionToTakeAction || actionAlreadyTaken) {
                    return `Accepted By ${data?.deal_added_by?.name}`;
                } else if (data.dispute_between === "SPR" && data.sale_deny) {
                    return `Denied By ${data?.deal_added_by?.name}`;
                } else if (data.dispute_between !== "SPR" && data.is_accept) {
                    return `Accepted by ${data?.task_assign_to?.name}`;
                } else if (data.dispute_between !== "SPR" && data.is_accept) {
                    return `Accepted by ${data?.task_assign_to?.name}`;
                } else if (
                    data.dispute_between !== "SPR"
                        ? data?.approval_status === "pending"
                        : !actionAlreadyTaken
                ) {
                    return "Pending";
                } else if (
                    data.dispute_between === "SPR" &&
                    !actionAlreadyTaken &&
                    hasPermissionToTakeAction
                ) {
                    return " Sales Status";
                }
            };

            const date = (_data) =>
                _data ? dayjs(_data).format(`DD-MM-YYYY hh:mm:ss A`) : "--";

            const convertHTMLToText = (html) => {
                const tempElement = document.createElement("div");
                tempElement.innerHTML = html;
                const text =
                    tempElement.textContent || tempElement.innerText || "";
                return text;
            };

            let row = [
                {
                    value: d?.id ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.project_name ?? "--",
                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: d?.client.name ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.heading ?? "--",
                    style: fieldStyle,
                },
                {
                    value:
                        convertHTMLToText(d?.pm_comment || d?.lead_comment) ??
                        "--",
                    style: fieldStyle,
                },
                {
                    value: d?.revision_acknowledgement ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.project_manager?.name ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.dispute_between,
                    style: {
                        ...fieldStyle,
                    },
                },

                {
                    value: d?.project_manager?.name ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.lead_developer.name ?? "--",
                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: d?.deal_added_by.name ?? "--",

                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: Status(d) ?? "--",

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
        { title: "Id" },
        { title: "Project" },
        { title: "Client" },
        { title: "Task" },
        { title: "Revision" },
        { title: "Revision reason" },
        { title: "Revision Provided By" },
        { title: "Revision Due To" },
        { title: "Project Manager" },
        { title: "Lead Developer" },
        { title: "Sales Executive" },
        { title: "Action/Status" },
    ];

    // multi data set
    const multiDataSet = [
        {
            columns: [
                { title: "Filter" },
                { title: "Date" },
                { title: "Project Manager" },
                { title: "Client" },
                { title: "Revision Raised By" },
                { title: "Revision Against To" },
                { title: "Lead Developer" },
            ],
            data: [
                [
                    {
                        value: `--`,
                    },

                    {
                        value: `${dayjs(filter?.startDate).format(
                            "MMM-DD-YYYY"
                        )} to ${dayjs(filter?.endDate).format("MMM-DD-YYYY")}`,
                        style: {
                            font: {
                                bold: true,
                            },
                        },
                    },
                    { value: filter?.project_manager_name ?? "--" },
                    { value: filter?.client_name ?? "--" },
                    { value: filter?.raised_by_name ?? "--" },
                    { value: filter?.against_to_name ?? "--" },
                    { value: filter?.lead_name ?? "--" },
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
        await getRevisions(query).unwrap();
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

            {isRender && !isLoading && Revisions?.length > 0 && (
                <ExcelFile filename="Revision_table" hideElement={true}>
                    <ExcelSheet dataSet={multiDataSet} name="Revision table" />
                </ExcelFile>
            )}
        </React.Fragment>
    );
};

export default RevisionTableExportButton;

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
