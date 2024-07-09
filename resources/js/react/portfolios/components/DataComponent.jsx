import React from "react";

const DataComponent = ({
    label,
    value,
    fontSize = "14px",
    color,
    backgroundColor,
    minWidth = "100%",
    flexGrow,
    children,
}) => {
    return (
        <div style={{ flexGrow: flexGrow ?? 0, minWidth: minWidth }}>
            <strong style={{ fontSize: fontSize, marginBottom: "10px" }}>
                {label}
            </strong>
            <div
                style={{
                    color: color,
                    backgroundColor: backgroundColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    height: "60px",
                    padding: "5px 10px",
                    borderRadius: "6px",
                }}
            >
                {children} {value}
            </div>
        </div>
    );
};

export default DataComponent;
