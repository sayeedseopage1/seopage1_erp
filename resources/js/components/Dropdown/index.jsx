import * as React from "react";
import { usePopper } from "react-popper";
import { Menu } from "./Menu";
import { Toggle } from "./Toggle";

const Dropdown = ({
    children,
    hoverable = true,
    placement = "bottom-start",
}) => {
    const [refElement, setRefElement] = React.useState(null);
    const [popperElement, setPopperElement] = React.useState(null);
    const [show, setShow] = React.useState(false);

    const wrapRef = React.useRef(null);

    const { styles, attributes } = usePopper(refElement, popperElement, {
        placement,
    });

    const childs = React.Children.toArray(children);

    // handle hoverable dropdown
    const handleMouseEnter = (e) => {
        if (hoverable) {
            setShow(true);
        }
    };

    // handle click to show dropdown
    const handleClick = (e) => {
        setShow(!show);
    };

    // if hoverable, hide dropdown when mouse leave

    React.useEffect(() => {
        if (wrapRef.current && hoverable) {
            wrapRef.current.addEventListener("mouseleave", (e) => {
                setShow(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wrapRef]);

    return (
        <div ref={wrapRef}>
            <div
                onClick={handleClick}
                onMouseOver={handleMouseEnter}
                ref={setRefElement}
                className="lead-table-dd-toggle"
            >
                {childs[0]}
            </div>
            <div
                ref={setPopperElement}
                style={styles.popper}
                className={`lead-table-dd-menu ${show ? "active" : ""}`}
                {...attributes}
            >
                {childs[1]}
            </div>
        </div>
    );
};

Dropdown.Menu = Menu;
Dropdown.Toggle = Toggle;

export default Dropdown;
