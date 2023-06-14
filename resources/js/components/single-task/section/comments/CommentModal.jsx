import * as React from 'react'
import { usePopper } from 'react-popper';
import { motion, AnimatePresence } from 'framer-motion';
import CommentSendBox from './CommentSendBox';  
import InnerComment from './InnerComment';

const CommentModal = ({toggleRef = null, isOpen}) => {
    const [modalRef, setModalRef] = React.useState(null); 
    const { styles, attributes } = usePopper(toggleRef, modalRef,{
        placement: 'left-start',
        modifiers: [
            {name: 'offset', options: {offset: [-100, -10]}}
        ]
    })

  return (
    <div 
        ref={setModalRef}
        style={{...styles.popper, pointerEvents: isOpen ? 'all' : 'none'}}
        {...attributes}
    >   
    <AnimatePresence>
        {isOpen && (
            <motion.div 
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className='sp1_task_comment_modal'
            >
                <div className='d-flex flex-column'>
                    <CommentSendBox />  
                    <div className='sp1_task_comment_list mt-4'>
                        <div className='font-weight-bold pb-3'>Comments: </div>
                        <div className='sp1_task_comment_list_items'>
                            <InnerComment />
                        </div>
                    </div>
                </div> 
            </motion.div>
        )}
    </AnimatePresence>
    </div>
  )
}

export default CommentModal