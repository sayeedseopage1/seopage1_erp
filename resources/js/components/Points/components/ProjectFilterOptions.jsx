import * as React from 'react'
import Dropdown from '../../Insights/ui/Dropdown';
import Tooltip from '../../Insights/ui/Tooltip';
import _ from 'lodash';

const ProjectFilterOptions = ({data,selected, onSelect, loading, sidebarItem = false}) => {


    if(!data.length && !loading) return <span>No shift</span>
    const textLength = sidebarItem ? 33 : 11;
  const splitLength = sidebarItem ? 32 : 10;
 
  return (
    <div className={ sidebarItem ? `d-flex flex-column w-100 mt-2` : 'd-flex align-items-center'}>
        <span className='mr-2'>Project: </span>
        {loading ? (
            <div className="spinner-border" role="status" style={{
                width: '14px',
                height: '14px',
                borderWidth: '1px'
            }}>  </div>
        ) : (
            <Dropdown>
                <Dropdown.Toggle className={sidebarItem ? 'py-2 px-2 border w-100' : 'sp1__pp_filter_dd_toggle'}>
                    <Tooltip
                        text={_.startCase(selected?.project_name)} 
                    >
                        <>
                        {
                                selected?.project_name ?
                                selected?.project_name?.length > textLength ?
                                    _.startCase(selected?.project_name?.slice(0, splitLength)) + '...'
                                    : selected?.project_name
                                : 'All'
                            } 
                        </>
                    </Tooltip>
                </Dropdown.Toggle>

                <Dropdown.Menu className="sp1__pp_filter_dd_menu">
                    {
                        data?.map(dept => (
                            <Dropdown.Item 
                                key={dept.id} 
                                className={selected?.id === dept.id ? "sp1__pp_filter_dd_item active" : "sp1__pp_filter_dd_item"}
                                onClick={e => onSelect && onSelect(e, dept)}
                            >
                                {dept.project_name}
                            </Dropdown.Item>
                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>
        )}
    </div>
  )
}

export default ProjectFilterOptions