import React from "react";
import CustomModal from "../../components/CustomModal";
import Modal from '../../components/Modal';

import { useClickAway, useWindowSize } from "react-use";
import TableRow from "./InnerTableRow";
import _ from "lodash";
import Avatar from "../../../global/Avatar";
import { User } from "../../../utils/user-details";
import dayjs from "dayjs";
import Button from "../../components/Button";




const Table = ({data}) => {
    return(
        <table className="sp1_subtask_log-tbl">
            <thead className="__thead">
                <tr>
                    <th>Employee</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Memo</th>
                    <th>Hours Logged</th>
                </tr>
            </thead>

            <tbody className="__tbody">
                {data
                    ? data.map((log) => (
                        <TableRow key={log.id} log={log} />
                    ))
                    : null}
            </tbody>
        </table>
    )
}


const Card = ({log, className}) => {
    const user = new User(log.user);
    return(
        <div className={`border-bottom ${className}`}>
            <div className="d-flex align-items-center" style={{gap:'10px'}}>
                <Avatar 
                    src={user?.getAvatar()} 
                    name={user?.getName()} 
                    alt={user?.getName()} 
                    type="circle"
                /> 
                <h6>{user?.getName()}</h6>
            </div>
            <div className="d-flex flex-column flex-wrap ml-5" style={{gap: '4px'}}>
                <span><span className="font-weight-bold">Memo:</span> {log?.memo}</span>
                <span><span className="font-weight-bold">Hours Logged:</span> {log?.hours_logged}</span>
                <span><span className="font-weight-bold">Start Time:</span> {dayjs(log?.start_time).format('MMM DD, YYYY hh:mm a')} </span>
                <span><span className="font-weight-bold">End Time:</span> {dayjs(log?.end_time).format('MMM DD, YYYY hh:mm a')} </span>
            </div>
        </div>
    )
}

const CardView = ({data}) => {
    return(
        <div className="d-flex flex-column" style={{gap: '10px'}}>
            {_.map(data, (log) =>(
                    <Card log={log} key={log.id} className="w-100 py-2" />
                ))}
        </div>
    )
}

 
const TimeLogTable = ({ isOpen, close, toggle, data = [] }) => {
    const ref = React.useRef(null);
    const {width: deviceWidth} = useWindowSize();
    useClickAway(ref, close);



    const content = () => {
        return (
            <div ref={ref} className="sp1-subtask-form --modal-panel"> 
                <div className='sp1-subtask-form --modal-panel-header'> 
                    <h6>Session Logs</h6> 
                    <Button
                        aria-label="close-modal"
                        className='_close-modal'
                        onClick={close}
                    >
                        <i className="fa-solid fa-xmark" />
                    </Button> 
                </div>

                <div className="sp1-subtask-form --modal-panel-body">
                    <div className="mt-3">
                        {deviceWidth > 800 ? <Table data={data} />: <CardView data={data} />}
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

};
export default TimeLogTable;
