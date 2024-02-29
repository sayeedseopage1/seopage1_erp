import React, { useState } from "react";
import Dropdown from "../../../../../global/Dropdown";
import styles from "./ActionDropdown.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-toastify";
import { useAuth } from "../../../../../hooks/useAuth";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import _ from "lodash";



const ActionDropdown = ({ ...rest }) => {
    const auth = useAuth();

    const handleDelete = () => {
        // submit form
        const submitForm = async () => {
            const res = await deleteDeal(rest.row.original?.id).unwrap();

            if (res.status) {
                toast.success("Deal deleted successfully.");
            }
        };

        // confirmation modal
        withReactContent(Swal)
            .fire({
                icon: "warning",
                title: "Are you sure?",
                text: "You will not be able to recover the deleted record!",
                showConfirmButton: true,
                confirmButtonText: "Yes, Delete it!",
                confirmButtonColor: "#1D82F5",
                showDenyButton: true,
                denyButtonText: "Cancel",
            })
            .then((res) => {
                if (res.isConfirmed) {
                    submitForm();
                }
            });
    };

    // handle redirection
    const handleRedirection = (url) => {
        window.location.href = url;
    };

    return (
        <React.Fragment>
            <Dropdown>
                <Dropdown.Toggle icon={false} className={styles.dropdownToggle}>
                    <BsThreeDotsVertical />
                </Dropdown.Toggle>

                <Dropdown.Menu placement="bottom-end">
                    {/* <Dropdown.Item
                        onClick={ () => handleRedirection(
                            `/account/deal-url/${rest?.row?.original?.id}`
                        )}
                        className={styles.dropdownItem}
                    >
                        <i className="fa-regular fa-file" />
                        Client Form
                    </Dropdown.Item> */}

                    {_.includes([1, 7], auth.getRoleId()) && (
                        <Dropdown.Item
                            onClick={() => handleRedirection(`/deals/details/edit/${rest?.row?.original?.id}`)}
                            className={styles.dropdownItem}
                        >
                            <i className="fa-regular fa-pen-to-square" />
                            Edit
                        </Dropdown.Item>
                    )}

                    {/* delete lead */}
                    {auth.getRoleId() === 1 && rest?.row?.original?.status?.toLowerCase() !== 'pending' && (
                        <Dropdown.Item
                            onClick={() => handleRedirection(`/account/contracts/${rest?.row?.original?.id}`)}
                            className={styles.dropdownItem}
                        >
                            <i className="fa-regular fa-user" />
                            Authorization Details
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    );
};

export default ActionDropdown;
