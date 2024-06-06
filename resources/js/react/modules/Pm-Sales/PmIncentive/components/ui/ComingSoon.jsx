import '../../styles/ComingSoon.css';
import PropTypes from 'prop-types';

const ComingSoon = ({ pageName }) => {
    return (
        <div className="coming-soon-container">
            <div className="coming-soon-content">
                <h1 className="coming-soon-title">{pageName} Coming Soon</h1>
                <p className="coming-soon-text">Our website is under construction. We&apos;ll be back soon!</p>
                <div className="divider-container">
                    <div className="divider"></div>
                </div>
                <p className="coming-soon-subtext">Stay tuned for updates.</p>
            </div>
        </div>
    );
};

export default ComingSoon;

ComingSoon.propTypes = {
    pageName: PropTypes.string
};
