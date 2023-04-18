import { useParams } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import "./dashboard.css";
import RelativeDateFilter from "./components/RelativeDateFilter";
import PeriodFilter from "./components/PeriodFilter";

const Dashboard = () => {
    const params = useParams();

    return (
        <section>
            <DashboardNavbar />
        </section>
    );
};

export default Dashboard;
