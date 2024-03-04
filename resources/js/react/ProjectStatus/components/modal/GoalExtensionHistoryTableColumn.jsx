import Avatar from "../../../global/Avatar";
import { CreatedBy } from "../table/ui";

export const GoalExtensionHistoryTableColumn = [
  {
      id: "id",
      header: "#",
      accessorKey: "id",
      cell: ({cell }) => {
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
      accessorKey: "start_date",
  },
  {
      id: "goal_end_date",
      header: "Prev. Goal Deadline",
      accessorKey: "old_deadline",
  },
  {
      id: "new_goal_deadline",
      header: "New Goal Deadline",
      accessorKey: "new_deadline",
  },
  {
      id: "duration",
      header: "Duration",
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
      header: "Description",
      accessorKey: "description",
      cell: ({ row }) => {
          const data = row?.original;
          return (
            <span title={data?.reason} className="multine-ellipsis"
                dangerouslySetInnerHTML={{ __html: data?.description ?? "--",}}
            />
          )
      }
  },
  {
      id: "status",
      header: "Goal Status",
      accessorKey: "status",
      cell: ({ row }) => {
          const data = row?.original;
          return (
            <div className="d-flex align-items-center" > 
                <i class="fa fa-circle mr-1 f-10" style={{
                     color: data?.goal_status === 0 ? "#1492d2 " : "#218838",
                }}></i>  

                {data?.goal_status === 0 ? "Incomplete" : "Completed" } 
            </div>
          )
      }
  },
  {
    id: "reason",
    header: "Reason",
    accessorKey: "reason",
    cell: ({ row }) => {
        const data = row?.original;
        return (
            <span title={data?.reason} className="multine-ellipsis"
            dangerouslySetInnerHTML={{ __html: data?.extended_admin_cmnt ?? "--",}}
        />
        )
    }
  },
  {
    id: "extension_req_on",
    header: "Extension Requested On",
    accessorKey: "extension_req_on",
  },
  {
    id: "extension_req_for",
    header: "Extension Requested For",
    accessorKey: "extension_req_for",
  },
  {
    id: "extension_req_auth_on",
    header: "Extension Req. Authorized On",
    accessorKey: "extension_req_auth_on",
  },
  {
    id: "extension_req_authorized_by",
    header: "Extension Req. Authorized By",
    accessorKey: "extension_req_authorized_by",
    cell: ({ row }) => {
        const data = row?.original;
        return (
            <CreatedBy
                href={`/account/employees/${data.authorization_by_id}`}
            >
                <Avatar
                        type="circle"
                        name={data?.authorization_by_name}
                        src={data?.clientImage ? `/user-uploads/avatar/${data?.authorization_by_img}` : null}
                />
                <span>{data?.authorization_by_name}</span>
            </CreatedBy> 
        )
    }
  },
  {
    id: "extension_req_authorized_for",
    header: "Extension Req. Authorized For",
    accessorKey: "extension_req_auth_for",
  },

 
];