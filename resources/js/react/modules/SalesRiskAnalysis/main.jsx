import * as React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

// Ui components
import Toaster from "../../global/Toaster";
// redux store
import { store } from "../../services/store";

// drag and drop provider
import { DndProvider, useDragLayer } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Page components
import SalesRiskAnalysis from "./Pages/SalesRiskAnalysis";
import SalesRiskQuestions from "./Pages/SalesRiskQuestions";
import SalesRiskAuthorize from "./Pages/SalesRiskAuthorize";
import SalesRiskReport from "./Pages/SalesRiskReport";
import SalesRiskQuestionList from "./Pages/SalesRiskQuestionList";
import SaleSRiskQuestionNotice from "./Pages/SaleSRiskQuestionNotice";

// Context
import SalesRiskAnalysisProvider from "./context/SalesRiskAnalysisProvider";

// custom drag layer
const DragLayer = () => {
    const { item, itemType, currentOffset } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        currentOffset: monitor.getClientOffset(),
    }));

    if (!currentOffset) {
        return null;
    }
    return (
        <div
            style={{
                position: "fixed",
                pointerEvents: "none",
                zIndex: 999999,
                left: currentOffset.x,
                top: currentOffset.y,
            }}
        >
            {/* Render your custom preview here based on the dragged item */}
            {itemType === "column" && (
                <div
                    className="py-2 px-2 pl-3 bg-white shadow border"
                    style={{ width: item.columnDef.size }}
                >
                    {item.columnDef.header}
                </div>
            )}
        </div>
    );
};

const ContentWithDrag = () => {
    return (
        <React.Fragment>
            <DragLayer />
            <Outlet />
            <Toaster />
        </React.Fragment>
    );
};

const Content = () => {
    return (
        <React.Fragment>
            <Outlet />
            <Toaster />
        </React.Fragment>
    );
};

// Sales Risk Analysis
const container = document.getElementById("salesRiskPolicies");
if (container) {
    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <Provider store={store}>
                <SalesRiskAnalysisProvider>
                    <BrowserRouter basename="/account/sales-risk-policies">
                        <Routes>
                            <Route path="/" element={<Content />}>
                                <Route index element={<SalesRiskAnalysis />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </SalesRiskAnalysisProvider>
            </Provider>
        </React.StrictMode>
    );
}

// Sales Risk Analysis Question Answer
const containerSalePolicyQuestion =
    document.getElementById("salePolicyQuestion");

if (containerSalePolicyQuestion) {
    ReactDOM.createRoot(containerSalePolicyQuestion).render(
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Content />}>
                            <Route
                                path="account/deals/risk-analysis/:deal_id"
                                element={<SalesRiskQuestions />}
                            />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    );
}

// Sales Risk Analysis Question Answer Notice Page will show when point below 0

const containerSalePolicyQuestionNotice = document.getElementById(
    "salePolicyQuestionNotice"
);

if (containerSalePolicyQuestionNotice) {
    ReactDOM.createRoot(containerSalePolicyQuestionNotice).render(
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Content />}>
                            <Route
                                path="account/deals/risk-analysis/:deal_id"
                                element={<SaleSRiskQuestionNotice />}
                            />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    );
}

// Sales Risk Analysis Report

const containerSalesAnalysisReport = document.getElementById(
    "salesAnalysisReport"
);
if (containerSalesAnalysisReport) {
    ReactDOM.createRoot(containerSalesAnalysisReport).render(
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/account/contracts/:id"
                            element={<SalesRiskAuthorize />}
                        />
                        <Route
                            path="/account/projects/:id"
                            element={<SalesRiskAuthorize />}
                        />
                    </Routes>
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    );
}

// Sales Risk Analysis Report Table

const containerSalesAnalysisReportTable = document.getElementById(
    "salesAnalysisReportTable"
);

if (containerSalesAnalysisReportTable) {
    ReactDOM.createRoot(containerSalesAnalysisReportTable).render(
        <React.StrictMode>
            <Provider store={store}>
                <DndProvider backend={HTML5Backend}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<ContentWithDrag />}>
                                <Route
                                    path="/account/sales-analysis-reports"
                                    element={<SalesRiskReport />}
                                />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </DndProvider>
            </Provider>
        </React.StrictMode>
    );
}

// Sales Risk Analysis QuestionList

const containerSalesRiskAnalysisQuestionList = document.getElementById(
    "salePolicyQuestionList"
);

if (containerSalesRiskAnalysisQuestionList) {
    ReactDOM.createRoot(containerSalesRiskAnalysisQuestionList).render(
        <React.StrictMode>
            <Provider store={store}>
                <SalesRiskAnalysisProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Content />}>
                                <Route
                                    path="/account/sales-risk-policies/question"
                                    element={<SalesRiskQuestionList />}
                                />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </SalesRiskAnalysisProvider>
            </Provider>
        </React.StrictMode>
    );
}
