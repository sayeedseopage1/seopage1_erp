import * as React from 'react';
import  PropTypes  from 'prop-types';
import {motion, AnimatePresence } from 'framer-motion';
import _ from 'lodash';


const AccordionItemContext = React.createContext();


// Accordion Component


const AccordionItemHeader = ({ children, className="", icon=true }) => {
    const {active, setActive} = React.useContext(AccordionItemContext);
    return(
        <div className={`cnx_accordion_item_header ${className}`} onClick={() => setActive(!active)}>
            {_.isFunction(children) ? children(active) : children}
            {icon && <div className='cnx_accordion_item_header_icon'>
                    {active ? '-' : '+'}
            </div>}
        </div>
    )
}


 const AccordionItemBody = ({ children, className="" }) => {
    const {active} = React.useContext(AccordionItemContext);
    return(
        <AnimatePresence>
            {active && (
                <motion.div 
                    className={`cnx_accordion_item_body ${className}`}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}


const AccordionItem = ({ children, className="", defaultActive=false}) => {
    const [active, setActive] = React.useState(defaultActive);

    return(
        <AccordionItemContext.Provider value={{active, setActive}}>
            <div className={`cnx_accordion_item ${className}`}>
                {children}
            </div>
        </AccordionItemContext.Provider>
   )
}


AccordionItem.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    defaultActive: PropTypes.bool,
}


AccordionItemBody.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
}

AccordionItemHeader.propTypes = {
    children:  PropTypes.oneOfType([ PropTypes.node, PropTypes.func ]).isRequired,
    className: PropTypes.string,
    icon: PropTypes.bool,
}




AccordionItem.Header = AccordionItemHeader;
AccordionItem.Body = AccordionItemBody;

export default AccordionItem;

