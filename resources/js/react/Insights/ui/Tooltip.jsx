import { usePopper } from "react-popper";
import ReactDOM from 'react-dom';
import * as React from "react";
import PropTypes from 'prop-types';


const TooltipContext = React.createContext();

export const TooltipProvider = ({children}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [element, setElement] = React.useState(null);
    const [reference, setReference] = React.useState(null);
    const [arrow, setArrow] = React.useState(null);

    return (
        <TooltipContext.Provider value={{
            element,
            setElement,
            reference,
            setReference,
            arrow,
            setArrow,
            isOpen,
            setIsOpen
        }}>
            {children}
        </TooltipContext.Provider>
    )
}


const useTooltip = () => {
    const context = React.useContext(TooltipContext);
    if(!context) {
        throw new Error('useTooltip must be used within a TooltipProvider');
    }
    return context;
}


// tooltip Element
export const TooltipElement = () => {
    const {isOpen, element, reference, arrow, setArrow} = useTooltip();
    const [popperElement, setPopperElement] = React.useState(null);
     // generate random id for dropdown menu
     const id = React.useMemo(() => Math.random().toString(36).substr(2, 9), []);
     let DOM = document.getElementById(id);
 
     // create element in html body
     React.useEffect(() => {
         const el = document.createElement('div');
         el.id = id;
         document.body.appendChild(el);
         return () => {
             document.body.removeChild(el);
         }
     }, [])
    const {styles, attributes} = usePopper(reference, popperElement, {
        placement:  "bottom",
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 8],
                },
            },
            {
                name: 'preventOverflow',
                options: {
                    padding: 8,
                },
            },
            {
                name: 'flip',
                options: {
                    fallbackPlacements: ['bottom', 'top', 'right', 'left'],
                },
            },
            {
                name: 'arrow',
                options: {
                    element: arrow,
                    padding:  8,                  
                }
            }
        ]
    });
    
    if(!isOpen || !element || !DOM) {
        return null;
    }

    return ReactDOM.createPortal(
        <div 
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            className='cnx__ins__ui_tooltip'
        >
            <div className='cnx__ins__ui_tooltip_content'>
                {element}
                <div className='cnx__ins__ui_tooltip_arrow' ref={setArrow} style={styles.arrow}/>
            </div>
        </div>,
        DOM
    )
}



// tooltip component
const TooltipComponent = ({children, disabled, text,...props}) => {
    const {setIsOpen, setElement, setReference} = useTooltip(); 

    React.useEffect(() => {
        setElement(text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text])


    return (
        <>
            <div ref={setReference}
                onMouseOver={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                style={{width: 'fit-content', ...props.style}}
                {...props}
            >
                {children}
            </div>
            {!disabled && <TooltipElement/>}
        </>
    )
}



const Tooltip = ({children, text, disabled=false, ...props}) => {

    return (
        <TooltipProvider>
            <TooltipComponent text={text} disabled={disabled} {...props}>
                {children}
            </TooltipComponent>
        </TooltipProvider>
    )

}

// type
TooltipProvider.propTypes = {
    children: PropTypes.element.isRequired,
}


TooltipComponent.propTypes = {
    text: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    disabled: PropTypes.bool,
}

Tooltip.propTypes = {
    text: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    disabled: PropTypes.bool,
}

export default Tooltip;
