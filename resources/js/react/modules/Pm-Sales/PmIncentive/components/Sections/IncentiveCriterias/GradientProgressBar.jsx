const GradientProgressBar = ({ progress, incentive }) => {
    // const progressBarWidth = `${progress}%`;

    const progressBarOuterStyle = {
        width: "100%",
        borderTopRightRadius: ".375rem",
        borderBottomRightRadius: ".375rem",
        backgroundColor: `${progress > 0 ? "#ffffff" : "#FFDADA"}`,
        overflow: "hidden",
    }
    const progressBarInnerStyle = {
        width: `${progress}%`,
        height: "15px",
        borderTopRightRadius: ".375rem",
        borderBottomRightRadius: ".375rem",
        background: `${progress > 0 ? "linear-gradient(to left, #00A0EE, #00A0EE66)" : "linear-gradient(to left, #FF6666, #dd8787)"}`,
    }

    return (
        <div style={progressBarOuterStyle}>
            <div style={progressBarInnerStyle}></div>
        </div>
    );
};

export default GradientProgressBar;