import * as React from "react";
import styled from "styled-components";

import FilterBar from "../components/FilterBar";

import {
    useGetPmGoalQuery,
    useGetProjectStatusQuery,
} from "../../services/api/projectStatusApiSlice";
import ProjectStatusTable from "../components/table/ProjectStatusTable";
import ActionDropdown from "../components/table/ActionDropdown";
import Avatar from "../../global/Avatar";
import ProjectModal from "../components/modal/ProjectModal";

const ProjectStatus = () => {
    const [sorting, setSorting] = React.useState([]);
    const [projectId, setProjectId] = React.useState("900");
    const [{ pageIndex, pageSize }, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [filtering, setFiltering] = React.useState("");

    // make query string
    const queryString = (object) => {
        const queryObject = _.pickBy(object, Boolean);
        return new URLSearchParams(queryObject).toString();
    };

    const { data, isFetching, refetch } = useGetProjectStatusQuery(
        queryString({
            page: pageIndex + 1,
            limit: pageSize,

            ...filtering,
        })
    );
    const {
        data: pmGoalData,
        isFetching: isFetchingPmGoal,
        refetch: refetchPmGoal,
    } = useGetPmGoalQuery(projectId);

    console.log("query string", queryString);
    const leads = data?.data;
    const pmGoal = pmGoalData?.data;

    const onPageChange = (paginate) => {
        setPagination(paginate);
    };

    const [isModalOneOpen, setIsModalOneOpen] = React.useState(false);
    const [selectedProjectName, setSelectedProjectName] = React.useState("");
    const closeModalOne = () => {
        setIsModalOneOpen(false);
        setSelectedProjectName("");
    };

    const TableColumns = [
        {
            id: "clientName",
            header: "Client",
            accessorKey: "clientName",
            cell: ({ row }) => {
                const data = row.original;

                return (
                    <div style={{ display: "flex", gap: "5px" }}>
                        <Avatar
                            src={data?.clientImage ?? null}
                            name={data?.clientName}
                            width={28}
                            height={28}
                            type="circle"
                        />

                        <div>{data?.clientName}</div>
                    </div>
                );
            },
        },
        {
            id: "project_name",
            header: "Project Name",
            accessorKey: "project_name",

            cell: ({ row }) => {
                const data = row.original;
                return (
                    <a
                        onClick={() => {
                            setProjectId(data.project_id);
                            setIsModalOneOpen(true);
                            setSelectedProjectName(data.project_name);
                        }}
                        className="multiline-ellipsis text-hover-underline pr-2"
                    >
                        {data?.project_name}
                    </a>
                );
            },
        },
        {
            id: "project_budget",
            header: "Project Budget",
            accessorKey: "project_budget",
        },
        {
            id: "project_category",
            header: "Project Category",
            accessorKey: "project_category",
        },
        {
            id: "goal_start_date",
            header: "Start Date",
            accessorKey: "goal_start_date",
        },

        {
            id: "action",
            header: "Action",
            cell: (props) => <ActionDropdown {...props} />,
        },
    ];

    return (
        <Container>
            <FilterBar setFiltering={setFiltering} />

            <ProjectStatusTable
                data={leads}
                columns={TableColumns}
                isLoading={isFetching}
                onPageChange={onPageChange}
                sorting={sorting}
                setSorting={setSorting}
                setFiltering={setFiltering}
            />

            <ProjectModal
                isFetchingPmGoal={isFetchingPmGoal}
                pmGoal={pmGoal}
                isOpen={isModalOneOpen}
                closeModal={closeModalOne}
                selectedProjectName={selectedProjectName}
            />
        </Container>
    );
};

export default ProjectStatus;

const Container = styled.div`
    padding: 1.2rem;

    background-color: white;
`;
