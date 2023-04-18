import { useParams } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import "./dashboard.css";
import RelativeDateFilter from "./components/RelativeDateFilter";

const Dashboard = () => {
    const params = useParams();

    return (
        <section>
            <DashboardNavbar />

            <RelativeDateFilter />
        </section>
    );
};

export default Dashboard;
