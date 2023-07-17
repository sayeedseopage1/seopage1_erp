import React, { createContext, useContext, useState } from "react";

export const AccordionContext = createContext();


// accordion toggle
const AccordionToggle = ({ children }) => {
    const { isOpen, toggle } = useContext(AccordionContext);

    return (
        <React.Fragment>
            {children(isOpen, toggle)}
        </React.Fragment>
    )
}

// accordion content 
const AccordionContent = ({ children }) => {
    const { isOpen } = useContext(AccordionContext);

    if (!isOpen) return null;

    return <React.Fragment>
        {children}
    </React.Fragment>
}


// accordion
const Accordion = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <AccordionContext.Provider value={{ isOpen, setIsOpen, toggle }}>
            {children}
        </AccordionContext.Provider>
    )
}


Accordion.Toggle = AccordionToggle;
Accordion.Content = AccordionContent;

export default Accordion;