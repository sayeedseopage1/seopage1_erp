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
      accessorKey: "goal_start_date",
  },
  {
      id: "goal_end_date",
      header: "Prev. Goal Deadline",
      accessorKey: "goal_end_date",
  },
  {
      id: "new_goal_deadline",
      header: "New Goal Deadline",
      accessorKey: "new_goal_deadline",
      cell: ({ row }) => {
        const data = row?.original;
        return (
            <span > 
                {data?.goal_end_date ?? "--"} 
            </span>
        )
    }
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
              <span > 
                  {data?.status ?? "--"} 
              </span>
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
    id: "extension_requested_on",
    header: "Extension Requested On",
    accessorKey: "extension_requested_on",
    cell: ({ row }) => {
        const data = row?.original;
        return (
            <span className="multine-ellipsis"
            dangerouslySetInnerHTML={{ __html: data?.extension_requested_on ?? "--",}}
        />
        )
    }
  },
  {
    id: "extension_requested_for",
    header: "Extension Requested For",
    accessorKey: "extension_requested_for",
    cell: ({ row }) => {
        const data = row?.original;
        return (
            <span className="multine-ellipsis"
            dangerouslySetInnerHTML={{ __html: data?.extension_requested_for ?? "--",}}
        />
        )
    }
  },
  {
    id: "extension_req_authorized_on",
    header: "Extension Req. Authorized On",
    accessorKey: "extension_req_authorized_on",
    cell: ({ row }) => {
        const data = row?.original;
        return (
            <span className="multine-ellipsis"
            dangerouslySetInnerHTML={{ __html: data?.extension_req_authorized_on ?? "--",}}
        />
        )
    }
  },
  {
    id: "extension_req_authorized_by",
    header: "Extension Req. Authorized By",
    accessorKey: "extension_req_authorized_by",
    cell: ({ row }) => {
        const data = row?.original;
        return (
            <span className="multine-ellipsis"
            dangerouslySetInnerHTML={{ __html: data?.extension_req_authorized_by ?? "--",}}
        />
        )
    }
  },
  {
    id: "extension_req_authorized_for",
    header: "Extension Req. Authorized For",
    accessorKey: "extension_req_authorized_for",
    cell: ({ row }) => {
        const data = row?.original;
        return (
            <span className="multine-ellipsis"
            dangerouslySetInnerHTML={{ __html: data?.extension_req_authorized_for ?? "--",}}
        />
        )
    }
  },

 
];