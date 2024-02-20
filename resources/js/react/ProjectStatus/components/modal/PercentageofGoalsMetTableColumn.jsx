
export const PercentageofGMTableColumn = [
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
 
];