import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';


const Modal = ({ isOpen, children, targetDOM }) => {
    const [render, setRender] = useState(false);
    let dom = document.getElementById('insights-container-modal');
    if (!isOpen && dom) return null;

    return ReactDOM.createPortal(<div className='ps1_modal'> {children} </div>, dom)
}

export default Modal;