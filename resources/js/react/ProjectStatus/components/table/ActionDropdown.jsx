// ActionDropdown.js
import React, { useState } from "react";
import Dropdown from "../../../global/Dropdown";
import styles from "./ActionDropdown.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import ExtendRequestModal from "../modal/ExtendRequestModal";
import ReviewExtendRequestModal from "../modal/ReviewExtendModal";
import { useAuth } from "../../../hooks/useAuth";
import Switch from "../../../global/Switch";

const ActionDropdown = ({ ...rest }) => {
    const auth = useAuth();
    console.log("auth review", auth.roleId);
    const [isOpenExtendRequestModal, setIsOpenExtendRequestModal] =
        useState(false);
    const [isOpenReviewExtendRequestModal, setIsOpenReviewExtendRequestModal] =
        useState(false);

    const handleExtendRequestClick = () => {
        setIsOpenExtendRequestModal(true);
    };

    const handleCloseModal = () => {
        setIsOpenExtendRequestModal(false);
    };
    const handleReviewExtendRequestClick = () => {
        setIsOpenReviewExtendRequestModal(true);
    };

    const handleCloseReviewModal = () => {
        setIsOpenReviewExtendRequestModal(false);
    };

    const projectDetails = rest.row.original;
    console.log("projectDetails in action dropdown", projectDetails.id);

    return (
        <React.Fragment>
            <Dropdown>
                {(projectDetails.extended_request_status === 1 ||
                    auth.roleId === 4) && (
                    <Dropdown.Toggle
                        icon={false}
                        className={styles.dropdownToggle}
                    >
                        <BsThreeDotsVertical />
                    </Dropdown.Toggle>
                )}

                <Dropdown.Menu placement="bottom-end">
                    <Switch>
                        <Switch.Case condition={auth.roleId === 4}>
                            <Dropdown.Item
                                className={styles.dropdownItem}
                                onClick={handleExtendRequestClick}
                            >
                                Extend Request
                            </Dropdown.Item>
                        </Switch.Case>
                        <Switch.Case
                            condition={
                                projectDetails.extended_request_status === 1 &&
                                (auth.roleId === 1 || auth.roleId === 8)
                            }
                        >
                            <Dropdown.Item
                                className={styles.dropdownItem}
                                onClick={handleReviewExtendRequestClick}
                            >
                                Review Extend Time
                            </Dropdown.Item>
                        </Switch.Case>
                    </Switch>
                </Dropdown.Menu>
            </Dropdown>


                            


            {}
            <ExtendRequestModal
                projectDetails={projectDetails}
                isOpen={isOpenExtendRequestModal}
                onClose={handleCloseModal}
            />
            <ReviewExtendRequestModal
                projectDetails={projectDetails}
                isOpen={isOpenReviewExtendRequestModal}
                onClose={handleCloseReviewModal}
            />
        </React.Fragment>
    );
};

export default ActionDropdown;
