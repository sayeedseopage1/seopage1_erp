import React from "react";
import { InputItem } from "../../../DailySubmissionUI";
import Switch from "../../../../../../../../../global/Switch";
import SectionBuilding from "./SectionBuilding";

const OptionComponent = ({ selectedCategoryDropDown }) => {
    return (
        <div>
            <p style={{ fontWeight: "bold" }}>
                {selectedCategoryDropDown?.name}
            </p>
            {selectedCategoryDropDown?.category_fields?.map(
                (category, index) => (
                    <div key={index}>
                        <div>
                            <Switch>
                                <Switch.Case
                                    condition={
                                        category.name === "Section building"
                                    }
                                >
                                    <SectionBuilding />
                                </Switch.Case>
                            </Switch>

                            <div>{category.title}</div>
                            <InputItem width="50%" placeHolder="" />
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default OptionComponent;
