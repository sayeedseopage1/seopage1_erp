
import { NavLink } from "react-router-dom";

const IncentiveNavbar = () => {
  

    const navItems = [
        {
            id: 'incentive_navbar_item_1',
            name: 'Current',
            url: '/current'
        },
        {
            id: 'incentive_navbar_item_2',
            name: 'Disbursed amounts',
            url: '/disbursed-amounts'
        },
        {
            id: 'incentive_navbar_item_3',
            name: 'Held amounts',
            url: '/held-amounts'
        },
        // {
        //     id: 'incentive_navbar_item_4',
        //     name: 'Rewards left to be redeemed ',
        //     url: '/#'
        // },
    ]


    return (
        <div className="sp1__pp_navbar">
            {
                navItems.map((item) => {
                    return(
                        <NavLink 
                            key={item.id} 
                            to={item.url}
                            className={ 
                                ({isActive}) => isActive ? `sp1__pp_navbar_item active` :
                                `sp1__pp_navbar_item`}
                        >
                           {item.name} 
                        </NavLink>
                    )   
                })
            }
        </div>
    )
}


export default IncentiveNavbar;