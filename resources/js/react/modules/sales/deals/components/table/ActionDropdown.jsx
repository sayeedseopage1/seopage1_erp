import React, { useState } from "react";
import Dropdown from "../../../../../global/Dropdown";
import styles from "./ActionDropdown.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-toastify";
import { useAuth } from "../../../../../hooks/useAuth";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import _ from "lodash";
import { useDealContext } from "../context/DealContext";

const ActionDropdown = ({ ...rest }) => {
    const {openEditForm} = useDealContext();

    // const [deleteLead, { isLoading }] = useDeleteLeadMutation();
    const auth = useAuth();

    const handleDelete = () => {
        // submit form
        const submitForm = async () => {
            // const res = await deleteLead(rest.row.original?.id);
            // console.log(res);

            if (res.success) {
                toast.success("Lead deleted successfully.");
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
                        <Dropdown.Item
                            onClick={() => openEditForm(rest?.row?.original)}
                            className={styles.dropdownItem}
                        >
                            <i className="fa-regular fa-pen-to-square" />
                            Edit
                        </Dropdown.Item>
                    )}

                    {/* delete lead */}
                    {auth.getRoleId() === 1 && (
                        <Dropdown.Item
                            onClick={handleDelete}
                            className={styles.dropdownItem}
                        >
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
