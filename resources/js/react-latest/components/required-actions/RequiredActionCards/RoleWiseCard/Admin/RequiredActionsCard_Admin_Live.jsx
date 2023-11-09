import React from "react";
import { MdPendingActions } from "react-icons/md";
import style from "../../../../../styles/required-action-card.module.css";
import dayjs from "dayjs";
import { useEffect } from "react";
import useTimer from "../../../../../hooks/useTimer";
import Modal from "../../../../../ui/Modal";
import { useState } from "react";
import Button from "../../../../../ui/Button";
import { useGetFormDataQuery } from "../../../../../services/api/requiredActionApiSlice";
import Loader from "../../../../../ui/Loader";
import { useRefresh } from "../../../Index";
import axios from "axios";
import { toast } from "react-toastify";
import CKEditorComponent from "../../../../../ui/ckeditor";
import { Placeholder } from "../../../../../ui/Placeholder";
import { FaUserCircle } from "react-icons/fa";

export default function RequiredActionsCard_Admin_Live({ data }) {
    console.log("active card");
    console.log({
        created_at: dayjs(data.created_at).format("DD-MM-YYYY HH:mm:ss"),
    });

    return (
        <div className={style.card_container}>
            {/* card details */}
            <div className={style.details_aside}>
                {/* card body text */}
                <article className={style.article}>
                    {/* card title */}
                    <p className={style.title}>{data.heading}</p>

                    {/* card subtitle */}
                    <p className={style.subtitle}>
                        <span
                            dangerouslySetInnerHTML={{ __html: data.message }}
                        />{" "}
                        {/* from */}
                    </p>

                    {/* card info */}
                    {/* <div className={style.info}>
                        <span>
                            Client :{" "}
                            <a className={style.highlight} href={`http://127.0.0.1:8000/account/clients/${data.client_id}`}>
                                {data.client_name}
                            </a>
                        </span>
                        <span>needs to be authorized"</span>
                    </div> */}
                </article>

                {/* clipboard area */}
                <aside className={style.aside}>
                    {/* action expire time  */}
                    <div className={`${style.action_expire_time} shadow-sm`}>
                        <MdPendingActions
                            className={style.action_expire_time_icon}
                        />
                        <article>
                            <span>
                                {dayjs(data.created_at).format("h:mm A")}
                            </span>
                            <br />
                            <span>
                                {dayjs(data.created_at).format("DD-MM-YYYY")}
                            </span>
                        </article>
                    </div>

                    {/* action count down */}
                    <ShowTimer
                        targetTime={dayjs(data.created_at).add(6, "hours")}
                    />
                </aside>
            </div>

            <div className={style.action}>
                <ActionsButton data={data} />
            </div>
        </div>
    );
}

// timer showing clipboard
const ShowTimer = ({ targetTime }) => {
    const { time } = useTimer(targetTime, {
        stopOnExpire: false,
    });

    useEffect(() => {
        console.log({
            targetTime: dayjs(targetTime).format("DD-MM-YYYY HH:mm:ss"),
        });
        // console.log(time);
    }, []);

    return (
        <div className={`${style.action_count_down} shadow-sm`}>
            <span className={style.highlight}>Time Left</span>
            <article>{`${time.h || 0} hrs ${time.m || 0} min ${
                time.s || 0
            } sec`}</article>
        </div>
    );
};

// action buttons
const ActionsButton = ({ data }) => {
    // window.location.assign();

    // return (
    //     <>
    //         <button className={style.action_btn}>Review</button>
    //         <button className={style.action_btn}>Approve</button>
    //         <button className={style.action_btn}>Deny</button>
    //         <button className={style.action_btn}>Request Modifications</button>
    //     </>
    // );

    return (
        <>
            {data?.button.map((btn, i) => {
                if (btn.button_type === "redirect_url") {
                    return (
                        <button
                            key={i}
                            onClick={() =>
                                window.open(btn.button_url, "_blank")
                            }
                            className={`${style.action_btn} ${
                                style[btn.button_color]
                            }`}
                        >
                            {btn.button_name}
                        </button>
                    );
                } else if (btn.button_type === "modal") {
                    return (
                        <ModalWithBtnTemplate
                            key={i}
                            btn_color={btn.button_color}
                            btn_name={btn.button_name}
                            modal_heading={data.heading}
                            showBottomCloseBtn={false}
                            maxWidth="35rem"
                        >
                            {(setIsOpen) => {
                                // modal form
                                if (btn?.modal_form) {
                                    return (
                                        <ModalForm
                                            setIsOpen={setIsOpen}
                                            btn_data={btn}
                                        />
                                    );
                                }
                            }}
                        </ModalWithBtnTemplate>
                    );
                }
            })}
        </>
    );
};

// modal showing btn and form (it's an UI template)
const ModalWithBtnTemplate = ({
    btn_color,
    btn_name,
    modal_heading,
    children,
    showBottomCloseBtn,
    maxWidth,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return (
        <>
            <button
                onClick={open}
                className={`${style.action_btn} ${style[btn_color]}`}
            >
                {btn_name}
            </button>

            <Modal
                isOpen={isOpen}
                // isOpen={true}
                className="sp1_mark-as--modal"
                closeModal={close}
            >
                <div className="sp1_single_task--modal-panerl-wrapper">
                    <div
                        className="sp1_mark-as--modal-panel"
                        style={{ overflow: "visible", maxWidth: maxWidth }}
                    >
                        {/* heading bar */}
                        <div className="sp1_mark-as--modal-heading">
                            <h6 className="mb-0">{modal_heading}</h6>

                            <Button aria-label="closeModal" onClick={close}>
                                <i className="fa-solid fa-xmark" />
                            </Button>
                        </div>

                        {/* body */}
                        <div
                            className="sp1_mark-as--modal-body px-3"
                            style={{ overflow: "visible" }}
                        >
                            {/* modal body  */}
                            {children(setIsOpen)}

                            {showBottomCloseBtn && (
                                <Button
                                    variant="tertiary"
                                    className="ml-auto mr-2"
                                    onClick={close}
                                >
                                    Close
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </Modal>
        </>
    );
};

// modal form
const ModalForm = ({ setIsOpen, btn_data }) => {
    const { setRefresh } = useRefresh();
    const [loading, setLoading] = useState(false);
    const { data, isFetching, isLoading } = useGetFormDataQuery(
        btn_data.button_url
    );
    const [formData, setFormData] = useState({});

    useEffect(() => {
        [...btn_data.form].forEach((input) => {
            if (input?.type === "hidden") {
                setFormData((prev) => {
                    return {
                        ...prev,
                        [input.name]: input.value,
                    };
                });
            }
        });
    }, [btn_data]);

    const handleSubmit = async ({ url, method } = { url: "", method: "" }) => {
        setLoading(true);
        let emptyRequiredField = 0;
        [...btn_data.form].forEach((input) => {
            if (input?.type !== "hidden" && input?.required) {
                console.log({ [input.name]: formData[input.name] });
                if (!formData[input.name]) {
                    emptyRequiredField++;
                }
                console.log({ emptyRequiredField });
            }
        });

        if (emptyRequiredField > 0) {
            toast.error("Please input all required field");
            setLoading(false);
            return;
        }

        console.log({ url, method, formData });
        setIsOpen(false);
        setLoading(false);

        // try {
        //     await axios[method.toLowerCase()](url, formData);
        //     toast.success("Submitted Sucessfully");
        // } catch (err) {
        //     toast.error("Not submitted");
        // } finally {
        //     setRefresh();
        //     setIsOpen(false);
        //     setLoading(false);
        // }
    };

    const handleEditorText = (e, editor, key_name) => {
        console.log({e,editor});
        const text = editor.getData();
        setFormData((prev) => ({ ...prev, [key_name]: text }));
    };

    return (
        <div>
            <section className={style.form_text_container}>
                <ProjectCallange
                    data={data?.challenge}
                    loading={isFetching || isLoading}
                />
            </section>

            <section className={style.form_input_container}>
                {[...btn_data.form].map((input, i) => {
                    if (input.type === "textarea") {
                        return (
                            <label
                                key={i}
                                className={style.form_textArea_label}
                            >
                                <span>
                                    <b>{input.label} :</b>{" "}
                                    <b style={{ color: "red" }}>
                                        * This field is Required
                                    </b>
                                </span>
                                <div
                                    className="sp1_st_write_comment_editor"
                                    style={{
                                        minHeight: "100px",
                                        width: "100%",
                                    }}
                                >
                                    <CKEditorComponent
                                        onChange={(e, editor) =>
                                            handleEditorText(
                                                e,
                                                editor,
                                                input.name
                                            )
                                        }
                                    />
                                </div>
                            </label>
                        );
                    }
                })}
            </section>

            <section className={style.form_btn_container}>
                {[...btn_data.form_action].map((btn, i) => {
                    console.log({ btn });
                    return (
                        <Button
                            key={i}
                            variant={btn.color}
                            disabled={loading}
                            size="sm"
                            onClick={() =>
                                handleSubmit({
                                    method: btn.method,
                                    url: btn.url,
                                })
                            }
                        >
                            {btn.label}
                        </Button>
                    );
                })}
            </section>
        </div>
    );
};

const ProjectCallange = ({ data, loading }) => {
    if (loading) {
        return (
            <div className={`sp1_st--approve-card mb-3`}>
                <div className="sp1_st--approve-card-header">
                    <Placeholder />
                </div>

                <div className="sp1_st--approve-card-body">
                    <div className="mb-2">
                        <div
                            className="font-weight-bold f-12"
                            style={{ color: "#81868E" }}
                        >
                            <Placeholder />
                        </div>
                    </div>

                    <div className="mb-2">
                        <div
                            className="font-weight-bold f-12"
                            style={{ color: "#81868E" }}
                        >
                            <Placeholder />
                        </div>
                        <div className="sp1_ck_content py-2">
                            <Placeholder />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`sp1_st--approve-card mb-3`}>
            <div className="sp1_st--approve-card-header">
                {data?.project_name.toUpperCase()}
            </div>

            <div className="sp1_st--approve-card-body">

                <div className="mb-2">
                    <div
                        className="font-weight-bold f-12"
                        style={{
                            color: "#81868E",
                            display: "inline-flex",
                            gap: "5px",
                            alignItems: "center",
                        }}
                    >
                        <span>Project Manager :</span>
                        <span style={{display:'inline-flex',gap:'3px',alignItems:'center'}}>
                            <FaUserCircle
                                style={{ height: "15px", width: "15px" }}
                            />
                            <a
                                className={style.highlight}
                                href={`http://127.0.0.1:8000/account/employees/${data.project_manager_id}`}
                            >
                                {data.project_manager_name}
                            </a>
                        </span>
                    </div>
                </div>

                <div className="mb-2">
                    <div
                        className="font-weight-bold f-12"
                        style={{
                            color: "#81868E",
                            display: "inline-flex",
                            gap: "5px",
                            alignItems: "center",
                        }}
                    >
                        <span>Client :</span>
                        <span style={{display:'inline-flex',gap:'3px',alignItems:'center'}}>
                            <FaUserCircle
                                style={{ height: "15px", width: "15px" }}
                            />
                            <a
                                className={style.highlight}
                                href={`http://127.0.0.1:8000/account/clients/${data.clientId}`}
                            >
                                {data.client_name}
                            </a>
                        </span>
                    </div>
                </div>

                <div className="mb-2">
                    <div
                        className="font-weight-bold f-12"
                        style={{ color: "#81868E" }}
                    >
                        Comments :
                    </div>
                    <div
                        className="sp1_ck_content p-2 ml-3"
                        dangerouslySetInnerHTML={{
                            __html: data.comments,
                        }}/>
                </div>

                <div className="mb-2">
                    <div
                        className="font-weight-bold f-12"
                        style={{ color: "#81868E" }}
                    >
                        Project Challenge :
                    </div>
                    <div
                        className="sp1_ck_content p-2 ml-3"
                        dangerouslySetInnerHTML={{
                            __html: data?.project_challenge ?? '<span>No project challanges</span>',
                        }}/>
                </div>
            </div>
        </div>
    );
};
