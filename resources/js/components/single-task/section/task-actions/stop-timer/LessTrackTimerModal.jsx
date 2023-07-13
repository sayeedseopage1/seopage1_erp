import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLessTrackModal } from "../../../../services/features/subTaskSlice";
import Modal from "../../../components/Modal";
import Loader from "../../../components/Loader";

const StopTimerConfrimationPopUp  = React.lazy(() => import('./StopTimerConfrimationPopUp'));

const LessTrackTimerModal = ({stopTimer}) => {
    const { task, lessTrackModal } = useSelector((s) => s.subTask);
    const dispatch = useDispatch();

    const close = () => {
        dispatch(setLessTrackModal(false))
    }

    // temprarily stop timer now
    const stopTimerTemprorily = () => {
        stopTimer();
        close();
    }

    return (
        <Modal isOpen={lessTrackModal} className="sp1_single_task--modal">
            <div className="sp1_single_task--modal-panerl-wrapper">
                <React.Suspense fallback={<Loader />}>
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
