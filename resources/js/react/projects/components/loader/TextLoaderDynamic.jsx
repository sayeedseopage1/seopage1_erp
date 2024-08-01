import PropTypes from "prop-types";

// Component - Ui - Loader
import { Placeholder } from "../../../global/Placeholder";
import Switch from "../../../global/Switch";

/**
 *  TextLoaderDynamic Component
 * @param {number} number - Number
 *  @param {number} fullSizeCount - Full Size Count
 * @param {number} widthDeference - Width Deference
 * @param {string} className - ClassName
 * @param {number} width - Width
 * @param {number} height - Height
 * @param {string} parentClassName - Parent ClassName
 * @returns {JSX.Element}
 * @description - Text Loader Dynamic
 *
 */

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
                        const uniqueKey = `placeholder-${index}`;
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
                                key={uniqueKey}
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
