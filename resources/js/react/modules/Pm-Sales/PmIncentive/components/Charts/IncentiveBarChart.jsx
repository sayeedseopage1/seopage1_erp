import { useRef, useState } from "react";
import Chart from "react-apexcharts";
import arrow1 from '../../assets/arrow-1.svg'
import arrow2 from '../../assets/arrow-2.svg'
import { Popover } from "antd";
import IncentiveEditButton from "../ui/IncentiveEditButton";
import ChartIdealVsAchievedEditModal from "../Modals/Incentives/ChartIdealVsAchievedEditModal";
import PropTypes from "prop-types";
import { auth } from "../../constants";
import line18 from '../../assets/Line18.svg'
import line19 from '../../assets/Line19.svg'
import infoIcon from '../../assets/info-icon.png'

const IncentiveBarChart = ({ chartData }) => {
    const chartRef = useRef(null);
    const [modalStateId, setModalStateId] = useState(null);

    const [isIdealVsAchievedEditModalOpen, setIsIdealVsAchievedEditModalOpen] = useState(false);

    const showIdealVsAchievedEditModal = (chartDataId) => {
        setModalStateId(chartDataId)
        setIsIdealVsAchievedEditModalOpen(!isIdealVsAchievedEditModalOpen);
    };

    // Define colors and gradient stops based on the value
    const getColorStops = (value) => {
        if (value < 50) {
            return ['#FFC0C0', '#FF0000'];
        } else if (value >= 50 && value < 60) {
            return ['#FFC0C0', '#F95E85'];
        } else if (value >= 60 && value < 80) {
            return ['#FB8332', '#F8C332'];
        } else {
            return ['#2BC89B', '#7AD943'];
        }
    };

    const getColorStopsMini = (value) => {
        if (value < 4) {
            return ['#FFC0C0', '#FF0000'];
        } else if (value >= 4 && value < 5.5) {
            return ['#FB8332', '#F8C332'];
        } else {
            return ['#2BC89B', '#7AD943'];
        }
    };

    // Ensure 'colors' is an array even if 'chartData?.seriesData' is undefined
    const colors = chartData?.seriesData?.map(chartData?.id === 8 ? getColorStopsMini : getColorStops) || [];

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
        legend: {
            show: false
        },
        grid: { show: !0, strokeDashArray: 3, position: "back" },
        xaxis: {
            categories: chartData?.categories || [],
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
            stepSize: Math.max(...chartData?.seriesData) > 0 && Math.max(...chartData?.seriesData) <= 10 ? 2 : 20,
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
                distributed: true,
                borderRadius: 10,
                borderRadiusApplication: "last",
                // borderRadiusWhenStacked: 'last',
                dataLabels: {
                    position: "top",
                },
            },
        },

        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: "vertical",
                shadeIntensity: 0.7,
                gradientToColors: colors.map(c => c[1] || '#000000'),
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [50, 100]
            },
            colors: colors.map(c => c[0] || '#000000')
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
            <div className="y_axis_arrow ">
                <img src={line18} className="chart_yAxis_icon" alt="arrow1" />
                <h2 className="chart_axis_title">{chartData?.yTitle}</h2>
                <img src={line19} className="chart_yAxis_icon" alt="arrow2" />
            </div>
            <div className="chart_header">
                <div className="chart_title">
                    <span>{chartData?.title}</span> {chartData?.id == 6 && <Popover
                        content='Did he accept this? We may 
                        need time for planning, understanding requirements, creating deliverables etc.'
                        overlayStyle={{
                            width: "220px"
                        }}
                    >
                        <img src={infoIcon} alt="infoIcon" />
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
                <Chart
                    ref={chartRef}
                    type="bar"
                    series={chartData?.series}
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

