import React, { useState } from "react";
import Dropdown from "../../../../../global/Dropdown";
import styles from "./ActionDropdown.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-toastify";
import { useAuth } from "../../../../../hooks/useAuth";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import _ from "lodash";

const AuthNeedActionDropdown = ({ ...rest }) => {
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
        window.open(url, "_blank");
    };

    // console.log(rest?.row?.original.authorization_status === 0 && rest?.row?.original.id )

    return (
        <React.Fragment>
            {rest?.row?.original.authorization_status === 2 &&
                auth.getRoleId() === 8 &&
                rest?.row?.original?.is_drafted === 0 && (
                    <button
                        style={{
                            width: "155px",
                            height: "35px",
                            borderRadius: "5px",
                        }}
                        onClick={() =>
                            handleRedirection(
                                `/deals/request/authorization/${rest?.row?.original?.id}`
                            )
                        }
                        className={`bg-warning`}
                    >
                        <i
                            style={{ marginRight: "5px" }}
                            className="fa-regular fa-user"
                        />
                        Authorization Need
                    </button>
                )}
        </React.Fragment>
    );
};

export default AuthNeedActionDropdown;
