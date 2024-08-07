// ErrorDisplay.js
import React from "react";
import styled from "styled-components";

const ErrorDisplay = ({ errors, errorName }) => {
    return (
        <>
            {errors &&
                errors.length > 0 &&
                errors.map((err, index) => {
                    if (err.errorName === errorName) {
                        return (
                            <div key={index}>
                                <ErrorMessage>{err.errorMessage}</ErrorMessage>
                            </div>
                        );
                    }
                    return null;
                })}
        </>
    );
};

export default ErrorDisplay;

const ErrorMessage = styled.p`
    color: red;
    margin: 0;
    padding-bottom: 10px;
`;
