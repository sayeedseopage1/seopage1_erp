import * as React from "react";
import styled from "styled-components";
import LeadTable from "../components/table/LeadTable";
import { useDmLeadsQuery } from "../../../../services/api/dmLeadsApiSlice";
import { LeadTableColumns } from "../components/table/LeadTableColumns";
import LeadTableFilterBar from "../components/LeadTableFilterBar";
import LeadTableExportButton from "../components/LeadTableExportButton";
import RefreshButton from "../components/RefreshButton";
import LeadAddButton from "../components/LeadAddButton";
import LeadAddModalContainer from "../components/LeadAddModalContainer";

const Leads = () => {
    const [addLeadModalIsOpen, setAddLeadModalIsOpen] = React.useState(false);
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
    const { data, isFetching, refetch } = useDmLeadsQuery(
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
        <Container>
            <LeadTableFilterBar setFilter={setFilter} />
            <div
                className="d-inline-flex"
                style={{
                    gap: "5px",
                }}
            >
                <LeadAddButton open={() => setAddLeadModalIsOpen(true)} />
                <LeadTableExportButton filter={filter} />
            </div>

            <LeadAddModalContainer
                isOpen={addLeadModalIsOpen}
                close={() => setAddLeadModalIsOpen(false)}
            />

            {/* refresh */}
            <RefreshButton onClick={refetch} isLoading={isFetching} />
            <LeadTable
                data={leads}
                columns={[...LeadTableColumns]}
                isLoading={isFetching}
                onPageChange={onPageChange}
                sorting={sorting}
                setSorting={setSorting}
            />
        </Container>
    );
};

export default Leads;

const Container = styled.div`
    padding: 1.2rem;
`;
