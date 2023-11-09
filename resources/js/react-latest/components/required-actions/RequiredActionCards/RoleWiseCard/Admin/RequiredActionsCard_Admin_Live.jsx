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
                        >
                            {(() => {
                                if (btn?.modal_form) {
                                    return (setIsOpen) => (
                                        <ModalForm
                                            setIsOpen={setIsOpen}
                                            btn_data={btn}
                                        />
                                    );
                                }
                            })()}
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
                className="sp1_mark-as--modal "
                closeModal={close}
            >
                <div className="sp1_single_task--modal-panerl-wrapper">
                    <div
                        className="sp1_mark-as--modal-panel"
                        style={{ overflow: "visible", maxWidth: "70rem" }}
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

                            <Button
                                variant="tertiary"
                                className="ml-auto mr-2"
                                onClick={close}
                            >
                                Close
                            </Button>
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
    const { data, isFetching, isLoading } = useGetFormDataQuery(
        data.button_url
    );
    return <form>{(isFetching || isLoading) && <Loader />}
        {
            // [...data.form].map((input)=>{
            //   if (input.type==="textarea") {
            //     input
            //   }
            // })
        }
    </form>;
};
