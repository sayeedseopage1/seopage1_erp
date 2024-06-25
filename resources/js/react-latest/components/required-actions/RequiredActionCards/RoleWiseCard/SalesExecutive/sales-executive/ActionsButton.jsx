
import React  from "react";

// styles
import style from "../../../../../../styles/required-action-card.module.css";

// utils
import handleBtnDisable from "../../../../utils/handleBtnDisable";

// action buttons
const ActionsButton = ({ data }) => {

    return (
        <>
            {data?.button?.map((btn, i) => {
                if (btn.button_type === "redirect_url") {
                    return (
                        <button
                            disabled={handleBtnDisable(7)}
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
                }
            })}
        </>
    );
};

export default React.memo(ActionsButton);
