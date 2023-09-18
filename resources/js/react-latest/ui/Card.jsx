import React from "react";
import styles from "./card.module.css";
import Button from "./Button";

const Header = ({ className, children, onClose, ...props }) => {
    return (
        <div className={`${styles.card_header} ${className}`} {...props}>
            {children}
            <Button
                type="button"
                variant="tertiary"
                onClick={onClose}
                className={styles.card_close_btn}
            >
                <i className="fa-solid fa-xmark" />
            </Button>
        </div>
    );
};

const CardBody = ({ children, className, ...props }) => {
    return (
        <div className={`${styles.card_body} ${className}`} {...props}>
            {children}
        </div>
    );
};

const CardFooter = ({children, className, ...props}) => {
    return(
        <div className={`${styles.card_footer} ${className}`} {...props}>
            {children}
        </div>
    )
}

const Card = ({ children, className, ...props }) => {
    return (
        <div className={`${styles.card} ${className}`} {...props}>
            {children}
        </div>
    );
};

Card.Head = Header;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
