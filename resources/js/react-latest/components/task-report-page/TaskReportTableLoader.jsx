import _ from 'lodash';
import React from 'react';
import { Placeholder } from '../../ui/Placeholder';

const TaskReportTableLoader = () => {
  return (
    <React.Fragment>
      {
        _.times(10,(i)=>(
          <tr key={i} className='sp1-data-table-tr'>
            {
              _.times(13,(i)=>(
                <td key={i} className='sp1-data-table-td'>
                  <Placeholder/>
                </td>
              ))
            }

          </tr>
        ))
      }
    </React.Fragment>
  );
};

export default TaskReportTableLoader;