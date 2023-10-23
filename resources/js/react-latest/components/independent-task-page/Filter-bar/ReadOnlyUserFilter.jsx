import React from 'react';
import Dropdown from '../../../ui/Dropdown';

const ReadOnlyUserFilter = ({text,title}) => {
  return (
    <div className='sp1_task_filter_item' style={{cursor:'not-allowed'}}>
      <span className='mr-2 f-13 d-flex flex-nowrap'>{title} :</span>
      <Dropdown>
        <Dropdown.Toggle className={`sp1_filter_toggle`}>
          <span style={{cursor:'not-allowed'}}>
            <strong className='text-secondary'>{text}</strong>
          </span>
        </Dropdown.Toggle>
        {/* <Dropdown.Menu /> */}
      </Dropdown>
    </div>
  );
};

export default ReadOnlyUserFilter;