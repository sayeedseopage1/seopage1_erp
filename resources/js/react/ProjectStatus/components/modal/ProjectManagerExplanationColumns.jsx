import Avatar from "../../../global/Avatar";
import { User } from "../../../utils/user-details";
import { CreatedBy } from "../table/ui";
import styles from "../styles/pm-goals-table-column.module.css";
import Switch from "../Switch";

export const ProjectManagerExplanationColumns = [
  {
      id: "id",
      header: "#",
      accessorKey: "id",
      cell: ({ row, table ,column,cell }) => {
          const data = row?.original;
          return (
              <div style={{
                width: "20px",
              }}> 
                  {cell?.row?.index +1}
              </div>
          )
      }
  },
  {
      id: "goal_start_date",
      header: "Goal Start Date",
      accessorKey: "goal_start_date",
  },
  {
      id: "goal_end_date",
      header: "Goal Dead Line",
      accessorKey: "goal_end_date",
  },
  {
      id: "duration",
      header: "Goal Duration",
      accessorKey: "duration",
      cell: ({ row }) => {
          const data = row?.original;
          return (
              <span > 
                  {`${data?.duration} Days` ?? "--"} 
              </span>
          )
      }
  },
  {
      id: "description",
      header: "Goal Description",
      accessorKey: "description",
      cell: ({ row }) => {
          const data = row?.original;
          return (
              <span title={data?.description} className="multine-ellipsis"> 
                  {data?.description ?? "--"}
              </span>
          )
      }
  },
  {
      id: "client",
      header: "Client",
      accessorKey: "client",
      cell: ({ row }) => {
          const data = row?.original;
          return (
            <CreatedBy
              href={`/account/employees/${data.client.pmId}`}
            >
              <Avatar
                  type="circle"
                  name={data?.client?.pmName}
                  src={data?.client?.pmImage ? `/user-uploads/avatar/${data?.client?.pmImage}` : null}
              />

                <span>{data?.client?.pmName}</span>
            </CreatedBy> 
          )
      }
  },
  {
    id: "project_name",
    header: "Project Name",
    accessorKey: "project_name",
    cell: ({ row, table  }) => {
        const data = row?.original;
        return (
            <p
                role="button"
                className="multiline-ellipsis text-hover-underline-color pr-2 text-primary"
            >
                {data?.project_name}
            </p>
        );
    },
  },
  {
    id: "action",
    header: "Action",
    accessorKey: "action",
    cell: ({ row , table}) => {
        const data = row?.original;
        const user = new User(window?.Laravel?.user)
        const handle = table.options.meta
        return (
           <div className={`${styles.actionContainer}`}  >
                <Switch>
                    <Switch.Case condition={user?.roleId === 4}>
                        <Switch>
                            <Switch.Case condition={data?.reason_status === 0 ||  data?.reason_status === 2}>
                              <button 
                                onClick={() => handle.deadlineExplainClick(data)} className={`btn btn-danger ${styles?.authorize}`}
                              > 
                                Explain Why Expired 
                              </button>
                            </Switch.Case>
                        </Switch> 
                    </Switch.Case>
                </Switch>
           </div>
        )
    }
},
];