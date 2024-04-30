import { useMemo, useRef } from "react";
import Chart from "react-apexcharts";
import arrow1 from '../../assets/arrow-1.svg'
import arrow2 from '../../assets/arrow-2.svg'

const IncentiveThickChart = ({ chartData }) => {
    const chartRef = useRef(null);

    // Function to check if all values are zero
    const allValuesAreZero = () => {
        return chartData.series.every(series => {
            return series.data.every(value => value === 0);
        });
    };

    const isAllZero = allValuesAreZero();

    const options = {
        title: {
            text: chartData.title,
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
        chart: { toolbar: { show: !1 } },
        grid: { show: !0, strokeDashArray: 3, position: "back" },
        xaxis: {
            tickPlacement: "on",
            categories: chartData == null ? 0 : chartData.categories,
            labels: {
                formatter: (g) => `${g}`,
                style: {
                    fontSize: "14",
                    fontFamily: "poppins",
                    fontWeight: 500,
                    colors: ["#000000"]
                }
            },

            scrollbar: {
                enabled: !0
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
            tickAmount: 5,
            max: 100,
            labels: {
                formatter: (val) => `${val}%`,
                style: {
                    fontSize: "14",
                    fontFamily: "poppins",
                    fontWeight: 500,
                    colors: ["#000000"]

                }
            },
        },
        dataLabels: {
            enabled: true,
            // enabledOnSeries: void 0,
            formatter: function (val, opts) {
                console.log("abcd", opts)
                // Apply special case for the first bar when all values are zero
                if (isAllZero && opts.dataPointIndex === 0) {
                    return '⬤';
                }
                // return val ? `${chartData?.ratio}%, ${val}%` : "";
                return val ? `${opts.w.globals.labels[opts.dataPointIndex]}, ${val}%` : "";
            },
            // textAnchor: "middle",
            // distributed: !1,
            offsetY: -25,
            offsetX: 0,
            style: {
                fontSize: "14px",
                fontFamily: "poppins",
                fontWeight: 500,
                colors: isAllZero ? ['#FF0000'] : ["#1492E6"]
            },
        },
        plotOptions: {
            bar: {
                horizontal: !1,
                endingShape: "rounded",
                distributed: !1,
                borderRadius: 0,
                columnWidth: "12%",
                borderRadiusApplication: "last",
                colors: {
                    ranges: [
                        { from: 0, to: 40, color: "#00A0EE" },
                        { from: 41, to: 50, color: "#00A0EE" },
                        { from: 51, to: 80, color: "#00A0EE" },
                        { from: 81, to: 100, color: "#14B96A" },
                    ],
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
                shade: "dark",
                type: "vertical",
                shadeIntensity: 0.9,
                gradientToColors: ["#AAE3FF"],
                inverseColors: !1,
                opacityFrom: 1,
                opacityTo: 0.9,
                stops: [70, 100]
            }
        },
    }

    return (
        <>
            <div className="y_axis_arrow ">
                <img src={arrow1} className="chart_axis_icon" alt="arrow1" />
                <h2 className="chart_axis_title">{chartData?.yTitle}</h2>
                <img src={arrow2} className="chart_axis_icon" alt="arrow2" />
            </div>
            <div className="chart_wrapper_inner">
                <Chart
                    ref={chartRef}
                    type="bar"
                    series={chartData.series}
                    options={options}
                ></Chart>
                <button
                    className="chart_button"
                >
                    {chartData.chartTag}
                </button>
                <div className="x_axis_arrow">
                    <img src={arrow1} className="chart_axis_icon" alt="arrow1" />
                    <h2 className="chart_axis_title">{chartData.title}</h2>
                    <img src={arrow2} className="chart_axis_icon" alt="arrow2" />
                </div>

                <p className="chart_ratio">{chartData.title}: <span className={`${chartData?.ratio > 0 ? "chart_ratio_value_pos" : "chart_ratio_value_neg"}`}>{chartData?.ratio}%</span></p>

            </div>
        </>
    );
};

export default IncentiveThickChart;
