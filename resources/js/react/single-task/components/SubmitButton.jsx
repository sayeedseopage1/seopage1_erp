import React from "react";
import Button from "./Button";

const SubmitButton = ({onClick, isLoading, title}) => {
    const handleOnClick = (e) => {
        e.stopPropagation();
        onClick(e)
    }
    return (
        <React.Fragment>
            {!isLoading ? (
                <Button onClick={handleOnClick} className="">
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
