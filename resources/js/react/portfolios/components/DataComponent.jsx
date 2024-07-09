import React from "react";

const DataComponent = ({
    label,
    value,
    fontSize = "14px",
    color,
    backgroundColor,
    width = "100%",
    marginTop = "10px",

    children,
}) => {
    return (
        <div style={{ width: width }}>
            <strong style={{ fontSize: fontSize }}>{label}</strong>
            <div
                style={{
                    color: color,
                    backgroundColor: backgroundColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    height: "50px",
                    padding: "5px 10px",
                    borderRadius: "6px",
                    marginTop: `${marginTop}`,
                    marginBottom: "10px",
                }}
            >
                {children} {value}
            </div>
        </div>
    );
};

export default DataComponent;
