import { useParams } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import "./dashboard.css";

const Dashboard = () => {
    const params = useParams();

    return (
        <section>
            <DashboardNavbar />
        </section>
    );
};

export default Dashboard;
