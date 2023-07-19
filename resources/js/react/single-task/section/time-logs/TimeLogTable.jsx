import React from "react";
import CustomModal from "../../components/CustomModal";
import { useClickAway } from "react-use";
import TableRow from "./InnerTableRow";

const TimeLogTable = ({ isOpen, close, toggle, data = [] }) => {
    const ref = React.useRef(null);
    useClickAway(ref, close);
    return (
        <CustomModal isOpen={isOpen} toggleRef={toggle}>
            <div ref={ref} className="sp1-subtask-form --modal-panel">
                {/* <div className='sp1-subtask-form --modal-panel-header'> 
                 <h6>Time Logs
                        {true && <div 
                            className="spinner-border text-dark ml-2" 
                            role="status"
                            style={{
                                width: '16px',
                                height: '16px',
                                border: '0.14em solid rgba(0, 0, 0, .25)',
                                borderRightColor: 'transparent' 
                            }}
                        />}
                  </h6> 
                <Button
                    aria-label="close-modal"
                    className='_close-modal'
                >
                    <i className="fa-solid fa-xmark" />
                </Button> 
            </div> */}

                <div className="sp1-subtask-form --modal-panel-body">
                    <div className="mt-3">
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
                    </div>
                </div>
            </div>
        </CustomModal>
    );
};
export default TimeLogTable;
