import { Outlet } from "react-router-dom";
import InnerNavbar from "../components/InnerNavbar";
import PointPageNavbar from '../components/Navbar';

const NonCashPoint = () => {

    const tabs = [
        {id: 'ncp_item_1', name: 'History', url: "/non-cash-points/history"},
        {id: 'ncp_item_2', name: 'Earn non-cash point', url: "/non-cash-points/earn-non-cash-points"},
    ]


    return(
    //    <PointPageContainer>
       <div className="sp1_point_page">

        <div className="sp1_point_page_container">
            <PointPageNavbar />
            <div className="sp1_point_page_main" style={{padding: '16px'}}> 
                <div className="d-flex align-items-center justify-space-between">
                    <InnerNavbar items={tabs} /> 
                </div>
                <div className="mt-3">
                    <Outlet />
                </div>
            </div>
        </div>
       </div> 
    //    </PointPageContainer> 
    )
}

export default NonCashPoint;