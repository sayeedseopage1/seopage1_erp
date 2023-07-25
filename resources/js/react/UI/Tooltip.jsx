import { usePopper } from "react-popper";

const Tooltip = ({ children, renderTooltip, tooltipText }) => {
    const className = `sp1_tooltip`;
    return (
        <div>
            <div>{children}</div>
            {renderTooltip(className) || (
                <div className={className}>{tooltipText}</div>
            )}
        </div>
    );
};
