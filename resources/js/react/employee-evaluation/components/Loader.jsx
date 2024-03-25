const Loader = ({
    title = "Loading...",
    width = "16px",
    height = "16px",
    border = "0.14em solid rgba(0, 0, 0, .25)",
    borderRightColor = "transparent",
}) => {
    return (
        <div className="d-flex align-items-center">
            <div
                className="spinner-border text-dark mr-2"
                role="status"
                style={{
                    width,
                    height,
                    border,
                    borderRightColor,
                }}
            />
            <span>{title}</span>
        </div>
    );
};

export default Loader;
