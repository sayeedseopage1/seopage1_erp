import * as React from "react";
import styled from "styled-components";
import LeadTable from "../components/table/LeadTable";
import { useLeadsQuery } from "../../../../services/api/leadApiSlice";
import { LeadTableColumns } from "../components/table/LeadTableColumns";
import LeadTableFilterBar from "../components/LeadTableFilterBar";
import LeadTableExportButton from "../components/LeadTableExportButton";
import RefreshButton from "../components/RefreshButton";
import { Flex } from "../components/table/ui";
import { useLeadContext } from "../components/context/LeadContext";
import LeadCreationForm from "../components/LeadCreationForm";
import Button from "../../../../global/Button";
import LeadAddButton from "../components/LeadAddButton";
import LeadUpdateForm from "../components/LeadUpdateForm";

const Leads = () => {
    const { isEditFormEnable } = useLeadContext();
    const [isCreationFormVisible, setIsCreationFormVisible] =
        React.useState(false);

    // --------------------------------------
    const [{ pageIndex, pageSize }, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [filter, setFilter] = React.useState({});

    const [sorting, setSorting] = React.useState([]);
    // --------------------------------------

    // make query string
    const queryString = (object) => {
        const queryObject = _.pickBy(object, Boolean);
        return new URLSearchParams(queryObject).toString();
    };

    // fetch data
    const { data, isFetching, refetch } = useLeadsQuery(
        queryString({
            page: pageIndex + 1,
            limit: pageSize,
            sort_by: sorting[0]?.id,
            sort_type: sorting[0]?.desc ? "desc" : "asc",
            ...filter,
        }),
        { refetchOnMountOrArgChange: true, skip: !filter?.start_date }
    );

    const leads = data?.data;

    const onPageChange = (paginate) => {
        setPagination(paginate);
    };

    return (
        <React.Fragment>
            <div>
                <LeadTableFilterBar setFilter={setFilter} />
                <Flex justifyContent="space-between" className="mb-3">
                    <div>
                        <LeadAddButton
                            onClick={() => setIsCreationFormVisible(true)}
                            isLoading={false}
                            className="font-weight-normal"
                        >
                            <i className="fa-solid fa-plus" />
                            Create Lead
                        </LeadAddButton>

                        <LeadTableExportButton filter={filter} />
                    </div>

                    <Flex>
                        {/* refresh */}
                        <RefreshButton
                            onClick={refetch}
                            isLoading={isFetching}
                            className="font-weight-normal"
                        />
                    </Flex>
                </Flex>
                {/* <Container> */}
                    <LeadTable
                        data={leads}
                        columns={[...LeadTableColumns]}
                        isLoading={isFetching}
                        onPageChange={onPageChange}
                        sorting={sorting}
                        setSorting={setSorting}
                    />
                {/* </Container> */}
            </div>

            {/* creation form */}
            <LeadCreationForm
                isOpen={isCreationFormVisible}
                close={() => setIsCreationFormVisible(false)}
            />

            {/* edit form */}
            {/* {isEditFormEnable && 
              <LeadUpdateForm />
            } */}
        </React.Fragment>
    );
};

export default Leads;

const Container = styled.div`
    background-color: #fff;
    overflow: hidden;
    /* box-shadow: 0 0 6px rgb(0 0 0 / 20%); */
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
`;
