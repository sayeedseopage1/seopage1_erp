import _ from "lodash";
import styles from "../../styles/revision-page.module.css";
import SaleActionButton from "./SaleActionButton";
import PersonColumn from "../../ui/PersonColumn";

export const RevisionTableColumns = [
    {
        id: "id",
        header: "Id",
        sortable: true,
        accessorFn: (row) => row.id,
        cell: (row) => {
            return <span>{row.getValue()}</span>;
        },
    },
    {
        id: "project",
        header: "Project",
        draggable: true,
        sortable: true,
        accessorFn: (row) => row.project_name,
        cell: (row) => {
            const data = row.row.original;
            

            return (
               <a href={`/account/projects/${data?.project_id}`}>
                    <abbr title={row.getValue()}>
                        <span className="multiline-ellipsis">{row.getValue()}</span>
                    </abbr>
               </a> 
            );
        },
    },
    {
        id: "client",
        header: "Client",
        draggable: true,
        sortable: true,
        accessorFn: (row) => row.client.name,
        cell: (row) => {
            const data = row.row.original;

            return (
                <a href={`/account/clients/${data?.client?.id}`}>
                    <abbr title={row.getValue()}>
                        <span className="multiline-ellipsis">{row.getValue()}</span>
                    </abbr>
                </a>
            );
        },
    },
    {
        id: "task",
        header: "Task",
        draggable: true,
        sortable: true,
        accessorFn: (row) => row.heading,
        cell: (row) => {
            return (
                <abbr title={row.getValue()}>
                    <span className="multiline-ellipsis">{row.getValue()}</span>
                </abbr>
            );
        },
    },
    {
        id: "revision",
        header: "Revision",
        draggable: true,
        sortable: true,
        accessorFn: (row) => row.pm_comment || row.lead_comment,
        cell: (row) => {
            return ( 
                <div className="multiline-ellipsis" dangerouslySetInnerHTML={{__html: row.getValue()?.slice(0, 80)}} /> 
            );
        },
    },
    {
        id: "revision_reason",
        header: "Revision Reason",
        draggable: true,
        sortable: true,
        accessorFn: (row) => row.revision_acknowledgement,
        cell: (row) => {
            return (
                <abbr title={row.getValue()}>
                    <span className="multiline-ellipsis">{row.getValue()}</span>
                </abbr>
            );
        },
    },
    {
        id: "revision_provided_by",
        header: "Revision Provided By",
        draggable: true,
        sortable: true,
        accessorFn: (row) => row.project_manager.name,
        cell: ({row}) => {
            const d = row.original;

            if(d.project_manager){
                return(
                    <PersonColumn
                        name={d.project_manager.name} 
                        avatar={d.project_manager.image}
                        slug = {d.project_manager.designation}
                        profileLink={`/account/employees/${d.project_manager.id}`}
                    />
                )  
            }else return <span> -- </span>
            // return (
            //     <abbr title={row.getValue()}>
            //         <span className="multiline-ellipsis">{row.getValue()}</span>
            //     </abbr>
            // );
        },
    },
    {
        id: "revision_due_to",
        header: "Revision Due To",
        draggable: true,
        sortable: true,
        accessorFn: (row) => row?.sale_person ? row.sale_person.name : row?.task_assign_to.name,
        cell: (row) => {
            return (
                <abbr title={row.getValue()}>
                    <span className="multiline-ellipsis">{row.getValue()}</span>
                </abbr>
            );
        },
    },
    {
        id: "project_manager",
        header: "Project Manager",
        draggable: true,
        sortable: true,
        accessorFn: (row) => row.project_manager.name,
        cell: (row) => {
            return (
                <abbr title={row.getValue()}>
                    <span className="multiline-ellipsis">{row.getValue()}</span>
                </abbr>
            );
        },
    },
    {
        id: "lead_developer",
        header: "Lead Developer",
        draggable: true,
        sortable: true,
        accessorFn: (row) => row.lead_developer.name,
        cell: (row) => {
            return (
                <abbr title={row.getValue()}>
                    <span className="multiline-ellipsis">{row.getValue()}</span>
                </abbr>
            );
        },
    },
    {
        id: "sales_executive",
        header: "Sales Executive",
        draggable: true,
        sortable: true,
        accessorFn: (row) => row.deal_added_by.name,
        cell: (row) => {
            return (
                <abbr title={row.getValue()}>
                    <span className="multiline-ellipsis">{row.getValue()}</span>
                </abbr>
            );
        },
    },
    {
        id: "status",
        header: "Action/Status",
        draggable: true,
        cell: ({row,table}) => {
            const data = row.original; 
            const user = window?.Laravel?.user;
            
            if((Number(user.role_id) === 8 && (data.sale_accept || data.sale_deny)) || Number(user.role_id) === 1){
                const status = () => {
                    if(data.sale_accept) {
                        return <div className={`${styles.status} f-12`} > {`Accepted by ${data?.deal_added_by?.name}` } </div> 
                    }else if (data.sale_deny){
                        return <div className={`${styles.status} f-12`} > {`Denied by ${data?.deal_added_by?.name}` } </div> 
                    }else if(data.is_accept) { 
                        return <div className={`${styles.status} f-12`} > {`Accepted by ${data?.task_assign_to?.name}` } </div> 
                    }else if (data.is_deny){
                        return <div className={`${styles.status} f-12`} > {`Denied by ${data?.task_assign_to?.name}` } </div> 
                    }
                }  
    
                return status()  
            }else{
                return <SaleActionButton row={data} table={table} />
            }
            
        },
    }
];
