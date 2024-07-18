import React, { useEffect } from "react";

import Dropdown from "../../../../../../../../global/Dropdown";

import axios from "axios";
import { set } from "lodash";
const SubmissionDropDown = ({
    selectedCategoryDropDown,
    setSelectedCategoryDropDown,
}) => {
    const [categories, setCategories] = React.useState([]);
    const fetchCategoryData = async () => {
        try {
            const response = await axios.get(
                "/account/get-today-submission-data"
            );
            if (response) {
                console.log("response", response?.data?.categories);
                setCategories(response?.data?.categories);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchCategoryData();
    }, []);
    return (
        <div>
            <Dropdown>
                <div>
                    <label htmlFor="">What did you do on this page </label>
                    <Dropdown.Toggle
                        className="portfolio-filter-dd-toggle"
                        iconSize={20}
                    >
                        <span className="singleline-ellipsis">
                            {selectedCategoryDropDown?.name ?? "Select Here"}
                        </span>
                    </Dropdown.Toggle>
                </div>

                <Dropdown.Menu
                    placement="bottom"
                    className="portfolio_dropdown_menu"
                >
                    <div className="portfolio-filter-dd-menu">
                        {_.map(categories, (option) => (
                            <abbr key={option.id} title={option.name}>
                                <Dropdown.Item
                                    className="d-flex items-center justify-content-between"
                                    onClick={() => {
                                        setSelectedCategoryDropDown(option);
                                    }}
                                >
                                    <span
                                        className="singleline-ellipsis"
                                        style={{ width: "90%" }}
                                    >
                                        {option.name}
                                    </span>
                                    {selectedCategoryDropDown?.id ===
                                        option.id && (
                                        <i className="fa-solid fa-check " />
                                    )}
                                </Dropdown.Item>
                            </abbr>
                        ))}
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default SubmissionDropDown;
