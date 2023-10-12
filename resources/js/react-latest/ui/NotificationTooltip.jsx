import React from "react";
import { usePopper } from "react-popper";
import styles from './NotificationTooltip.module.css'

const NotificationTooltip = ({ children, className, content, show }) => {
    const [referenceElement, setReferenceElement] = React.useState(null);
    const [popperElement, setPopperElement] = React.useState(null);
    const [arrowElement, setArrowElement] = React.useState(null);

    const {styles, attributes} = usePopper(referenceElement, popperElement, {
        placement: 'top',
        modifiers:[
            {name:'offset', options: {offset: [10,0]}},
            {
                name: 'arrow',
                options: {
                    element: arrowElement,
                }
            }
        ]
    });

    return <div ref={setReferenceElement}>
        {children}
        {
            show  ?
                <div
                    className={`${styles.tooltip} ${className}`}
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes.popper}
                >
                    {/* tooltip content */}
                    <div className={styles.tooltip_content}>
                        {(typeof content === 'function') ? content() : content}
                    </div>
                    <div
                        ref={setArrowElement}
                        style={styles.arrow}
                        className={styles.arrow}
                    />
                </div>
            : null
          }
    </div>;
};

export default NotificationTooltip;
