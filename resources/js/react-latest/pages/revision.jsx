import _ from "lodash";
import React, { useState } from "react";
import { RevisionTableColumns } from "../components/revision-page/RevisionTableColumns";
import Filterbar from "../components/revision-page/filterbar/Filterbar";
import { useGetRevisionsQuery } from "../services/api/revisionApiSlice";
import styles from "../styles/revision-page.module.css";
import Toaster from "../ui/Toaster";
import DataTable from "../ui/basic-table/DataTable";
import TableLoader from "../ui/basic-table/TableLoader";
import { User } from "../utils/user-details";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Loader from "../ui/Loader"; 

const Revision = () => {
    const auth = new User(window.Laravel.user);
    const [filter, setFilter] = useState({ filter: {}, query: "" });
    const location = useLocation();
    const pathname = location.pathname;
    const [searchParams] = useSearchParams();
    const tab = searchParams.get('tab');
    const isPersonalTab = tab === 'my-revision';

    const { data, isFetching, isLoading, refetch} = useGetRevisionsQuery(
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
                <Filterbar onFilter={(filter) => setFilter(filter)} tab={tab} />
            </div>
            {/* end filter */}

            <div className="d-flex align-items-center justify-content-between mb-3">
                {
                    auth.getRoleId() === 8 ?
                    <div className="d-flex align-items-center" style={{gap: '10px'}}>
                        <Tab to={pathname} className={!isPersonalTab ? 'active': ''}> All </Tab>
                        <Tab to={`${pathname}?tab=my-revision`} className={!!isPersonalTab ? 'active' : '' }> My Revisions </Tab>
                    </div>
                : null
                }

                <RefreshButton onClick={refetch}>
                    {
                        isFetching ? 
                        <>
                            <Loader title="Refreshing..." borderRightColor="white"/>
                        </>
                        : 'Refresh'
                    }
                </RefreshButton> 
            </div>

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

const Tab = styled(Link) `
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: 1px solid #ddd;
    background: #fff;
    color: #151515;
    transition: all 0.3ms ease-in-out;
    &:hover{
        color: #fff !important;
        background: #1D82F5;
    }

    &:active{
        color: #fff !important;
        background: #282D32;
    }

    &.active{
        color: #fff !important;
        background: #1D82F5;
    }
`;

const RefreshButton = styled.button`
    border: 1px solid #ddd;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    color: #fff !important;
    background: #1D82F5;
`