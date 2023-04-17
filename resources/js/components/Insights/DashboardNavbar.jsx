import { useState } from "react";

const DashboardNavbar = () => {
    const [dashboardName, setDashboardName] = useState("Dashboard");
    return (
        <div className="d-flex align-items-center">
            <div className="position-relative sp1_d--navbar-editable-title">
                <input
                    type="text"
                    value={dashboardName}
                    onChange={(e) => setDashboardName(e.target.value)}
                    style={{ maxWidth: "fit-content" }}
                />
                <i className="fa-solid fa-pencil"></i>
            </div>
        </div>
    );
};
export default DashboardNavbar;
