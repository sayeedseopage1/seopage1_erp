import React, { createContext, useContext } from "react";
import ERROR from "../../react/global/ERROR";

const ErrorContext = createContext(null);

export const useErrorHandler = () => useContext(ErrorContext);

export default function ErrorContextProvider({ children }) {
    const [showError, setShowError] = React.useState(false);
    const [error, setError] = React.useState({title:"", message:"", code: 404});

    const throwError = ({title, code, message}) => {
        setShowError(true);
        setError({code, title, message})
    }

    return (
        <ErrorContext.Provider value={{showError, throwError}}>
            <React.Fragment>
                {showError ?
                    <ERROR
                        statusCode={error.code}
                        title={error.title}
                        message={error.message}
                    />
                : children}
            </React.Fragment>
        </ErrorContext.Provider>
    );
}
