import Avatar from "../../../global/Avatar";
import { CreatedBy } from "./ui";


export const ProjectStatusTableColumns = [
    {
        id: "id",
        header: "#",
        accessorKey: "id",
        cell: ({ row,cell }) => {
            const data = row.original;
            return (
                <span>{cell?.row?.index + 1}</span>
            );
        }
    },

  {
      id: "clientName",
      header: "Client Name",
      accessorKey: "clientName",
      cell: ({ row }) => {
          const data = row.original;
          return (
            <CreatedBy
                 href={`/account/clients/${data.clientId}`}
             >
                <Avatar
                    type="circle"
                    name={data?.clientName}
                    src={data?.clientImage ? `/user-uploads/avatar/${data?.clientImage}` : null}
                />
                <span>{data?.clientName}</span>
            </CreatedBy> 
          );
      },
  },
  {
    id: "project_name",
    header: "Project Name",
    accessorKey: "project_name",
    cell: ({ row, table  }) => {
        const data = row.original;
        const handler = table.options.meta
        return (
            <p
              onClick={() => handler.onClickHandler(data)}
                role="button"
                className="multiline-ellipsis text-hover-underline-color pr-2 text-primary"
            >
                {data?.project_name}
            </p>
        );
    },
},
  {
      id: "pmName",
      header: "Project Manager",
      accessorKey: "pmName",
      cell: ({ row }) => {
          const data = row.original;
          return (
            <CreatedBy
                href={`/account/employees/${data.pmId}`}
            >
                <Avatar
                    type="circle"
                    name={data?.pmName}
                    src={data?.pmImage ? `/user-uploads/avatar/${data?.pmImage}` : null}
                />

                <span>{data?.pmName}</span>
            </CreatedBy> 
          );
      },
  },
  {
    id: "project_budget",
    header: "Project Budget",
    accessorKey: "project_budget",
    cell: ({ row }) => {
          const data = row.original;
          return (
              <span>
                  {data?.project_budget} {data?.currency_symbol}
              </span>
          );
    }
},
  {
    id: "project_category",
    header: "Project Category",
    accessorKey: "project_category",
},
  {
      id: "goal_start_date",
      header: "Start Date",
      accessorKey: "goal_start_date",
  },
  {
      id: "percentage_of_goals_met",
      header: "Percentage of Goals Met",
      cell: ({ row, table }) => {
            const data = row.original;
            const handler = table.options.meta
            return (
                <span onClick={() => handler.onPercentOfGoalMet(data)}>--</span>
            );
        
      }
  },
  {
      id: "next_goal_date",
      header: "Next Goal Date",
      cell: ({ row }) => {
            return (
                <span>--</span>
            );
        
      }
  },
  {
      id: "next_goal_details",
      header: "Next Goal Details",
      cell: ({ row }) => {
            return (
                <button className="btn btn-success">View Details</button>
            );
        
      }
  },

//   {
//       id: "action",
//       header: "Action",
//       cell: (props) => <ActionDropdown {...props} />,
//   },
];