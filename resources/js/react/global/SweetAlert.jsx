// import './sweet-alert.css';
// import Modal from './Modal';
// import * as React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const SweetAlert = ({children, duration=5000}) => {
//     const [open, setOpen] = React.useState(false);

//     React.useEffect(()=> {
//         let timer; 
//         if(!open){
//             setOpen(true);
//             timer = setTimeout(() => {
//                 setOpen(false); 
//             }, duration)
//         }
 
//         return () => clearTimeout(timer)
//     }, []);
 

//   return (
//     <Modal className="sp1__sweet-alert" isOpen={open}>
//         <AnimatePresence>
//             {open && (
//                 <motion.div
//                     initial={{opacity: 0}}
//                     animate={{opacity: 1}}
//                     exit={{opacity: 0}}
//                 >
//                     {children}
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     </Modal>
//   )
// }

// export default SweetAlert