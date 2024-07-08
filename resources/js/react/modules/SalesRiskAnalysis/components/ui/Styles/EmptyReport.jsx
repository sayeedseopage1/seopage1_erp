import React from "react";
import emptyImage from "../../../../../../../../public/img/Nodata-amico.svg";

const EmptyReport = () => {
    return (
        <img
            src={emptyImage}
            alt="empty report"
            style={{ width: "100%", maxWidth: "30%", transition: "all 0.3s" }}
        />
    );
};

export default EmptyReport;
