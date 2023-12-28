 
import Button from "../../../../global/Button";

export default function RefreshButton({onClick, isLoading, ...rest}) {
    return  (
        <Button
            onClick={onClick}
            isLoading={isLoading}
            loaderTitle="Refreshing..." 
            {...rest}
        >
            <i className="fa-solid fa-rotate-right"/>
            Refresh
        </Button>
    );
}
