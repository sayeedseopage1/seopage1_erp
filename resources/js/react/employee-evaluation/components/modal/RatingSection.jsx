import React from "react";
import FractionalRating from "../../../global/FractionalRating";
import { BsQuestionCircleFill } from "react-icons/bs";
import Popover from "../../../../react-latest/ui/Popover";
Popover;
const RatingSection = ({ label, value, onChange, hoverText }) => {
    return (
        <section>
            <label
                style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    display: "flex",
                }}
            >
                <div>{label}</div>

                <Popover>
                    <Popover.Button>
                        <span className=" singleline-ellipsis">
                            <span className="ml-1 pe-auto">
                                <BsQuestionCircleFill />
                            </span>
                        </span>
                    </Popover.Button>

                    <Popover.Panel>
                        <div className="revision_popover_panel">
                            <span>{hoverText}</span>
                        </div>
                    </Popover.Panel>
                </Popover>
            </label>
            <div className="d-flex flex-row">
                <div className="pr-2">
                    <FractionalRating value={value} onChange={onChange} />
                </div>
                {value && (
                    <div
                        className="rating"
                        style={{ fontSize: "18px", width: "20px" }}
                    >
                        {`(${value})`}
                    </div>
                )}
                {!value && (
                    <div
                        className="rating"
                        style={{ fontSize: "18px", width: "20px" }}
                    ></div>
                )}
            </div>
            {/* {error && <p className="error">{error}</p>} */}
        </section>
    );
};

export default RatingSection;
