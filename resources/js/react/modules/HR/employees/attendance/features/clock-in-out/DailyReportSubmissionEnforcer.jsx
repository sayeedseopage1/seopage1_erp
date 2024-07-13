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
import { convertTime } from "../../../../../../utils/converTime";
import { PlaceholderText } from "../../components/PlaceholderText";
import { useDateFormat } from "../../hooks/useDateFormat";
import DailyReportSubmissionForm from "./DailyReportSubmissionForm";

/**
 * * A component that enforces the submission of daily work reports.
 */

const TASK_DATA_API = "/account/tasks/get-today-tasks";

const DailyReportSubmissionEnforcer = ({ close, reminderDate, onSubmit }) => {
    const [tasks, setTasks] = React.useState([]);
    const [reportedDate, setReportedDate] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(true);
    const { date } = useDateFormat();

    const auth = useAuth();

    // fetch data
    const fetchData = async () => {
        try {
            if (_.size(tasks) === 0) {
                await axios
                    .get(
                        `${TASK_DATA_API}/${auth.getId()}?date_type=${reminderDate}`
                    )
                    .then((res) => {
                        setTasks(res.data.data);
                        setReportedDate(res.data.date);
                    })
                    .catch((err) => console.log(err));

                setIsLoading(false);
            } else {
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
        const newTasks = _tasks.map((t) =>
            t.id === task.id ? { ...task, daily_submission_status: status } : t
        );
        setTasks(newTasks);

        const falsyTask = newTasks.filter((t) => !t.daily_submission_status);
        if (falsyTask.length === 0) {
            onSubmit();
            close();
        }
    };

    return (
        <div className="sp1_single_task--modal">
            <DailyReportSubmissionButton />
        </div>
    );
};

const DailyReportSubmissionButton = ({}) => {
    const [show, setShow] = React.useState(false);
    return (
        <>
            <Button onClick={() => setShow(true)}> Click to Submit </Button>

            {/* daily report submission form */}
            <Modal isOpen={show}>
                <DailyReportSubmissionForm
                    show={show}
                    close={() => setShow(false)}
                />
            </Modal>
        </>
    );
};

export default DailyReportSubmissionEnforcer;
