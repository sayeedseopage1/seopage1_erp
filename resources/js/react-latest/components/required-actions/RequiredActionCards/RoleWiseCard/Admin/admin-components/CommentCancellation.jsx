import React, { useEffect, useState } from "react";
import style from "../../../../../../styles/required-action-card.module.css";
import bg_pattern from "../../../../media/comment_cancellation_bg.svg";
import { AiFillWarning } from "react-icons/ai";
import { useRefresh } from "../../../../Index";
import axios from "axios";
import Swal from "sweetalert2";

const CommentCancellation = ({ setIsOpen, modal_data, data }) => {
    const { handleRefresh } = useRefresh();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        [...modal_data.form].forEach((input) => {
            if (input?.type === "hidden") {
                setFormData((prev) => ({
                    ...prev,
                    [input.name]:
                        input.name === "authorization_id"
                            ? data.id
                            : input.value,
                }));
            } else if (input?.type === "select") {
                setFormData((prev) => ({
                    ...prev,
                    [input.name]: selectDefaultValue(input.options),
                }));
            }
        });
    }, [modal_data]);

    // form submssion function
    const handleSubmit = async ({ url, method } = { url: "", method: "" }) => {
        setLoading(true);
        let emptyRequiredField = 0;
        [...modal_data.form].forEach((input) => {
            if (
                input?.type !== "hidden" &&
                input?.required &&
                input?.name !== "confirmation"
            ) {
                // console.log({ [input.name]: formData[input.name] });
                if (!formData[input.name]) {
                    emptyRequiredField++;
                }
                // console.log({ emptyRequiredField });
            }
        });

        if (emptyRequiredField > 0) {
            Swal.fire({
                icon: "warning",
                title: "Please input all required field",
                timer: 2000,
                showConfirmButton: true,
                timerProgressBar: true,
            });
            setLoading(false);
            return;
        }

        // setIsOpen(false);
        // setLoading(false);
        // return;

        const form = new FormData();

        for (const key in formData) {
            form.append(key, formData[key]);
        }
        form.append(
            "_token",
            document
                .querySelector("meta[name='csrf-token']")
                .getAttribute("content")
        );

        // console.log({ url, method, formData });
        try {
            await axios[method.toLowerCase()](url, form);
            Swal.fire({
                icon: "success",
                title: "Submitted Sucessfully",
                timer: 2000,
                showConfirmButton: true,
                timerProgressBar: true,
            });
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Not submitted",
                timer: 2000,
                showConfirmButton: true,
                timerProgressBar: true,
            });
        } finally {
            handleRefresh();
            setIsOpen(false);
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url(${bg_pattern})`,
            }}
            className={`${style.comment_cancellation_modal_container}`}
        >
            <section>
                <span>
                    <AiFillWarning
                        style={{
                            height: "100%",
                            width: "100%",
                            color: "#F8DB8F",
                        }}
                    />
                </span>
                {[...modal_data?.form].map((data, i) => {
                    if (data.type === "textarea") {
                        return <p key={i}>{data.label}</p>;
                    }
                })}
            </section>
            <div>
                <button
                    onClick={() => setIsOpen(false)}
                    className="btn btn-primary"
                >
                    No
                </button>
                {[...modal_data?.form_action].map((btn, i) => {
                    return loading ? (
                        <button
                            key={i}
                            className={`btn btn-${btn.color}`}
                            role="status"
                            style={{
                                cursor: "not-allowed",
                            }}
                        >
                            <span className="spinner-border" />
                        </button>
                    ) : (
                        <button
                            key={i}
                            className={`btn btn-${btn.color}`}
                            onClick={() =>
                                handleSubmit({
                                    method: btn.method,
                                    url: btn.url,
                                })
                            }
                        >
                            {btn.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default CommentCancellation;
