import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion';


const Accordion = ({expendable=true, children, title, headingClass, headingStyle}) => {
    const [expend,setExpend] = React.useState(false);

    const toggle = () => {
        setExpend(!expend);
    }

    const init = expendable ? 0 : 300;

  return (
    <div className='sp1_task_card mb-4'>
        <div 
            className={`sp1_task_card--head ${headingClass}` }
            onClick={ () => expendable ? toggle() : null}
            style={{...headingStyle, cursor: expendable ? 'pointer': 'default'}}
        > {title} 

            {expendable ? expend ? 
                <span className="__icon">
                    <i className="fa-solid fa-chevron-up"></i>
                </span>
            : <span className="__icon">
                    <i className="fa-solid fa-chevron-down"></i>
                </span>: null
            }
        </div>


        <AnimatePresence>
            {expendable ? expend && (
                <motion.div
                    initial={{ height: init }}
                    animate={{height: 800}}
                    exit={{height: 0}}
                    className='sp1_task_card--body'
                >
                    {children}
                </motion.div> 
            ): <div className='sp1_task_card--body'>
               {children}  
            </div>
        }
        </AnimatePresence>


       
    </div>
  )
}

export default Accordion