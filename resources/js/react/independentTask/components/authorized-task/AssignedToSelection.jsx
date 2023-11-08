import { Combobox } from '@headlessui/react'
import * as React from 'react' 
import _  from 'lodash';
import { useUsers } from '../../../hooks/useUsers';
import Loader from '../Loader';
import { User } from '../../../utils/user-details';

const currentUser = new User(window.Laravel.user);

const AssginedToSelection = ({selected, onSelect}) => {
    const [query, setQuery] = React.useState('');
    const {users, usersIsFetching: isFetching} = useUsers();

    const employees = _.filter(users, (user)=>{

         if (_.includes([1, 8, 4], Number(currentUser.roleId))) {
            return _.includes([ 6, 9, 10], Number(user?.role_id));
        } else {
            return false;
        } 
    });

    // console.log(employees);

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
                                {
                                    employee.id === currentUser.id &&
                                    <span className='badge badge-dark ml-2'>It's you</span>
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