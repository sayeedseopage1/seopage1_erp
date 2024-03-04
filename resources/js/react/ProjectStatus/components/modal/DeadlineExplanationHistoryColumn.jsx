import Avatar from "../../../global/Avatar";
import { CreatedBy } from "../table/ui";

export const DeadlineEHColumn = [
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
      id: "start_date",
      header: "Goal Start Date",
      accessorKey: "start_date",
  },
  {
      id: "deadline",
      header: "Goal Dead Line",
      accessorKey: "deadline",
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
              <span title={data?.description} className="multine-ellipsis"> 
                  {data?.description ?? "--"}
              </span>
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
                       color: data?.goal_status === 0 ? "#FF0000" : "#00b5ff",
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
            <span className="multine-ellipsis"
            dangerouslySetInnerHTML={{ __html: data?.reason ?? "--",}}
        />
        )
    }
  },
  {
    id: "client_communication",
    header: "Client Communication",
    accessorKey: "client_communication",
    cell: ({ row }) => {
        const data = row?.original;
        return (
            <span className="multine-ellipsis"
            dangerouslySetInnerHTML={{ __html: data?.client_communication ?? "--",}}
        />
        )
    }
  },
  {

      id: "client_communication_rating",
      header: "Client Communication Rating",
      accessorKey: "client_communication_rating",
      cell: ({ row }) => {
          const data = row?.original;
          return (
            <span className="multine-ellipsis">{data.client_communication_rating}</span>
          )
      }
  },
  {
    id: "negligence_pm",
    header: "Negligence From Project Manager",
    accessorKey: "negligence_pm",
    cell: ({ row }) => {
        const data = row?.original;
        return (
            <span className="multine-ellipsis"
            dangerouslySetInnerHTML={{ __html: data?.negligence_pm ?? "--",}}
        />
        )
    }
  },
  {
    id: "negligence_pm_rating",
    header: "Negligence From Project Manager Rating",
    accessorKey: "negligence_pm_rating",
    cell: ({ row }) => {
        const data = row?.original;
        return (
            <span className="multine-ellipsis">{data.negligence_pm_rating}</span>
        )
    }
  },
  {
    id: "authorization_status",
    header: "Authorization Status",
    accessorKey: "authorization_status",
    cell: ({ row }) => {
        const data = row?.original;
        return (
            <div style={{
                width: "fit-content",
                padding: "0px 10px",
                borderRadius: "20px",
                color: "white",
                backgroundColor: data?.authorization_status === 0 ? "#FFB800" : "#3F9C35",
              }}> 
                  {data?.authorization_status === 0 ? "Pending" : "Authorized"} 
              </div>
        )
    }
  },
  {
    id: "authorization_on",
    header: "Authorized On",
    accessorKey: "authorization_on",
  },
  {
    id: "authorization_by",
    header: "Authorized By",
    accessorKey: "authorization_by",
    cell: ({ row }) => {
        const data = row?.original;
        return (
            <CreatedBy
                href={`/account/employees/${data.authorization_by_id}`}
            >
                <Avatar
                        type="circle"
                        name={data?.authorization_by_name}
                        src={data?.authorization_by_img ? `/user-uploads/avatar/${data?.authorization_by_img}` : null}
                />
                <span>{data?.authorization_by_name}</span>
            </CreatedBy> 
            
        )
    }
  },
 
];