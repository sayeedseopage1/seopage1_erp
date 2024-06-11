import { useRef } from "react";
import Chart from "react-apexcharts";
import arrow1 from '../../assets/arrow-1.svg'
import arrow2 from '../../assets/arrow-2.svg'
import { Popover } from "antd";
import { IoInformationCircle } from "react-icons/io5";
import line18 from '../../assets/Line18.svg'
import line19 from '../../assets/Line19.svg'
import { rangesForLongValue, rangesForShortValue } from "../../constants/rangesColor";
import PropTypes from 'prop-types';

const IncentiveThickChart = ({ chartData }) => {
    const chartRef = useRef(null);

    const isAllZero = chartData?.incentive == 0;

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
                            <p>${chartData?.yTitle} : ${series[seriesIndex][dataPointIndex]}% </p>
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
            categories: chartData?.categories,
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
                }
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
            stepSize: chartData?.incentive > 0 && chartData?.incentive <= 10 ? 2 : 20,
        },
        dataLabels: {
            enabled: true,
            formatter: function (val, opts) {
                // Apply special case for the first bar when all values are zero
                if (isAllZero && opts.dataPointIndex == 0) {
                    return chartData?.ratio != null
                        ? `⬤ ${chartData?.shortTitle}: ${chartData?.limitType == 1 ? "$" : ""}${chartData?.ratio}${chartData?.limitType == 2 ? "%" : ""}`
                        : `⬤ ${chartData?.shortTitle}: N/A`;
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
    }

    return (
        <>
            <div className="y_axis_arrow">
                <img src={line18} className="chart_yAxis_icon" alt="arrow1" />
                <h2 className="chart_axis_title">{chartData?.yTitle}</h2>
                <img src={line19} className="chart_yAxis_icon" alt="arrow2" />
            </div>
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
                <button
                    className="chart_button"
                >
                    {chartData.chartTag}
                </button>
            </div>
            <div className="chart_wrapper_inner" id={`chart_wrapper_inner_${chartData?.id}`}>
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

                <p className="chart_ratio">{chartData.title}: {chartData?.ratio != null ? <span className={`${chartData?.incentive > 0 ? "chart_ratio_value_pos" : "chart_ratio_value_neg"}`}>{chartData?.limitType == 1 ? "$" : ""}{chartData?.ratio}{chartData?.limitType == 2 ? "%" : ""}</span> : "N/A"}</p>

            </div>
        </>
    );
};

export default IncentiveThickChart;

IncentiveThickChart.propTypes = {
    chartData: PropTypes.object,
}