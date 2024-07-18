import React, { useEffect, useState } from "react";
import axios from "axios";

const SubmissionDropDown = ({
    selectedCategoryDropDown,
    setSelectedCategoryDropDown,
}) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [menuVisible, setMenuVisible] = useState(false);

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
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoryData();
    }, []);

    return (
        <div>
            <label htmlFor="categoryDropdown">
                What did you do on this page
            </label>
            <div
                id="categoryDropdown"
                style={dropdownStyle}
                onClick={() => setMenuVisible(!menuVisible)}
            >
                <span>{selectedCategoryDropDown?.name ?? "Select Here"}</span>
            </div>
            {menuVisible && (
                <div style={menuStyle}>
                    {loading ? (
                        <div style={loadingStyle}>Loading...</div>
                    ) : (
                        categories?.map((option) => (
                            <div
                                key={option.id}
                                style={
                                    selectedCategoryDropDown?.id === option.id
                                        ? selectedItemStyle
                                        : itemStyle
                                }
                                onClick={() => {
                                    setSelectedCategoryDropDown(option);
                                    setMenuVisible(false);
                                }}
                            >
                                {option.name}
                                {selectedCategoryDropDown?.id === option.id && (
                                    <i className="fa-solid fa-check" />
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default SubmissionDropDown;

const dropdownStyle = {
    width: "530ppx",
    padding: "10px",
    border: "1px solid #ccc",
    backgroundColor: "#D8EDFC",
    cursor: "pointer",
    position: "relative",
};

const menuStyle = {
    width: "530px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
    maxHeight: "200px",
    overflowY: "auto",
    zIndex: 1000,
    position: "absolute",
};

const itemStyle = {
    padding: "10px",
    cursor: "pointer",
    backgroundColor: "#D8EDFC",
    borderBottom: "1px solid #ccc",
};

const selectedItemStyle = {
    ...itemStyle,
    backgroundColor: "#A5D8FF",
};

const loadingStyle = {
    padding: "10px",
    textAlign: "center",
    backgroundColor: "#D8EDFC",
};
