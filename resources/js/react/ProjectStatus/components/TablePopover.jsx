import React from "react";
import Popover from "./ui/Popover";
import style from "./ui/popover.module.css";

const TablePopover = ({ text, isDangerHtml = false }) => {
    return (
        <Popover>
            <Popover.Button>
                {isDangerHtml ? (
                    <div
                        className={`${style.projectStatus_percent_popover_button} multine-ellipsis`}
                        dangerouslySetInnerHTML={{
                            __html: text ?? "--",
                        }}
                    />
                ) : (
                    <div
                        className={`${style.projectStatus_percent_popover_button} multine-ellipsis`}
                    >
                        {text ?? "--"}%
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
