import * as React from "react";
import styled from "styled-components";
import RefreshButton from "../components/RefreshButton";
import DataTable from "../components/table/DataTable";
import { WonDealsTableColumns } from "../components/table/WonDealsTableColumns";
import { useDmWonDealsQuery } from "../../../../services/api/dmWonDealsApiSlice";
import { Flex } from "../components/table/ui";
import FilterBar from "../components/FilterBar";
import { useDealContext } from "../components/context/DealContext";
import DealTableExportButton from "../components/DealTableExportToExcel";
import Button from "../../../../global/Button";

const WonDeals = () => {
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
    const { data, isFetching, refetch } = useDmWonDealsQuery(
        queryString({
            page: pageIndex + 1,
            limit: pageSize,
            sort_by: sorting[0]?.id,
            sort_type: sorting[0]?.desc ? "desc" : "asc",
            ...filter,
        }),
        { refetchOnMountOrArgChange: true, skip: !filter?.start_date }
    );

    const wonDeals = data?.data;

    const onPageChange = (paginate) => {
        setPagination(paginate);
    };

    // redirect path
    const redirectTo = (url) => {
        window.location.href = url;
    };

    return (
        <React.Fragment>
            <div>
                <FilterBar setFilter={setFilter} />
                <Flex justifyContent="space-between" className="mb-3">
                    <Flex>
                        <Button 
                            onClick={() =>
                                redirectTo(`/account/award-time/increase`)
                            }
                            className="bg-warning border-0 font-weight-normal"
                        >
                            <i className="fa-solid fa-clock" />
                            Award Time Extension Requests
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
                        data={wonDeals}
                        columns={[...WonDealsTableColumns]}
                        isLoading={isFetching}
                        onPageChange={onPageChange}
                        sorting={sorting}
                        tableName="WonDealsTable"
                        setSorting={setSorting}
                    />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default WonDeals;

const Container = styled.div`
    background-color: #fff;
    overflow: hidden;
    /* box-shadow: 0 0 6px rgb(0 0 0 / 20%); */
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
`;
