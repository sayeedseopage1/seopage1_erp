import dayjs from "dayjs";
import React from "react";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useSelector } from "react-redux";

const DailySubmissionItem = ({ item, setModalData, modalData }) => {
    // const [show,setShow] = useState(false);
    const { task } = useSelector((s) => s.subTask);

    if (!item) return null;

    return (
        <tr
            onClick={() => {
                setModalData((prev) => {
                    if (prev?.id === item.id) {
                        return null;
                    } else {
                        return item;
                    }
                });
            }}
            className="sp1_tlr_tr"
            style={{
                verticalAlign: "middle",
                margin: "0 auto",
                cursor: "pointer",
            }}
        >
            <td
                className="sp1_tlr_td"
                style={{ minWidth: "100px", textAlign: "left" }}
            >
                <span className="singleline-ellipsis">
                    <span className="text-primary">Task#{task.id}</span>
                    {" submitted by "}
                    <span className="text-primary">{item.developer_name}</span>
                </span>
            </td>
            <td className="sp1_tlr_td" style={{ minWidth: "100px" }}>
                {dayjs(item.submission_creation_date).format("MMM DD, YYYY")}
            </td>
            <td className="sp1_tlr_td" style={{ minWidth: "50px" }}>
                {modalData?.id === item.id ? (
                    <AiFillEyeInvisible
                        style={{
                            height: "20px",
                            width: "20px",
                            cursor: "pointer",
                        }}
                    />
                ) : (
                    <AiFillEye
                        style={{
                            height: "20px",
                            width: "20px",
                            cursor: "pointer",
                        }}
                    />
                )}
            </td>
        </tr>
    );
};

export default DailySubmissionItem;
