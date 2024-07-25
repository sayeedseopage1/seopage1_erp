import PropTypes from "prop-types";
import Button from "./Button";

export default function RefreshButton({
    onClick,
    isLoading,
    ...rest
}) {
    return (
        <Button
            onClick={onClick}
            isLoading={isLoading}
            loaderTitle='Loading...'
            {...rest}
            size="md"
        >
            <i className="fa-solid fa-rotate-right" /> Refresh
        </Button>
    );
}

RefreshButton.propTypes = {
    onClick: PropTypes.func,
    isLoading: PropTypes.bool,
    rest: PropTypes.any,
    refreshTitle: PropTypes.string,
    loaderTitle: PropTypes.string,
};
