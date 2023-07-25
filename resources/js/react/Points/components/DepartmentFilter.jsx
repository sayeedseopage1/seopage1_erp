import * as React from 'react'
import Dropdown from '../../Insights/ui/Dropdown';
import Tooltip from '../../Insights/ui/Tooltip';
import _ from 'lodash';

const DepartmentFilter = ({data, onSelect,setSelectedDept, selected, loading, sidebarItem = false}) => {
  
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

  const textLength = sidebarItem ? 33 : 11;
  const splitLength = sidebarItem ? 32 : 10;


  return (
    <div className={ sidebarItem ? `d-flex flex-column w-100 mt-2` : 'd-flex align-items-center'}>
        <span className='mr-2'>Department: </span>
        {loading ? (
            <div className="spinner-border" role="status" style={{
                width: '14px',
                height: '14px',
                borderWidth: '1px'
            }}>  </div>
        ) : (
            <Dropdown>
                <Dropdown.Toggle className={sidebarItem ? 'sp1__pp_filter_dd_toggle py-2 px-2 border w-100' : 'sp1__pp_filter_dd_toggle'}>
                    <Tooltip
                        text={_.startCase(selected?.team_name)} 
                    >
                        <>
                        {
                                selected?.team_name ?
                                selected?.team_name?.length > textLength ?
                                    _.startCase(selected?.team_name?.slice(0, splitLength)) + '...'
                                    : selected?.team_name
                                : ''
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
  )
}

export default DepartmentFilter