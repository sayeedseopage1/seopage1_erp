import ModalForm from "./ModalForm";
import ModalWithBtnTemplate from "./ModalWithBtnTemplate";
import style from "../../../../../../styles/required-action-card.module.css";
import handleBtnDisable from "../../../../utils/handleBtnDisable";

// action buttons
export default function ActionsButton({ data }) {
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
            {data?.button?.map((btn, i) => {
                if (btn.button_type === "redirect_url") {
                    return (
                        <button
                            disabled={handleBtnDisable(5)}
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
                            btn_Disable={handleBtnDisable(5)}
                        >
                            {(setIsOpen) => {
                                // modal form
                                if (btn?.modal_form) {
                                    return (
                                        <ModalForm
                                            setIsOpen={setIsOpen}
                                            form_data={btn}
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
}
