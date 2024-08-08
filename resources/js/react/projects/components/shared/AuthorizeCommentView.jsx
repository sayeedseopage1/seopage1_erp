import React from "react";
import PropTypes from "prop-types";

// Components - Global
import Switch from "../../../global/Switch";

// Helper
import { htmlTagRegex } from "../../helper";

const AuthorizeCommentView = ({ comment , className ="" }) => {
    return (
        <div className={`d-flex ${className}`}>
            <div className="authorizeCommentViewWrapper">
                <h6>Authorize Comment:</h6>
                <Switch>
                    <Switch.Case condition={htmlTagRegex.test(comment)}>
                        <div dangerouslySetInnerHTML={{ __html: comment }} />
                    </Switch.Case>
                    <Switch.Case condition={!htmlTagRegex.test(comment)}>
                        <p>{comment}</p>
                    </Switch.Case>
                    <Switch.Case condition={comment === null}>
                        <p className="d-flex justify-content-start align-items-center">
                            --
                        </p>
                    </Switch.Case>
                </Switch>
            </div>
        </div>
    );
};

export default AuthorizeCommentView;

AuthorizeCommentView.propTypes = {
    comment: PropTypes.string,
    className: PropTypes.string,
};
