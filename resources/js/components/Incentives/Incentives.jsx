import * as React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';


const IncentiveContainer  = () => {
    return (
       <div className="sp1_point_page_container">
            {/* <IncentiveNavbar /> */}

            <main className="sp1_point_page_main">
                Incentives page
                <Outlet />
            </main>
        </div>
    );
}


const Incentives = () => {
    return (
        <DndProvider backend={HTML5Backend}>
          <BrowserRouter basename="/account/incentives">
              <Routes>
                  <Route path='/' element={<IncentiveContainer/>}>
                  </Route> 
              </Routes>
          </BrowserRouter>
        </DndProvider>
    )
}


export default Incentives;