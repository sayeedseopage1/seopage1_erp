import React, {lazy} from 'react'
import CustomModal from '../../components/CustomModal'
import Button from '../../components/Button';
const InnerHistoryItem = lazy(() => import('./InnerHistoryItem'));
import InnerHistoryItemLoader from './InnerHistoryItemLoader';
import Modal from '../../components/Modal';
import { useWindowSize } from "react-use";


const Histories = ({isOpen, close, toggle, data = []}) => {
  const {width: deviceWidth} = useWindowSize();
  
  const content = () => {
    return (
        <div className='sp1-subtask-form --modal-panel'>
            <div className='sp1-subtask-form --modal-panel-header'> 
                 <h6> History </h6> 
                <Button
                    aria-label="close-modal"
                    className='_close-modal'
                    onClick={close}
                >
                    <i className="fa-solid fa-xmark" />
                </Button> 
            </div>

            <div className="sp1-subtask-form --modal-panel-body">
                <div className='mt-3'>
                    {data ? data.map(d => (
                        <React.Fragment key={d.id}>
                            <React.Suspense fallback={<InnerHistoryItemLoader />}>
                                <InnerHistoryItem history={d} />
                            </React.Suspense>
                        </React.Fragment>
                    )):null}
                </div>      
            </div>
        </div>
    )
  }
 

  if(deviceWidth > 1200){
    return (
        <CustomModal isOpen={isOpen} toggleRef={toggle}>
            <React.Fragment>{content()}</React.Fragment>       
        </CustomModal>
    );
    }else{
        return (
            <Modal isOpen={isOpen}>
                <React.Fragment>{content()}</React.Fragment>       
            </Modal>
        );
    }
}

export default Histories
