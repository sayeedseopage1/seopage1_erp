import { ConfigProvider } from "antd";
import PropTypes from "prop-types";

import React from "react";

const AntdConfigProvider = ({ children }) => {
    const theme = {
        components: {
            Switch: {
              handleBg: "#fff",
            },
        },
    };

    return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
};

export default AntdConfigProvider;

AntdConfigProvider.propTypes = {
    children: PropTypes.node,
};
