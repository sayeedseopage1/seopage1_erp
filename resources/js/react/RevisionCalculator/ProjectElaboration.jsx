import React, {useState} from 'react'
import Modal from '../global/Modal';
import Button from '../global/Button';
import styles from './styles.module.css';
import { projectElaborationData } from './faker';
import DataTable from '../global/data-table/table'; 
import { ProjectElaborationTableColumns } from './ProjectElaborationTableColumns';
import { useNavigate } from 'react-router-dom';

const data = projectElaborationData(50);


const ProjectElaboration = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [nRows, setNRows] = useState(10);
  const navigation = useNavigate(); 
  
  const goBack = ()=> navigation(`/`);

  return (
    <Modal isOpen={true}> 
        <div className="sp1_modal-content-wrapper">
            <div className={`sp1_modal-panel ${styles.modal_panel}`}>
                {/* header */}
                <div className={`sp1_modal-head ${styles.modal_title_bar}`}>
                    <div className="sp1_modal-title">Project Elaboration</div>
                    <Button onClick={goBack} aria-label="ModalClose" variant='tertiary' className='sp1_modal-close'>
                      <i className='fa-solid fa-xmark'/>
                    </Button>
                </div>
                {/* end header */}

                {/* body */}
                <div className={`sp1_modal-body ${styles.modal_body}`}>

                    <DataTable
                        data={data} 
                        margeRow={true}
                        tableName='projectElaboration'
                        columns={ProjectElaborationTableColumns}
                        pageIndex={pageIndex}
                        perPageRow={nRows}
                        onPageChange={(value) => setPageIndex(value)}
                        onPageRowChange={(n) => setNRows(n)} 
                        total={data.length}
                        tableClass={styles.table}
                        groupBy={(data) => _.groupBy(data, d=>d.project_manager.id)}
                        tableContainerClass={styles.tableContainer}
                    />  

                </div>
                {/* end body */}
            </div>  
        </div>
     </Modal>
  )
}

export default ProjectElaboration