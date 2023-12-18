import React from "react";
import Dropdown from "../../../../../global/Dropdown";
import styles from "./ActionDropdown.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { PiTrashDuotone } from "react-icons/pi";
import { AiTwotoneLike } from "react-icons/ai";

const ActionDropdown = ({row}) => {
    console.log(row.original) 
    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle icon={false} className={styles.dropdownToggle}>
                    <BsThreeDotsVertical />
                </Dropdown.Toggle>

                <Dropdown.Menu placement="bottom-end">
                    <Dropdown.Item className={styles.dropdownItem}>
                        <i className="fa-regular fa-pen-to-square" />
                        Edit
                    </Dropdown.Item>
                    <Dropdown.Item className={styles.dropdownItem}>
                        <i className="fa-regular fa-trash-can" />
                        Delete
                    </Dropdown.Item>
                    <Dropdown.Item className={styles.dropdownItem}>
                        <i className="fa-regular fa-thumbs-up" />
                        Convert Deal
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default ActionDropdown;
