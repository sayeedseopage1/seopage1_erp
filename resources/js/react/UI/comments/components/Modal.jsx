import * as React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const Modal = ({ children, isOpen, className }) => {
    const [isBrowser, setIsBrowser] = React.useState(false);
    // generate random id for dropdown menu
    const id = React.useMemo(() => Math.random().toString(36).substr(2, 9), []);
    let DOM = document.getElementById(id);

    React.useEffect(() => {
        setIsBrowser(true);
        const el = document.createElement("div");
        el.id = id;
        document.body.appendChild(el);
        return () => {
            document.body.removeChild(el);
        };
    }, []);

    if (!DOM) return;

    const modalContent = isOpen ? (
        <div className={`cnx_modal ${className}`}>{children}</div>
    ) : null;

    if (isBrowser) {
        return ReactDOM.createPortal(modalContent, DOM);
    } else {
        return null;
    }
};

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired,
    className: PropTypes.string,
};

export default Modal;
