import React from "react";
import FractionalRating from "../../../global/FractionalRating";

const RatingSectionStatic = ({ label, value, onChange }) => {
    return (
        <section>
            <label>{label}</label>
            <div className="d-flex flex-row">
                <div className="pr-2">
                    <FractionalRating value={value} readonly={true} />
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

export default RatingSectionStatic;
