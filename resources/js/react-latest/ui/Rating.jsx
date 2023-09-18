const Rating = ({ rating, className = "", iconClassName = "" }) => {
    return (
        <>
            {[...Array(5)].map((r, idx) =>
                idx <= parseInt(rating) - 1 ? (
                    <i
                        key={idx}
                        className="fa-solid fa-star"
                        style={{ color: "#FFA500" }}
                    />
                ) : rating - parseInt(rating) > 0 &&
                  idx === parseInt(rating) ? (
                    <i
                        key={idx}
                        className="fa-solid fa-star-half-stroke"
                        style={{ color: "#FFA500" }}
                    />
                ) : (
                    <i
                        key={idx}
                        className="fa-regular fa-star"
                        style={{ color: "#b9b9b9" }}
                    />
                )
            )}
        </>
    );
};

export default Rating;
