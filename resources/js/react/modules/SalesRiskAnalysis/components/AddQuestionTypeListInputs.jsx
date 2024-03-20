import React from "react";
import PropTypes from "prop-types";

// ui components
import Switch from "./Switch";
import { ModalInput, ModalInputLabel } from "./ui/Styles/ui";
import { generateUniqueString } from "../../../utils/customUidGenerate";

const AddQuestionTypeListInputs = ({ singleQuestion, setSingleQuestion }) => {
    return (
        <div className="row mb-4 align-items-center">
            <ModalInputLabel className="col-4">
                List Item <sup>*</sup>{" "}
            </ModalInputLabel>

            <div className="col-8 flex-column px-0">
                {singleQuestion?.listItem?.map((item, index) => (
                    <div
                        className={`col-12 px-0  d-flex ${
                            singleQuestion?.listItem?.length > 1 ? "mb-4" : ""
                        }`}
                        key={item.id}
                    >
                        <div className="col-11 px-0">
                            <ModalInput
                                type="text"
                                className="w-100"
                                name="title"
                                onChange={(e) => {
                                    const list = [...singleQuestion.listItem];
                                    list[index].title = e.target.value;
                                    setSingleQuestion({
                                        ...singleQuestion,
                                        listItem: list,
                                    });
                                }}
                                value={item?.title}
                                placeholder="Write Here"
                            />
                        </div>
                        <div className="col-1 d-flex align-items-center justify-content-center px-0 ml-2">
                            <Switch>
                                <Switch.Case condition={index === 0}>
                                    <button
                                        className="btn btn-success d-flex align-items-center justify-content-center p-2"
                                        style={{
                                            width: "25px",
                                            height: "25px",
                                        }}
                                        onClick={() => {
                                            const list = [
                                                ...singleQuestion.listItem,
                                            ];
                                            list.push({
                                                id: generateUniqueString(15),
                                                title: "",
                                            });
                                            setSingleQuestion({
                                                ...singleQuestion,
                                                listItem: list,
                                            });
                                        }}
                                    >
                                        <i
                                            className="fa fa-plus"
                                            style={{
                                                fontSize: "12px",
                                            }}
                                        ></i>
                                    </button>
                                </Switch.Case>
                                <Switch.Case condition={index !== 0}>
                                    <button
                                        className="btn btn-danger d-flex align-items-center justify-content-center  p-2"
                                        style={{
                                            width: "25px",
                                            height: "25px",
                                        }}
                                        onClick={() => {
                                            const list = [
                                                ...singleQuestion.listItem,
                                            ];
                                            list.splice(index, 1);
                                            setSingleQuestion({
                                                ...singleQuestion,
                                                listItem: list,
                                            });
                                        }}
                                    >
                                        <i
                                            class="fa-solid fa-trash"
                                            style={{
                                                fontSize: "12px",
                                            }}
                                        ></i>
                                    </button>
                                </Switch.Case>
                            </Switch>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddQuestionTypeListInputs;

AddQuestionTypeListInputs.propTypes = {
    singleQuestion: PropTypes.object,
    setSingleQuestion: PropTypes.func,
};
