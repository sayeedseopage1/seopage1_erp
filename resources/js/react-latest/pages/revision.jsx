import _ from "lodash";
import React, { useState } from "react"; 
import styles from "../styles/revision-page.module.css";
import { RevisionTableColumns } from "../components/revision-page/RevisionTableColumns";
import {User} from '../utils/user-details';
import useSWR from "swr";
import DataTable from '../ui/basic-table/DataTable';
import Toaster from "../ui/Toaster";



const Revision = () => {
    const [pageIndex, setPageIndex] = useState(1);
    const [nRows, setNRows] = useState(10);

    const auth = new User(window.Laravel.user);
   
    // get data 
    const { data, error , isLoading } = useSWR(
        `/account/tasks/revisions`, 
        (url) => axios.get(url).then(res => res.data) 
    );
    

    // /account/tasks/sales-response-on-revision


    console.log({
        data,
        error,
        isLoading
    })
    
    console.log(RevisionTableColumns)
    console.log({data})
 
    return (
        <section className={styles.revision_section_container}>
            <div className={styles.table_container}>
                <DataTable
                    search={""}
                    tableData={data ? _.orderBy(data, 'id', 'desc') : []}
                    isLoading={isLoading} 
                    tableName="revisionTableColumns"
                    tableColumns={[...RevisionTableColumns]}
                    // hideColumns={auth?.getRoleId() === 1 ? ['action']: []}
                />
            </div>

            <Toaster />
        </section>
    );
};

export default Revision;
