import { useRef, useState } from "react";
import Chart from "react-apexcharts";
import arrow1 from '../../assets/arrow-1.svg'
import arrow2 from '../../assets/arrow-2.svg'
import { IoInformationCircle } from "react-icons/io5";
import { Popover } from "antd";
import IncentiveEditButton from "../ui/IncentiveEditButton";
import ChartIdealVsAchievedEditModal from "../Modals/Incentives/ChartIdealVsAchievedEditModal";
import PropTypes from "prop-types";
import { useAuth } from "../../../../../hooks/useAuth";

const IncentiveBarChart = ({ chartData }) => {
    const { auth } = useAuth()
    const chartRef = useRef(null);
    const [modalStateId, setModalStateId] = useState(null);

    const [isIdealVsAchievedEditModalOpen, setIsIdealVsAchievedEditModalOpen] = useState(false);

    const showIdealVsAchievedEditModal = (chartDataId) => {
        setModalStateId(chartDataId)
        setIsIdealVsAchievedEditModalOpen(!isIdealVsAchievedEditModalOpen);
    };

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
                    return `${val}${chartData?.amountType == 1 ? "" : "%"}`;
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
                return `${val}${chartData?.amountType == 1 ? "" : "%"}`;
            },
            textAnchor: "middle",
            distributed: false,
            offsetX: 0,
            offsetY: 0,
            style: {
                fontSize: "14px",
                fontFamily: "poppins",
                fontWeight: 500,
                colors: [
                    function ({ seriesIndex, dataPointIndex, w }) {
                        if (w.config.series[seriesIndex].data[dataPointIndex] > 0) {
                            return "#fff";
                        } else {
                            return "#ff0014";
                        }
                    },
                ]
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
                    ranges: [
                        {
                            from: 0,
                            to: 49.99,
                            color: "#ff3300",
                        },
                        {
                            from: 50,
                            to: 59.99,
                            color: "#ff704d",
                        },
                        {
                            from: 60,
                            to: 79.99,
                            color: "#ffff00",
                        },
                        {
                            from: 80,
                            to: Number.MAX_SAFE_INTEGER,
                            color: "#00cc00",
                        },
                    ],
                },
            },
        },

        fill: {
            type: "gradient",
            gradient: {
                // Setting gradient from bottom to top
                shade: "dark",
                type: "vertical",
                shadeIntensity: 0.9,
                gradientToColors: ["#E1F3FF"],
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 0.9,
                stops: [50, 100],
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
                    },
                    dataLabels: {
                        style: {
                            fontSize: "10px",
                            fontWeight: 400,
                        },
                    },
                }
            }
        ]
    };


    // Conditionally assigns a CSS class to a button based on the 'refId' property of 'chartData'.
    // If 'refId' is 8, 9, or 10, the button is assigned 'chart_button_secondary'. Otherwise, it gets 'chart_button'.
    const btn_class_edit = (chartData?.id === 8 || chartData?.id === 9 || chartData?.id === 10 || chartData?.id === 11 || chartData?.id === 12) ? "chart_button_secondary" : "chart_button"


    return (
        <>
            <div className="chart_header">
                <div className="chart_title">
                    <span>{chartData?.title}</span> {chartData?.id == 6 && <Popover
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
                        auth?.isHasRolePermission(1) && <IncentiveEditButton onClick={() => showIdealVsAchievedEditModal(chartData?.id)} className={btn_class_edit}>Edit</IncentiveEditButton>
                    }

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
                    height={300}
                ></Chart>

                <div className="x_axis_arrow">
                    <img src={arrow1} className="chart_axis_icon" alt="arrow1" />
                    <h2 className="chart_axis_title">{chartData.title}</h2>
                    <img src={arrow2} className="chart_axis_icon" alt="arrow2" />
                </div>
            </div>

            {
                isIdealVsAchievedEditModalOpen &&
                <ChartIdealVsAchievedEditModal
                    antdModalOpen={isIdealVsAchievedEditModalOpen}
                    showIdealVsAchievedEditModal={showIdealVsAchievedEditModal}
                    chartDataId={modalStateId}
                />
            }
        </>

    );
};

export default IncentiveBarChart;

IncentiveBarChart.propTypes = {
    chartData: PropTypes.object,
};

