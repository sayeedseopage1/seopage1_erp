import React from "react";
import Card from "../../../../../global/Card";

const TaskRevision = ({ task, status, auth, close }) => {
    return (
        <React.Fragment>
            <Card
                className="sp1_single_task--modal-panel"
                style={{ maxWidth: "550px" }}
            >
                <Card.Head
                    onClose={close}
                    className="border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between"
                >
                    {`Revision - Task: ${task?.id}#${
                        task?.title ?? task?.heading
                    }`}
                </Card.Head>

                <Card.Body>
                    <form className="px-3">

                    </form>
                </Card.Body>
            </Card>
        </React.Fragment>
    );
};

export default TaskRevision;
