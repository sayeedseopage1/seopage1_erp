import React from "react";

const ConversionGraph = React.forwardRef(
    ({ onMouseDown, onMouseUp, onTouchEnd, children, ...props }, ref) => {
        return (
            <div ref={ref} {...props}>
                <div className="sp1_ins_graph-container">
                    {/* header */}
                    <button
                        onMouseDown={onMouseDown}
                        onMouseUp={onMouseUp}
                        onTouchEnd={onTouchEnd}
                        className="sp1_ins_graph--move-button"
                    >
                        <i className="fa-solid fa-arrows-up-down-left-right"></i>
                    </button>
                    <div className="sp1_ins_graph--header">
                        <span>Deal conversion</span>
                    </div>
                    {/* end header */}

                    {/* Breadcrumb */}
                    <div className="text-lightest f-12 f-w-500 ml-2">
                        <span className="text-lightest">Pipeline</span>•
                        <span className="text-lightest">Pipeline</span>•
                        <span className="text-lightest">Pipeline</span>
                    </div>
                    {/* End Breadcrumb */}
                </div>
            </div>
        );
    }
);

export default ConversionGraph;
