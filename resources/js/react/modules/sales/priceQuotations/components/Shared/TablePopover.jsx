import React from "react";
import PropTypes from "prop-types";

// UI Components - Custom
import Popover from "./Popover";
import style from "./popover.module.css";

const TablePopover = ({ text, isDangerHtml = false, btnClass = "" }) => {
    return (
        <Popover>
            <Popover.Button>
                {isDangerHtml ? (
                    <div
                        className={`${style.projectStatus_percent_popover_button} ${btnClass} multine-ellipsis`}
                        dangerouslySetInnerHTML={{
                            __html: text ?? "--",
                        }}
                    />
                ) : (
                    <div
                        className={`${style.projectStatus_percent_popover_button} ${btnClass}  multine-ellipsis`}
                    >
                        {text ?? "--"}
                    </div>
                )}
            </Popover.Button>
            {text && (
                <Popover.Panel>
                    {isDangerHtml ? (
                        <div
                            className={`${style.projectStatus_popover_panel}`}
                            dangerouslySetInnerHTML={{
                                __html: text,
                            }}
                        />
                    ) : (
                        <div className={`${style.projectStatus_popover_panel}`}>
                            {text ?? "--"}
                        </div>
                    )}
                </Popover.Panel>
            )}
        </Popover>
    );
};

export default TablePopover;

TablePopover.propTypes = {
    text: PropTypes.string,
    isDangerHtml: PropTypes.bool,
    btnClass: PropTypes.string,
};
