import _ from "lodash";
import React from 'react';
import styles from './styles.module.css';
import Popover from "../global/Popover";
import { useState } from "react";
import Modal from "../global/Modal";
import Button from "../global/Button";

export const TotalUnsolvedDisputeTableColumns = [
    {
        id: "project_id",
        heading: "Project Name",
        moveable: false,
        sort: row => row?.project_name,
        rowSpan: 2,
        marge: true,
        searchText: (row) => `${row['projectId']} ${row['project_name']}`,
        row: ({ row, table }) => {
            const search = table.state.search;
            const text = row?.project_name
            const isEqual = search
                ? _.includes(_.lowerCase(text), _.lowerCase(search))
                : "";

            return (
                <abbr title={text}>
                    <a href={`/account/projects/${row?.projectId}`} className={`singleline-ellipsis ${isEqual ? "highlight" : ""}`}>
                        {text}
                    </a>
                </abbr>
            );
        },
    },
    {
        id: "client_name",
        heading: "Client Name",
        moveable: false,
        sort: row => `${row.client_name}`,
        rowSpan: 2,
        marge: true,
        searchText: (row) => `${row?.client_name}`,
        row: ({ row, table }) => {
            const search = table.state.search;
            const client_name = row?.client_name;
            const isEqual = search
                ? _.includes(_.lowerCase(client_name), _.lowerCase(search))
                : "";

            return (
                <a href={`/account/clients/${row?.clientId}`} className={`singleline-ellipsis ${isEqual ? "highlight" : ""}`}>
                    {client_name}
                </a>
            );
        },
    },
    

    {
        id: "task_title",
        heading: "Task Name",
        moveable: false,
        sort: row => row?.task_title,
        rowSpan: 2,
        searchText: (row) => `${row?.task_title}`,
        row: ({ row, table }) => {
            const search = table.state.search;
            const task_name = row?.task_title;
            const isEqual = search
                ? _.includes(_.lowerCase(task_name), _.lowerCase(search))
                : "";

            return (
                <abbr title={row?.task_title}>
                    <a href={`/account/tasks/${row?.id}`} className={`singleline-ellipsis ${isEqual ? "highlight" : ""}`}>
                        {task_name}
                    </a>
                </abbr>
            );
        },
    },

    {
        id: "revision_request_raised_by",
        heading: "Revision request raised by",
        moveable: false,
        sort: row => row?.revision_raised_by_name,
        rowSpan: 2,
        searchText: (row) => `${row?.revision_raised_by_name}`,
        row: ({ row, table }) => {
            const search = table.state.search;
            const text = row?.revision_raised_by_name;
            const isEqual = search
                ? _.includes(_.lowerCase(task_name), _.lowerCase(search))
                : "";

            return (
                <abbr title={text}>
                    <a 
                        href={`/account/employees/${row?.revision_raised_by_id}`} 
                        className={`singleline-ellipsis ${isEqual ? "highlight" : ""}`}
                    >
                        {text}
                    </a>
                </abbr>
            );
        },
    },

    {
        id: "developer_name",
        heading: "Developers name",
        moveable: false,
        sort: row => row?.task_title,
        rowSpan: 2,
        searchText: (row) => `${row?.task_title}`,
        row: ({ row, table }) => {
            const search = table.state.search;
            const task_name = row?.task_title;
            const isEqual = search
                ? _.includes(_.lowerCase(task_name), _.lowerCase(search))
                : "";

            return (
                <abbr title={row?.task_title}>
                    <a href={`/account/tasks/${row?.id}`} className={`singleline-ellipsis ${isEqual ? "highlight" : ""}`}>
                        {task_name}
                    </a>
                </abbr>
            );
        },
    },

    {
        id: "reason_for_revision",
        heading: "Reason for revision",
        moveable: false,
        sort: row => row?.reason_for_revision,
        rowSpan: 2,
        searchText: (row) => `${row?.reason_for_revision}`,
        row: ({ row, table }) => {
            const search = table.state.search;
            const text = row?.reason_for_revision;
            const isEqual = search
                ? _.includes(_.lowerCase(text), _.lowerCase(search))
                : "";

            return ( 
                <Popover>
                <Popover.Button> <span className={`singleline-ellipsis ${isEqual ? "highlight" : ""}`} >{text} </span> </Popover.Button> 
                <Popover.Panel>
                    <div className={styles.revision_popover_panel}> 
                        {text} 
                    </div>
                </Popover.Panel>
            </Popover>
            );
        },
    },

    {
        id: "dispute_start_date",
        heading: "Dispute start date",
        moveable: false,
        sort: row => row?.task_title,
        rowSpan: 2,
        searchText: (row) => `${row?.task_title}`,
        row: ({ row, table }) => {
            const search = table.state.search;
            const task_name = row?.task_title;
            const isEqual = search
                ? _.includes(_.lowerCase(task_name), _.lowerCase(search))
                : "";

            return (
                <abbr title={row?.task_title}>
                    <a href={`/account/tasks/${row?.id}`} className={`singleline-ellipsis ${isEqual ? "highlight" : ""}`}>
                        {task_name}
                    </a>
                </abbr>
            );
        },
    },
    
    {
        id: "reason_for_dispute",
        heading: "Reason for dispute",
        moveable: false,
        sort: row => row?.task_title,
        rowSpan: 2,
        searchText: (row) => `${row?.task_title}`,
        row: ({ row, table }) => {
            const search = table.state.search;
            const task_name = row?.task_title;
            const isEqual = search
                ? _.includes(_.lowerCase(task_name), _.lowerCase(search))
                : "";

            return ( 
                <Popover>
                    <Popover.Button>
                        Contradictory claims between PM and lead Developer
                    </Popover.Button>

                    <Popover.Panel>
                        <div className={styles.revision_popover_panel}>
                            <div>
                                <h6>Project Manger</h6>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, alias quis! Repudiandae, molestias consectetur. Doloribus cum praesentium id nemo laudantium quam totam quasi. Porro voluptas placeat debitis minus earum quis.</p>
                            </div>

                            <div>
                                <h6>Lead Developer</h6>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, alias quis! Repudiandae, molestias consectetur. Doloribus cum praesentium id nemo laudantium quam totam quasi. Porro voluptas placeat debitis minus earum quis.</p>
                            </div>
                        </div>
                    </Popover.Panel>
                </Popover> 
            );
        },
    }, 

    {
        id: "total_comments",
        heading: "Total comments",
        moveable: false,
        sort: row => row?.disputes_comments,
        rowSpan: 2,
        searchText: (row) => `${row?.disputes_comments}`,
        row: ({ row, table }) => {

            return ( 
                <a
                    href="/account/dispute"
                    onClick={open} 
                >
                    {row?.disputes_comments}
                </a>
            );
        },
    },
];


// Comments
const Comment = ({row}) => {
    const [isOpen, setIsOpen] = useState(false);

    const open = e => {
        e.preventDefault();
        setIsOpen(true);
    }


    const close = () => {
        setIsOpen(false);
    }


    return(
        <React.Fragment>
            <a
                href="#"
                onClick={open}
                className={styles.comment_number}
            >
                {row?.disputes_comments}
            </a>
            <Modal isOpen={isOpen}> 
                <div className="sp1_modal-content-wrapper">
                    <div className="sp1_modal-panel sp1_task_auth_modal_table ">
                        {/* header */}
                        <div className="sp1_modal-head">
                            <div className="sp1_modal-title pl-2"><strong>Dispute Comments</strong></div>
                            <Button onClick={close} aria-label="ModalClose" variant='tertiary' className='sp1_modal-close'>
                                <i className='fa-solid fa-xmark'/>
                            </Button>
                        </div>
                        {/* end header */}

                        {/* body */}
                        <div className={`sp1_modal-body py-3 px-4 ${styles.comment_modal}`}>
                            <div className={styles.comments}>
                                {_.times(10, i => (
                                    <div key={i} className={styles.comment_item}>
                                        <div className={styles.comment_item_header}>
                                            
                                        </div>
                                        <div className={styles.comment_item_body}>
                                            <div>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, assumenda iste vitae exercitationem consequatur libero maiores deserunt quas sed fugit accusantium ducimus natus dicta, cumque animi ullam illo distinctio eaque.
                                            </div>
                                        </div> 
                                    </div>
                                ))}
 
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    )
}
