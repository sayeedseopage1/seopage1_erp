import * as React from 'react'
import Dropdown from '../../Insights/ui/Dropdown';
import Tooltip from '../../Insights/ui/Tooltip';
import _ from 'lodash';

const DepartmentFilter = ({data, onSelect,setSelectedDept, selected, loading }) => {
  
  React.useEffect(() => {
    data && setSelectedDept(data[0]);
  }, [data])


  const handleSelection = (e, dept) => {
    e.preventDefault();
    setSelectedDept(dept);
    if(onSelect !== undefined) {
        onSelect(dept)
    }
  }
 

  return (
    <div className="d-flex align-items-center px-3 py-2">
        <div className='d-flex align-items-center'>
            <span className='mr-2'>Department: </span>
            {loading ? (
                <div className="spinner-border" role="status" style={{
                    width: '14px',
                    height: '14px',
                    borderWidth: '1px'
                }}>  </div>
            ) : (
                <Dropdown>
                    <Dropdown.Toggle className='sp1__pp_filter_dd_toggle'>
                        <Tooltip
                            text={_.startCase(selected?.team_name)} 
                        >
                            <>
                                {
                                    selected?.team_name
                                } 
                            </>
                        </Tooltip>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {
                            data?.map(dept => (
                                <Dropdown.Item 
                                    key={dept.id} 
                                    className={selected?.id === dept.id ? "sp1__pp_filter_dd_item active" : "sp1__pp_filter_dd_item"}
                                    onClick={e => handleSelection(e, dept)}
                                >
                                    {dept.team_name}
                                </Dropdown.Item>
                            ))
                        }
                    </Dropdown.Menu>
                </Dropdown>
            )}
        </div>
    </div>
  )
}

export default DepartmentFilter