import * as React from 'react';
import ResolveButton from "./ResolveButton"
import DisputeNotificationBadge from './DisputeNotificationBadge';
import dayjs from 'dayjs';
import Avatar from '../../global/Avatar';
import _ from 'lodash';
import AnsQuestion from './AnsQuestion';
import { User } from '../../utils/user-details';



export const disputeTableColumn = [
    {
        id: 'id',
        header: 'Dispute No.',
        draggable: false,
        accessorKey: '',
        cell: ({row, table}) => <DisputeNotificationBadge row={row} table={table} />
    },
    {
        id: 'initiated',
        header: 'Initiated On',
        draggable: true,
        accessorFn: (row) => `${row.dispute_created_at ? dayjs(row.dispute_created_at).format('MMM DD, YYYY') : ''}`,
        cell: ({row}) => {
            const data = row.original;
            if(data?.dispute_created_at){
                return <>
                    <span style={{whiteSpace:'nowrap'}}>{dayjs(data.dispute_created_at).format('MMM DD, YYYY')}</span> <br/>
                    <span>{dayjs(data.dispute_created_at).format('hh:mm a')}</span>
                </>
            }else return '--'
        }
    },
    {
        id: 'client',
        header: 'Client',
        draggable: true,
        accessorFn: (row) => `${row.client.id}${row.client.name}`,
        cell: ({row}) => {
            const data = row.original; 
            const client = data?.client;
            return (
                <div className='person_rander'>
                        <Avatar
                            src={client?.image ? `/user-uploads/avatar/${client?.image}` : null}
                            alt={client?.name}
                            name={client?.name}
                            type='circle'
                            width={24}
                            height={24}
                        />
                    <a hrev={`account/clients/${client?.id}`}>{client?.name}</a>
                </div> 
            )
        }
    },
    {
        id: 'project',
        header: 'Project',
        draggable: true,
        accessorFn: (row) => `${row.project_id}${row.project_name}`,
        cell: ({row}) => {
            const data = row.original;
            return(
                <abbr title={data?.project_name}>
                    <a href={`/account/projects/${data?.project_id}`} className='multine-ellipsis'> {data.project_name} </a>
                </abbr>
            )
        }
    },
    {
        id: 'task',
        header: 'Task',
        draggable: true,
        cell: ({row}) => {
            const data = row.original;
            const task = data?.task?.parent_task ?? data.task; 
            return(
                <a href={`/account/tasks/${task?.id}`}>{task?.title}</a>
            )
        }
    },
    {
        id: 'subtask',
        header: 'Sub Task',
        draggable: true,
        cell: ({row}) => {
            const data = row.original;
            const task = data.task; 
            return(
                <a href={`/account/tasks/${task?.id}`}>{task.title}</a>
            )
        }
    },
    {
        id: 'sales_person',
        header: 'Sales Person',
        draggable: true,
        accessorFn: (row) => `${row?.sales_person?.id}${row?.sales_person?.name}`,
        cell: ({row}) => {
            const data = row.original; 
            const salesPerson = data?.sales_person;
            return (
                <div  className='person_rander'>
                    <Avatar
                        src={salesPerson?.image ? `/user-uploads/avatar/${salesPerson?.image}` : null} 
                        alt={salesPerson?.name}
                        name={salesPerson?.name}
                        type='circle'
                        width={24}
                        height={24}
                    />
                    <a href={`/account/employees/${salesPerson?.id}`}>{salesPerson?.name}</a>
                </div>
            )
        }
    },
    {
        id: 'project_manger',
        header: 'Project Manager',
        draggable: true,
        accessorFn: (row) => `${row?.project_manager?.id}${row?.project_manager?.name}`,
        cell: ({row}) => {
            const data = row.original; 
            const project_manager = data?.project_manager;
            return (
                <div className='person_rander'>
                    <Avatar
                        src={project_manager?.image ? `/user-uploads/avatar/${project_manager?.image}`: null}
                        alt={project_manager?.name}
                        name={project_manager?.name}
                        type='circle'
                        width={24}
                        height={24}
                    />
                    <a href={`/account/clinets/${project_manager?.id}`}>{project_manager?.name}</a>
                </div>
            )
        }
    },
    {
        id: 'lead_developer',
        header: 'Lead Developer',
        draggable: true,
        accessorFn: (row) => `${row?.task?.lead_developer?.id}${row?.task?.lead_developer?.name}`,
        cell: ({row}) => {
            const data = row.original; 
            const lead_developer = data?.task?.lead_developer;

            if(!lead_developer) return <span> --</span>

            return (
                <div className='person_rander'>
                    <Avatar
                        src={lead_developer?.image ? `/user-uploads/avatar/${lead_developer?.image}`: null}
                        alt={lead_developer?.name}
                        name={lead_developer?.name}
                        type='circle'
                        width={24}
                        height={24}
                    />
                    <a href={`/account/employees/${lead_developer?.id}`}>{lead_developer?.name}</a>
                </div>
            )
        }
    },
    {
        id: 'developer_desiner',
        header: 'Developer/ Designer',
        draggable: true,
        accessorFn: (row) => `${row?.task?.developer?.id}${row?.task?.developer?.name}`,
        cell: ({row}) => {
            const data = row.original; 
            const developer = data?.task?.developer;
            return (
               developer ? 
               <div className='person_rander'>
                    <Avatar
                        src={developer?.image ? `/user-uploads/avatar/${developer?.image}` : null}
                        alt={developer?.name}
                        name={developer?.name}
                        type='circle'
                        width={24}
                        height={24}
                    />
                    <a href={`/account/employees/${developer?.id}`}>{developer?.name}</a>
                </div>
                : '--' 
            )
        }
    },
    {
        id: 'dispute_raised_by',
        header: 'Dispute Raised By',
        draggable: true,
        accessorFn: (row) => `${row?.raised_by?.id}${row?.raised_by?.name}`,
        cell: ({row}) => {
            const data = row.original; 
            const raised_by = data?.raised_by;
            return (
                <div className='person_rander'>
                    <Avatar
                        src={raised_by?.image ? `/user-uploads/avatar/${raised_by?.image}`: null}
                        alt={raised_by?.name}
                        name={raised_by?.name}
                        type='circle'
                        width={24}
                        height={24}
                    />
                    <a href={`/account/employees/${raised_by?.id}`}>{raised_by?.name}</a>
                </div>
            )
        }
    },
    {
        id: 'dispute_raised_againest',
        header: 'Dispute Raised Against',
        draggable: true,
        accessorFn: (row) => `${row?.raised_against?.id}${row?.raised_against?.name}`,
        cell: ({row}) => {
            const data = row.original; 
            const raised_against = data?.raised_against;
            return (
                <div className='person_rander'>
                    <Avatar
                        src={raised_against?.image ? `/user-uploads/avatar/${raised_against?.image}`: null}
                        alt={raised_against?.name}
                        name={raised_against?.name}
                        type='circle'
                        width={24}
                        height={24}
                    />
                    <a href={`/account/${data?.dispute_between === 'CRP' ? 'clients' : 'employees'}/${raised_against.id}`}>{raised_against?.name}</a>
                </div>
            )
        }
    }, 
    {
        id: 'status',
        header: 'Status',
        draggable: true,
        cell: ({row}) => {
            const data = row.original;
            if(data?.status){
               return <span className='badge badge-success font-weight-bold f-12'> Resolved </span>
            }else return <span className='badge badge-warning font-weight-bold text-white f-12'> Pending </span>
        } 
    },
    {
        id: 'Winner',
        header: 'Winner',
        draggable: true,
        accessorFn: (row) => `${row?.winner?.id}`,
        cell: ({row}) => {
            const data = row.original; 
            const winner = data?.winner;

            if(data?.status && !winner) return <span className='badge badge-warning font-weight-bold text-white f-12'> Partially Responsible </span>; 
            if(!winner) return <span className='badge badge-warning font-weight-bold text-white f-12'> No Decision Yet </span>;
            return (
                <div className='person_rander'>
                    <Avatar
                        src={winner?.image ? `/user-uploads/avatar/${winner?.image}`: null}
                        alt={winner?.name}
                        name={winner?.name}
                        type='circle'
                        width={24}
                        height={24}
                    />
                    <a href={`/account/${data?.dispute_between === 'CRP' ? 'clients' : 'employees'}/${winner.id}`}>{winner?.name}</a>
                </div>
            )
        }
    },
    {
        id: 'resolved_on',
        header: 'Resolved On',
        draggable: true,
        accessorFn: (row) => `${row.resolved_on ? dayjs(row.resolved_on).format('MMM DD, YYYY') : ''}`,
        cell: ({row}) => {
            const data = row.original;
            const resolved_by = data?.resolved_by; 
            const unsolvedQuestion = _.size(_.filter(data.conversations, conv => !conv.replies ? true : false)) 
            
            if(!resolved_by){
                if( unsolvedQuestion > 0){
                    return <span className='badge badge-primary font-weight-bold f-12'> In Progress </span>;
                }else if(data?.need_authrization){
                    return <span className='badge badge-primary font-weight-bold f-12'> Awaiting Authorization </span>;
                }else { 
                    return <span className='badge badge-light font-weight-bold f-12'> No Activity Yet </span>;
                } 
            }


            if(data?.resolved_on){
                return <>
                    <span style={{whiteSpace:'nowrap'}}>{dayjs(data.resolved_on).format('MMM DD, YYYY')}</span> <br/>
                    <span>{dayjs(data.resolved_on).format('hh:mm a')}</span>
                </>
            }
        }
    },
    {
        id: 'resolved_by',
        header: 'Resolved By',
        draggable: true,
        accessorFn: (row) => `${row?.resolved_by?.id}`,
        cell: ({row}) => {
            const data = row.original; 
            const resolved_by = data?.resolved_by; 
            const unsolvedQuestion = _.size(_.filter(data.conversations, conv => !conv.replies ? true : false)) 
            
            if(!resolved_by){
                if( unsolvedQuestion > 0){
                    return <span className='badge badge-primary font-weight-bold f-12'> In Progress </span>;
                }else if(data?.need_authrization){
                    return <span className='badge badge-primary font-weight-bold f-12'> Awaiting Authorization </span>;
                }else { 
                    return <span className='badge badge-light font-weight-bold f-12'> No Activity Yet </span>;
                } 
            }


            return (
                <div className='person_rander'>
                    <Avatar
                        src={resolved_by?.image ? `/user-uploads/avatar/${resolved_by?.image}`: null}
                        alt={resolved_by?.name}
                        name={resolved_by?.name}
                        type='circle'
                        width={24}
                        height={24}
                    />
                    <a href={`/account/employees/${resolved_by.id}`}>{resolved_by?.name}</a> 
                </div>
            )
        }
    },
    
    {
        id: 'due_date',
        header: 'Due Date',
        draggable: true,
        accessorFn: (row) => `${row.due_date ? dayjs(row.due_date).format('MMM DD, YYYY') : ''}`,
        cell: ({row}) => {
            const data = row.original;
            if(data?.due_date){
                return <>
                    <span style={{whiteSpace:'nowrap'}}>{dayjs(data.due_date).format('MMM DD, YYYY')}</span> <br/>
                    <span>{dayjs(data.due_date).format('hh:mm a')}</span>
                </>
            }else return '--'
        }
    }, 
    {
        id: 'action',
        header: 'Action',
        draggable: false,
        cell: ({row, table}) => {
            const data = row.original; 
            const status = row.status;
            const unsolvedQuestion = _.size(_.filter(data.conversations, conv => !conv.replies ? true : false))
             
            return(
                <div>
                    <ResolveButton row={row.original} table={table} /> 
                </div>
            )
        }
    } 
]