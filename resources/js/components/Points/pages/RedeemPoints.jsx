import { Outlet } from "react-router-dom";
import InnerNavbar from "../components/InnerNavbar";
import PointPageNavbar from '../components/Navbar';

const RedeemPoints = () => {

    const tabs = [
        {id: 'ncp_item_2', name: 'Point shop', url: "/redeem-points/point-shop"},
        {id: 'ncp_item_1', name: 'Redeem History', url: "/redeem-points/history"},
    ]


    return(
    //    <PointPageContainer>
       <div className="sp1_point_page">

        <div className="sp1_point_page_container">
            <PointPageNavbar />
            <div className="sp1_point_page_main" style={{padding: '16px'}}> 
                <div className="d-flex align-items-center justify-space-between">
                    <InnerNavbar items={tabs} /> 
                    <div className="ml-auto d-flex align-items-center">
                        <div className='mr-2 ml-md-auto'>
                            <img src="/img/seopage1-coin-sm.png" alt='' width={58} height={58} />
                        </div> 

                        <div>
                            <span>Credits Available</span>
                            <h5 className="py-0 font-weight-bold text-primary">5000000</h5>
                        </div>
                    </div>
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

export default RedeemPoints;