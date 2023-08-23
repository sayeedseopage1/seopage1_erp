import * as React from 'react';
import ResolveButton from "./ResolveButton"
import DisputeNotification from './DisputeNotification';



export const disputeTableColumn = [
    {
        id: 'id',
        header: 'Dispute No.',
        draggable: false,
        accessorKey: '',
        cell: ({row}) => <DisputeNotification />
    },
    {
        id: 'initiated',
        header: 'Initiated On',
        draggable: true,
        cell: () => '23 Aug, 2023'
    },
    {
        id: 'client',
        header: 'Client',
        draggable: true,
        cell: () => "Client"
    },
    {
        id: 'project',
        header: 'Project',
        draggable: true,
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
        draggable: true,
        cell: () => "SubTask"
    },
    {
        id: 'sales_person',
        header: 'Sales Person',
        draggable: true,
        cell: () => "Sales Person"
    },
    {
        id: 'project_manger',
        header: 'Project Manager',
        draggable: true,
        cell: () => "Project Manager"
    },
    {
        id: 'lead_developer',
        header: 'Lead Developer',
        draggable: true,
        cell: () => "Lead Developer"
    },
    {
        id: 'developer_desiner',
        header: 'Developer/ Designer',
        draggable: true,
        cell: () => "Developer/Designer"
    },
    {
        id: 'dispute_raised_by',
        header: 'Dispute Raised By',
        draggable: true,
        cell: () => "Dispute Raised By"
    },
    {
        id: 'dispute_raised_againest',
        header: 'Dispute Raised Against',
        draggable: true,
        cell: () => "Dispute Raised Against"
    },
    {
        id: 'status',
        header: 'Status',
        draggable: true,
        cell: () => "Status"
    },
    {
        id: 'Winner',
        header: 'Winner',
        draggable: true,
        cell: () => "Winner"
    },
    {
        id: 'resolved_on',
        header: 'Resolved On',
        draggable: true,
        cell: () => "Resolved On"
    },
    {
        id: 'resolved_by',
        header: 'Resolved By',
        draggable: true,
        cell: () => "Resolved By"
    },
    
    {
        id: 'due_date',
        header: 'Due Date',
        draggable: true,
        cell: () => "Due Date"
    },
    {
        id: 'action',
        header: 'Action',
        draggable: false,
        cell: () => <ResolveButton />
    }

]