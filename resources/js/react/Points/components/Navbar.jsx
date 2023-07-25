
import { NavLink } from "react-router-dom";

const PointPageNavbar = () => {
  

    const navItems = [
        {
            id: 'pp_navbar_item_1',
            name: 'Cash points',
            url: '/'
        },
        {
            id: 'pp_navbar_item_2',
            name: 'Non-cash Points',
            url: '/non-cash-points'
        },
        {
            id: 'pp_navbar_item_3',
            name: 'Redeem Points',
            url: '/redeem-points'
        },
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


export default PointPageNavbar;