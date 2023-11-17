import React from "react";
import { useState, useRef } from "react";
import Modal from "./Modal";
import { useClickAway } from "react-use";
import _ from "lodash";
import { useSelector } from "react-redux";

const Guideline = ({ text, editorContainerClass, workEnv }) => {
    const { task } = useSelector((s) => s.subTask);
    const [expend, setExpend] = useState(false);
    let isLong = text?.length > 400;
    const showText = isLong ? text.slice(0, 400) + "..." : text;
    const ref = useRef();

    const handleExpend = (e) => {
        e.preventDefault();
        setExpend(!expend);
    };

    useClickAway(ref, () => {
        setExpend(false);
    });

    return (
        <div className="sp1_task_card--sub-card">
            <div
                className={`sp1_ck_content sp1_guideline_text ${editorContainerClass}`}
                dangerouslySetInnerHTML={{ __html: showText }}
            ></div>
            {isLong ? (
                <a href="#" onClick={handleExpend} className="">
                    {" "}
                    Read full description{" "}
                </a>
            ) : (
                ""
            )}

            <Modal className="sp1_task_card--sub-card-modal" isOpen={expend}>
                <div
                    ref={ref}
                    className="sp1_task_card--sub-card-modal-content"
                >
                    <div className="d-flex align-items-center justify-content-between __header">
                        <button onClick={() => setExpend(false)}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    {!_.isEmpty(workEnv) ? (
                        <div className="sp1_task_card--sub-card m-4">
                            <div
                                className="px-4 py-3"
                                style={{ background: "#F3F5F9" }}
                            >
                                <h6 className="mb-2">Working Environment</h6>
                                <hr />
                                <div className="row">
                                    <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                        <span>
                                            <strong>
                                                Working/Staging Site's URL
                                            </strong>
                                            : <br />{" "}
                                            <a
                                                target="__blank"
                                                href={workEnv?.site_url}
                                            >
                                                View on new tab
                                            </a>
                                        </span>
                                    </div>

                                    <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                        <span>
                                            <strong>Frontend Password</strong>:{" "}
                                            <br /> {workEnv?.frontend_password}
                                        </span>
                                    </div>

                                    <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                        <span>
                                            <strong>
                                                Working/Staging Site's Login URL
                                            </strong>
                                            : <br />{" "}
                                            <a
                                                target="__blank"
                                                href={workEnv?.login_url}
                                            >
                                                View on new tab
                                            </a>{" "}
                                        </span>
                                    </div>

                                    <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                        <span>
                                            <strong>
                                                Working/Staging Site's
                                                Username/Email
                                            </strong>
                                            : <br /> {workEnv?.email}
                                        </span>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-4 mb-2 word-break">
                                        <span>
                                            <strong>Password</strong>: <br />{" "}
                                            {workEnv?.password}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}

                    <div className="__content">
                        <div
                            className={`sp1_ck_content word-break ${editorContainerClass}`}
                            dangerouslySetInnerHTML={{ __html: text }}
                        />
                    </div>

                    <div className=" __footer">
                        <button
                            className="btn btn-sm py-1 btn-primary ml-auto"
                            onClick={() => setExpend(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Guideline;
