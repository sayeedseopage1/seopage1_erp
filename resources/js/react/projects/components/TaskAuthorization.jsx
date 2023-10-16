import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./taskAuthorization.module.css";
import Button from "../../global/Button";
import Modal from "../../global/Modal";
import Card from "../../global/Card";
import DataTable from "../../global/table/DataTable";
import { useGetAuthorizeTasksQuery } from "../../services/api/projectApiSlice";
import { AuthorizationColumns } from "./TaskAuthorizationColumns";
import { useAuth } from "../../hooks/useAuth";
import _ from "lodash";
import NotificationTooltip from "../../../react-latest/ui/NotificationTooltip";

const TaskAuthorization = ({ title }) => {
    const [visible, setVisible] = useState(false);
    const auth = useAuth();

    if (!_.includes([1, 4, 8], auth.getRoleId())) {
        return null;
    }

    const { data, isFetching } = useGetAuthorizeTasksQuery("");

    const open = () => setVisible(true);
    const close = () => setVisible(false);

    const isProjectManager = auth.getRoleId() === 4 ? true : false;

    const buttonTitle = isProjectManager
        ? "Tasks [Awaiting Authorization]"
        : "Tasks [Need Authorization]";

    const badge = () => {
        return _.size(_.filter(data?.data, (d) => !d.approval_status));
    };

    return (
        <div className={styles.task_authorization}>
            <Button
                variant="tertiary"
                onClick={open}
                className={styles.authorize_task}
            >
                <i className="fa-solid fa-hourglass-end" />
                {title || buttonTitle}
                <span className="badge badge-light">{badge()}</span>
            </Button>

            <Modal isOpen={visible}>
                <div className={styles.modal_overlay}>
                    <Card className={styles.card}>
                        <Card.Head onClose={close} className={styles.card_head}>
                            <span>Authorize Task </span>
                        </Card.Head>

                        <Card.Body className={styles.card_body}>
                            <DataTable
                                tableData={
                                    _.orderBy(
                                        data?.data,
                                        "updated_at",
                                        "desc"
                                    ) || []
                                }
                                tableColumns={AuthorizationColumns}
                                tableName="authorize-task-table"
                                isLoading={false}
                                // tableMaxHeight
                            />
                        </Card.Body>
                    </Card>
                </div>
            </Modal>
        </div>
    );
};

TaskAuthorization.propTypes = {
    title: PropTypes.string,
};

export default TaskAuthorization;
