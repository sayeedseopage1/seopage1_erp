import axios from "axios";
import _ from "lodash";
import React from "react";
import Button from "../../../../../../global/Button";
import EmptyTable from "../../../../../../global/EmptyTable";
import Modal from "../../../../../../global/Modal";
import { Placeholder } from "../../../../../../global/Placeholder";
import Switch from "../../../../../../global/Switch";
import { Flex } from "../../../../../../global/styled-component/Flex";
import { useAuth } from "../../../../../../hooks/useAuth";
import { convertTime } from '../../../../../../utils/converTime';
import { PlaceholderText } from "../../components/PlaceholderText";
import { useDateFormat } from "../../hooks/useDateFormat";
import DailyReportSubmissionForm from "./DailyReportSubmissionForm";

/**
 * * A component that enforces the submission of daily work reports.
 */

const TASK_DATA_API = "/account/tasks/get-today-tasks";

const DailyReportSubmissionEnforcer = ({ close, reminderDate, onSubmit }) => {
    const [tasks, setTasks] = React.useState([]);
    const [reportedDate, setReportedDate] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(true);
    const { date } = useDateFormat();


    const auth = useAuth();

    // fetch data
    const fetchData = async () => {
        try {
            if(_.size(tasks) === 0){
                await axios
                    .get(`${TASK_DATA_API}/${auth.getId()}?date_type=${reminderDate}`)
                    .then((res) => {
                        setTasks(res.data.data);
                        setReportedDate(res.data.date);
                    })
                    .catch((err) => console.log(err));

                setIsLoading(false);
            }else{
                setIsLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    // fetch data on component mount
    React.useEffect(() => {
        fetchData();
    }, []);


    // update existing task status
    const updateTask = (task, status) => {
        const _tasks = tasks;
        const newTasks = _tasks.map(t => t.id === task.id ? {...task, daily_submission_status: status } : t);
        setTasks(newTasks);

        const falsyTask = newTasks.filter(t => !t.daily_submission_status)
        if(falsyTask.length === 0){
            onSubmit()
            close();
        }
    }

    return (
        <div className="sp1_single_task--modal">
            <div className="sp1_single_task--modal-panerl-wrapper">
                <div
                    className="sp1_single_task--modal-panel"
                    style={{ transition: ".4s", minWidth: "320px"}}
                >
                    {/* modal header */}
                    <Flex
                        justifyContent="space-between"
                        gap="10px"
                        className="border-bottom pb-2"
                    >
                        <div className="font-weight-bold f-16">
                            <span className="text-danger">{date(reminderDate).formatted}{": "}</span> Daily Task Progress Report
                        </div>
                        <Button variant="tertiary" onClick={close} className="">
                            <i className="fa-solid fa-xmark" />
                        </Button>
                    </Flex>

                    {/* modal body */}
                    <div className="sp1_single_task--modal-body sp1_single_task-modal-body-options p-3" style={{
                        width:"100%", maxWidth: '1080px'
                    }}>
                        <Switch>
                            {/* daily submission task list */}
                            <div className="sp1_tlr_tbl_wrapper" style={{overflow: 'auto'}}>
                                <table className={`sp1_tlr_table`} style={{ minWidth: "0" }}>
                                    <thead className="sp1_tlr_thead">
                                        <tr className="sp1_tlr_tr">
                                            <th className="sp1_tlr_th">SL No.</th>
                                            <th className="sp1_tlr_th">Task Name</th>
                                            <th className="sp1_tlr_th">Page Link</th>
                                            <th className="sp1_tlr_th">Tracked Date</th>
                                            <th className="sp1_tlr_th">Total Time Spend on This Task</th>
                                            <th className="sp1_tlr_th">Client Name</th>
                                            <th className="sp1_tlr_th">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody className="sp1_tlr_tbody">
                                            <Switch.Case condition={isLoading}>
                                                {_.times(10, row => (
                                                    <tr key={row} className="sp1_tlr_tr">
                                                        {_.times(6, col => (
                                                            <td key={col} className="sp1_tlr_td">
                                                                <Placeholder />
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </Switch.Case>

                                            <Switch.Case condition={!isLoading && _.size(tasks) === 0}>
                                                <tr className="sp1_tlr_tr">
                                                    <td colSpan={6} className="sp1_tlr_td">
                                                        <EmptyTable />
                                                    </td>
                                                </tr>
                                            </Switch.Case>
                                            <Switch.Case
                                                condition={_.size(tasks) !== 0}
                                            >
                                                {_.map(tasks, (task, index) => (
                                                    <tr key={task.id} className="sp1_tlr_tr">
                                                        <td className="sp1_tlr_td">{index+1}</td>
                                                        <td className="sp1_tlr_td">{task.task_title}</td>
                                                        <td className="sp1_tlr_td">
                                                            { task.page_url ?
                                                                <a href={task.page_url} title={task.page_url} target="_blank">View Link</a>
                                                                : <span style={{color: 'grey'}}>No Link Attached</span>
                                                            }
                                                        </td>
                                                        <td className="sp1_tlr_td">{date(reminderDate).formatted}</td>
                                                        <td className="sp1_tlr_td"> {convertTime(task.total_time_spent)} </td>
                                                        <td className="sp1_tlr_td"> {task?.client_name ?? <PlaceholderText>N/A</PlaceholderText>} </td>
                                                        <td className="sp1_tlr_td">
                                                        <Switch.Case condition={!task?.daily_submission_status}>
                                                            <DailyReportSubmissionButton
                                                                task={task}
                                                                reportDate={reportedDate}
                                                                onSubmit = {(status) => updateTask(task, status)}
                                                            />
                                                        </Switch.Case>

                                                        <Switch.Case condition={task?.daily_submission_status}>
                                                            <span className="badge badge-success f-14 font-weight-normal">
                                                                Submitted
                                                            </span>
                                                        </Switch.Case>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </Switch.Case>
                                    </tbody>
                                </table>
                            </div>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
};


const DailyReportSubmissionButton = ({task, reportDate, onSubmit}) => {
    const [show, setShow] = React.useState(false);
    return(
        <>
            <Button onClick={() => setShow(true)}> Click to Submit </Button>

            {/* daily report submission form */}
            <Modal isOpen={show}>
                <DailyReportSubmissionForm
                    task={task}
                    reportDate={reportDate}
                    close={() => setShow(false)}
                    onSubmit={onSubmit}
                />
            </Modal>
        </>
    )
}

export default DailyReportSubmissionEnforcer;


