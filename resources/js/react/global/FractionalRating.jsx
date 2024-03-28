import React from "react";
import Rating from "react-rating";
import styles from "./FractionalRating.module.css";

/**
 * FractionalRating component
 *
 * @param {value} props - value of rating
 * @param {onChange} props - function to change the value of rating
 * @returns  FractionalRating component
 */
const FractionalRating = ({ value, onChange }) => {
    return (
        <Rating
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
                        style={{ color: "gray", fontSize: "20px" }}
                    />
                </div>
            }
            fullSymbol={
                <i
                    className="fas fa-star"
                    style={{ color: "gold", fontSize: "20px" }}
                />
            }
            fractions={4}
            stop={10}
            className={styles.rating}
            onChange={onChange}
            initialRating={value}
            style={{ color: "gold" }}
        />
    );
};

export default FractionalRating;
