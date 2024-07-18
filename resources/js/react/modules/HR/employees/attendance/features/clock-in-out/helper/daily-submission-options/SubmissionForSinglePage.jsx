import React from "react";
import { InputItem } from "../../DailySubmissionUI";

import SectionBuilding from "./options/SectionBuilding";
import SubmissionDropDown from "./SubmissionDropDown";

const SubmissionForSinglePage = ({ id, handleChange, value }) => {
    const [selectedCategoryDropDown, setSelectedCategoryDropDown] =
        React.useState({
            id: 1,
            name: "Section building",
        });
    console.log(selectedCategoryDropDown, "selectedCategoryDropDown");
    return (
        <div style={{ marginBottom: "50px" }}>
            <div style={{ fontWeight: "bold" }}>
                Enter the page URL for Page #{id}
            </div>
            <InputItem
                width="50%"
                placeHolder="Provide URL Link.."
                value={value}
                onChange={(e) => handleChange(id, e.target.value)}
            />

            <SubmissionDropDown
                selectedCategoryDropDown={selectedCategoryDropDown}
                setSelectedCategoryDropDown={setSelectedCategoryDropDown}
            />

            <>
                {selectedCategoryDropDown?.id === 1 && <SectionBuilding />}

                {selectedCategoryDropDown?.id === 2 && (
                    <div>
                        <h4 style={{ fontWeight: "bold" }}>
                            Mobile/other screen responsiveness
                        </h4>
                        <div>
                            <div>Enter input 1</div>
                            <InputItem
                                width="100%"
                                placeHolder="input 1.."
                                value={value}
                                onChange={(e) =>
                                    handleChange(id, e.target.value)
                                }
                            />
                        </div>
                        <div>
                            <div>Enter input 2</div>
                            <InputItem
                                width="100%"
                                placeHolder="input 2.."
                                value={value}
                                onChange={(e) =>
                                    handleChange(id, e.target.value)
                                }
                            />
                        </div>
                    </div>
                )}
            </>
        </div>
    );
};

export default SubmissionForSinglePage;
