import { useRef } from "react";
import Chart from "react-apexcharts";
import arrow1 from '../../assets/arrow-1.svg'
import arrow2 from '../../assets/arrow-2.svg'
import { Popover } from "antd";
import line18 from '../../assets/Line18.svg'
import line19 from '../../assets/Line19.svg'
import { rangesForLongValue, rangesForShortValue } from "../../constants/rangesColor";
import PropTypes from 'prop-types';
import infoIcon from '../../assets/info-icon.png'


const RegularPointsThickChart = ({ chartData }) => {
    const {
        series,
        ratio,
        incentive_factors
    } = chartData;

    const isAllZero = chartData?.incentive == 0;
    const seriesLength = chartData?.seriesData.length;

    // Calculate the maximum value for the x-axis from the upper limit of the last incentive factor
    const maxXValue = parseFloat(incentive_factors[incentive_factors?.length - 1]?.upper_limit);

    // Create an array with a single bar at the ratio position
    const barData = new Array(Math.ceil(maxXValue) + 1).fill(0);
    barData[Math.floor(ratio)] = parseFloat(series[0]?.data[0]);

    const chartOptions = {
        title: {
            style: {
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "Poppins",
                color: "#1492E6",
            },
        },
        tooltip: {
            custom: function ({ series, seriesIndex, dataPointIndex }) {
                return (
                    `
                        <div class="chart_tooltip">
                            <p>${chartData.title} ${chartData?.limitType == 1 ? "$" : ""}${chartData?.ratio}${chartData?.limitType == 2 ? "%" : ""}</p>
                            <p>${chartData?.yTitle} : ${series[seriesIndex][dataPointIndex]}${chartData?.amountType == 1 ? "" : "%"} </p>
                        </div>
                    `
                )
            }
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
                tools: {
                    zoom: false,
                    reset: false,
                }
            }
        },
        grid: { show: !0, strokeDashArray: 3, position: "back" },
        xaxis: {
            categories: Array.from({ length: Math.ceil(maxXValue) + 1 }, (_, i) => (i % 10 === 0 ? i : '')),
            tickPlacement: "on",
            labels: {
                formatter: function (val) {
                    return val !== '' ? `${val}%` : '';
                },
                style: {
                    fontSize: "10",
                    fontFamily: "poppins",
                    fontWeight: 500,
                    colors: ["#000000"]
                },
                rotateAlways: false,
            },

            scrollbar: {
                enabled: false
            },
            axisTicks: {
                show: !0,
                borderType: "solid",
                color: "#78909C",
                width: 8,
                height: 9,
                offsetX: 0,
                offsetY: 0
            },
        },
        yaxis: {
            max: Math.max(...chartData?.seriesData),
            labels: {
                formatter: (val) => {
                    return `${val}${chartData?.amountType == 1 ? "" : "%"}`;
                },
                style: {
                    fontSize: "10",
                    fontFamily: "poppins",
                    fontWeight: 500,
                    colors: ["#000000"]

                }
            },
            stepSize: Math.max(...chartData?.seriesData) > 0 && Math.max(...chartData?.seriesData) <= 10 ? 2 : 20,
        },
        dataLabels: {
            enabled: true,
            formatter: function (val, opts) {
                const { dataPointIndex } = opts;
                // Apply special case for the first bar when all values are zero
                if (isAllZero && opts.dataPointIndex == 0) {
                    return chartData?.ratio != null
                        ? `⬤ ${chartData?.shortTitle}: ${chartData?.limitType == 1 ? "$" : ""}${chartData?.ratio}${chartData?.limitType == 2 ? "%" : ""}`
                        : `⬤ ${chartData?.shortTitle}: N/A`;
                }
                if (dataPointIndex === 0 || dataPointIndex === seriesLength - 1) {
                    return ""; // Hide the label for the first and last bars
                }
                return val ? `${chartData?.limitType == 1 ? "$" : ""}${chartData?.ratio}${chartData?.limitType == 2 ? "%" : ""}, ${val}${chartData?.amountType == 1 ? "" : "%"}` : "";
            },
            offsetY: -25,
            offsetX: isAllZero ? 10 : 0,
            style: {
                fontSize: "14px",
                fontFamily: "poppins",
                fontWeight: 500,
                colors: isAllZero ? ['#FF0000'] : ["#1492E6"],
            },
        },
        plotOptions: {
            bar: {
                horizontal: !1,
                endingShape: "rounded",
                distributed: !1,
                borderRadius: 0,
                columnWidth: "9px",
                borderRadiusApplication: "last",
                colors: {
                    ranges: chartData?.id == 8 ? rangesForShortValue : rangesForLongValue
                },
                dataLabels: {
                    position: "top",
                    maxItems: 100,
                    color: "#00A0EE",
                    hideOverflowingLabels: !0,
                    total: {
                        enabled: !1,
                        formatter: void 0,
                        offsetX: 0,
                        offsetY: 0,
                        style: {
                            color: "#00A0EE",
                            fontSize: "12px",
                            fontFamily: void 0,
                            fontWeight: 600
                        }
                    },
                },
            },
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "light",
                type: "vertical",
                shadeIntensity: 0.7,
                // gradientToColors: ["#AAE3FF"],
                inverseColors: !1,
                opacityFrom: 1,
                opacityTo: 0.9,
                stops: [70, 100]
            }
        },
    };

    const chartSeries = [{
        name: chartData?.shortTitle,
        data: barData
    }];

    return (
        <div className="chart">
            <>
                <div className="y_axis_arrow">
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
                    <button
                        className="chart_button"
                    >
                        {chartData?.chartTag}
                    </button>
                </div>
                <div className="chart_wrapper_inner" id={`chart_wrapper_inner_${chartData?.id}`}>
                    <Chart
                        options={chartOptions}
                        series={chartSeries}
                        type="bar"
                        height={300}
                    />
                    <div className="x_axis_arrow">
                        <img src={arrow1} className="chart_axis_icon" alt="arrow1" />
                        <h2 className="chart_axis_title">{chartData.title}</h2>
                        <img src={arrow2} className="chart_axis_icon" alt="arrow2" />
                    </div>

                    <p className="chart_ratio">{chartData.title}: {chartData?.ratio != null ? <span className={`${chartData?.incentive > 0 ? "chart_ratio_value_pos" : "chart_ratio_value_neg"}`}>{chartData?.limitType == 1 ? "$" : ""}{chartData?.ratio}{chartData?.limitType == 2 ? "%" : ""}</span> : "N/A"}</p>

                </div>
            </>
        </div>
    );
};

export default RegularPointsThickChart;
