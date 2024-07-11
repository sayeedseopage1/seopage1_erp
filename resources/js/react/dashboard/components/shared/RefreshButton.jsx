import Button from "../../../global/Button";

export default function RefreshButton({ onClick, isLoading, ...rest }) {
    return (
        <Button
            onClick={onClick}
            isLoading={isLoading}
            loaderTitle="Refreshing..."
            {...rest}
            style={{
                backgroundColor: "var(--primaryBlue)",
                border:"none",
            }}
        >
            Refresh
        </Button>
    );
}
