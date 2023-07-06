import React, { useState, useEffect } from 'react'
import CKEditorComponent from '../../../../../ckeditor'  
import Button from '../../../../components/Button';
import { Listbox } from '@headlessui/react';
import { HiOutlineSelector } from 'react-icons/hi';
import { User } from '../../../../../utils/user-details';
import { useGetAllProjectsOptionsQuery } from '../../../../../services/api/FilterBarOptionsApiSlice';
import SearchBox from '../../../../components/Searchbox';
import _ from 'lodash';
import { useUsers } from '../../../../../hooks/useUsers';

const OptionFour = ({id, onChecked, checked}) =>  {
  const [responsiblePerson, setResponsiblePerson] = useState(null);
  const [project, setProject] = useState(null);
  const [activeResponsiblePersonDropdown, setActiveResponsiblePersonDropdown] = useState(false);
  const [activeProjectDropdown, setActiveProjectDropdown] = useState(false);

  const [projectQuery, setProjectQuery] = useState('');


  const loggedUser = new User(window?.Laravel?.user); 
  const {users} = useUsers();
  const {data: projects, isFetching: projectFetching} = useGetAllProjectsOptionsQuery('');
  
  
  useEffect(() => {
    window.$('#timepicker1').timepicker();
    window.$('#timepicker2').timepicker();
  },[checked])


  const handleOnChange = e => {  
      if(e.target.checked){
          onChecked(id);
      }else onChecked(null)
  } 



  // handle responsible person
  const handleResponsiblePersonMySelf = () => {
    setResponsiblePerson({
      id: loggedUser?.id,
      name: loggedUser?.name,
      image_url: loggedUser?.getAvatar()
    })

    setActiveResponsiblePersonDropdown(false)
  }


  return (
    <>
        <div className='--option-item'>
            <div className='d-flex align-items-center' style={{gap: '10px'}}>
                <input 
                    type='checkbox'  
                    style={{cursor: 'pointer'}}
                    checked={checked}
                    onChange={handleOnChange} 
                />
                I Can't Log Hours
            </div>

            {
              checked && (
                      <div className='pl-3 my-3 bg-white'> 
                          <div className='mt-3'>
                              <div className='mb-2 font-weight-bold'>Explain the reason here</div>  
                              <div className='ck-editor-holder stop-timer-options'>
                                  <CKEditorComponent />
                              </div>  
                          </div>

                          <div className='mt-3'>
                            <div className='mb-2 font-weight-bold'>Select Responsible person</div>  
                            <div className='d-flex align-items-center w-100' style={{gap: '10px'}}>
                                <label htmlFor='due-to-myself' >
                                  <input type='radio' id='due-to-myself' value="Due To MySelf" name='responsive-person' onChange={handleResponsiblePersonMySelf} /> Due To MySelf
                                </label>

                                <label htmlFor='due-to-another-person' >
                                  <input 
                                    type='radio' 
                                    id='due-to-another-person' 
                                    value="Due To Another Person" 
                                    name='responsive-person' 
                                    onChange={(e) =>  {
                                      setActiveResponsiblePersonDropdown(e.target.checked)
                                      setResponsiblePerson(null)
                                    }} 
                                  /> Due To Another Person
                                </label>  
                            </div>
                          </div>

                          {
                            activeResponsiblePersonDropdown && (
                              <div className='position-relative w-100 mb-3'>
                                  <Listbox 
                                      value={responsiblePerson} 
                                      onChange={setResponsiblePerson} 
                                  >
                                      <Listbox.Button className="position-relative w-100 bg-white py-2 pl-2 pr-1 border d-flex align-items-center justify-content-between">
                                          <span>{responsiblePerson?.name || '--'}</span>
                                          <HiOutlineSelector />
                                      </Listbox.Button>

                                      <Listbox.Options 
                                        className="position-absolute bg-white p-2 shadow w-100" 
                                        style={{
                                          zIndex: '1',
                                          maxHeight: '350px',
                                          overflowY: 'auto'
                                        }}
                                      >
                                          {users?.map((user)=>(
                                              <UserList key={user.id} user = {user} />
                                          )) }
                                      </Listbox.Options>
                                  </Listbox>
                              </div>
                            )
                          }


                          {/* Related To Any Project */}
                          <div className='mt-3'>
                            <div className='mb-2 font-weight-bold'>Was This Related To Any Project?</div>  
                            <div className='d-flex align-items-center w-100' style={{gap: '10px'}}>
                                <label htmlFor='yes' >
                                  <input 
                                    type='radio' 
                                    id='yes' 
                                    value="Yes" 
                                    name='relative-project' 
                                    onChange={(e) =>  {
                                      setActiveProjectDropdown(e.target.checked) 
                                    }} 
                                  /> Yes
                                </label>

                                <label htmlFor='no' >
                                  <input 
                                    type='radio' 
                                    id='no' 
                                    value="No" 
                                    name='relative-project' 
                                    onChange={(e) =>  {
                                      setActiveProjectDropdown(false) 
                                    }} 
                                  /> No
                                </label>  
                            </div>
                          </div> 

                          {
                            activeProjectDropdown && (
                              <div className='position-relative w-100 mb-3'>
                                  <Listbox 
                                      value={project} 
                                      onChange={setProject} 
                                  >
                                      <Listbox.Button className="position-relative w-100 bg-white py-2 pl-2 pr-1 border d-flex align-items-center justify-content-between">
                                          <span>{project?.project_name || '--'}</span>
                                          <HiOutlineSelector />
                                      </Listbox.Button>

                                      <Listbox.Options 
                                        className="position-absolute bg-white p-2 shadow w-100" 
                                        style={{zIndex: '1', maxHeight: '350px', overflowY: 'auto'}}
                                      >
                                          <SearchBox value={projectQuery} onChange={setProjectQuery} />
                                          {projects?.filter(p => _.lowerCase(p.projectj_name).includes(_.lowerCase(projectQuery)))?.map((project)=>(
                                              <Listbox.Option
                                                  key={project.id}
                                                  value={project}
                                                  tabIndex={-1}
                                                  className={
                                                    ({selected, active}) => selected ? 'task-selection-list-option selected': active ? 'task-selection-list-option active': 'task-selection-list-option'}
                                              >
                                                  {project.project_name}
                                              </Listbox.Option> 
                                          )) }
                                      </Listbox.Options>
                                  </Listbox>
                              </div>
                            )
                          }
                          {/* Related To Any Project */}

                          


                          <div className="row">
                              <div className="col-6 input-group bootstrap-timepicker timepicker d-flex flex-column">
                                  <label htmlFor="" className='d-block'> From: </label>
                                  <input 
                                      id="timepicker1" 
                                      className="form-control w-100 py-2" 
                                      data-minute-step="1" 
                                      data-modal-backdrop="false" 
                                      type="text"
                                  /> 
                              </div>  
                              <div className="col-6 input-group bootstrap-timepicker timepicker d-flex flex-column">
                                  <label htmlFor="" className='d-block'> To: </label>
                                  <input 
                                      id="timepicker2" 
                                      className="form-control w-100 py-2" 
                                      data-minute-step="1" 
                                      data-modal-backdrop="false" 
                                      type="text"
                                  /> 
                              </div>  
                          </div>

                          <div className='mt-3 d-flex align-items-center'>
                              <Button className='ml-auto'> Submit </Button>
                          </div>
                      </div>
              )
            }
        </div>
    </>
  )
}

export default OptionFour 



const UserList = (props) => {
  const user = new User(props.user);

  if(!user?.getRoleId()) return null;
  return(
      <Listbox.Option 
          value={user}
          className={({selected, active}) => selected ? 'task-selection-list-option selected': active ? 'task-selection-list-option active': 'task-selection-list-option'}
      >
        {user?.name}
      </Listbox.Option> 
  )
}