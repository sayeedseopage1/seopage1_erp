import React, {useState, useEffect} from 'react'
import { NumberOfTaskTableColumns } from './NumberOfTaskTableColumns';
import { projectElaborationData } from './faker';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './styles.module.css';
import Modal from '../global/Modal';
import Button from '../global/Button';
import DataTable from '../global/data-table/table';
import { useLazyGetRevisionCalculatorTaskWiseDataQuery } from '../services/api/revisionCalculatorApiSlice';


// const data = projectElaborationData(50);

const NumberOfTask = () => {
    const [data, setData] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [nRows, setNRows] = useState(10);
    const navigation = useNavigate();
    const [searchParams] = useSearchParams();

    const pm_id = searchParams.get('pm');
    const start_date = searchParams.get('start_date');
    const end_date = searchParams.get('end_date');
    const filter = {pm_id, start_date, end_date} 
    
    const goBack = ()=> navigation(`/`);

    const [
        getRevisionCalculatorTaskWiseData,
        {isFetching}
    ] = useLazyGetRevisionCalculatorTaskWiseDataQuery();

    
  // fetch data 
  useEffect(() => { 
    ( async () => {
        const queryObject = _.pickBy(filter, Boolean);
        const queryString = new URLSearchParams(queryObject).toString();

        try{
            let res = await getRevisionCalculatorTaskWiseData(`/${pm_id}?${queryString}`).unwrap();
            setData(res);
            console.log({res})

        } catch(err){
            console.log(err)
        }
    })()
  }, [])

  console.log({data})
  
    return (
      <Modal isOpen={true}> 
          <div className="sp1_modal-content-wrapper">
              <div className={`sp1_modal-panel ${styles.modal_panel}`}>
                  {/* header */}
                  <div className={`sp1_modal-head ${styles.modal_title_bar}`}>
                      <div className="sp1_modal-title">Number of Task</div>
                      <Button 
                        onClick={goBack} 
                        aria-label="ModalClose" 
                        variant='tertiary' 
                        className='sp1_modal-close'
                    >
                        <i className='fa-solid fa-xmark'/>
                      </Button>
                  </div>
                  {/* end header */}
  
                  {/* body */}
                  <div className={`sp1_modal-body ${styles.modal_body}`}>
  
                      <DataTable
                          data={data} 
                          margeRow={true}
                          tableName='numberOfTaskTable'
                          columns={NumberOfTaskTableColumns}
                          pageIndex={pageIndex}
                          perPageRow={nRows}
                          onPageChange={(value) => setPageIndex(value)}
                          onPageRowChange={(n) => setNRows(n)} 
                          total={data.length}
                          uniq_id='id'
                          tableClass={styles.table}
                          isLoading={isFetching}
                          groupBy={(data) => _.groupBy(data, d=>d.clientId)}
                          tableContainerClass={styles.tableContainer}
                      />  
  
                  </div>
                  {/* end body */}
              </div>  
          </div>
       </Modal>
    )
}
  

export default NumberOfTask