import * as React from "react";
import styled from "styled-components";
import LeadTable from "../components/table/LeadTable";
import { faker } from "@faker-js/faker";
import { useLeadsQuery } from "../../../../services/api/leadApiSlice";
import { LeadTableColumns } from "../components/table/LeadTableColumns";
import LeadTableFilterBar from "../components/LeadTableFilterBar";
 

const Leads = () => {
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
    }

    // fetch data
    const { data, isFetching, refetch } = useLeadsQuery(queryString({
      page: pageIndex + 1,
      limit: pageSize,
      sort_by: sorting[0]?.id,
      sort_type: sorting[0]?.desc ? 'desc' : 'asc',
      ...filter
    }),{ refetchOnMountOrArgChange: true});


    const leads = data?.data;

    const onPageChange = (paginate) => {
        setPagination(paginate);
    };
 

    return (
        <Container>
            <LeadTableFilterBar
              setFilter={setFilter}
            /> 
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
