import React from "react";
import PropTypes from "prop-types";

// UI Components - Custom
import { Placeholder } from "../../../global/Placeholder";

const UserCardLoader = () => {
    return (
        <div className="d-flex align-items-center py-4">
            <div className="dashboardCardPersonImage">
                <Placeholder width="40px" height="40px" />
            </div>
            <div className="d-flex flex-column ml-3 w-100" >
                <Placeholder width="95%" height="20px" />
                <div className="d-flex align-items-center dashboardCardPersonCountry mt-1">
                    <Placeholder width="20px" height="18px" />
                    <Placeholder width="80%" height="18px" className="ml-1" />
                </div>
            </div>
        </div>
    );
};

export default UserCardLoader;

UserCardLoader.propTypes = {};
