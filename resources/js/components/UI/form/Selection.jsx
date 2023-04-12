import Dropdown from "../Dropdown"
import './selection.css';


const Selection = () => {
    return (
        <div className="position-relative w-100">
            <Dropdown>
                <Dropdown.Toggle className="sp1_selection--toggle">
                    <span>Selected Item</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="sp1_selection--dd_menu">
                    <ul className="sp1_selection--dd_menu-list">
                        <li className={`sp1_selection--dd_menu-item`}>
                            <span>Item</span>
                            <i className="fa-solid fa-check" />
                        </li>

                        <li className={`sp1_selection--dd_menu-item`}>
                            <span>Item</span>
                            <i className="fa-solid fa-check" />
                        </li>
                        <li className={`sp1_selection--dd_menu-item`}>
                            <span>Item</span>
                            <i className="fa-solid fa-check" />
                        </li>
                    </ul>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default Selection;