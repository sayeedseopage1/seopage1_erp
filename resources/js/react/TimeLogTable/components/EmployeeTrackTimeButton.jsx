import React, { useState, lazy, Suspense, useContext } from "react";
import Modal from "./Modal";
import Button from "./Button";
import { useLazyGetSessionDetailsQuery } from "../../services/api/timeLogTableSessionDetails";
import { EmployeeTableCtx } from "../context/EmployeeTableContext";
import { EmployeeSessionTableColumn } from "./EmployeeSessionTableColumn";
import _, { groupBy, orderBy } from "lodash";
import { paginate } from "../../utils/paginate";
const EmployeeSessionTable = lazy(() => import("./EmployeeSessionTable"));

const EmployeeTrackTimeButton = ({ row, children }) => {
    const { filter, setEmployeeName, setEmployeeId, setProjectName, setProjectId } = useContext(EmployeeTableCtx);
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState([]);
    const [perPageData, setParPageData] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [renderData, setRenderData] = useState(null);
    const [sortConfig, setSortConfig] = useState([]);
    const [totalWokingHour, setTotalWorkingHour] = useState(0);
   
    const [getSessionDetails, {isFetching }] =
        useLazyGetSessionDetailsQuery("");

    const toggle = () => setIsOpen((prev) => !prev);
    const close = () => setIsOpen(false);

    // handle data
    const handleData = (data, currentPage, perPageData) => {
        const paginated = paginate(data, currentPage, perPageData);
        const grouped = groupBy(paginated, 'task_id');
        const sorted = Object.entries(grouped).sort(([keyA], [keyB]) => keyB - keyA);
        setRenderData([...sorted]);
    }

    // data sort handle
    const handleSorting = (sort) => {
        const sortData = orderBy(data, ...sort);
        handleData(sortData, currentPage, perPageData);
    };

    // handle pagination
    const handlePagination = (page) => {
        setCurrentPage(page);
        handleData(data, page, perPageData);
    };

    // handle par page data change
    const handlePerPageData = (number) => {
        setParPageData(number);
        handleData(data, currentPage, number);
    };

    const handleClick = async(e) => {
        e.preventDefault();
        toggle();

        setProjectId(row?.project_id);
        setProjectName(row?.project_name);
        setEmployeeId(row?.employee_id);
        setEmployeeName(row?.employee_name);

        await getSessionDetails({
            projectID: row?.project_id,
            employeeID: row?.employee_id,
            startDate: filter?.start_date,
            endDate: filter?.end_date,
        })
            .unwrap()
            .then((res) => {
                const sortedData = orderBy(res, ["task_id"], ["desc"]);
                const total = _.sumBy(sortedData, (d) => Number(d.total_minutes));
                let _data = _.map(sortedData, (d) => ({...d, totalLogTime: total}));
                handleData(_data, currentPage, perPageData);
                setData(_data);
                setTotalWorkingHour(total);
            });
    };

    return (
        <React.Fragment>
            <button onClick={handleClick} type="button" className="px-2 py-1">
                {children}
            </button>
            <React.Fragment>
                <Modal isOpen={isOpen} className="sp1_mark-as--modal">
                    <div className="sp1_single_task--modal-panerl-wrapper">
                        <div
                            className="sp1_mark-as--modal-panel"
                            style={{ maxWidth: "80vw" }}
                        >
                            {/* heading bar */}
                            <div className="sp1_mark-as--modal-heading">
                                <h6 className="mb-0">Employee Wise Session</h6>
                                <Button
                                    variant="tertiary"
                                    aria-label="closeModal"
                                    onClick={close}
                                >
                                    <i className="fa-solid fa-xmark" />
                                </Button>
                            </div>

                            {/* body */}
                            <div
                                className="sp1_mark-as--modal-body px-3"
                                style={{ overflow: "unset" }}
                            >
                                <Suspense fallback={<> Loading ...</>}>
                                    <EmployeeSessionTable
                                        data={renderData}
                                        columns={EmployeeSessionTableColumn}
                                        height="70vh"
                                        tableName="employee_timelog_sesson_report"
                                        onSort={handleSorting}
                                        onPaginate={handlePagination}
                                        perpageData={perPageData}
                                        handlePerPageData={handlePerPageData}
                                        currentPage={currentPage}
                                        totalEntry={data?.length}
                                        isLoading={isFetching}
                                    />
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        </React.Fragment>
    );
};

export default EmployeeTrackTimeButton;
