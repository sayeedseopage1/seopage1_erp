import * as React from 'react'
import ReactDOM from 'react-dom'
import { usePopper } from 'react-popper';
import { motion, AnimatePresence } from 'framer-motion'; 
  

const CustomModal = ({toggleRef = null,  isOpen, close, children}) => {
    const [modalRef, setModalRef] = React.useState(null); 
    const { styles, attributes } = usePopper(toggleRef, modalRef,{
        placement: 'left-start',
        modifiers: [ 
            {name: 'offset', options: {offset: [0, 0]}},
        ]
    })

  return ( 
        <div 
            ref={setModalRef}
            style={{
                ...styles.popper,
                pointerEvents: isOpen ? 'all' : 'none', 
                zIndex: 99,
            }} 
            {...attributes.popper}
        >   

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className=''
                    >
                        {children} 

                        <Shadow/>
                    </motion.div>
                )}
            </AnimatePresence>
        </div> 
  )
}

export default CustomModal 

const Shadow = () => {
    return ReactDOM.createPortal(
        <div
            style={{
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 90,
                background: 'rgba(0,0,0,.1)'
            }} 
        />,
        document.querySelector('#sp1SingleTaskPageModal')
    )
}