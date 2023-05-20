import { Outlet } from "react-router-dom";
import InnerNavbar from "../components/InnerNavbar";


const NonCashPoint = () => {

    const tabs = [
        {id: 'ncp_item_1', name: 'History', url: "/non-cash-points/history"},
        {id: 'ncp_item_2', name: 'Earn non-cash point', url: "/non-cash-points/earn-non-cash-points"},
    ]


    return(
    //    <PointPageContainer>
        <div className="" style={{padding: '16px'}}> 
            <InnerNavbar items={tabs} /> 
            <div className="">
                <Outlet />
            </div>
        </div>
    //    </PointPageContainer> 
    )
}

export default NonCashPoint;