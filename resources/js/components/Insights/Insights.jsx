import { Provider, useSelector } from 'react-redux';
import { store } from './services/store';
import { BrowserRouter, Outlet, Route, Routes, Navigate } from 'react-router-dom';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './insights.css';
import InsightSidebar from './components/Sidebar';
import GoalModal from './components/GoalModal';
import GoalFormModal from './components/GoalFormModal';
import Modal from './ui/Modal';
import NewDashboardModal from './components/NewDashboardModal';
import AddSectionModal from './components/AddSectionModal';
import Dashboard from './pages/Dashboard';
import ReportModal from './components/ReportModal';
import { ModalDataTable } from './components/ModalDataTable';
import Goal from './pages/Goal';
import {useDashboards} from './hooks/useDashboards';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useGoals } from './hooks/useGoals';
import { useUsers } from './hooks/useUsers';
import * as React from 'react';
import { useEffect } from 'react';
import { useGetGoalsQuery } from './services/api/goalsApiSlice';
import { useGetAllUsersQuery, useGetUsersQuery } from './services/api/userSliceApi';
import { useDealsState } from './hooks/useDealsState';
import NotPermission from './pages/NotPermission';

const InsightsComponent = () => {
  const {dashboards} = useDashboards();
  const {goalModalOpen} = useSelector((state) => state.goalModal);
  const {goalFormModalOpen} = useSelector((state) => state.goalFormModal);
  const {dashboardModalOpen} = useSelector((state) => state.dashboardModal);
  const {sectionModalOpen} = useSelector((state) => state.sectionModal);
  const {reportModalOpen} = useSelector((state) => state.reportModal);
  const {isOpenDataTable} = useSelector(state => state.dataTableModal);
  const [isPageLoading, setIsPageLoading] = React.useState(true);
  const {deals} = useDealsState();
  const {goals, getGoalById, goalsIsLoading} = useGoals();
  const { data: users,} = useGetAllUsersQuery();


  useEffect(() => {
    if(goals && users && deals){
      setIsPageLoading(false);
    }

  }, [goals, users, deals])



  
  if(isPageLoading) return <div 
    style={{
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      width: "100%", 
      height: '100vh'
    }}>
      <div class="spinner-border" role="status">  </div>
      Loading...
  </div>


  return(
    <div className='cnx_insights'>
        <InsightSidebar />
        <main>
          <AppRoutes />
        </main>

      {/* goal modals */}
        <Modal isOpen={goalFormModalOpen || goalModalOpen}>
           {goalModalOpen && <GoalModal />}
           {goalFormModalOpen && <GoalFormModal /> }
        </Modal>
        
        <Modal isOpen={reportModalOpen}>
            <ReportModal />
        </Modal>

        <Modal isOpen={dashboardModalOpen || sectionModalOpen}>
          { dashboardModalOpen && <NewDashboardModal /> }
          { sectionModalOpen && <AddSectionModal />}
        </Modal>


        <Modal isOpen ={isOpenDataTable}>
          <ModalDataTable />
        </Modal>
    </div>
  )
}



const AppRoutes = () => {
  return(
    <Routes>
      <Route path="/">
        <Route index element= {<NotPermission />} />
        <Route path="dashboards/:dashboardId" element={<Dashboard />} />
        <Route path="goals/:goalId" element={<Goal />} />
        <Route path="*" element={<Navigate to="/dashboards/My Dashboard" replace={true} />} />
      </Route>
    </Routes>
  )
}


// Insights Component 

const Insights = () => {
    return(
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter basename="/account/insights">
          <Provider store={store}>
            <InsightsComponent />
          </Provider>
        </BrowserRouter>
      </DndProvider>
    )
}

export default Insights;