/* eslint-disable react/prop-types */
import * as React from 'react';
import { NavLink, useLocation } from "react-router-dom";
import {motion} from 'framer-motion';
import _ from 'lodash';


const InnerNavbar = ({
    items
}) => {
    const [active, setActive] = React.useState(items[0].id);
    const ref = React.useRef(null);
    const wrapperRef = React.useRef(null);
    const [width, setWidth] = React.useState(0);
    const [x, setX] = React.useState(0); 
    const location = useLocation();

    
    // initial
    React.useEffect(() => {
       if(items.length){ 
        let item = items?.find(d => location.pathname  === d.url); 
        setActive(item?.id);
       }
    }, [location]);


    React.useEffect(() => {
        // get width and x position
        if(!ref || !ref.current || !wrapperRef || !wrapperRef.current) return;
        const doc = document.querySelector(`#${active}`);
        if(!doc) return;

        const rect = doc.getBoundingClientRect();
        const wRect = wrapperRef.current.getBoundingClientRect();
        const {width, x} = rect;
        setWidth(width);
        setX(x - wRect.x);


    }, [active]);
 

    

    return(
        <div ref={wrapperRef} className="sp1__pp_inner_navigate">
           
            <motion.div 
                ref={ref}
                initial={{x: 0}}
                animate={{
                    x: x,
                    width: width, 
                    y:  0 - 8
                }}

                transition={{
                    type: 'spring',
                    stiffness: 100,
                    // damping: 20
                    
                }}

                style = {{
                    position: 'absolute',
                    height: '40px',
                    backgroundColor: '#fff',
                    bottom: '0',
                    left: '0',
                    borderRadius: '10px',
                    color: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '600',
                }}>
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{
                            delay: 0.3,
                        }}
                        style={{
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {items?.find(item => item.id === active)?.name}
                    </motion.div>
            </motion.div>


            {items?.map(item => (
                <NavLink
                    to={item.url}
                    key={item.id}
                    id={item.id}
                    onClick={() => setActive(item.id)} 
                    className={({isActive}) => isActive ? `sp1__pp_inner_navigate_item active` : `sp1__pp_inner_navigate_item` }
                > 
                    {item.name} 
                </NavLink>
            ))}
        </div>
    )
}


export default InnerNavbar;