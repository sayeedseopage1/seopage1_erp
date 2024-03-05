import React from 'react'
import Modal from '../../../global/Modal'
import Card from '../../../global/Card'
import styles from  "../styles/projectManagerExplanationModal.module.css"
import { useSearchParams } from 'react-router-dom'
import ProjectManagerExplanationTable from './ProjectManagerExplanationTable'
import { ProjectManagerExplanationColumns } from './ProjectManagerExplanationColumns'
import { projectManagerExplanationData } from '../../constant'
import RefreshButton from '../RefreshButton'
import { useAuth } from '../../../hooks/useAuth'
import { useGetProjectManagerDeadlineExpiredGoalsQuery } from '../../../services/api/projectStatusApiSlice'



const ProjectManagerExplanationModal = () => {
  const user = useAuth()
  const [searchParams, setSearchParams] = useSearchParams();

  const {data, isFetching, isLoading, refetch} = useGetProjectManagerDeadlineExpiredGoalsQuery(user.id)


  const close = () => {
    searchParams.delete("modal_type");
    searchParams.delete("status");
    setSearchParams(searchParams);
  };
  return (
    <div className={styles.project_manager_explanation}>
      <Modal isOpen={searchParams.get("modal_type") === "individual_goal_details" && user.roleId === 4}>
          <div className={styles.modal_overlay}>
              <Card className={styles.card}>
                  <Card.Head onClose={close} className={styles.card_head}>
                      <span>Project Goals: Need Project Manager's Explanation</span>
                  </Card.Head>

                  <Card.Body className={styles.card_body}>
                      {/* <div className='my-2 d-flex justify-content-end'>
                          <RefreshButton
                            onClick={refetch}
                            isLoading={isLoading}
                          />
                      </div> */}
                      <ProjectManagerExplanationTable 
                        tableColumns={ProjectManagerExplanationColumns}
                        tableName="Need-Project-Managers-Explanation"
                        isLoading={isLoading}
                        refetch={refetch}
                        projectManagerExplanationData={data?.data}
                      />
                  </Card.Body>
              </Card>
          </div>
      </Modal>
    </div>
  )
}

export default ProjectManagerExplanationModal