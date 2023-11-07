import React, { useEffect, useLayoutEffect } from "react";
import Modal from "../../../global/Modal";
import Button from "../../../global/Button";
import styles from "./ResolveBtnPopupText.module.css";
import { useAuth } from '../../../hooks/useAuth'

export default function ResolveBtnPopupText({ isOpen, close, timer = 20 }) {
    const [count, setCount] = React.useState(timer);
    const auth = useAuth();

    if(auth.getRoleId() !== 1 && auth.getRoleId() !== 8){
        return null;
    }

    useEffect(() => {
        let c = timer;
        const interval = setInterval(() => {
            if(c > 0){
                c--;
                setCount(c);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [])

    return (
        <Modal isOpen={isOpen} className="sp1_mark-as--modal">
            <div
                className={`sp1_single_task--modal-panerl-wrapper ${styles.wrapper}`}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {/* <div className="loader"></div> */}
                <div
                    className="sp1_mark-as--modal-panel"
                    style={{
                        overflow: "visible",
                        maxWidth: "50rem",
                        width: "100%",
                    }}
                >
                    {/* heading bar */}
                    <div className="sp1_mark-as--modal-heading">
                        <h6
                            className="mb-0 ml-2"
                            style={{ fontStyle: "normal", fontWeight: "bold" }}
                        >
                            Please keep the following things in mind when
                            resolving a dispute:{" "}
                        </h6>

                        <Button
                            aria-label="closeModal"
                            onClick={close}
                            disabled={count > 0}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "10px",
                            }}
                        >
                            {count > 0 ? count : <i className="fa-solid fa-xmark" />}
                        </Button>
                    </div>

                    {/* body */}
                    <div
                        className="sp1_mark-as--modal-body px-3"
                        style={{ overflow: "visible" }}
                    >
                        <div className={styles.list_container}>
                            <ul className={styles.list}>
                                <li>
                                    The project managers will have a tendency to
                                    blame clients for whatever revisions they
                                    will have. Reject as many as those claims as
                                    you realistically can. Only hold clients
                                    responsible if its clearly evident in all
                                    the aspects. Holding clients responsible in
                                    bulk wont help our cause, instead comment
                                    how they could make sure the client couldnt
                                    give such revisions citing such reasons
                                    after delivery.
                                </li>

                                <li>
                                    Holding 2 persons responsible partially is
                                    something we kept arrangement in our system
                                    but this is not something we prefer to
                                    choose in bulk. Only use this if it’s an
                                    absolute necessity. For example, if someone
                                    is 90% responsible, hold him responsible
                                    fully. In other words, try not to use this
                                    feature to best of your ability as this will
                                    make the responsible person feel someone
                                    else also has been accused after all his
                                    mitakes and he will be encouraged to
                                    continue doing such things in the future.
                                </li>

                                <li>
                                    Be neutral when resolving the disputes.
                                    There can be conflict of interests specially
                                    when resolving the dispute between sales
                                    team and other parties. Try staying neural
                                    so there is no complain.
                                </li>

                                <li>
                                    The objective of these disputes is to keep
                                    pressure on on various parties so they
                                    remain careful while they work and submit
                                    solid work which will have zero/minimal
                                    revisions. So it’s better to close/resolve
                                    these dispute with as less meetings/comments
                                    exchanges as you can. In the dispute inner
                                    page, we have kept arrangements for every
                                    information that you may need when resolving
                                    a dispute. However, its ideal that the
                                    verdict is solid and go to any extent to
                                    make that happen.
                                </li>

                                <li>
                                    Be smart and make sure you don’t get
                                    convinced by someone trying to fool/outsmart
                                    you and have the verdict in their favor by
                                    bringing in various nonsensical logics in
                                    the table. All of us often experience such
                                    things when handling employees. If this
                                    can’t be ensured, some employees with
                                    relatively low performance will keep having
                                    higher performance scores.
                                </li>

                                <li>
                                    For any unique case that you are not sure of
                                    a solution or may have adverse affect if the
                                    verdict is given against the persons you
                                    think are responsible, consult with the
                                    management instead of making an unsure
                                    decision.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
