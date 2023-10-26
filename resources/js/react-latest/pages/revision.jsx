import _ from "lodash";
import React, { useState } from "react";
import styles from "../styles/revision-page.module.css";
import { RevisionTableColumns } from "../components/revision-page/RevisionTableColumns";
import { User } from "../utils/user-details";
import DataTable from "../ui/basic-table/DataTable";
import Toaster from "../ui/Toaster";
import Filterbar from "../components/revision-page/filterbar/Filterbar";
import { useGetRevisionsQuery } from "../services/api/revisionApiSlice";
import {Placeholder} from '../ui/Placeholder';

const Revision = () => {
    const auth = new User(window.Laravel.user);
    const [filter, setFilter] = useState({ filter: {}, query: "" });

    const { data, isFetching, isLoading } = useGetRevisionsQuery(
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
                <Filterbar onFilter={(filter) => setFilter(filter)} />
            </div>
            {/* end filter */}
            <div className={styles.table_container}>
                <DataTable
                    search={""}
                    tableData={data ? _.orderBy(data, "id", "desc") : []}
                    isLoading={isLoading}
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


const TableLoader = ({columns}) => {
    return(
        _.times(10,item=>(
           <tr key={item} className="sp1-data-table-tr">
            {_.map(columns, col => (
                <td key={col.id} className="sp1-data-table-td">
                    <Placeholder  />
                </td>
            ))}
           </tr>
        ) )
    )
}
