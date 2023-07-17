import React from "react";
import ContentLoader from "react-content-loader";

const HistoryLoader = (props) => (
    <ContentLoader
        speed={2}
        width={450}
        height={45}
        viewBox="0 0 450 45"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="0" rx="0" ry="0" width="46" height="48" />
        <rect x="62" y="29" rx="0" ry="0" width="227" height="12" />
        <rect x="60" y="5" rx="0" ry="0" width="344" height="12" />
    </ContentLoader>
);

export default HistoryLoader;
