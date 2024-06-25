import React from "react";
import Rating from "react-rating";

/**
 * FractionalRating component
 *
 * @param {value} props - value of rating
 * @param {onChange} props - function to change the value of rating
 * @returns  FractionalRating component
 */
const FractionalRating = ({ value, onChange, readonly = true, stop = 10 }) => {
    return (
        <Rating
            readonly={readonly}
            emptySymbol={
                <div
                    style={{
                        width: "22px",
                        height: "21px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "5px",
                    }}
                >
                    <i
                        className="far fa-star"
                        style={{ color: "#BCC5D3", fontSize: "20px" }}
                    />
                </div>
            }
            fullSymbol={
                <i
                    className="fas fa-star"
                    style={{ color: "#E60379", fontSize: "20px" }}
                />
            }
            fractions={4}
            stop={stop}
            className='project_card_react_rating'
            // onChange={onChange}
            initialRating={value}
            style={{ color: "#E60379" }}
        />
    );
};

export default FractionalRating;
