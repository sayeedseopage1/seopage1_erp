import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import styles from './modal.module.css';


const Modal = ({isOpen, closeModal, className, children}) => {
  return (
    <>
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div"  className= {styles.dialog} onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter={styles.dialog_overlay_enter} 
                    enterFrom={styles.dialog_overlay_enter_from}
                    enterTo={styles.dialog_overlay_enter_to}
                    leave={styles.dialog_overlay_leave}
                    leaveFrom={styles.dialog_overlay_leave_from}
                    leaveTo={styles.dialog_overlay_leave_to}
                >
                    <div className={styles.dialog_overlay} />
                </Transition.Child>

                <div className={styles.panel_container}>
                    <div className={styles.panel_wrapper}> 
                        <Transition.Child
                            as={Fragment}
                            enter={styles.dialog_panel_enter}
                            enterFrom={styles.dialog_panel_enter_from}
                            enterTo={styles.dialog_panel_enter_to}
                            leave={styles.dialog_panel_leave}
                            leaveFrom={styles.dialog_panel_leave_from}
                            leaveTo={styles.dialog_panel_leave_to}
                        >
                            <Dialog.Panel className={`${styles.dialog_panel} ${className}`}>
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>
  )
}

export default Modal