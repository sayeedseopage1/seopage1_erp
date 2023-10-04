import ResolveActionBtn from "./ResolveActionBtn";
import Popover from '../../ui/Popover'

export const TaskReportDataTableColumn = [
    {
        id: 'report_no',
        header: 'Report No.',
        className: '',
        draggable:true,
        group: false,
        sorted: false,
        cell: ({row:{original},className}) => {
          return <div className={`${className}`} style={{minWidth:'4rem'}}>
              {original?.report_no}
          </div>
        } 
    },
    {
        id: 'report_date',
        header: 'Report Date',
        className: '',
        draggable:true,
        group: false,
        sorted: false,
        sortAccessor: 'report_date',
        cell: ({row:{original},className}) => {
          return <div className={`${className}`} style={{minWidth:'5rem'}}>
              {original?.report_date}
          </div>
        }
    },
    {
        id: 'resolve_on',
        header: 'Resolve On',
        className: '',
        draggable:true,
        group: false,
        sorted: false,
        sortAccessor: 'resolve_on',
        cell: ({row:{original},className}) => {
          return <div className={`${className}`} style={{minWidth:'5rem'}}>
              {original?.resolve_on}
          </div>
        }
    },
    {
        id: 'client',
        header: 'Client',
        className: '',
        draggable:true,
        group: false,
        sorted: false,
        sortAccessor: 'client',
        cell: ({row:{original},className}) => {
          return <div className={`${className}`} style={{minWidth:'5rem'}}>
              {original?.client}
          </div>
        } 
    },
    {
        id: 'project',
        header: 'Project',
        className: '',
        sorted: true,
        draggable:true,
        group: false,
        sortAccessor: '', 
        cell: ({row:{original},className}) => {
          return <div className={`${className}`} style={{minWidth:'5rem'}}>
              {original?.project}
          </div>
        }
        
    },
    {
        id: 'task',
        header: 'Task',
        className: '',
        sorted: false,
        draggable:true,
        group: false,
        cell: ({row:{original},className}) => {
          return <div className={`${className}`} style={{minWidth:'5rem'}}>
              {original?.task}
          </div>
        }
    },
    {
        id: 'report_issuer',
        header: 'Report Issuer',
        className: '',
        sorted: false,
        draggable:true,
        group: false,
        cell: ({row:{original},className}) => {
          return <div className={`${className}`} style={{minWidth:'5rem'}}>
              {original?.report_issuer}
          </div>
        }
    },
    {
        id: 'accountable_individual',
        header: 'Accountable Individual',
        className: '',
        sorted: false,
        draggable:true,
        group: false,
        cell: ({row:{original},className}) => {
          return <div className={`${className}`} style={{minWidth:'5rem'}}>
              {original?.accountable_individual}
          </div>
        }
    },
    {
        id: 'report_task_name',
        header: 'Report Task Name',
        className: '',
        sorted: false,
        draggable:true,
        group: false,
        cell: ({row:{original},className}) => {
          return <div className={`${className}`} style={{minWidth:'5rem'}}>
              {original?.report_task_name}
          </div>
        }
    },
    {
        id: 'report_reason',
        header: 'Report Reason',
        className: '',
        sorted: false,
        draggable:true,
        group: false,
        cell: ({row:{original},className}) => {

          return(
            <div style={{minWidth:'10rem'}}>
              <Popover>
                    <Popover.Button>
                        <span className='font-weight-bold singleline-ellipsis'>{original?.report_reason}</span>
                    </Popover.Button>

                    <Popover.Panel>
                        <div className='revision_popover_panel'>
                        {original?.report_reason}
                        </div>
                    </Popover.Panel>
              </Popover>
            </div>
          )
        }
    },
    {
        id: 'report_reason_details',
        header: 'Report Reason Details',
        className: '',
        sorted: false,
        draggable:true,
        group: false,
        cell: ({row:{original},className}) => {
          return(
            <div style={{minWidth:'10rem'}}>
              <Popover>
                    <Popover.Button>
                        <span className='font-weight-bold singleline-ellipsis'>{original?.report_reason_details}</span>
                    </Popover.Button>

                    <Popover.Panel>
                        <div className='revision_popover_panel'>
                        {original?.report_reason_details}
                        </div>
                    </Popover.Panel>
              </Popover>
            </div>
          )
        }
    },
    {
        id: 'previously_reported',
        header: 'Previously Reported',
        className: '',
        sorted: false,
        draggable:true,
        group: false,
        cell: ({row:{original},className}) => {
          return <div className={`${className}`} style={{minWidth:'5rem'}}>
              {original?.previously_reported}
          </div>
        }
    },
    {
        id: 'action',
        header: 'Action',
        className: '',
        sorted: false,
        draggable:true,
        group: false,
        cell: ({row:{original},className}) => {
          return <div className={`${className}`} style={{minWidth:'5rem'}}>
              <ResolveActionBtn data={original}/>
          </div>
        }
    },
]