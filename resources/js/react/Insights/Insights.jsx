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
import * as React from 'react';
import { useEffect } from 'react';
import { useGetGoalsQuery } from './services/api/goalsApiSlice';

import NotPermission from './pages/NotPermission';
import Goal404 from './pages/Goal404';
import ExportDealTableDataExcel from './export/excel/ExportDealTableDataExcel';
import ExportGoalGraphPdf from './export/pdf/ExportGoalGraph';

const InsightsComponent = () => {
  const {dashboards} = useDashboards();
  const {goalModalOpen} = useSelector((state) => state.goalModal);
  const {goalFormModalOpen} = useSelector((state) => state.goalFormModal);
  const {dashboardModalOpen} = useSelector((state) => state.dashboardModal);
  const {sectionModalOpen} = useSelector((state) => state.sectionModal);
  const {reportModalOpen} = useSelector((state) => state.reportModal);
  const {isOpenDataTable} = useSelector(state => state.dataTableModal);
  const [isLoadingPage, setIsLoadingPage] = React.useState(true);
  


  useEffect(() => {
    let timer = setTimeout(() => {
      setIsLoadingPage(false);
    }, 1000)

    return () => {
      clearTimeout(timer);
    }
  }, [])
  
  if(isLoadingPage) return <div 
    style={{
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      width: "100%", 
      height: '100vh'
    }}>
      <div 
        className="spinner-border" 
        role="status"
        style={{
          width: '1.3rem',
          height: '1.3rem',
          marginRight: '0.5rem'
        }}      
      >  </div>
      Loading...
  </div>


  return(
    <div className='cnx_insights'>
       {
          Number(window.Laravel.user.role_id) === 1 || Number(window.Laravel.user.role_id) === 8 || Number(window.Laravel.user.role_id) === 7 ? 
          <InsightSidebar /> 
          : null
       } 
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
        {/* <Route path="deal-export" element={<ExportGoalGraphPdf /> } /> */}
        <Route path="goal-404" element={<Goal404 />} />
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