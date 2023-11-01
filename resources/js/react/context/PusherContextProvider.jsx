import * as React from 'react'

const PusherContext = React.createContext(null); // pusher context

export const usePusher = () => React.useContext(PusherContext); // pusher hook


export default function PusherContextProvider() { // context provider
    const {config, setConfig} = React.useState({
        appId: 1594802,
        appKey: "9cd4aaf4c66c9691edc1",
        appSecret: "6d1641af2cebbd9007e5",
        cluster: "ap3",
        forceTLS: false,
    });

    // fetch pusher configuration


    const contextOptions = {
        config,
    }


    return(
        <PusherContext.Provider value={contextOptions}>
            {children}
        </PusherContext.Provider>
    )
}
