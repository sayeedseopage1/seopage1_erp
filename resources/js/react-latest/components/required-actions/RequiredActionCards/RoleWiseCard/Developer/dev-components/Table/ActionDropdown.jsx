import React, { useState } from "react";

import styles from "./ActionDropdown.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import _ from "lodash";

import Dropdown from "../../../../../../../../react/global/Dropdown";
import { useAuth } from "../../../../../../../../react/hooks/useAuth";

const ActionDropdown = ({ ...rest }) => {
    const auth = useAuth();

    return (
        <React.Fragment>
            <Dropdown>
                <Dropdown.Toggle icon={false} className={styles.dropdownToggle}>
                    <BsThreeDotsVertical />
                </Dropdown.Toggle>

                <Dropdown.Menu placement="bottom-end">
                    <Dropdown.Item className={styles.dropdownItem}>
                        <i className="fa-regular fa-eye" />
                        View
                    </Dropdown.Item>

                    {_.includes([1, 7], auth.getRoleId()) && (
                        <Dropdown.Item className={styles.dropdownItem}>
                            <i className="fa-regular fa-pen-to-square" />
                            Edit
                        </Dropdown.Item>
                    )}

                    {/* delete lead */}
                    {auth.getRoleId() === 1 && (
                        <Dropdown.Item className={styles.dropdownItem}>
                            <i className="fa-regular fa-trash-can" />
                            Delete
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    );
};

export default ActionDropdown;
