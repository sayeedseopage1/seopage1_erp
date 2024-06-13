import { useState } from "react";
import Modal from "../../../../../../ui/Modal";
import Button from "../../../../../../ui/Button";
import style from "../../../../../../styles/required-action-card.module.css";

// modal showing btn and form (it's an UI template)
export default function ModalWithBtnTemplate({
    btn_color,
    btn_name,
    modal_heading,
    children,
    showBottomCloseBtn,
    maxWidth,
    btn_Disable,
}) {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return (
        <>
            <button
                disabled={btn_Disable}
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
}
