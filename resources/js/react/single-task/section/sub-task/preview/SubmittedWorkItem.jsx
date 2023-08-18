import React, {useState} from "react";
import { SubmittedWork } from "../../../../utils/single-task"; 
import SubmittedTaskViewModal from './SubmittedTaskViewModal';


const SubmittedWorkItem = ({ data, isLoading }) => {
    const [showModal, setShowModal] = useState(false);
    const sub = new SubmittedWork(data);
    const user = sub?.user;
 
    // toggle modal
    const toggleModal = (e) => {
        e.preventDefault();
        setShowModal(!showModal);
    }

 
    return (
        <React.Fragment>
            <div
                className="d-flex align-items-center justify-content-between sp1_task_modal-view_item py-2"
                styte={{ gap: "16px", fontSize: "14px" }}
                onClick={() => setShowModal(true)}
            >
                <div>
                    <a 
                        href={`/account/tasks/${sub?.id}`} 
                        onClick={e => e.stopPropagation()} 
                        className="hover-underline text-primary"
                    > 
                        Task#{sub?.id} 
                    </a>
                    <span> ({sub?.submittionNo}) submitted by </span>
                    <a 
                        href={user?.profile} 
                        onClick={e => e.stopPropagation()}
                        className="hover-underline text-primary" 
                    > 
                        {user?.name} 
                    </a>
                </div>

                <div> 
                    {sub?.getSubmittionDate()} at{" "}
                    {sub?.getSubmittionDate("hh:mm a")} 
                </div> 
                <div className="d-flex align-items-center">
                    <a className="mr-2 py-2 sp1_task_righ_action_btn" onClick={toggleModal}>
                        <i className="fa-regular fa-eye" />
                    </a>
                </div>
            </div>

            {/* submitted work preview */}
            <SubmittedTaskViewModal
                isOpen={showModal} 
                close={() => setShowModal(false)}
                submittedTask={sub}
                user={user}
                isLoading={isLoading}
            />
        </React.Fragment>
    );
};

export default SubmittedWorkItem;
