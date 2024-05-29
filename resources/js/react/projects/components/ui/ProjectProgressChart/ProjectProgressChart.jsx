import PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
import {
    Chart,
    PieController,
    ArcElement,
    Tooltip,
    Legend,
    Title,
    CategoryScale,
    LinearScale,
    PointElement,
} from "chart.js";


import "./projectProgressChart.css"


Chart.register(
    PieController,
    ArcElement,
    Tooltip,
    Legend,
    Title,
    CategoryScale,
    LinearScale,
    PointElement
);

const ProjectProgressChart = ({chartData}) => {
    const options = {
        responsive: false,
        plugins: {
            legend: {
              display: false
            },
            title: {
                display: false,
            },
            labels: {
                display: false,
            },
        },
    };

    const data = {
        labels: [
            "Under Revision",
            "To Do",
            "Doing",
            "Completed",
            "Under Review",
            "Overdue",
            "Awaiting App.",
            "Submitted Task",
        ],
        datasets: [
            {
                data: chartData,
                backgroundColor: [
                    "#D21010",
                    "#F5C308",
                    "#00B5FF",
                    "#679C0D",
                    "#E7D107",
                    "#F00",
                    "#3D0AF5",
                    "#F50AD5",
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <div className="projectProgressChartDashboard">
            <Pie options={options} data={data} width={150} height={150} />
        </div>
    );
};

export default ProjectProgressChart;

ProjectProgressChart.propTypes = {
    chartData: PropTypes.array,
};
