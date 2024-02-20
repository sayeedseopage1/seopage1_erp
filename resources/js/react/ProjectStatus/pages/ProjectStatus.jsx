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

const ProjectStatus = () => {
    const [search,setSearch] = React.useState('');
    const [projectDetails, setProjectDetails] = React.useState({});
    const [filter, setFilter] = React.useState(null);
    const [projectId, setProjectId] = React.useState("900");
    const [{ pageIndex, pageSize }, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });

    // make query string
    const queryString = (object) => {
        const queryObject = _.pickBy(object, Boolean);
        return new URLSearchParams(queryObject).toString();
    };

    const { data:projectStatusData, isFetching, refetch } = useGetProjectStatusQuery(
        queryString({
            page: pageIndex + 1,
            limit: pageSize,
            ...filter,
        }),
        { refetchOnMountOrArgChange: true }
    );
    const {
        data: pmGoalData,
        isFetching: isFetchingPmGoal,
        refetch: refetchPmGoal,
    } = useGetPmGoalQuery(projectId, {
        refetchOnMountOrArgChange: true /*, skip: !filter?.start_date*/,
    });

    const projectStatus = projectStatusData?.data?.data;
    const pmGoal = pmGoalData?.data;
    const parcenatgeOfGoalsMet = pmGoalData?.data


    let tableColumns = ProjectStatusTableColumns;


    const [isModalOneOpen, setIsModalOneOpen] = React.useState(false);
    const [isOpenPercentageofGoalsMetModal, setIsOpenPercentageofGoalsMetModal] = React.useState(false);
    const [selectedProjectName, setSelectedProjectName] = React.useState("");
    const closeModalOne = () => {
        setIsModalOneOpen(false);
        setSelectedProjectName("");
    };

    // On filter
    const onFilter = async (filter) => {
        const queryObject = _.pickBy(filter, Boolean);
        setFilter(queryObject);
    }
    

    // handle refresh button
    const onRefreshButtonClick = (e) => {
        e.preventDefault();
        onFilter(filter);
        refetch();
    }

    const handlePmGoalModal = (data) => {
        setProjectDetails(data);
        setProjectId(data.project_id);
        setIsModalOneOpen(true);
        setSelectedProjectName(data.project_name);
    }

    const handlePercentOfGoalMet = (data) => {
        setProjectId(data.project_id);
        setIsOpenPercentageofGoalsMetModal(true);
        setSelectedProjectName(data.project_name);
        setProjectDetails(data);
        console.log("data",data)
    }

    const handleClosePercentageofGoalsMetModal = () => {
        setIsOpenPercentageofGoalsMetModal(false);
    }


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
                                {isFetching ? <Loader title="Loading..." borderRightColor="white" /> : 'Refresh'}
                            </Button>
                        </div>
                    </div>

                   {/* Prjusct Status Main Table */}
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
                    />
                </div>
            </div>
            <ProjectModal
                refetchPmGoal={refetchPmGoal}
                isFetchingPmGoal={isFetchingPmGoal}
                pmGoal={pmGoal}
                isOpen={isModalOneOpen}
                closeModal={closeModalOne}
                selectedProjectName={selectedProjectName}
                projectDetails={projectDetails}
            />
            <PercentageofGoalsMetModal
                projectDetails={projectDetails}
                isOpen={isOpenPercentageofGoalsMetModal}
                isLoading={isFetchingPmGoal}
                parcenatgeOfGoalsMet={parcenatgeOfGoalsMet}
                closeModal={handleClosePercentageofGoalsMetModal}
            />
        </React.Fragment>
    );
};

export default ProjectStatus;

