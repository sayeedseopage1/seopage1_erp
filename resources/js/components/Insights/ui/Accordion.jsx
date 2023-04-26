import PropTypes from 'prop-types';
import AccordionItem from './AccordionItem';



const Accordion = ({ children }) => {
    return(
        <div className='cnx_accordion'> 
            {children}
        </div>
    )   
};


Accordion.propTypes = {
    children: PropTypes.node.isRequired,
};

Accordion.Item = AccordionItem;
Accordion.Item.Header = AccordionItem.Header;
Accordion.Item.Body = AccordionItem.Body;

export default Accordion;