import React from "react";
import ReactDOM from "react-dom";
import dayjs from "dayjs";
import ReactExport from "react-data-export";
import _, { fill } from "lodash";
import styled from "styled-components";

import Loader from "../../global/Loader";
import { useExportDisputesMutation } from "../../services/api/SingleTaskPageApi";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const DisputesExportButton = ({ filter }) => {
    const [isRender, setIsRender] = React.useState(false);
    const queryObject = _.pickBy(filter ?? {}, Boolean);
    const query = new URLSearchParams(queryObject).toString();

    const [getDisputesData, { data, isFetching, isLoading }] =
        useExportDisputesMutation();

    const Disputes = data?.data;

    // get deals
    const getData = (deals) => {
        let rows = [];

        _.forEach(deals, (d) => {
            const fieldStyle = {
                alignment: {
                    wrapText: true,
                    vertical: "center",
                    horizontal: "left",
                },
            };

            const resolvedOn = (row) => {
                const data = row;
                const resolved_by = data?.resolved_by;
                const unsolvedQuestion = _.size(
                    _.filter(data?.conversations, (conv) =>
                        !conv.replies ? true : false
                    )
                );

                if (!resolved_by) {
                    if (unsolvedQuestion > 0) {
                        return "In Progress";
                    } else if (data?.need_authrization) {
                        return "Awaiting Authorization";
                    } else {
                        return "No Activity Yet";
                    }
                }

                if (data?.resolved_on) {
                    return `${dayjs(data?.resolved_on).format("MMM DD, YYYY")}
                
           ${dayjs(data?.resolved_on).format("hh:mm a")}`;
                }
            };

            const resolvedBy = (row) => {
                const data = row;
                const resolved_by = data?.resolved_by;
                const unsolvedQuestion = _.size(
                    _.filter(data?.conversations, (conv) =>
                        !conv.replies ? true : false
                    )
                );

                if (!resolved_by) {
                    if (unsolvedQuestion > 0) {
                        return "In Progress";
                    } else if (data?.need_authrization) {
                        return " Awaiting Authorization";
                    } else {
                        return "No Activity Yet";
                    }
                }

                return `${resolved_by?.name}`;
            };

            const authorizedOn = (row) => {
                const data = row;
                const authorized_by = data?.authorized_by;
                const unsolvedQuestion = _.size(
                    _.filter(data?.conversations, (conv) =>
                        !conv.replies ? true : false
                    )
                );

                if (!authorized_by && !data?.status) {
                    if (unsolvedQuestion > 0) {
                        return "In Progress";
                    } else if (data?.need_authrization) {
                        return "Awaiting Authorization";
                    } else {
                        return " No Activity Yet";
                    }
                }

                if (!authorized_by && data?.status) {
                    return "Not Applicable";
                }

                if (data?.authorize_on && data?.status) {
                    return `${dayjs(data?.authorize_on).format("MMM DD, YYYY")}
                
               
                    ${dayjs(data.authorize_on).format("hh:mm a")}`;
                }
            };

            const authorizedBy = (row) => {
                const data = row;
                const authorized_by = data?.authorized_by;
                const unsolvedQuestion = _.size(
                    _.filter(data?.conversations, (conv) =>
                        !conv.replies ? true : false
                    )
                );

                if (!authorized_by) {
                    if (unsolvedQuestion > 0) {
                        return "In Progress";
                    } else if (data?.need_authrization) {
                        return "Awaiting Authorization";
                    } else {
                        return "No Activity Yet";
                    }
                }

                return authorized_by?.name;
            };

            const statusStyle = (row) => {
                if (row.status) {
                    return {
                        font: {
                            color: { rgb: "0b7c27" },
                            bold: true,
                        },
                    };
                } else {
                    return {
                        font: {
                            color: { rgb: "f1ce04" },
                            bold: true,
                        },
                    };
                }
            };
            const winnerStyle = (row) => {
                if (row?.winner?.name) {
                    return {
                        font: {
                            color: { rgb: "0b7c27" },
                            bold: true,
                        },
                    };
                } else {
                    return {
                        font: {
                            color: { rgb: "f1ce04" },
                            bold: true,
                        },
                    };
                }
            };

            let row = [
                {
                    value: `T${d?.task_id}D ${
                        d?.id < 10 ? "0" + d?.id : d?.id
                    }`,
                    style: { ...fieldStyle, ...statusStyle(d) },
                },

                {
                    value: dayjs(d?.creation_date).isValid()
                        ? dayjs(d?.creation_date).format("DD-MM-YYYY")
                        : "--",
                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: d?.client.name ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.status ? "Resolved" : "Pending",
                    style: { ...fieldStyle, ...statusStyle(d) },
                },
                {
                    value: d?.project_name ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.task?.title ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.task?.title ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.sales_person?.name ?? "--",
                    style: {
                        ...fieldStyle,
                    },
                },

                {
                    value: d?.project_manager?.name ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.task?.lead_developer?.name ?? "--",
                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: d?.task?.developer?.name ?? "--",
                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: d?.raised_by?.name ?? "--",

                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: d?.raised_against?.name ?? "--",

                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: d?.winner?.name ?? "No Decision Yet",

                    style: {
                        ...fieldStyle,
                        ...winnerStyle(d),
                    },
                },
                {
                    value: resolvedOn(d),

                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: resolvedBy(d),

                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: authorizedOn(d),

                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: authorizedBy(d),

                    style: {
                        ...fieldStyle,
                    },
                },
                {
                    value: d?.due_date ?? "N/A",

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
        { title: "Dispute No." },
        { title: "Initiated On" },
        { title: "Client" },
        { title: "Status" },
        { title: "Project", width: { wpx: 150 } },
        { title: "Task", width: { wpx: 150 } },
        { title: "Sub Task", width: { wpx: 150 } },
        { title: "Sales Person" },
        { title: "Project Manager" },
        { title: "Lead Developer/Designer" },
        { title: "Developer/Designer" },
        { title: "Dispute Raised By" },
        { title: "Dispute Raised Against" },
        { title: "Winner" },
        { title: "Resolved On" },
        { title: "Resolved By" },
        { title: "Authorized On" },
        { title: "Authorized By" },
        { title: "Due Date" },
    ];

    // multi data set
    const multiDataSet = [
        {
            columns: [
                { title: "Filter" },
                { title: "Date" },
                { title: "Client" },
                { title: "Project Manager" },
                { title: "Dispute Raised Against" },
                { title: "Dispute Raised By" },

                { title: "status" },
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
                        value: filter?.client_name,
                    },
                    {
                        value: filter?.pm_name,
                    },
                    {
                        value: filter?.dispute_raised_against_name,
                    },
                    {
                        value: filter?.dispute_rasied_by_name,
                    },

                    {
                        value: filter?.status,
                    },
                ],
            ],
        },
        {
            xSteps: 0,
            ySteps: 2,
            columns: columns,
            data: getData(Disputes),
        },
    ];

    const handleRender = async () => {
        setIsRender(false);
        await getDisputesData(query).unwrap();
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

            {isRender && !isLoading && Disputes?.length > 0 && (
                <ExcelFile filename="Dispute_table" hideElement={true}>
                    <ExcelSheet dataSet={multiDataSet} name=" dispute table" />
                </ExcelFile>
            )}
        </React.Fragment>
    );
};

export default DisputesExportButton;

const ExportButton = styled.button`
    width: 140px;
    padding: 6px 10px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    margin-left: 10px;

    /* color: #DAF7A6; */
    color: #000;
    background-color: #c4de95;
    gap: 8px;
`;
