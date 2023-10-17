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
import { Link, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import Loader from "../../global/Loader";
import { Placeholder } from "../../global/Placeholder";

const TaskAuthorization = ({ title }) => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    if (!_.includes([1, 4, 8], auth.getRoleId())) {
        return null;
    }

    const { data, isFetching } = useGetAuthorizeTasksQuery("");

    const open = () => {
        searchParams.set('modal', 'authorize_task')
        searchParams.set('show', 'pending')
        setSearchParams(searchParams);
    };


    const handleTabNavigation = (e, params) => {
        e.preventDefault();

        for(const[key, value] of Object.entries(params)){
            searchParams.set(key,value);
        }
        setSearchParams(searchParams);

    }

    const close = () => {
        searchParams.delete('modal')
        searchParams.delete('show')

        setSearchParams(searchParams);
    }

    const isProjectManager = auth.getRoleId() === 4 ? true : false;

    const buttonTitle = isProjectManager
        ? "Tasks [Awaiting Authorization]"
        : "Tasks [Need Authorization]";

    const badge = () => {
        return _.size(_.filter(data?.data, (d) => d?.approval_status === null));
    };


    const getData = () => {
        let _data = _.orderBy(
            data?.data,
            "updated_at",
            "desc"
        ) || [];

        switch (searchParams.get('show')) {
            case 'all':
                return _data;
            case 'pending':
                return _.filter(_data, data => data.approval_status === null);
            case 'denied':
                return _.filter(_data, data => data.approval_status === 0);
            case 'authorized':
                return _.filter(_data, data => data.approval_status === 1);
            default:
               return _.filter(_data, data => data.approval_status === null);
        }

    }

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

            <Modal isOpen={searchParams.get('modal') === 'authorize_task'}>
                <div className={styles.modal_overlay}>
                    <Card className={styles.card}>
                        <Card.Head onClose={close} className={styles.card_head}>
                            <span>Authorize Task </span>
                        </Card.Head>

                        <Card.Body className={styles.card_body}>

                            <div className={styles.tabs}>
                                <Link to='#' onClick={(e) => handleTabNavigation(e, {modal: 'authorize_task', show: 'all'})} data-type="all" data-active={searchParams.get('show') === 'all'}>All</Link>
                                <Link to='#' onClick={(e) => handleTabNavigation(e, {modal: 'authorize_task', show: 'pending'})} data-type="pending" data-active={searchParams.get('show') === 'pending'}>Pending</Link>
                                <Link to='#' onClick={(e) => handleTabNavigation(e, {modal: 'authorize_task', show: 'authorized'})} data-type="authorized" data-active={searchParams.get('show') === 'authorized'}>Authorized</Link>
                                <Link to='#' onClick={(e) => handleTabNavigation(e, {modal: 'authorize_task', show: 'denied'})} data-type="denied" data-active={searchParams.get('show') === 'denied'}>Denied</Link>
                            </div>

                            <DataTable
                                tableData={[...getData()]}
                                tableColumns={AuthorizationColumns}
                                tableName="authorize-task-table"
                                isLoading={isFetching}
                                loader={<LoaderComponent columns = {AuthorizationColumns} />}
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

const LoaderComponent = ({columns}) => {
    return (
        _.times(10, item => (
            <tr key={item} className={`sp1-data-table-tr`}>
                {_.map(columns, col => (
                    <td key={col.id} className={`sp1-data-table-td`}>
                        <Placeholder width="100%" />
                    </td>
                ))}
            </tr>
        ))
    )
}
