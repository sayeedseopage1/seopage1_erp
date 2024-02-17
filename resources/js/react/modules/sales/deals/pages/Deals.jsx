import * as React from "react";
import styled from "styled-components";
import RefreshButton from "../components/RefreshButton";
import DataTable from "../components/table/DataTable";
import { DealsTableColumns } from "../components/table/DealsTableColumns";
import { useDealsQuery } from "../../../../services/api/dealApiSlice";
import { Flex } from "../components/table/ui";
import Button from "../../../../global/Button";
import FilterBar from "../components/FilterBar";
import DealCreationForm from "../components/DealCreationForm";
import DealUpdateForm from "../components/DealUpdateForm";
import { useDealContext } from "../components/context/DealContext";
import DealTableExportButton from "../components/DealTableExportToExcel";

const Deals = () => {
    const { isEditFormEnable } = useDealContext();

    const [isCreationFormVisible, setIsCreationFormVisible] =
        React.useState(false);

    const [{ pageIndex, pageSize }, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [filter, setFilter] = React.useState({});

    const [sorting, setSorting] = React.useState([]);

    // make query string
    const queryString = (object) => {
        const queryObject = _.pickBy(object, Boolean);
        return new URLSearchParams(queryObject).toString();
    };

    // fetch data
    const { data, isFetching, refetch } = useDealsQuery(
        queryString({
            page: pageIndex + 1,
            limit: pageSize,
            sort_by: sorting[0]?.id,
            sort_type: sorting[0]?.desc ? "desc" : "asc",
            ...filter,
        }),
        { refetchOnMountOrArgChange: true, skip: !filter?.start_date }
    );

    const deals = data?.data;

    const onPageChange = (paginate) => {
        setPagination(paginate);
    };

    return (
        <React.Fragment>
            <div>
                <FilterBar setFilter={setFilter} />
                <Flex justifyContent="space-between" className="mb-3">
                    <Flex>
                        <Button
                            onClick={() => setIsCreationFormVisible(true)}
                            className="font-weight-normal"
                        >
                            <i className="fa-solid fa-plus" />
                            Create Deal
                        </Button>

                        <DealTableExportButton filter={filter} />
                    </Flex>

                    <Flex>
                        {/* refresh */}
                        <RefreshButton
                            onClick={refetch}
                            isLoading={isFetching}
                            className="font-weight-normal"
                        />
                    </Flex>
                </Flex>
                <Container>
                    <DataTable
                        data={deals}
                        columns={[...DealsTableColumns]}
                        isLoading={isFetching}
                        onPageChange={onPageChange}
                        sorting={sorting}
                        tableName="DealsTable"
                        setSorting={setSorting}
                    />
                </Container>
            </div>

            {/* creation form */}
            <DealCreationForm
                isOpen={isCreationFormVisible}
                close={() => setIsCreationFormVisible(false)}
            />

            {/* edit form */}
            {isEditFormEnable && <DealUpdateForm />}
        </React.Fragment>
    );
};

export default Deals;

const Container = styled.div`
    background-color: #fff;
    overflow: hidden;
    /* box-shadow: 0 0 6px rgb(0 0 0 / 20%); */
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
`;
