import React from "react";

import dayjs from "dayjs";
import ReactExport from "react-data-export";
import _, { fill } from "lodash";
import styled from "styled-components";

import Loader from "../../../react/global/Loader";
import { useExportCashPointsMutation } from "../../services/api/PointTableDataApiSlice";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const CashPointsExportButton = ({ filter }) => {
    const [totalPointData, setTotalPointData] = React.useState({});
    const [data, setData] = React.useState([]);

    const [isRender, setIsRender] = React.useState(false);
    const queryObject = _.pickBy(filter ?? {}, Boolean);
    const query = new URLSearchParams(queryObject).toString();

    const [getCashPoints, { data: pointData, isLoading }] =
        useExportCashPointsMutation();

    React.useEffect(() => {
        setData(pointData?.data);
    }, [pointData]);

    React.useEffect(() => {
        if (data?.length) {
            const updatePointData = {};
            let cumulativeTotal = 0; // Variable to calculate cumulative total points

            const reversedData = [...data].reverse();

            reversedData?.forEach((item) => {
                const totalPoint = Math.max(
                    0,
                    cumulativeTotal + Number(item.points)
                );
                const roundedTotalPoint = Number(totalPoint.toFixed(2));
                cumulativeTotal = roundedTotalPoint;
                updatePointData[item.id] = {
                    id: item.id,
                    totalPoint: roundedTotalPoint,
                    points: item.points,
                    project_id: item.project_id,
                };
            });
            setTotalPointData(updatePointData); // Update the cumulative total points state
        }
    }, [data]);

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
                    bold: false,
                    color: {
                        rgb: "",
                    },
                },
            };

            const convertHTMLToText = (html) => {
                const tempElement = document.createElement("div");
                tempElement.innerHTML = html;
                const text =
                    tempElement.textContent || tempElement.innerText || "";
                return text;
            };
            const date = (_data) =>
                _data ? dayjs(_data).format(`DD-MM-YYYY hh:mm:ss A`) : "--";

            let row = [
                {
                    value: d["id"] ?? "--",
                    style: fieldStyle,
                },
                {
                    value:
                        dayjs(d["created_at"]).format("MMMM-DD-YYYY") ?? "--",
                    style: fieldStyle,
                },
                {
                    value: convertHTMLToText(d["activity"]) ?? "--",
                    style: fieldStyle,
                },
                {
                    value: totalPointData[d.id]?.points?.toFixed(2) ?? "--",
                    style: fieldStyle,
                },
                {
                    value: d?.total_points_lost.toFixed(2) ?? "--",
                    style: fieldStyle,
                },

                {
                    value: totalPointData[d?.id]?.totalPoint ?? "--",
                    style: fieldStyle,
                },
            ];
            rows.push(row);
        });

        return rows;
    };

    // columns
    const columns = [
        { title: "ID" },
        { title: "Date" },
        { title: "Action" },
        { title: "Points Earned" },
        { title: "Points Lost" },
        { title: "Balance Points" },
    ];

    // multi data set
    const multiDataSet = [
        {
            columns: [
                { title: "Filter" },
                { title: "Date" },
                { title: "Employee Name" },
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
                    { value: filter?.user_name ?? "--" },
                ],
            ],
        },
        {
            xSteps: 0,
            ySteps: 2,
            columns: columns,
            data: getData(data),
        },
    ];

    const handleRender = async () => {
        setIsRender(false);
        await getCashPoints(query).unwrap();
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

            {isRender &&
                !isLoading &&
                Object.keys(totalPointData).length !== 0 &&
                data?.length > 0 && (
                    <ExcelFile filename="Cash_points_table" hideElement={true}>
                        <ExcelSheet
                            dataSet={multiDataSet}
                            name="Cash Points table"
                        />
                    </ExcelFile>
                )}
        </React.Fragment>
    );
};

export default CashPointsExportButton;

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
