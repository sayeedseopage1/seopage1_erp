import PropTypes from 'prop-types';

const GradientProgressBar = ({ progress, incentive, isAverage }) => {

    const progressBarOuterStyle = {
        width: "100%",
        borderTopRightRadius: ".375rem",
        borderBottomRightRadius: ".375rem",
        backgroundColor: `${incentive > 0 ? "#ffffff" : "#FFDADA"}`,
        overflow: "hidden",
    }
    const progressBarInnerStyle = {
        width: `${isAverage ? incentive : progress}%`,
        height: "15px",
        borderTopRightRadius: ".375rem",
        borderBottomRightRadius: ".375rem",
        background: `${incentive > 0 ? "linear-gradient(to left, #00A0EE, #00A0EE66)" : "linear-gradient(to left, #FF6666, #dd8787)"}`,
    }

    return (
        <div style={progressBarOuterStyle}>
            <div style={progressBarInnerStyle}></div>
        </div>
    );
};

export default GradientProgressBar;

GradientProgressBar.propTypes = {
    progress: PropTypes.number,
    incentive: PropTypes.any,
    isAverage: PropTypes.bool
}