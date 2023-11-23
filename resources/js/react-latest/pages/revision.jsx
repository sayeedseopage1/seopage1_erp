import _ from "lodash";
import React, { useState } from "react";
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { RevisionTableColumns } from "../components/revision-page/RevisionTableColumns";
import Filterbar from "../components/revision-page/filterbar/Filterbar";
import { useGetRevisionsQuery } from "../services/api/revisionApiSlice";
import styles from "../styles/revision-page.module.css";
import Loader from "../ui/Loader";
import Toaster from "../ui/Toaster";
import DataTable from "../ui/basic-table/DataTable";
import TableLoader from "../ui/basic-table/TableLoader";
import { User } from "../utils/user-details";

const Revision = () => {
    const auth = new User(window.Laravel.user);
    const [filter, setFilter] = useState({ filter: {}, query: "" });
    const location = useLocation();
    const [searchParam] = useSearchParams();

    const activeTab = searchParam.get('tab');

    /**
     * * Fetch revision data
     */
    const { data, isFetching, isLoading, refetch } = useGetRevisionsQuery(
        `${filter.query}`,
        {
            skip: !filter.query,
            refetchOnMountOrArgChange: true,
        }
    );

    return (
        <section className={styles.revision_section_container}>
            {/* filter */}
            <div>
                <Filterbar onFilter={(filter) => setFilter(filter)} isOwnRevision={activeTab === 'my-revision'}/>
            </div>

            {/* Tab bar */}
            <Flex justifyContent="space-between" className="mb-3">
                {
                    auth.getRoleId() === 8 ?
                    <Tabs>
                        <Tab to={location.pathname} className={!activeTab ? 'active' : ''}> All </Tab>
                        <Tab
                            to={`${location.pathname}?tab=my-revision`}
                            className={activeTab === 'my-revision' ? 'active' : ''}
                        > My Revision </Tab>
                    </Tabs> : null
                }


                <RefreshButton onClick={refetch}>
                    {isFetching ? <Loader title="Refreshing..." /> : 'Refresh'}
                </RefreshButton>
            </Flex>

            {/* end filter */}
            <div className={styles.table_container}>
                <DataTable
                    search={""}
                    tableData={data ? _.orderBy(data, "id", "desc") : []}
                    isLoading={isFetching}
                    tableName="revisionTableColumns"
                    tableColumns={[...RevisionTableColumns]}
                    state={{ isFetching }}
                    // hideColumns={auth?.getRoleId() === 1 ? ['action']: []}
                    loader={<TableLoader columns ={RevisionTableColumns} />}
                />
            </div>

            <Toaster />
        </section>
    );
};

export default Revision;


const Flex = styled.div`
    display: flex;
    align-items: ${props => props.alignItems ?? 'center'} ;
    justify-content: ${props => props.justifyContent ?? 'center'};
    gap: ${props => props.gap ?? '10px'};
`;

const Tabs = styled(Flex)``;
const Tab = styled(Link)`
    padding: 0.4rem 1rem;
    border: 1px solid lightgrey;
    border-radius: 6px;
    font-size: 14px;
    background: #fff;
    color: #777;

    &:hover,
    &.active{
        color: #fff !important;
        background: var(--header_color);
        border-color: var(--header_color);
    }
`;
const RefreshButton = styled.button`
    padding: 0.4rem 1rem;
    border: 1px solid lightgrey;
    border-radius: 6px;
    font-size: 14px;
    color: #fff !important;
    background: var(--header_color);
    border-color: var(--header_color);
`;
