import { Combobox } from '@headlessui/react'
import * as React from 'react'
import _  from 'lodash';
import { useUsers } from '../../hooks/useUsers';
import Loader from '../../tasks/components/Loader';
import { useAuth } from '../../hooks/useAuth';
import { User } from '../../utils/user-details';


const AssginedToSelection = ({selected, onSelect, taskCategory}) => {
    const [query, setQuery] = React.useState('');
    const {users, usersIsFetching: isFetching} = useUsers();
    const auth = useAuth(); 

    const filterUser = (user, roles) => { 
        const _user = new User(user);
        if(typeof roles === "number"){ 
            return _user.isHasRolePermission(roles);
        }else if(_.isArray(roles)){ 
            return _.map(roles, role => _user.isHasRolePermission(role));
        }
    }

    let employees = [] ; 
    if(taskCategory && taskCategory.id === 5){
        employees = _.filter(users, user => filterUser(user, 13))
    }else if(taskCategory && taskCategory.id === 7){
        employees = _.filter(users, user => filterUser(user, 13) )
    }else{
        employees = _.filter(users, user => filterUser(user, 6) || Number(user?.id) === auth.getId() )
    }

    const filteredData =
    query === ''
        ? employees
        : employees?.filter((employee) => {
            return employee?.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox  value={selected} onChange={onSelect}>
        <div className="form-group position-relative my-3">
            <label htmlFor="">Assigned To <sup>*</sup></label>
            <Combobox.Button className="d-flex align-items-center w-100 sp1-selection-display-button">
                <Combobox.Input
                    onChange={e => setQuery(e.target.value)}
                    placeholder='--'
                    displayValue={(value) => value?.name || ''}
                    className="form-control height-35 f-14 sp1-selection-display w-100"
                />
                <div className='__icon'>
                    <i className="fa-solid fa-sort"></i>
                </div>
            </Combobox.Button>

            <Combobox.Options className="sp1-select-options">

                {isFetching && (
                    <div className='sp1-select-option-nodata'>
                        <Loader />
                    </div>
                )}

                {filteredData?.length===0 ?
                    <div className='sp1-select-option-nodata'>
                         Nothing found.
                    </div>
                :filteredData?.map((employee) => (
                <Combobox.Option
                    key={employee?.id}
                    className={({ active }) =>  `sp1-select-option ${ active ? 'active' : ''}`}
                    value={employee}
                >
                    {({ selected }) => (
                        <div className="d-flex align-items-center" style={{gap: '10px'}}>
                            <div
                                className="rounded-circle"
                                style={{
                                    width: '28px',
                                    height: '28px',
                                    overflow: 'hidden',
                                }}
                            >
                                <img
                                    src={employee?.image_url}
                                    alt={employee?.name}
                                    width={100}
                                    height={100}
                                    className="rounded-circle"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'fill'
                                    }}
                                />
                            </div>
                            <span
                                className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                                }`}
                            >
                                <span className='mr-2'>{employee?.name}</span>
                                {
                                    employee?.developer_status === 1 ?
                                    <span className='badge badge-warning'>Working...</span> :
                                    <span className='badge badge-primary'>Open to Work</span>
                                }


                            </span>
                            {selected ? (
                                <span className="ml-auto">
                                    <i className="fa-solid fa-check"></i>
                                </span>
                            ) : null}
                        </div>
                    )}
                </Combobox.Option>
            ))}
            </Combobox.Options>
        </div>
    </Combobox >
  )
}

export default AssginedToSelection
