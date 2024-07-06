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

const RegularThickChart = ({ chartData }) => {
    const chartRef = useRef(null);

    const {
        series,
        ratio,
        incentive_factors
    } = chartData;

    // Calculate the maximum value for the x-axis from the upper limit of the last incentive factor
    const maxXValue = parseFloat(incentive_factors[incentive_factors?.length - 1]?.upper_limit);

    // Create an array with a single bar at the ratio position
    const barData = new Array(Math.ceil(maxXValue) + 1).fill(0);
    // barData[Math.floor(ratio)] = parseFloat(initialBarData);


    const isAllZero = chartData?.incentive == 0;
    const initialBarData = series[0]?.data?.find(val => parseFloat(val) > 0)

    if (!isNaN(parseFloat(initialBarData))) {
        barData[Math.floor(ratio)] = parseFloat(initialBarData);
    }



    const options = {
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
            // categories: chartData?.categories,
            categories: Array.from({ length: Math.ceil(maxXValue) + 1 }, (_, i) => (i % 10 === 0 ? i : '')),
            tickPlacement: "on",
            labels: {
                formatter: (val) => {
                    return `${val}`;
                },
                style: {
                    fontSize: "10",
                    fontFamily: "poppins",
                    fontWeight: 500,
                    colors: ["#000000"]
                },

                // trim: true,
                // rotate: -2,

            },
            scrollbar: {
                enabled: false
            },
            axisTicks: {
                show: true,
                borderType: "solid",
                color: "#78909C",
                width: 8,
                height: 3,
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
            // stepSize: chartData?.incentive > 0 && chartData?.incentive <= 10 ? 2 : 20,
            stepSize: Math.max(...chartData?.seriesData) > 0 && Math.max(...chartData?.seriesData) <= 10 ? 2 : 20,
        },
        dataLabels: {
            enabled: true,
            formatter: function (val, opts) {
                const { dataPointIndex } = opts;
                const category = Array.from({ length: Math.ceil(maxXValue) + 1 }, (_, i) => i)[dataPointIndex];

                // Check if the current data point category matches the ratio value
                if (isAllZero && category == parseInt(chartData?.ratio)) {
                    return [`⬤ ${chartData?.shortTitle}: ${chartData?.limitType == 1 ? "$" : ""}${chartData?.ratio}${chartData?.limitType == 2 ? "%" : ""}`, `Incentive: ${val}${chartData?.amountType == 1 ? "" : "%"}`];
                }

                // if (dataPointIndex === seriesLength - 1) {
                //     return ""; // Hide the label for the first and last bars
                // }
                return val ? `${chartData?.limitType == 1 ? "$" : ""}${chartData?.ratio}${chartData?.limitType == 2 ? "%" : ""}, ${val}${chartData?.amountType == 1 ? "" : "%"}` : "";
            },
            offsetY: isAllZero ? -25 : 0,
            offsetX: isAllZero ? 0 : 15,
            style: {
                fontSize: "12px",
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
                    // orientation: isAllZero ? "vertical" : "horizontal",
                    orientation: "vertical",
                    position: isAllZero ?
                        "top" : chartData?.incentive > 40 ? "center" : "bottom",
                    maxItems: 5,

                    hideOverflowingLabels: !0,
                    total: {
                        enabled: !1,
                        formatter: void 0,
                        offsetX: 0,
                        offsetY: 0,
                        style: {
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
    }

    const chartSeries = [{
        name: chartData?.shortTitle,
        data: barData
    }];

    return (
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
            <div className="chart_wrapper_inner  regular_thick_chart_wrapper" id={`chart_wrapper_inner_${chartData?.id}`}>
                <Chart
                    ref={chartRef}
                    type="bar"
                    series={chartSeries}
                    options={options}
                    height={319}
                ></Chart>
                <div className="x_axis_arrow regular_thick_xAxis">
                    <img src={arrow1} className="chart_axis_icon" alt="arrow1" />
                    <h2 className="chart_axis_title">{chartData.title}</h2>
                    <img src={arrow2} className="chart_axis_icon" alt="arrow2" />
                </div>

                <p className="chart_ratio">{chartData.title}: {chartData?.ratio != null ? <span className={`${chartData?.incentive > 0 ? "chart_ratio_value_pos" : "chart_ratio_value_neg"}`}>{chartData?.limitType == 1 ? "$" : ""}{chartData?.ratio}{chartData?.limitType == 2 ? "%" : ""}</span> : "N/A"}</p>

            </div>
        </>
    );
};

export default RegularThickChart;

RegularThickChart.propTypes = {
    chartData: PropTypes.object,
}