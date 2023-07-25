// import dayjs from "dayjs";
import Dropdown from '../../Insights/ui/Dropdown';
import { CompareDate } from '../../Insights/utils/dateController';
const dayjs = new CompareDate;



export const LoadingColumns = [
    {
        id: 'date',
        header: 'Date',
        accessor: 'date',
        priority: 0,
        cell: (row) => {  
            return <span>{dayjs.dayjs(row?.date).format('MMM DD,YYYY')}</span> 
        }
    },

    {
        id: 'project_name',
        header: 'Project name',
        accessor: 'project_name',
        priority: 1,
        cell: (row) => {
            return(
                <a href={`/account/projects/${row?.id}`}>
                    {row?.project_name}
                </a>
            )
        }
    },

    {
        id: 'client_name',
        header: "Client name",
        accessor: 'client_name',
        priority: 2,
        cell: (row) => {
            return (
                <a href={`/account/clients/${row?.client_id}`}>
                    {row?.client_name}
                </a>
            )
        }
    },

    {
        id: 'project_budget',
        header: 'Amount',
        accessor: 'project_budget',
        priority: 3,
        cell: row => <span className="font-weight-bold">${Number(row?.amount).toFixed(2)}</span>
    },

    {
        id: 'pm_name',
        header: 'Project manager',
        accessor: 'pm_name',
        priority: 4,
        cell: row => {
            return <a href={`/account/employees/${row?.pm_id}`}>
                {row?.pm_name}
            </a>
        }
    },

    {
        id: 'contact_form',
        header: 'Contact form',
        priority: 5,
        cell: row => {
            return(
                <a href={`/account/deal-url/${row?.deal_id}`} 
                    style={{
                        wordBreak: 'break-all'
                    }}
                >
                    {`https://seopage1.net/account/deal-url/${row?.deal_id}`}
                </a>
            )
        }
    },

    {
        id: 'authorized_by_sales_lead',
        header: 'Authorized by sales lead',
        priority: 6,
        cell: row => {
            let isApproved = Number(row?.authorized_by_sales_lead); 
            let bgColor = isApproved ? '#00AA00' : '#1D82F5';

            return <span style={{
                    background: bgColor, 
                    color: '#fff',
                    padding: '0 6px',
                    borderRadius: '10px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                }}>
                    {isApproved ? "Accepted" : 'Pending'}
                </span> 
        }
    },
    
    {
        id: 'accepted_by_project_manager',
        header: 'Accepted by project manager',
        priority: 7,
        cell: row => {
            let isApproved = Number(row?.accepted_by_project_manager);

            let bgColor = isApproved ? '#00AA00' : '#1D82F5';

            return <span style={{
                    background: bgColor, 
                    color: '#fff',
                    padding: '0 6px',
                    borderRadius: '10px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                }}>
                    {isApproved ? "Approved" : 'Pending'}
                </span> 
        }
    },
    
    {
        id: 'authorized_by_top_management',
        header: 'Authorized by top management',
        priority: 8,
        cell: row => {
            let isApproved = Number(row?.authorized_by_top_management);
            let bgColor = isApproved ? '#00AA00' : '#1D82F5';

            return <span style={{
                    background: bgColor, 
                    color: '#fff',
                    padding: '0 6px',
                    borderRadius: '10px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                }}>
                    {isApproved ? "Approved" : 'Pending'}
                </span>
        }
    },
    
    {
        id: 'status',
        header: 'Status',
        cell: row => <Status row = {row} />
            
    },

    {
        id: 'notes',
        priority: 9,
        headClass: 'p-0',
        header: () => <RenderGroupHeader />,
        cell: row => <RenderRow row={row} />,
    },
    
    {
        id: 'points_earned',
        accessor: 'total_points',
        priority: 10,
        header: 'Points Earned',
        cell: row => <span style={{color: '#00AA00', fontWeight: 'bold'}}>{Number(row?.total_points).toFixed(2)}</span>
    }
 
]




// render group header

const RenderGroupHeader = () => {
    return(
        <div className="d-flex flex-column">
            <div className="w-100 py-1 border-bottom text-center sp1_qs_table_th_sub_head">
                Notes 
            </div>

            <div className="sp1_qs_table_tr">
                <div className="sp1_qs_table_td sp1_qs_table_th sp1_qs_table_th_sub">
                    Needs defined
                </div>

                <div className="sp1_qs_table_td sp1_qs_table_th sp1_qs_table_th_sub">
                    Prices
                </div>

                <div className="sp1_qs_table_td sp1_qs_table_th sp1_qs_table_th_sub">
                    Deadline
                </div>

                <div className="sp1_qs_table_td sp1_qs_table_th sp1_qs_table_th_sub">
                    Top management
                </div>
            </div>
        </div>
    )
}

// render row 
const RenderRow = ({row}) => {
    return(
        <div className="sp1_qs_table_tr">
            <div className="sp1_qs_table_td p-0" >
                <div className="d-flex flex-column" >
                    <div className="border-bottom p-2"> 
                        <Comment commentBy="* Sales leads comment" text={row?.sales_lead_need_define}/>
                    </div>
                    <div className="p-2"> 
                        <Comment commentBy="* Project manager comment" text ={row?.project_manager_needs_define}/>
                    </div>
                </div>
            </div>

            <div className="sp1_qs_table_td"> 
                <Comment commentBy="* Sales leads comment" text={row?.sales_lead_price_authorization}/>
            </div>

            <div className="sp1_qs_table_td p-0">
                <div className="d-flex flex-column">
                    <div className="border-bottom p-2"> 
                        <Comment 
                            commentBy="* Sales leads comment"
                            text={row?.sales_lead_deadline_comment}
                        />
                    </div>
                    <div className="p-2"> 
                    <Comment 
                            commentBy="* Project manager comment"
                            text={row?.project_manager_deadline_comment}
                    /> 
                    </div>
                </div>
            </div>

            <div className="sp1_qs_table_td">
                <Comment 
                    commentBy="* Sales lead comment"
                    text={row?.admin_authorization_comment}
                /> 
            </div>
        </div>
    )
}


const Status = ({row}) => {
    let isPMAccepted = Number(row?.accepted_by_project_manager);
    let isTopMApproved = Number(row?.authorized_by_top_management);
    let isSLApproved = Number(row?.authorized_by_sales_lead);
    let date = dayjs.dayjs(row?.date).format('YYYY-MM-DD');
    let curr = dayjs.dayjs().format('YYYY-MM-DD');
    let diff = dayjs.dayjs(curr).diff(date, 'day');


    if(isPMAccepted && isTopMApproved && isSLApproved){ // all accept
        return <span
            style={{
                background: '#00AA00', 
                color: '#fff',   
                padding: '0 6px',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: 'bold'
            }}
        > Qualified  </span>
    }else if(!isPMAccepted || !isTopMApproved || !isSLApproved){ // any of two accept
        if(diff > 5){
            return <span
                style={{
                    background: '#1D82F5', 
                    color: '#fff',   
                    padding: '0 6px',
                    borderRadius: '10px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                }}
            >  On Hold  </span>
        }
        
        
        return <span
            style={{
                background: '#FCBD01', 
                color: '#fff',
                padding: '0 6px',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: 'bold'
            }}
        > In Progress  </span>
    }
    
    
      // no one approve
            // return <span
            //     style={{
            //             background: '#FF0000', 
            //             color: '#fff',   
            //             padding: '0 6px',
            //             borderRadius: '10px',
            //             fontSize: '12px',
            //             fontWeight: 'bold'
            //     }}
            // > 
            //     Disqualified 
            // </span>    

}

const Comment = ({
    commentBy='',
    text=""
}) => {

    return(
        <Dropdown>
            <Dropdown.Toggle icon={false}>
                <>
                    {commentBy ? 
                    <span
                        data-toggle="tooltip" 
                        data-placement="bottom"
                        title="Click to show full comment"
                        className="sp1_qs_comment_view"
                    >
                        {commentBy}
                    </span>: <span>--</span>} 
                </> 
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <>
                    <p>  {text ? text : 'No comment'} </p>
                </>
            </Dropdown.Menu>
        </Dropdown>

    )



}