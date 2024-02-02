import ReactDOM from "react-dom";
import Button from "../../../../global/Button";

export default function RefreshButton({ onClick, isLoading, ...rest }) {
    return ReactDOM.createPortal(
        <Button
            onClick={onClick}
            isLoading={isLoading}
            loaderTitle="Refreshing..."
            {...rest}
        >
            Refresh
        </Button>,
        document.getElementById("leadTableRefreshButton")
    );
}
