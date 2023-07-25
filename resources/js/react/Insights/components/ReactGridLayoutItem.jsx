import * as React from 'react';
import { Icon } from '../utils/Icon';

// eslint-disable-next-line react/display-name, react/prop-types
const ReactGridLayoutItem = React.forwardRef(({style, className="", onMouseDown, onMouseUp, onTouchEnd, children,title, ...props}, ref) => {
    return(
        <div 
            ref={ref}
            className={`cnx__react_grid_layout_item ${className}`}
            style={style}
            onMouseUp={onMouseUp}
            onTouchEnd={onTouchEnd}
            {...props}
        >
            <button onMouseDown={onMouseDown} className="cnx__react_grid_layout_item__move">
                <Icon type="Move" />
            </button>

            <div className='cnx__react_grid_layout_item_header'>
                <div className='cnx__react_grid_layout_item_header__title'>
                    <Icon type='Deal' />
                    <span>{title}</span>
                </div>

                {/* filters options */}
                <div className='cnx__react_grid_layout_item_header__filters'>
                    <span>Pipeline</span>
                    <span>This Year</span>
                    <span>Won,Lost</span>
                </div>
            </div>

            <div className='cnx_divider' />

            <div className='cnx__react_grid_layout_item_body'>
                {children}
            </div>

            <Icon type="Resize" className="cnx__react_grid_layout_item__resize" />
        </div>
    )
});


export default ReactGridLayoutItem;