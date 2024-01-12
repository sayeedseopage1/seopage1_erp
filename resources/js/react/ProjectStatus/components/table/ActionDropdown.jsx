import React from "react";

import Dropdown from "../../../global/Dropdown";

import styles from "./ActionDropdown.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";

import _ from "lodash";

const ActionDropdown = ({ ...rest }) => {
    const [isOpenDealConversionForm, setIsOpenDealConversionForm] =
        React.useState(false);

    return (
        <React.Fragment>
            <Dropdown>
                <Dropdown.Toggle icon={false} className={styles.dropdownToggle}>
                    <BsThreeDotsVertical />
                </Dropdown.Toggle>

                <Dropdown.Menu placement="bottom-end">
                    {
                        <Dropdown.Item className={styles.dropdownItem}>
                            Extend Request
                        </Dropdown.Item>
                    }
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    );
};

export default ActionDropdown;
