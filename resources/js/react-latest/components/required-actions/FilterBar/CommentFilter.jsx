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
                style={{
                    marginRight: "5px",
                    width: "20px",
                    height: "20px",
                    border: "1px solid #000",
                    borderRadius: "3px",
                    backgroundColor: hideComments ? "#ccc" : "#fff",
                    cursor: "pointer",
                }}
            />

            <label style={{ marginLeft: "5px", fontSize: "18px" }}>
                {hideComments
                    ? "Unmark checkbox to show comments"
                    : "Mark checkbox to hide comments"}
            </label>
        </div>
    );
};

export default CommentFilter;
