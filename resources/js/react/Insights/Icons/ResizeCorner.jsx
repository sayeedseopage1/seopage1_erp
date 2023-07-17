import PropTypes from 'prop-types';

const ResizeCorner = ({className}) => {
    return(
        <svg width="10" height="10" className={className}><g fill="none"><path d="M-3-3h16v16H-3z"></path><path fill="#747678" d="M9 2a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0-4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0-4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path></g></svg>
    )
}

ResizeCorner.propTypes = {
    className: PropTypes.string
}

export default ResizeCorner;