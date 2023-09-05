import React, {useState, useEffect, useContext} from "react";
import Tabbar from "../components/Tabbar"; 
import TasksTable from "../components/TasksTable";
import FilterContainer from "../components/Filter-bar/FilterContainer";
import Filterbar from "../components/Filter-bar/Filterbar";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetTasksQuery } from "../../services/api/tasksApiSlice";
import { storeTasks } from "../../services/features/tasksSlice";
import _ from "lodash";
import SearchBox from "../components/Searchbox";
import { TaskTableColumns } from "../components/TaskTableColumns";
import Button from "../components/Button";
import Modal from "../components/Modal";

const Tasks = () => {
    const {tasks} = useSelector(s => s.tasks)
    const dispatch = useDispatch(); 
    const [getTasks, {isFetching}] = useLazyGetTasksQuery();
    const [filter, setFilter] = React.useState(null);
    const [search,setSearch] = React.useState('');
    const [showAuthorizationModal, setShowAuthorizationModal] = React.useState(false);
   

    const onFilter = (filter) => {
        const queryObject = _.pickBy(filter, Boolean);
        const queryString = new URLSearchParams(queryObject).toString();
        setFilter(queryObject);

        if(filter?.start_date && filter?.end_date){
            getTasks(`?${queryString}`)
            .unwrap()
            .then(res => {
                const data = _.orderBy(res?.tasks, 'due_date', 'desc');
                dispatch(storeTasks({tasks: data}))
            })
            .catch(err => console.log(err))
        }
    }


    const close = () => setShowAuthorizationModal(false);


    return (
        <React.Fragment>
            <FilterContainer>
                <Filterbar onFilter={onFilter} /> 
            </FilterContainer>

            <div className="sp1_tlr_container"> 
                <div className="sp1_tlr_tbl_container">
                    <div className="mb-3 d-flex align-items-center flex-wrap justify-content-between">
                        <Tabbar/>

                        <Button 
                            onClick={() => setShowAuthorizationModal(true)}
                            className="sp1_tlr_tab active mr-auto ml-2 mb-2 text-white"
                        > 
                           Authorize 
                        </Button> 
                        
                        <div className="mb-2" style={{maxWidth: '300px'}}>
                            <SearchBox value={search} onChange={setSearch} />
                        </div>
                    </div>
                     
                    <TasksTable 
                        isLoading={isFetching} 
                        filter={filter} 
                        tableName="tasksTable"
                        search={search}
                        reportPermission={[5, 1, 8]}
                        tableColumns={TaskTableColumns}
                    />
                </div>
            </div>


            <Modal isOpen={showAuthorizationModal}> 
                    <div className="sp1_modal-content-wrapper">
                        <div className="sp1_modal-panel sp1_task_auth_modal ">
                            {/* header */}
                            <div className="sp1_modal-head">
                                <div className="sp1_modal-title pl-2"><strong>Primary Page Development</strong></div>
                                <Button onClick={close} aria-label="ModalClose" variant='tertiary' className='sp1_modal-close'>
                                    <i className='fa-solid fa-xmark'/>
                                </Button>
                            </div>
                            {/* end header */}

                            {/* body */}
                            <div className="sp1_modal-body p-3">
                                <ul className="sp1_modal_items px-3">
                                  <li><b>Page name: </b> page name here...</li>  
                                  <li><b>Page URL: </b> page name here...</li>  
                                  <li><b>Task: </b> Home Page Design</li>  
                                  <li><b>Sub-Task: </b> Home Page Design</li>  
                                  <li><b> Assigned By: </b> Moniruzzaman</li>  
                                  <li><b> Assigned To: </b> Md. Mahfuz Khan</li>  
                                  <li><b> Project: </b> Build website</li>  
                                  <li><b> Client: </b> Jonathan R.</li>  
                                </ul>   


                                <div className="w-100 mt-3">
                                    <div className="w-fit d-flex align-items-center ml-auto" style={{gap: '10px'}}>
                                        <Button variant="success" className="ml-auto">Authorize</Button>
                                        <Button variant="danger">Deny</Button>
                                    </div>
                                </div>            
                            </div>
                            {/* end body */}
                        </div>  
                    </div>
                </Modal>
        </React.Fragment> 
    );
};

export default Tasks;
