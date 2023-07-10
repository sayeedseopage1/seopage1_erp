import * as React from 'react'
import { usePopper } from 'react-popper'
import { AnimatePresence, motion } from 'framer-motion'

const Context = React.createContext();


// dropdown toggle
const Toggle = ({children, className, icon= true}) => {
  const { isOpen, setIsOpen, toggle, hoverAble, setRefElement } = React.useContext(Context);

  const handleHover=(e) =>{
    if(hoverAble){
      setIsOpen(true);
    }
  }

  return(
    <div
      onClick={toggle} 
      ref={setRefElement}
      onMouseOver={handleHover}
      className={`d-flex align-items-center justify-content-between ${className}`}
      style={{gap: '10px', cursor: 'pointer'}}
    >
      {children}

      {icon && <i className="fa-solid fa-caret-down"></i>}
    </div>
  )
}



// menu
const Menu = ({children, className}) => {
  const {isOpen, refElement, popperElement, setPopperElement} = React.useContext(Context);


  const {styles, attributes} = usePopper(refElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [
      {name: "flip", options: {
        fallbackPlacements: ['bottom', 'left', 'right', 'top' ],
      }}
    ]
  })

  return(
    <div
      ref={setPopperElement} 
      style={styles.popper}
      {...attributes.popper}
    >
     <AnimatePresence>
        {
            isOpen && (
              <motion.div
                initial = {{ opacity: 0, y: 10 }} 
                animate = {{ opacity: 1, y: 0}}
                exit={{ opacity: 0, y: 10}}
              >
                <div className={`sp1-dropdown-menu ${className}`}>
                {children}
                </div>
              </motion.div>
            )
        }      
      </AnimatePresence>   
    </div>
  )

  
}



// dropdown
const Dropdown = ({hoverAble= false, children}) => {
  const [isOpen, setIsOpen] = React.useState();
  const [refElement, setRefElement] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState(null);

  const toggle = () => setIsOpen(!isOpen);
 
  const handleMouseLeave = (e) => {
    if(isOpen && hoverAble){
      setIsOpen(false);
    }
  }
  
  return(
    <Context.Provider value={{isOpen, setIsOpen, toggle, hoverAble, refElement, setRefElement, popperElement, setPopperElement}}>
      <div className="" onMouseLeave={handleMouseLeave}>
        {children}
      </div>
    </Context.Provider>
  )
}

Dropdown.Toggle = Toggle;
Dropdown.Menu = Menu

export default Dropdown