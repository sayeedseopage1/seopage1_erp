import PropTypes from 'prop-types';

// card header 
const CardHeader = ({ children, className="", onClose, ...props }) => {
    return(
        <div className={`cnx_card__header ${className}`} {...props}>
            {children}
            <button onClick={() => onClose && onClose()}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"/>
                </svg>
            </button>
        </div>
    )
}

// card body
const CardBody = ({ children, className="", ...props }) => {
    return(
        <div className={`cnx_card__body ${className}`} {...props}>
            {children}
        </div>
    )
}

// card Footer 
const CardFooter = ({ children, className="", ...props }) => {
    return(
        <div className={`cnx_card__footer ${className}`} {...props}>
            {children}
        </div>
    )
}


const Card = ({ children, className="", ...props }) => {
    return(
        <div className={`cnx_card ${className}`} {...props}>
            {children}
        </div>
    )
}


Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;



// type 
CardHeader.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onClose: PropTypes.func,
}

CardBody.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
}

CardFooter.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
}

Card.propTypes = {
    children: PropTypes.node.isRequired || PropTypes.arrayOf(PropTypes.node).isRequired,
    className: PropTypes.string,
}
