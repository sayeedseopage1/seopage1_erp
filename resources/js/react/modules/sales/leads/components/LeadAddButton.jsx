import ReactDOM from "react-dom";
import Button from "../../../../global/Button";

export default function LeadAddButton({
    onClick,
    isLoading,
    children,
    loaderTitle = "",
    className,
    ...rest
}) {
    return ReactDOM.createPortal(
        <Button
            onClick={onClick}
            isLoading={isLoading}
            loaderTitle={loaderTitle}
            className={className}
            {...rest}
        >
            {isLoading ? loaderTitle : children}
        </Button>,
        document.getElementById("leadTableAddButton")
    );
}
