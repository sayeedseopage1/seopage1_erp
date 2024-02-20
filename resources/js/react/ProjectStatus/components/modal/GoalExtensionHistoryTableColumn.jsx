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
      header: "Goal Dead Line",
      accessorKey: "goal_end_date",
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
    // conditionally render the header based on the user role
    header: "Negligence From Project Manager Rating",
    accessorKey: "negligence_pm_rating",
    cell: ({ row }) => {
        const data = row?.original;
        return (
            <span className="multine-ellipsis">{data.negligence_pm_rating}</span>
        )
    }
  },
 
];