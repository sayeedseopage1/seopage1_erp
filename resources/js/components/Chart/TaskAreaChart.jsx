import React from "react";
import ReactDOM from "react-dom/client";

export const TaskAreaChart = () => {
    return <div className="bg-white p-4 shadow-sm rounded-5"></div>;
};

const rootContainer = document.getElementById("task-area-chart");
if (rootContainer) {
    const root = ReactDOM.createRoot(rootContainer);

    root.render(
        <React.StrictMode>
            <TaskAreaChart />
        </React.StrictMode>
    );
}
