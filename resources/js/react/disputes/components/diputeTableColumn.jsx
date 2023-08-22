import ResolveButton from "./ResolveButton"


export const disputeTableColumn = [
    {
        id: 'id',
        header: 'Dispute No.',
        accessorKey: '',
        cell: ({row}) => {
          return ('239283')
        }
    },
    {
        id: 'initiated',
        header: 'Initiated On',
        cell: () => 'Initiated'
    },
    {
        id: 'client',
        header: 'Client',
        cell: () => "Client"
    },
    {
        id: 'project',
        header: 'Project',
        cell: () => 'Project'
    },
    {
        id: 'task',
        header: 'Task',
        cell: () => 'Task'
    },
    {
        id: 'subtask',
        header: 'Subtask',
        cell: () => "SubTask"
    },
    {
        id: 'sales_person',
        header: 'Sales Person',
        cell: () => "Sales Person"
    },
    {
        id: 'project_manger',
        header: 'Project Manager',
        cell: () => "Project Manager"
    },
    {
        id: 'lead_developer',
        header: 'Lead Developer',
        cell: () => "Lead Developer"
    },
    {
        id: 'developer_desiner',
        header: 'Developer/ Designer',
        cell: () => "Developer/Designer"
    },
    {
        id: 'dispute_raised_by',
        header: 'Dispute Raised By',
        cell: () => "Dispute Raised By"
    },
    {
        id: 'dispute_raised_againest',
        header: 'Dispute Raised Against',
        cell: () => "Dispute Raised Against"
    },
    {
        id: 'status',
        header: 'Status',
        cell: () => "Status"
    },
    {
        id: 'Winner',
        header: 'Winner',
        cell: () => "Winner"
    },
    {
        id: 'resolved_on',
        header: 'Resolved On',
        cell: () => "Resolved On"
    },
    {
        id: 'resolved_by',
        header: 'Resolved By',
        cell: () => "Resolved By"
    },
    
    {
        id: 'due_date',
        header: 'Due Date',
        cell: () => "Due Date"
    },
    {
        id: 'action',
        header: 'Action',
        cell: () => <ResolveButton />
    }

]