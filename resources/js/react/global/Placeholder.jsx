export const Placeholder = ({
    width = "100%",
    height = 16,
    className = "",
    type = "square",
}) => {
    return (
        <div
            className={`skeleton-loading ${className}`}
            style={{
                width,
                height,
                borderRadius: type === "circle" ? "50%" : "4px",
            }}
        />
    );
};

