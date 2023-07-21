// import * as React from 'react'
// import { usePopper } from 'react-popper';
// import { motion, AnimatePresence } from 'framer-motion'; 
// import SubTaskForm from './SubTaskForm';


// const SubTaskFormModal = ({toggleRef = null,  isOpen, close, children}) => {
//     const [modalRef, setModalRef] = React.useState(null); 
//     const { styles, attributes } = usePopper(toggleRef, modalRef,{
//         placement: 'left-start',
//         modifiers: [
//             {name: 'offset', options: {offset: [-100, -10]}}
//         ]
//     })

//   return (
//     <div 
//         ref={setModalRef}
//         style={{
//             ...styles.popper,
//              pointerEvents: isOpen ? 'all' : 'none', 
//              zIndex: '99'
//         }}
//         {...attributes.popper}
//     >   
//     <AnimatePresence>
//         {isOpen && (
//             <motion.div 
//                 initial={{opacity: 0}}
//                 animate={{opacity: 1}}
//                 exit={{opacity: 0}}
//                 className=''
//             >
//                {children}
//             </motion.div>
//         )}
//     </AnimatePresence>
//     </div>
//   )
// }

// export default SubTaskFormModal