import * as React from "react";

import {
    useGetPmGoalQuery,
    useGetProjectStatusQuery,
} from "../../services/api/projectStatusApiSlice";
import ProjectStatusTable from "../components/table/ProjectStatusTable";
import ProjectModal from "../components/modal/ProjectModal";
import { ProjectStatusTableColumns } from "../components/table/ProjectStatusTableColumns";
import Filterbar from "../components/Filter-bar/Filterbar";
import Button from "../components/Button";
import Loader from "../components/Loader";
import FilterContainer from "../components/Filter-bar/FilterContainer";
import PercentageofGoalsMetModal from "../components/modal/PercentageofGoalsMetModal";
import NextGoalDetailsModal from "../components/modal/NextGoalDetailsModal";
import ProjectManagerExplanationModal from "../components/modal/ProjectManagerExplanationModal";
import { useSearchParams } from "react-router-dom";
import { set } from "lodash";

const ProjectStatus = () => {
    const [search, setSearch] = React.useState("");
    const [projectDetails, setProjectDetails] = React.useState({});
    const [filter, setFilter] = React.useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [projectId, setProjectId] = React.useState(null);
    const [{ pageIndex, pageSize }, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [isModalOneOpen, setIsModalOneOpen] = React.useState(false);
    const [
        isOpenPercentageofGoalsMetModal,
        setIsOpenPercentageofGoalsMetModal,
    ] = React.useState(false);
    const [selectedProjectName, setSelectedProjectName] = React.useState("");
    const [isOpenNextGoalDetailsModal, setIsOpenNextGoalDetailsModal] =
        React.useState(false);

    // make query string
    const queryString = (object) => {
        const queryObject = _.pickBy(object, Boolean);
        return new URLSearchParams(queryObject).toString();
    };

    // get project status fetch
    const {
        data: projectStatusData,
        isFetching,
        refetch,
    } = useGetProjectStatusQuery(
        queryString({
            page: pageIndex + 1,
            limit: pageSize,
            ...filter,
        }),
        { refetchOnMountOrArgChange: true }
    );
    // get pm goal fetch
    const {
        data: pmGoalData,
        isFetching: isFetchingPmGoal,
        refetch: refetchPmGoal,
    } = useGetPmGoalQuery(projectId, {
        refetchOnMountOrArgChange: true /*, skip: !filter?.start_date*/,
        skip: !projectId,
    });

    // Data from the API
    const projectStatus = projectStatusData?.data?.data;
    const pmGoal = pmGoalData?.data;
    const percentageOfGoalsMet = pmGoalData?.data;

    // Table columns
    let tableColumns = ProjectStatusTableColumns;

    const closeModalOne = () => {
        setIsModalOneOpen(false);
        setSelectedProjectName("");
        searchParams.delete("modal_type");
        searchParams.delete("goal_id");
        searchParams.delete("project_id");
        setSearchParams(searchParams);
    };

    // On filter
    const onFilter = async (filter) => {
        const queryObject = _.pickBy(filter, Boolean);
        setFilter(queryObject);
    };

    // handle refresh button
    const onRefreshButtonClick = (e) => {
        e.preventDefault();
        onFilter(filter);
        refetch();
    };

    // handle pm goal modal
    const handlePmGoalModal = (data) => {
        setProjectDetails(data);
        setProjectId(data.project_id);
        setIsModalOneOpen(true);
        setSelectedProjectName(data.project_name);
        refetchPmGoal();
    };

    // handle percent of goal met  modal
    const handlePercentOfGoalMet = (data) => {
        setProjectId(data.project_id);
        setSelectedProjectName(data.project_name);
        setProjectDetails(data);
        setIsOpenPercentageofGoalsMetModal(true);
        refetchPmGoal();
    };

    const handleNextGoalDetails = (data) => {
        setProjectDetails(data);
        setIsOpenNextGoalDetailsModal(true);
    };

    // handle close percentage of goal met modal
    const handleClosePercentageofGoalsMetModal = () => {
        setIsOpenPercentageofGoalsMetModal(false);
        setProjectId(null);
    };

    // handle close next goal details modal
    const handleCloseNextGoalDetailsModal = () => {
        setIsOpenNextGoalDetailsModal(false);
    };

    // use this to update the pmGoal state for next 24 hours this goal will be expired
    React.useEffect(() => {
        const modalType = searchParams.get("modal_type");
        const goal_id = searchParams.get("goal_id");
        const project_id = searchParams.get("project_id");
        if (modalType === "filtered_goal_details" && goal_id && project_id) {
            setProjectId(project_id);
            setIsModalOneOpen(true);
            refetchPmGoal();
        }
    }, []);


    return (
        <React.Fragment>
            {/* Filter */}
            <FilterContainer>
                <Filterbar onFilter={onFilter} />
            </FilterContainer>

            <div className="sp1_tlr_container">
                <div className="sp1_tlr_tbl_container">
                    <div className="mb-3 d-flex align-items-center flex-wrap justify-content-end">
                        {/* Refresh Data */}
                        <div className="mr-2 mb-2">
                            <Button onClick={onRefreshButtonClick}>
                                {isFetching ? (
                                    <Loader
                                        title="Loading..."
                                        borderRightColor="white"
                                    />
                                ) : (
                                    "Refresh"
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Project Status Main Table */}
                    <ProjectStatusTable
                        isLoading={isFetching}
                        filter={filter}
                        tableName="tasksTable"
                        search={search}
                        tableData={projectStatus}
                        tableColumns={tableColumns}
                        refetch={refetch}
                        handlePmGoalModal={handlePmGoalModal}
                        handlePercentOfGoalMet={handlePercentOfGoalMet}
                        handleNextGoalDetails={handleNextGoalDetails}
                    />
                </div>
            </div>
            {/* Project Status Modal */}
            <ProjectModal
                refetchPmGoal={refetchPmGoal}
                isFetchingPmGoal={isFetchingPmGoal}
                pmGoal={pmGoal}
                projectStatus={projectStatus}
                setProjectDetails={setProjectDetails}
                isOpen={isModalOneOpen}
                closeModal={closeModalOne}
                selectedProjectName={selectedProjectName}
                projectDetails={projectDetails}
            />
            {/* Percent of Goals Met Modal */}
            <PercentageofGoalsMetModal
                projectDetails={projectDetails}
                refetchPmGoal={refetchPmGoal}
                isOpen={isOpenPercentageofGoalsMetModal}
                isLoading={isFetchingPmGoal}
                percentageOfGoalsMet={percentageOfGoalsMet}
                closeModal={handleClosePercentageofGoalsMetModal}
            />
            <NextGoalDetailsModal
                isOpen={isOpenNextGoalDetailsModal}
                closeModal={handleCloseNextGoalDetailsModal}
                projectDetails={projectDetails}
            />
            <ProjectManagerExplanationModal />
        </React.Fragment>
    );
};

export default ProjectStatus;
