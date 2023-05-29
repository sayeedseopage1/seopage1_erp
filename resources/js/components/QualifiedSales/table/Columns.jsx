

export const columns = [
    {
        id: 'date',
        header: 'Date',
        priority: 0,
        cell: (row) => <span> 07.04.23 </span> 
    },

    {
        id: 'project_name',
        header: 'Project name',
        priority: 1,
        cell: (row) => <span> 07.04.23 </span> 
    },

    {
        id: 'client_name',
        header: "Client name",
        priority: 2,
        cell: (row) => <span>Andrew</span>
    },

    {
        id: 'amount',
        header: 'Amount',
        priority: 3,
        cell: row => <span>$ 5000</span>
    },

    {
        id: 'project_manager',
        header: 'Project manager',
        priority: 4,
        cell: row => <span>Diner Islam</span>
    },

    {
        id: 'contact_form',
        header: 'Contact form',
        priority: 5,
        cell: row => <span>Diner Islam</span>
    },

    {
        id: 'authorized_by_sales_lead',
        header: 'Authorized by sales lead',
        priority: 6,
        cell: row => <span>Humaion Kabir</span>
    },
    
    {
        id: 'accepted_by_project_manager',
        header: 'Accepted by project manager',
        priority: 7,
        cell: row => <span>Jon D</span>
    },
    
    {
        id: 'authorized_by_top_management',
        header: 'Authorized by top management',
        priority: 8,
        cell: row => <span>Approved</span>
    },
    
    {
        id: 'status',
        header: 'Status',
        cell: row => <span>Qualified</span>
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
        priority: 10,
        header: 'Points Earned',
        cell: row => <span>2342342</span>
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
            <div className="sp1_qs_table_td p-0">
                <div className="d-flex flex-column">
                    <div className="border-bottom p-2"> * Sales leads comment </div>
                    <div className="p-2"> * Project manager comment </div>
                </div>
            </div>

            <div className="sp1_qs_table_td">
                * Sales lead comment
            </div>

            <div className="sp1_qs_table_td p-0">
                <div className="d-flex flex-column">
                    <div className="border-bottom p-2"> * Sales leads comment </div>
                    <div className="p-2"> * Project manager comment </div>
                </div>
            </div>

            <div className="sp1_qs_table_td">
                * Sales lead comment
            </div>
        </div>
    )
}