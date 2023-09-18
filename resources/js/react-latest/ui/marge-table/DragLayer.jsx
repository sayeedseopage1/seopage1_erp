import { useDragLayer } from "react-dnd";
import { itemType as type } from "./dndType";
import ReactDOM from "react-dom";
import React from "react";
import styles from "./table.module.css";

export const DragLayer = () => {
    const { item, itemType, currentOffset } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        currentOffset: monitor.getClientOffset(),
    }));

    const id = React.useMemo(() => Math.random().toString(36).substr(2, 9), []);
    let DOM = document.getElementById(id);

    // create element in html body
    React.useEffect(() => {
        const el = document.createElement("div");
        el.id = id;
        document.body.appendChild(el);

        return () => {
            document.body.removeChild(el);
        };
    }, []);

    if (!currentOffset || !DOM) {
        return null;
    }

    return ReactDOM.createPortal(
        <div
            style={{
                position: "fixed",
                pointerEvents: "none",
                zIndex: 999999,
                left: currentOffset.x,
                top: currentOffset.y,
            }}
        >
            {/* Render your custom preview here based on the dragged item */}
            {itemType === type.TABLE_COLUMN && (
                <div
                    className={styles.table_drag__layout}
                    style={{ width: 200 }}
                >
                    {item?.col?.heading}
                </div>
            )}
        </div>,
        DOM
    );
};
