import React from "react";
import FractionalRating from "../../../../../../react/global/FractionalRating";

const ReusableSection = ({ label, value, onChange }) => {
    return (
        <section>
            <label>{label}</label>
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

export default ReusableSection;
