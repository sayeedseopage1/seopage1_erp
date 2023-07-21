import React, { useState } from "react";
import Modal from "./Modal";
import Button from './Butotn';

const EmployeeSessionTableModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen((prev) => !prev);
    const close = () => setIsOpen(false);

    return (
        <React.Fragment>
            
        </React.Fragment>
    );
};

export default EmployeeSessionTableModal;
