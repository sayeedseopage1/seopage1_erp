import "./rating.css";

const RatingInput = ({
    totalRating = 5,
    starClass = "",
    starWidth = 16,
    containerClass = "",
    gap = 10,
}) => {
    let width = ((totalRating * starWidth) + (gap*(totalRating -1))) + 'px';
    let height = starWidth+3 + 'px';

    return (
        <div
            className={`sp1_rating_input_control ${containerClass}`}
            style={{ width, height}}
        >
            <div
                className={`sp1_rating--star ${starClass}`}
                style={{ gap: `${gap}px`, width: "100%" }}
            >
                {[...Array(totalRating)].map((_, i) => (
                    <i key={i} className="fa-regular fa-star"></i>
                ))}
            </div>

            <div
                className={`sp1_rating--star sp1_rating--star-fill ${starClass}`}
                style={{ gap: `${gap}px`, width: "100%" }}
            >
                {[...Array(totalRating)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star"></i>
                ))}
            </div>
        </div>
    );
};

export default RatingInput;
