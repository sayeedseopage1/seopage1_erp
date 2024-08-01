import React, { useEffect } from "react";

const useWhyDidYouRender = (componentName) => {
    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            const whyDidYouRender = require("@welldone-software/why-did-you-render");
            whyDidYouRender(React, {
                trackAllPureComponents: true,
                trackHooks: false,
                logOwnerReasons: true,
                titleColor: "green",
                diffNameColor: "aqua",
                diffPathColor: "purple",
                notification: {
                    title: "why-did-you-render",
                    color: "blue",
                },
                include: [new RegExp(componentName)],
            });
        }
    }, [componentName]);
};

export default useWhyDidYouRender;