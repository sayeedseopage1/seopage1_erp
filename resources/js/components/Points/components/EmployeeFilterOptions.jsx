import * as React from 'react'
import Dropdown from '../../Insights/ui/Dropdown';
import Tooltip from '../../Insights/ui/Tooltip';
import _ from 'lodash';

const EmployeeFilterOptions = ({data = [],  sidebarItem=false, onSelect, selected, loading, setSelectedEmployee}) => {
//   const [selected, setSelected] = React.useState(null);

    const _data = React.useMemo(() => data, [data]) 
  
  React.useEffect(() => {
    if(_data.length > 0){
        setSelectedEmployee(data[0])
    }

    if(!_data.length && !loading) setSelectedEmployee(null)
  }, [loading, _data])


  const handleSelection = (e, dept) => {
    e.preventDefault();
    if(onSelect !== undefined) {
        onSelect(dept)
        setSelectedEmployee(dept)
    }
  }

  if(!data.length && !loading) return <span>No Employee</span>

  const textLength = sidebarItem ? 33 : 11;
  const splitLength = sidebarItem ? 32 : 10;


  return (
    
    <div className={ sidebarItem ? `d-flex flex-column w-100 mt-2` : 'd-flex align-items-center'}>
        <span className='mr-2'>Employee: </span>
        {loading ? (
            <div className="spinner-border" role="status" style={{
                width: '14px',
                height: '14px',
                borderWidth: '1px'
            }}>  </div>
        ) : (
            <Dropdown>
                 <Dropdown.Toggle 
                    className={sidebarItem ? 'sp1__pp_filter_dd_toggle py-2 px-2 border w-100' : 'sp1__pp_filter_dd_toggle'}
                >
                    <Tooltip
                        text={_.startCase(selected?.name)} 
                    >
                        <>
                            {
                                selected?.name ?
                                selected.name?.length > textLength ?
                                    _.startCase(selected?.name?.slice(0, splitLength)) + '...'
                                    : selected.name
                                : ''
                            } 
                        </>
                    </Tooltip>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {
                        data?.map(em=> (
                            <Dropdown.Item 
                                key={em?.id} 
                                className={selected?.id === em.id ? "sp1__pp_filter_dd_item active" : "sp1__pp_filter_dd_item"}
                                onClick={e => handleSelection(e, em)}
                            >
                                {em.name}
                            </Dropdown.Item>
                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>
        )}
    </div>
  )
}

export default EmployeeFilterOptions 