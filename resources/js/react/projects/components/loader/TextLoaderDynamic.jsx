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
                    {[...Array(number)].map((_, index) => {
                        const isFullSize = index < fullSizeCount;
                        const isLast = index === number - 1;
                        const width = isLast
                            ? 50
                            : isFullSize
                            ? 100
                            : 100 -
                              (index - fullSizeCount + 1) * widthDeference;
                        return (
                            <Placeholder
                                className={className}
                                key={index}
                                width={`${width}%`}
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
    number: PropTypes.number.isRequired,
    widthDeference: PropTypes.number,
    className: PropTypes.string,
    height: PropTypes.number,
    parentClassName: PropTypes.string,
    fullSizeCount: PropTypes.number,
};
