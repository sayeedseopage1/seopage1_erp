import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLessTrackModal } from "../../../../services/features/subTaskSlice";
import Modal from "../../../components/Modal";
import Loader from "../../../components/Loader";

const StopTimerConfrimationPopUp  = React.lazy(() => import('./StopTimerConfrimationPopUp'));

const LessTrackTimerModal = ({stopTimer, startTimer}) => {
    const { task, lessTrackModal, lessTrackModalFor} = useSelector((s) => s.subTask);
    const dispatch = useDispatch();

    const close = () => {
        dispatch(setLessTrackModal({show: false, type: ''}))
    }

    // temprarily stop timer now
    const stopTimerTemprorily = () => {
        if(lessTrackModalFor === 'STOP_TIEMR'){
            stopTimer();
        }

        if(lessTrackModalFor === 'STOP_TIEMR'){
            startTimer()
        }

        close();
    } 

    return (
        <Modal isOpen={lessTrackModal} className="sp1_single_task--modal">
            <div className="sp1_single_task--modal-panerl-wrapper">
                <React.Suspense fallback={<div className="sp1_single_task--modal-panel">
                    <Loader />
                </div>}>
                    <StopTimerConfrimationPopUp
                        handleTemporarilyStopTimer={stopTimerTemprorily}
                        close={close}
                    />
                </React.Suspense>
            </div>
        </Modal>
    );
};

export default LessTrackTimerModal;
