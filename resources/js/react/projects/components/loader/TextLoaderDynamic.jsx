import PropTypes from "prop-types";

// Component - Ui - Loader
import { Placeholder } from "../../../global/Placeholder";
import Switch from "../../../global/Switch";

const TextLoaderDynamic = ({
    number,
    fullSizeCount = 1,
    widthDeference = 10,
    className = "",
    width = 100,
    height,
    parentClassName = "",
}) => {
    return (
        <div className={parentClassName}>
            <Switch>
                <Switch.Case condition={number === 1}>
                    <Placeholder
                        className={className}
                        width={`${width}%`}
                        height={height}
                    />
                </Switch.Case>
                <Switch.Case condition={number > 1}>
                    {[...Array(number)].map((placeholder, index) => {
                        const isFullSize = index < fullSizeCount;
                        const isLast = index === number - 1;
                        const getWidth = (() => {
                            if (isLast) {
                                return 50;
                            } else if (isFullSize) {
                                return 100;
                            } else {
                                return (
                                    100 -
                                    (index - fullSizeCount + 1) * widthDeference
                                );
                            }
                        })();
                        return (
                            <Placeholder
                                className={className}
                                key={placeholder}
                                width={`${getWidth}%`}
                                height={height}
                            />
                        );
                    })}
                </Switch.Case>
            </Switch>
        </div>
    );
};

export default TextLoaderDynamic;

TextLoaderDynamic.propTypes = {
    number: PropTypes.number || undefined,
    widthDeference: PropTypes.number,
    className: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    parentClassName: PropTypes.string,
    fullSizeCount: PropTypes.number,
};
