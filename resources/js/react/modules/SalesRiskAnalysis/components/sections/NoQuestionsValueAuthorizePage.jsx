import React from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

// image Component
import EmptyReport from "../ui/Styles/EmptyReport";

const NoQuestionsValueAuthorizePage = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <EmptyReport />
            <div className="d-flex justify-content-center align-items-center">
                <button
                    className="btn btn-primary py-1 d-flex justify-content-center align-items-center"
                    onClick={() => {
                        window.history.back();
                    }}
                >
                    <MdOutlineKeyboardBackspace className="mr-2" />
                    <span>Back</span>
                </button>
            </div>
        </div>
    );
};

export default NoQuestionsValueAuthorizePage;
