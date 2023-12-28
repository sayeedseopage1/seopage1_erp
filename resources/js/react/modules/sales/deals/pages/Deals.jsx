import * as React from "react";
import styled from "styled-components";
import RefreshButton from "../components/RefreshButton";
import DataTable from "../components/table/DataTable";
import { DealsTableColumns } from "../components/table/DealsTableColumns";
import { useDealsQuery } from "../../../../services/api/dealApiSlice";
import { Flex } from "../components/table/ui";
import Button from "../../../../global/Button";
import FilterBar from "../components/FilterBar";

const Deals = () => {
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
        <Container>
            <FilterBar setFilter={setFilter} />
            <Flex justifyContent="space-between" className="mb-3">
                <Button className="font-weight-normal">
                    <i className="fa-solid fa-plus" />
                    Create Deal
                </Button>
                {/* refresh */}
                <RefreshButton
                    onClick={refetch}
                    isLoading={isFetching}
                    className="font-weight-normal"
                />
            </Flex>
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
    );
};

export default Deals;

const Container = styled.div`
    background-color: #fff;
    padding: 1.2rem;
`;
