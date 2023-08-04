import React, { useState, lazy, Suspense, useContext } from "react";
import Modal from "./Modal";
import Button from "./Button";
import { useLazyGetSessionDetailsQuery } from "../../services/api/timeLogTableSessionDetails";
import { groupBy, orderBy } from "lodash";
import { paginate } from "../../utils/paginate";
import { ProjectTableCtx } from "../context/ProjectWiseTableContext";
import { ProjectSessionTableColumn } from "./ProjectSessionTableColumn";
const ProjectSessionTable = lazy(() => import("./ProjectSessionTable"));

const ProjectSessionTrackTimeButton = ({ row, children }) => {
    const { filter } = useContext(ProjectTableCtx);
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState([]);
    const [perPageData, setParPageData] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [renderData, setRenderData] = useState(null);
    const [sortConfig, setSortConfig] = useState([]);
    
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

    const handleClick = (e) => {
        e.preventDefault();
        toggle();

        getSessionDetails({
            projectID: row?.project_id,
            employeeID: row?.employee_id,
            startDate: filter?.start_date,
            endDate: filter?.end_date,
        })
            .unwrap()
            .then((res) => {
                const sortedData = orderBy(res, ["task_id"], ["desc"]);
                handleData(sortedData, currentPage, perPageData);
                setData(sortedData);
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
                                <h6 className="mb-0">Project Wise Session</h6>
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
                                    <ProjectSessionTable
                                        data={renderData}
                                        columns={ProjectSessionTableColumn}
                                        height="70vh"
                                        tableName="project_timelog_sesson_report"
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

export default ProjectSessionTrackTimeButton;
