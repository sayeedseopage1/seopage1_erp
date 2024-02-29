import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import WorkingEnvironmentForm from "./WorkingEnvironmentForm";
import { SingleTask } from "../../../utils/single-task";
import { useAuth } from "../../../hooks/useAuth";
import SubTaskForm from "./SubTaskForm";
import Button from "../../components/Button";
import LeadConfirmationModal from "./LeadConfirmationModal";
import _ from "lodash";

const VisibleItem = ({ isVisible, children }) => {
    if (!isVisible) return null;
    return children;
};

const WithContainer = ({ children, close, visibleEnvironmentForm }) => {
    return (
        <div className="sp1-subtask-form --modal-panel">
            <div className="sp1-subtask-form --modal-panel-header">
                <h6>
                    {visibleEnvironmentForm
                        ? "Working Environment"
                        : "Create Sub Task"}
                </h6>
                <Button
                    aria-label="close-modal"
                    className="_close-modal"
                    onClick={close}
                >
                    <i className="fa-solid fa-xmark" />
                </Button>
            </div>

            <div className="sp1-subtask-form --modal-panel-body sp1_subtask_form">
                {children}
            </div>
        </div>
    );
};

export default function SubTaskFormController({
    close,
    isFirstSubtask = true,
}) {
    // task information
    const {
        task: taskDetails,
        subTask,
        isWorkingEnvironmentSubmit,
    } = useSelector((s) => s.subTask);

    // ui information
    const [visibleEnvironmentForm, setVisibleEnvironmentForm] =
        React.useState(false);
    const [visibleInformationModal, setVisibleInformationModal] =
        React.useState(!visibleEnvironmentForm);

    const dispatch = useDispatch(); // dispatch
    const auth = useAuth(); // logged user
    const task = new SingleTask(taskDetails); // task instance;
    const isDesignerTask = _.includes([5, 7], task?.category?.id);

    // environment status
    React.useEffect(() => {
        const showEnv =
            task?.workingEnvironment === 0
                ? _.size(task?.subtask) === 0
                    ? true
                    : false
                : false;
        if (auth.getRoleId() === 6 && showEnv) {
            setVisibleEnvironmentForm(true);
        }
    }, []);

    // render
    return (
        <React.Fragment>
            {/* working environment form */}
            <VisibleItem isVisible={!isDesignerTask && visibleEnvironmentForm}>
                <WithContainer
                    close={close}
                    visibleEnvironmentForm={visibleEnvironmentForm}
                >
                    <WorkingEnvironmentForm
                        task={task}
                        onSubmit={() => {
                            setVisibleEnvironmentForm(false);
                            setVisibleInformationModal(true);
                        }}
                        close={close}
                    />
                </WithContainer>
            </VisibleItem>

            {/* task creation guideline */}
            <VisibleItem
                isVisible={
                    !isDesignerTask &&
                    !visibleEnvironmentForm &&
                    visibleInformationModal
                }
            >
                <LeadConfirmationModal
                    isOpen={true}
                    onConfirm={() => setVisibleInformationModal(false)}
                    close={close}
                />
            </VisibleItem>

            {/* task creation form */}
            <VisibleItem
                isVisible={
                    isDesignerTask ||
                    (!visibleEnvironmentForm && !visibleInformationModal)
                }
            >
                <WithContainer
                    close={close}
                    visibleEnvironmentForm={visibleEnvironmentForm}
                >
                    <SubTaskForm
                        close={close}
                        isDesignerTask={isDesignerTask}
                    />
                </WithContainer>
            </VisibleItem>
        </React.Fragment>
    );
}
