import * as React from 'react'
import Modal from '../../Insights/ui/Modal';
import { useClickAway } from 'react-use';

const RevisionText = ({text, index, date, time}) => {
    const [expend, setExpend] = React.useState(false);
    const ref = React.useRef();

    let isLong = text.length > 800;
    const showText = isLong ? text.slice(0, 800) + '...' : text;


    const toggleModal = (e) => {
        e.preventDefault();
        setExpend(!expend)
    }


    useClickAway(ref, () => {
        setExpend(false)
    })
  

  return (
    <div className="sp1_task_card--sub-card">
        <div className="sp1_tc_sc-inx">
            <h2>{index}</h2>
            <span className="d-block"><strong>Date</strong> {date} </span>
            <span className="d-block"><strong>Time</strong>: {time}</span>
        </div>
        <div className="">
            {showText} 
            {isLong ? <a href="#" className='ml-2' onClick={toggleModal}>Read full guideline</a> : ''}

            <Modal className="sp1_task_card--sub-card-modal" isOpen={expend}>
                <div ref={ref} className='sp1_task_card--sub-card-modal-content'>
                    <div className='d-flex align-items-center justify-content-between __header'>
                        <button onClick={() => setExpend(false)}>
                        <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <div className='__content'>
                        <div className="sp1_tc_sc-inx">
                            <h2>{index}</h2>
                            <span className="d-block"><strong>Date</strong> {date} </span>
                            <span className="d-block"><strong>Time</strong>: {time}</span>
                        </div>
                        <div>
                            {text}
                        </div>
                    </div>

                    <div className=' __footer'>
                        <button className='btn btn-sm py-1 btn-primary ml-auto' onClick={() => setExpend(false)}>
                            Close
                        </button>
                    </div> 
                </div>
            </Modal>
        </div>

    </div>
  )
}

export default RevisionText