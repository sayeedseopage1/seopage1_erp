import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../global/Button';
import Modal from '../../global/Modal';
import DataTable from '../../global/data-table/table';
import { useLazyGetPendingRevisionDataQuery } from '../../services/api/revisionCalculatorApiSlice';
import styles from '../styles.module.css';
import { PendingRevisionColumns } from './columns';


// const data = projectElaborationData(50);

const PendingRevisionTable = () => {
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
        getPendingRevisionData,
        {isFetching}
    ] = useLazyGetPendingRevisionDataQuery();


  // fetch data
  useEffect(() => {
    ( async () => {
        const queryObject = _.pickBy(filter, Boolean);
        const queryString = new URLSearchParams(queryObject).toString();

        try{
            let res = await getPendingRevisionData(`/${pm_id}?${queryString}`).unwrap();
            const arr = [];
            _.forEach(res?.pending_issues, d => {
                arr.push({
                    ...d,
                    uid: Math.random().toString(36).substr(2, 5)
                })
            })
            setData(arr);

        } catch(err){
            console.log(err)
        }
    })()
  }, [])



    return (
      <Modal isOpen={true}>
          <div className="sp1_modal-content-wrapper">
              <div className={`sp1_modal-panel ${styles.modal_panel}`}>
                  {/* header */}
                  <div className={`sp1_modal-head ${styles.modal_title_bar}`}>
                      <div className="sp1_modal-title pl-2">Rev. Accept/Deny Pending</div>
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
                          tableName='devIssuesTableTable'
                          columns={PendingRevisionColumns}
                          pageIndex={pageIndex}
                          perPageRow={nRows}
                          onPageChange={(value) => setPageIndex(value)}
                          onPageRowChange={(n) => setNRows(n)}
                          total={data.length}
                          isLoading={isFetching}
                          uniq_id='uid'
                          tableClass={styles.table}
                          groupBy={(data) => _.groupBy(data, d=>d.projectId)}
                          tableContainerClass={styles.tableContainer}
                      />

                  </div>
                  {/* end body */}
              </div>
          </div>
       </Modal>
    )
}


export default PendingRevisionTable
