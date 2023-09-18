import React from "react";
import Button from "./Button";

const SubmitButton = ({
    onClick,
    isLoading,
    className,
    variant = "primary",
    children,
    title,
}) => {
    let body = document.querySelector("#body");

    const handleOnClick = (e) => {
        e.stopPropagation();
        onClick(e);
    };

    React.useEffect(() => {
        if (isLoading) {
            body.style.cursor = "progress";
        } else {
            body.style.cursor = "default";
        }
    }, [isLoading]);

    return (
        <React.Fragment>
            {!isLoading ? (
                <Button
                    variant={variant}
                    onClick={handleOnClick}
                    className={className}
                >
                    {children || title}
                </Button>
            ) : (
                <div className="cursor-processing cnx__btn cnx__btn_sm cnx__btn_primary">
                    <div
                        className="spinner-border text-white"
                        role="status"
                        style={{
                            width: "18px",
                            height: "18px",
                        }}
                    ></div>
                    Processing...
                </div>
            )}
        </React.Fragment>
    );
};

export default SubmitButton;
