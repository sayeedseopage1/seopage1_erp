import React from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './error.module.css';


const ERROR = ({
    statusCode = 400,
    title="",
    message = 'Page not found',
}) => {
  return ReactDOM.createPortal(
    <div className={styles.container}>
        <div className={styles.content}>
            <h1 className={styles.statusCode}> {statusCode} </h1>
            <div className={styles.content_text}>
                <h2>{title}</h2>
                {message ? <p>{message}</p> : null}
            </div>

            <a href='/account/dashboard' className={styles.button}>
            <i className="fa-solid fa-arrow-left"/> Go Back Home</a>
        </div>
    </div>
  , document.getElementById('body'))
}

ERROR.propTypes = {
    statusCode: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string,
}

export default ERROR

