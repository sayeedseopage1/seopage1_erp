import * as React from 'react'
import Dropdown from '../../Insights/ui/Dropdown';
import Tooltip from '../../Insights/ui/Tooltip';
import _ from 'lodash';

const EmployeeFilterOptions = ({data = [], onSelect, selected, loading, setSelectedEmployee}) => {
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


  return (
    <React.Fragment>
        <span>Employee: </span>
        {loading ? (
            <div className="spinner-border" role="status" style={{
                width: '14px',
                height: '14px',
                borderWidth: '1px'
            }}>  </div>
        ) : (
            <Dropdown>
                <Dropdown.Toggle className="sp1__pp_filter_dd_toggle">
                    <Tooltip
                        text={_.startCase(selected?.name)} 
                    >
                        <>
                            {
                                selected?.name ?
                                selected.name?.length > 11 ?
                                    _.startCase(selected?.name?.slice(0, 10)) + '...'
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
    </React.Fragment>
  )
}

export default EmployeeFilterOptions 