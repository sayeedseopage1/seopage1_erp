import React from "react";
import Button from "./Button";

const SubmitButton = ({onClick, isLoading, title}) => {
    return (
        <React.Fragment>
            {!isLoading ? (
                <Button onClick={onClick} className="">
                    {title}
                </Button>
            ) : (
                <Button className="cursor-processing">
                    <div
                        className="spinner-border text-white"
                        role="status"
                        style={{
                            width: "18px",
                            height: "18px",
                        }}
                    ></div>
                    Processing...
                </Button>
            )}
        </React.Fragment>
    );
};

export default SubmitButton;
