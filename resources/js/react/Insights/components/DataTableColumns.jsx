import dayjs from "dayjs"
import Tooltip from '../ui/Tooltip';
import { useUsers } from "../hooks/useUsers";
import { stage } from "../utils/constants";
import { Link } from "react-router-dom";
import ContributionDetails from "./ContributionDetails";
import WonAmountDetails from "./WonAmountDetails";







export const DataTableColumns = [
   
     {
        header: 'Deal Name',
        accessor: 'project_name',
        id: 'project_name',
        cell: (row) => {
            let id = row['id'];
            let name = row['project_name'];

            return <span>
                {
                    id && name ?
                    <a href={`/account/deals/${id}`}>
                        <span>{name}</span> 
                    </a>
                    : <span> - </span>
                }
                
            </span>
        }
    },
    {
        header: "Client Username",
        id: "client_username",
        accessor: 'client_username',
        cell: (row) => {
            const client_username = row['client_username'];

            return (client_username) ? 
                <span> {client_username} </span>
                : <span> - </span>
        }
    },
    {
        header: "Project Budget (USD)",
        id: "project_budget",
        accessor: 'project_budget',
        cell: (row) => {
            const amount = row['amount'];

            return (amount) ?
                <span style={{fontWeight: 'bold'}}>
                    {Number(amount).toFixed(2)}
                </span>
                : <span> - </span>
        }
    },
    {
        header: "Currency",
        id: "currency",
        accessor: 'currency',
        cell: (row) => {
            return <span> USD </span> 
        }
    },
    
    // {
    //     header: "Project Link",
    //     id: "project_link",
    //     accessor: 'project_link',
    //     cell: (row) => {
    //         const project_link = row['project_link'];

    //         return (project_link) ?
    //             <span>
    //                 {/* <a href={project_link}> */}
    //                 {project_link}
    //             {/* </a> */}
    //             </span>
    //             : <span> - </span>
    //     }
    // },
    
    {
        header: 'Deal Created Date',
        id: 'deal_created_date',
        accessor: 'deal_created_date',
        cell: (row) => {
            const deal_created_date = row['created_at'];

            return (deal_created_date) ?
                <span> {dayjs(deal_created_date).format('MMM DD, YYYY')} </span>
                : <span> - </span>
        } 
    },
    //  {
    //     header: 'Deal Won By',
    //     id: 'deal_won_by',
    //     accessor: 'deal_won_by',
    //     cell: (row) => {
    //         const deal_won_by = row['added_by'];



    //         return deal_won_by ? <OwnerCell id={deal_won_by} /> : <span> - </span> 

    //     } 
    // },
    
    {
        header: 'Pipeline',
        id: 'pipeline',
        accessor: 'pipeline',
        cell: (row) => {
            return <span> Pipeline </span>
        } 
    },
    
    {
        header: 'Current Stage',
        id: "current_stage",
        accessor: 'current_stage',
        cell: (row) => <StageCell {...row} />
    },
    {
        header: 'Deal Status',
        id: "deal_status",
        accessor: 'deal_status',
        cell: (row) => {
            const deal_status = row['won_lost'];
            return (deal_status) ?
                deal_status === 'Yes' ?
                <span> Won </span>
                : <span> Lost </span>
                : <span> Open </span>
        }
    },
    

    {
        header: 'Deal Converted By',
        id: "deal_converted_by",
        accessor: 'deal_converted_by',
        cell: (row) => {
            const deal_converted_by = row['added_by'];

            return deal_converted_by ? <OwnerCell id={deal_converted_by} /> : <span> - </span>
        } 
    }
    
]


export const WonTableData = [
   
     {
        header: 'Deal Name',
        accessor: 'project_name',
        id: 'project_name',
        cell: (row) => {
            let id = row['id'];
            let name = row['project_name'];

            return <span>
                {
                    id && name ?
                    <a href={`/account/contracts/${id}`}>
                        <span>{name}</span> 
                    </a>
                    : <span> - </span>
                }
                
            </span>
        }
    },
    {
        header: "Client Name",
        id: "client_name",
        accessor: 'client_name',
        cell: (row) => {
            const client_name = row['client_name'];

            return (client_name) ? 
                <span> {client_name} </span>
                : <span> - </span>
        }
    },
    
    {
        header: "Actual Amount",
        id: "amount",
        accessor: 'amount',
        cell: (row) =>  <WonAmountDetails row={row} />
         
    },

    {
        header: "Contribution Amount",
        id: "team_total_amount",
        accessor: 'team_total_amount',
        cell: (row) => <ContributionDetails row={row}/> 
    },
    {
        header: 'Deal Won By',
        id: 'deal_won_by',
        accessor: 'deal_won_by',
        cell: (row) => {
            const deal_won_by = row['added_by'];

            // console.log(deal_won_by)

            return deal_won_by ? <OwnerCell id={deal_won_by} /> : <span> - </span> 

        } 
    },
    {
        header: 'Deal Created Date',
        id: 'created_at',
        accessor: 'created_at',
        cell: (row) => {
            const deal_created_date = row['created_at'];

            return (deal_created_date) ?
                <span> {dayjs(deal_created_date).format('MMM DD, YYYY')} </span>
                : <span> - </span>
        } 
    },
    {
        header: "Currency",
        id: "currency",
        accessor: 'currency',
        cell: (row) => {
            return <span> USD </span> 
        }
    },
    
    // {
    //     header: "Project Link",
    //     id: "project_link",
    //     accessor: 'project_link',
    //     cell: (row) => {
    //         const project_link = row['project_link'];

    //         return (project_link) ?
    //             <span>
    //                 {/* <a href={project_link}> */}
    //                 {project_link}
    //             {/* </a> */}
    //             </span>
    //             : <span> - </span>
    //     }
    // },
    
    
    
    {
        header: 'Pipeline',
        id: 'pipeline',
        accessor: 'pipeline',
        cell: (row) => {
            return <span> Pipeline </span>
        } 
    },
    
    
    {
        header: 'Deal Status',
        id: "deal_status",
        accessor: 'deal_status',
        cell: (row) => {
            const status = row['status'];
            if (status === 'Accepted') {
                return <span> Won </span>
            } else if(status === 'pending') {
                return <span> Open </span>
            }else {
                return <span> Lost </span>
            }
        }
    },

    

    {
        header: 'Client Contact Form',
        id: "submission_status",
        accessor: 'submission_status',
        cell: (row) => {
            const submission_status = row['submission_status'];
            return (submission_status) ?
                <span> {submission_status} </span>
                : <span> - </span>
        }
    },

    {
        header: 'Project Award Time',
        id: "project_award_time",
        accessor: 'project_award_time',
        cell: (row) => {
            const award_time = row['award_time'];

            return (award_time) ?
                <span> {dayjs(award_time).format('MMM DD, YYYY')} </span>
                : <span> - </span>
        }
    },
 
    
    {
        header: 'Project Manager',
        id: 'project_manager',
        accessor: 'project_manager',
        cell: (row) => {
            const pm_id = row['pm_id'];

            return pm_id ? <OwnerCell id={pm_id} /> : <span> - </span> 

        } 
    },
    

    // {
    //     header: 'Deal Converted By',
    //     id: "deal_converted_by",
    //     accessor: 'deal_converted_by',
    //     cell: (row) => {
    //         const deal_converted_by = row['added_by'];

    //         return deal_converted_by ? <OwnerCell id={deal_converted_by} /> : <span> - </span>
    //     } 
    // }
    
]




export const AddedTableColumns = [
    
     {
        header: 'Deal Name',
        accessor: 'project_name',
        id: 'project_name',
        cell: (row) => {
            let id = row['deal_id'];
            let name = row['deal_project_name'];

            return <span>
                {
                    id && name ?
                    <a href={`/account/deals/${id}`}>
                        <span>{name}</span> 
                    </a>
                    : <span> - </span>
                }
                
            </span>
        }
    },
    {
        header: "Client Username",
        id: "client_username",
        accessor: 'client_username',
        cell: (row) => {
            const client_username = row['client_username'];

            return (client_username) ? 
                <span> {client_username} </span>
                : <span> - </span>
        }
    },
    {
        header: "Project Budget (USD)",
        id: "deal_amount",
        accessor: 'deal_amount',
        cell: (row) => {
            const deal_amount = row['deal_amount'];

            return (deal_amount) ?
                <span style={{fontWeight: 'bold'}}>
                    {Number(deal_amount).toFixed(2)}
                </span>
                : <span> - </span>
        }
    },

    // {
    //     header: "Project Budget (Original)",
    //     id: "deal_original_amount",
    //     accessor: 'deal_original_amount',
    //     cell: (row) => {
    //         const deal_original_amount = row['deal_original_amount'];

    //         return (deal_original_amount) ?
    //             <span style={{fontWeight: 'bold'}}>
    //                 {Number(deal_original_amount).toFixed(2)}
    //             </span>
    //             : <span> - </span>
    //     }
    // },
    {
        header: "Currency",
        id: "currency",
        accessor: 'currency',
        cell: (row) => {
            return <span> USD </span> 
        }
    },
    
    // {
    //     header: "Project Link",
    //     id: "project_link",
    //     accessor: 'project_link',
    //     cell: (row) => {
    //         const project_link = row['project_link'];

    //         return (project_link) ?
    //             <span>
    //                 <a href={project_link}>
    //                 {project_link}
    //             </a>
    //             </span>
    //             : <span> - </span>
    //     }
    // },
  
    {
        header: 'Deal Created Date',
        id: 'deal_created_at',
        accessor: 'deal_created_at',
        cell: (row) => {
            const deal_created_at = row['deal_created_at'];

            return (deal_created_at) ?
                <span> {dayjs(deal_created_at).format('MMM DD, YYYY')} </span>
                : <span> - </span>
        } 
    },
     {
        header: 'Deal Converted By',
        id: 'lead_converted_by',
        accessor: 'lead_converted_by',
        cell: (row) => {
            const lead_converted_by = row['lead_converted_by'];

            // console.log(deal_won_by)

            return lead_converted_by ? <OwnerCell id={lead_converted_by} /> : <span> - </span> 

        } 
    },
    {
        header: 'Current Stage',
        id: "deal_stage",
        accessor: 'deal_stage',
        cell: (row) => <StageCell {...row} />
    },
    
   
    {
        header: 'Deal Status',
        id: "deal_status",
        accessor: 'deal_status',
        cell: (row) => {
            const deal_status = row['won_lost'];
            return (deal_status) ?
                deal_status === 'Yes' ?
                <span> Won </span>
                : <span> Lost </span>
                : <span> Open </span>
        }
    },
]





// owner cell
const OwnerCell = ({id}) => {
    const {users, usersIsFetching} = useUsers(); 
    const user = users?.usersObjects && users?.usersObjects[id];
    if(!user || usersIsFetching) return <span> - </span>
    return <a href={`/account/employees/${id}`} >
        <span> {user.name} </span>
    </a> 
}


// stage cell 
const StageCell = (row) => {
    return <span> { stage[row['deal_stage']]} </span>
}