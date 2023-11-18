import React from "react";
import { Link } from "react-router-dom";
import { User } from "../../../utils/user-details";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

const LeadConfirmationModal = ({ isOpen, onConfirm, close }) => {
    const [buttonVisible, setButtonVisible] = React.useState(false);
    const [countDown, setCountDown] = React.useState(20);
    const auth = new User(window.Laravel.user);

    React.useEffect(() => {
        let timeOutId;
        let timeIntervelId;
        if (auth.getRoleId() && auth.getRoleId() === 6) {
            let count = countDown ?? 0;

            timeIntervelId = setInterval(() => {
                setCountDown(count--);
            }, 1000);

            timeOutId = setTimeout(() => {
                setButtonVisible(true);
                clearInterval(timeIntervelId);
            }, 22000);
        } else {
            if (auth.getRoleId() === 1) {
                setCountDown(0);
                setButtonVisible(true);
            }
        }

        return () => {
            clearTimeout(timeOutId);
            clearInterval(timeIntervelId);
        };
    }, []);

    return (
        <Modal isOpen={isOpen} className="subtask-timer-confirmation--modal">
            <div className="subtask-timer-confirmation--panel">
                <div className="subtask-timer-confirmation--content">
                    <h4 className="mb-3">
                        {" "}
                        Do you understand the following things?{" "}
                    </h4>

                    <ol type="A" style={{marginLeft: '32px'}}>
                        <li>
                            {" "}
                            Your team's job is not to decide what the look and
                            feel of a website will be based on a few reference
                            websites.{" "}
                        </li>
                        <li>
                            {" "}
                            Your team's job is not to research a theme based on
                            an instruction shared by the PM.{" "}
                        </li>
                        <li>
                            {" "}
                            Your team's job is not to research a plugin based on
                            a problem shared by PM.
                        </li>
                        <li>
                            {" "}
                            Your team's job is not to choose the color scheme of
                            a website.
                        </li>
                        <li>
                            Your team's job is not to talk to the support. For
                            example: Shopify support team, theme support, plugin
                            support and any other support for any solution.
                        </li>
                        <li>
                            Your team's job is not to create training videos for
                            the client after completing a project.{" "}
                        </li>
                        <li>
                            You understand that all your team's hours have to be
                            logged/tracked, and your teammates will questioned
                            if each of them doesn’t log at least 7 hours for any
                            reason.
                        </li>
                    </ol>

                    <p>
                        In general, anything that has to do with defining the
                        requirements (of any sort) has to be done by the project
                        manager. Your team's job is to execute the work based on
                        the defined requirements.
                    </p>

                    <p>
                        If, for any reason, the project manager needs your help
                        for any of those things, he will have to create a
                        separate task for each of them, and those tasks have to
                        be authorized by the top management mandatorily.
                    </p>

                    <p>
                        {" "}
                        <Link
                            to="?modal=report"
                            className="text-primary font-weight-bold"
                            onClick={close}
                        >
                            {" "}
                            Report{" "}
                        </Link>{" "}
                        immediately if you are asked to do any of these and if
                        it wasn’t authorized by top management. You should see a
                        text like “Authorized by top management” at the right
                        side of the task title if it was authorized. In case you
                        don’t report, the extra time taken for these will be
                        considered as your lackings (as they will remain
                        unaccountable), and you will receive negative
                        performance scores.”
                    </p>

                    <div className="d-flex align-items-center">
                        <Button
                            onClick={onConfirm}
                            className="ml-auto"
                            disabled={!buttonVisible}
                        >
                            Yes, I Fully Understand This
                            {!buttonVisible && `(${countDown})`}
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default LeadConfirmationModal;
