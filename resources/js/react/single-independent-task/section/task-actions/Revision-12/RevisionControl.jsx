import React from "react";
import Switch from "../../../../global/Switch";
import Button from "../../../components/Button";
import {
    needRevisionPermision,
    revisionButtonPermission,
} from "../../../permissions";
import NeedRevision from "./need-revision/NeedRevision";

const RevisionControl = ({ task, status, auth }) => {
    const [isNeedRevision, setIsNeedRevision] = React.useState(false);
    const [isPreview, setIsPreview] = React.useState(false);

    //* need revision button permission
    const NEED_REVISION = needRevisionPermision({
        task,
        status,
        loggedUser: auth,
    });
    // *revision preview button permission
    const VIEW_REVISION = revisionButtonPermission({
        task,
        status,
        loggedUser: auth,
    });

    return (
        <React.Fragment>
            {/* Button Group */}
            <Switch>
                {/* need revision button */}
                <Switch.Case condition={!NEED_REVISION}>
                    <Button
                        variant="tertiary"
                        onClick={() => setIsNeedRevision(true)}
                        className="d-flex align-items-center sp1-st-revision-btn sp1-st-revision-btn"
                    >
                        <i className="fa-solid fa-plus-minus" />
                        <span className="d-inline ml-1">Need Revision</span>
                    </Button>
                </Switch.Case>

                {/* revision preview button */}
                <Switch.Case condition={VIEW_REVISION}>
                    <Button
                        variant="tertiary"
                        onClick={() => setIsPreview(true)}
                        className="d-flex align-items-center sp1-st-revision-btn --view-revision"
                    >
                        <i className="fa-solid fa-plus-minus" />
                        <span className="d-inline ml-1">Revision</span>
                    </Button>
                </Switch.Case>

                {/* Modal Group */}

                {/* Need Revision Modal */}
                <Switch.Case condition={isNeedRevision}>
                    <NeedRevision
                        task={task}
                        status={status}
                        auth={auth}
                        close={() => setIsNeedRevision(false)}
                        isOpen={isNeedRevision}
                    />
                </Switch.Case>

                {/* Revision Preview Modal */}
                <Switch.Case condition={isPreview}>
                    <NeedRevision
                        task={task}
                        status={status}
                        auth={auth}
                        close={() => setIsPreview(false)}
                        isOpen={isPreview}
                    />
                </Switch.Case>
            </Switch>
        </React.Fragment>
    );
};

export default RevisionControl;
