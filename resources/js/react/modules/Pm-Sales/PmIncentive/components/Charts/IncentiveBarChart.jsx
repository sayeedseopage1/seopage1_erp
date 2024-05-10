import { useRef, useState } from "react";
import Chart from "react-apexcharts";
import arrow1 from '../../assets/arrow-1.svg'
import arrow2 from '../../assets/arrow-2.svg'
import { IoInformationCircle } from "react-icons/io5";
import { Popover } from "antd";
import IncentiveEditButton from "../ui/IncentiveEditButton";
import { dummyUserRole } from "../../constants";
import EditChartDataModal from "../Modals/Incentives/EditChartDataModal";
import { set } from "lodash";

const IncentiveBarChart = ({ chartData }) => {
    const chartRef = useRef(null);
    const [editChartDataModalOpen, setEditChartdataModalOpen] = useState(false);
    const [modalStateData, setModalStateData] = useState({});

    const options = {
        title: {
            // text: chartData.title,
            style: {
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "Poppins",
                color: "#1492E6",
            },
        },
        states: {
            hover: {
                filter: {
                    type: 'darken',
                    value: 0.8,
                }
            }
        },
        chart: {
            toolbar: {
                show: false,
            },
        },
        grid: { show: !0, strokeDashArray: 3, position: "back" },
        xaxis: {
            categories: chartData.categories,
            labels: {
                formatter: (val) => {
                    return `${val}`;
                },
                style: {
                    fontSize: "10",
                    fontFamily: "poppins",
                    fontWeight: 500,
                    colors: ["#000000"],
                },
            },
        },
        yaxis: {
            labels: {
                formatter: (val) => {
                    return `${val}%`;
                },
                style: {
                    fontSize: "10",
                    fontFamily: "poppins",
                    fontWeight: 500,
                    colors: ["#000000"],
                },
            },
            stepSize: 20
        },

        dataLabels: {
            enabled: true,
            enabledOnSeries: undefined,
            formatter: function (val) {
                return `${val}%`;
            },
            textAnchor: "middle",
            distributed: false,
            offsetX: 0,
            offsetY: 0,
            style: {
                fontSize: "14px",
                fontFamily: "poppins",
                fontWeight: 500,
                colors: ["#fff"],
            },
        },

        plotOptions: {
            bar: {
                horizontal: false,
                // columnWidth: "55%",
                endingShape: "rounded",
                distributed: false,
                borderRadius: 10,
                borderRadiusApplication: "last",
                // borderRadiusWhenStacked: 'last',
                dataLabels: {
                    position: "top",
                },
                colors: {
                    ranges: chartData?.range,
                },
            },
        },

        fill: {
            type: "gradient",
            gradient: {
                // Setting gradient from bottom to top
                shade: "dark",
                type: "vertical",
                shadeIntensity: 0.5,
                gradientToColors: ["#E1F3FF"],
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 0.9,
                stops: [0, 100],
            },
        },
        responsive: [
            {
                breakpoint: 1600,
                options: {
                    plotOptions: {
                        bar: {
                            borderRadius: 2,
                        },
                    }
                }
            }
        ]
    };


    // Conditionally assigns a CSS class to a button based on the 'refId' property of 'chartData'.
    // If 'refId' is 8, 9, or 10, the button is assigned 'chart_button_secondary'. Otherwise, it gets 'chart_button'.
    const btn_class_edit = (chartData?.refId === 8 || chartData?.refId === 9 || chartData?.refId === 10) ? "chart_button_secondary" : "chart_button"


    const handleEditChartData = (chartData) => {
        setEditChartdataModalOpen(true)
        setModalStateData(chartData)
    }

    return (
        <>
            <div className="chart_header">
                <div className="chart_title">
                    <span>{chartData?.title}</span> {chartData?.title == "Deadline Miss Rate" && <Popover
                        content='Did he accept this? We may 
                        need time for planning, understanding requirements, creating deliverables etc.'
                        overlayStyle={{
                            width: "220px"
                        }}
                    >
                        <IoInformationCircle className='informationCircle' />
                    </Popover>}
                </div>
                <div className="incentive_button_wrapper">
                    {
                        dummyUserRole == 1 && <IncentiveEditButton onClick={() => handleEditChartData(chartData)} className={btn_class_edit}>Edit</IncentiveEditButton>
                    }
                    <EditChartDataModal chartData={modalStateData} antdModalOpen={editChartDataModalOpen} setAntdModalOpen={setEditChartdataModalOpen} />
                    <button
                        className="chart_button"
                    >
                        {chartData.chartTag}
                    </button>
                </div>
            </div>
            <div className="chart_wrapper_inner">
                <div className="y_axis_arrow ">
                    <img src={arrow1} className="chart_axis_icon" alt="arrow1" />
                    <h2 className="chart_axis_title">{chartData?.yTitle}</h2>
                    <img src={arrow2} className="chart_axis_icon" alt="arrow2" />
                </div>
                <Chart
                    ref={chartRef}
                    type="bar"
                    series={chartData.series}
                    options={options}
                ></Chart>

                <div className="x_axis_arrow">
                    <img src={arrow1} className="chart_axis_icon" alt="arrow1" />
                    <h2 className="chart_axis_title">{chartData.title}</h2>
                    <img src={arrow2} className="chart_axis_icon" alt="arrow2" />
                </div>
            </div>
        </>

    );
};

export default IncentiveBarChart;
