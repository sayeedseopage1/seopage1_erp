import * as React from 'react';
import { Icon } from '../utils/Icon';

// eslint-disable-next-line react/display-name, react/prop-types
const ReactGridLayoutItem = React.forwardRef(({style, className, onMouseDown, onMouseUp, onTouchEnd, children, ...props}, ref) => {
    return(
        <div 
            ref={ref}
            className={`cnx__react_grid_layout_item ${className}`}
            style={style}
            onMouseUp={onMouseUp}
            onTouchEnd={onTouchEnd}
            {...props}
        >
            <button onMouseDown={onMouseDown} className="cnx__react_grid_layout_item__close">
                <Icon type="Move" />
            </button>
            {children}

            <Icon type="Resize" className="cnx__react_grid_layout_item__resize" />
        </div>
    )
});


export default ReactGridLayoutItem;