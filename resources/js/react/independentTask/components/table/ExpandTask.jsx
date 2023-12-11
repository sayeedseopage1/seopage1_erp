import React from 'react';
import { useDispatch } from 'react-redux';
import { useLazyGetSubTasksQuery } from '../../../services/api/tasksApiSlice';
import Loader from '../Loader';

import { useIndependentTask } from '../../context/IndependentTaskProvider';


// expend sub task
export const ExpandTask = ({row, table, pageIndex}) => {
    const [loading, setLoading] = React.useState(false);
    const data = row?.original;
    const subtasks = data?.subtasks_count
    const pageIdx = pageIndex;
    const dispatch = useDispatch();
    const [getSubTasks, {isFetching}] = useLazyGetSubTasksQuery();
    const { filter } = table.getState();

    const { getSubtasksByTaskId } = useIndependentTask();

    const handleExpanding = async (e) => {
      setLoading(true);
      if(_.size(data?.subtasks) > 0){
        setLoading(false);
        if (!row.getCanExpand()) return;
        row.toggleExpanded();
      }else{
        await getSubtasksByTaskId({
            taskId: data?.id,
            query: new URLSearchParams(filter).toString()
        });

        setLoading(false);
        row.toggleExpanded();
      }
    }


    return(
      <div style={{paddingLeft: `${row.depth * 2}rem`}}>

        {
          row.parentId === undefined  ?
          <button
                {...{
                  style: {cursor: 'pointer'},
                  onClick: () => Number(subtasks) > 0 ? handleExpanding() : null,
                  className: row.getIsExpanded() ? 'row_expending_btn active' : 'row_expending_btn'
                }}
              >

                {
                  loading ? <Loader title='' /> :
                  <React.Fragment>
                    {row.getIsExpanded() ? <i className="fa-solid fa-chevron-down f-12" /> : <i className="fa-solid fa-chevron-right f-12"></i> }
                      <span className='d-flex align-items-center ml-2' style={{gap: '4px'}}>
                        <i className='fa-solid fa-eye f-16' />
                        <span>{subtasks}</span>
                      </span>
                  </React.Fragment>
                }
              </button> :
            row.getCanExpand() &&
            <button
                {...{
                  style: {cursor: 'pointer'},
                  onClick: () => Number(subtasks) > 0 ? handleExpanding() : null,
                  className: row.getIsExpanded() ? 'row_expending_btn active' : 'row_expending_btn'
                }}
              >
                {
                  !loading && !isFetching  &&
                  <React.Fragment>
                      {row.getIsExpanded() ? <i className="fa-solid fa-chevron-down f-12" /> : <i className="fa-solid fa-chevron-right f-12"></i> }
                      <span className='d-flex align-items-center ml-2' style={{gap: '4px'}}>
                        <i className='fa-solid fa-eye f-16' />
                        <span>{subtasks}</span>
                      </span>
                  </React.Fragment>
                }

                {
                  loading && isFetching && <Loader title='' />
                }

              </button>
        }
      </div>
    )
}
