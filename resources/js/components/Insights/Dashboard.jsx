import { useParams } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import "./dashboard.css";
import RelativeDateFilter from "./components/RelativeDateFilter";
import PeriodFilter from "./components/PeriodFilter";
// import DashboardGridLayout from "./components/DashboardGridLayout";

const Dashboard = () => {
    const params = useParams();

    return (
        <section>
            <DashboardNavbar />
            {/* <DashboardGridLayout /> */}
        </section>
    );
};

export default Dashboard;
