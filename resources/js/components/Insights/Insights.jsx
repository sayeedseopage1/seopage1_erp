import { Provider, useSelector } from 'react-redux';
import { store } from './services/store';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

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

const InsightsComponent = () => {
  const {goalModalOpen} = useSelector((state) => state.goalModal);
  const {goalFormModalOpen} = useSelector((state) => state.goalFormModal);
  const {dashboardModalOpen} = useSelector((state) => state.dashboardModal);
  const {sectionModalOpen} = useSelector((state) => state.sectionModal);
  const {reportModalOpen} = useSelector((state) => state.reportModal);


  return(
    <div className='cnx_insights'>
        <InsightSidebar />
        <main>
          <Outlet />
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
    </div>
  )
}




// Insights Component 

const Insights = () => {
    return(
        <BrowserRouter  basename="/account/insights">
          <Provider store={store}>
            <Routes>
              <Route path="/" element={<InsightsComponent />}>
                <Route path="dashboards/:dashboardId" element={<Dashboard />} />
                <Route path="*" element={<h1>404</h1>} />
              </Route>
            </Routes>
          </Provider>
        </BrowserRouter>
    )
}

export default Insights;