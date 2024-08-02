import React, { useState } from "react";
import PropTypes from "prop-types";
import { useCopyToClipboard } from "react-use";

const ColorItem = ({ color, desc, isDescUse = false, isColorUse = true }) => {
    const [state, copyToClipboard] = useCopyToClipboard();
    const [isShow, setIsShow] = useState(false);

    const handleCopy = (text) => {
        copyToClipboard(color);
        setIsShow(true);
        setTimeout(() => {
            setIsShow(false);
        }, 1000);
    };

    function renderColorOrCopied() {
        if (!isShow) {
          return color;
        } else if (state.value) {
          return <span> Copied</span>;
        } else {
          return null;
        }
      }

    return (
        <div className="position-relative px-2">
            {isColorUse && (
                <button
                    onClick={() => handleCopy(color)}
                    className="py-2 px-3 d-inline-block text-white rounded cursor-pointer border-0"
                    style={{ background: color , }}
                >
                    {renderColorOrCopied()}
                </button>
            )}
            {isDescUse && (
                <div className="f-12">
                    <div dangerouslySetInnerHTML={{ __html: desc }} />
                </div>
            )}
        </div>
    );
};

export default ColorItem;

ColorItem.propTypes = {
    color: PropTypes.string,
    desc: PropTypes.string,
    isDescUse: PropTypes.bool,
    isColorUse: PropTypes.bool,
};
