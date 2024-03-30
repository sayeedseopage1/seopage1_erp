import React from "react";

const CommentFilter = ({ hideComments, setHideComments }) => {
    return (
        <div style={{ marginTop: "15px", marginLeft: "20px" }}>
            <input
                type="checkbox"
                name=""
                id=""
                checked={hideComments}
                onChange={() => setHideComments(!hideComments)}
            />
            <label style={{ marginLeft: "5px" }}>
                {hideComments
                    ? "Unmark checkbox to show comments"
                    : "Mark checkbox to hide comments"}
            </label>
        </div>
    );
};

export default CommentFilter;
