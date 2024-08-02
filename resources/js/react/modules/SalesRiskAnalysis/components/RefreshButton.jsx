import Button from "../../../global/Button";
import PropTypes from "prop-types";

export default function RefreshButton({ onClick, isLoading, ...rest }) {
    return (
        <Button
            onClick={onClick}
            isLoading={isLoading}
            loaderTitle="Refreshing..."
            {...rest}
        >
            <i className="fa-solid fa-rotate-right"/> {" "}
            Refresh
        </Button>
    );
}

RefreshButton.propTypes = {
    onClick: PropTypes.func,
    isLoading: PropTypes.bool,
    rest: PropTypes.any
}