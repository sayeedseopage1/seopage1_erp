import { useState } from "react";
import { useGetFormDataQuery } from "../../../../../../services/api/requiredActionApiSlice";
import Button from "../../../../../../ui/Button";
import CKEditorComponent from "../../../../../../ui/ckeditor";
import { useRefresh } from "../../../../Index";
import ProjectChallenge from "./ProjectChallenge";
import { useEffect } from "react";
import style from "../../../../../../styles/required-action-card.module.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

// modal form
export default function ModalForm({ setIsOpen, form_data }) {
    const { handleRefresh } = useRefresh();
    const [loading, setLoading] = useState(false);
    const { data, isFetching, isLoading } = useGetFormDataQuery(
        form_data.button_url
    );
    const [formData, setFormData] = useState({});

    useEffect(() => {
        [...form_data.form].forEach((input) => {
            if (input?.type === "hidden") {
                setFormData((prev) => ({
                    ...prev,
                    [input.name]: input.value,
                }));
            } else if (input?.type === "select") {
                setFormData((prev) => ({
                    ...prev,
                    [input.name]: selectDefaultValue(input.options),
                }));
            }
        });
    }, [form_data]);

    const handleSubmit = async ({ url, method } = { url: "", method: "" }) => {
        // console.log({ formData });
        // return;
        setLoading(true);
        let emptyRequiredField = 0;
        [...form_data.form].forEach((input) => {
            if (input?.type !== "hidden" && input?.required) {
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
        form.append("_token",document.querySelector("meta[name='csrf-token']").getAttribute("content"));
        
        console.log({ url, method, formData });
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

    const handleEditorText = (e, editor, key_name) => {
        // console.log({ e, editor });
        const text = editor.getData();
        setFormData((prev) => ({ ...prev, [key_name]: text }));
    };

    return (
        <div>
            <section className={style.form_text_container}>
                {(() => {
                    if (data?.challenge) {
                        return (
                            <ProjectChallenge
                                data={data?.challenge}
                                loading={isFetching || isLoading}
                            />
                        );
                    }
                })()}
            </section>

            <section className={style.form_input_container}>
                {[...form_data.form].map((input, i) => {
                    if (input.type === "textarea") {
                        return (
                            <div key={i} className={style.form_textArea_label}>
                                <span>
                                    <b>{input.label} :</b>{" "}
                                    <b style={{ color: "red" }}>
                                        * This field is Required
                                    </b>
                                </span>
                                <div
                                    className="sp1_st_write_comment_editor"
                                    style={{
                                        minHeight: "100px",
                                        width: "100%",
                                    }}
                                >
                                    <CKEditorComponent
                                        onChange={(e, editor) =>
                                            handleEditorText(
                                                e,
                                                editor,
                                                input.name
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        );
                    } else if (input.type === "select") {
                        return (
                            <div
                                key={i}
                                className={style.form_select_area_container}
                            >
                                <span>
                                    <b>{input.label} :</b>{" "}
                                    {input?.required && (
                                        <b style={{ color: "red" }}>
                                            * This field is Required
                                        </b>
                                    )}
                                </span>
                                <span className={style.form_select_container}>
                                    <b className={style.form_select_title}>
                                        Select {input.name} :
                                    </b>
                                    <select
                                        name={input.name}
                                        onChange={(e) => {
                                            setFormData((prev) => ({
                                                ...prev,
                                                [input.name]: e.target.value,
                                            }));
                                        }}
                                        defaultValue={selectDefaultValue(
                                            input.options
                                        )}
                                        className={style.form_select}
                                    >
                                        {[...input.options].map((opt, i) => {
                                            return (
                                                <option
                                                    key={i}
                                                    value={opt.value}
                                                >
                                                    {opt.lable}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </span>
                            </div>
                        );
                    } else if (input.type === "file") {
                        return (
                            <div
                                key={i}
                                className={style.form_file_area_container}
                            >
                                <span>
                                    <b>{input.label} :</b>{" "}
                                    {input?.required && (
                                        <b style={{ color: "red" }}>
                                            * This field is Required
                                        </b>
                                    )}
                                </span>
                                <span className={style.form_file_container}>
                                    <div
                                        className={`sp1_file_upload--input-wrapper ${style.form_file_uploader}`}
                                    >
                                        <input
                                            style={{
                                                cursor: "pointer",
                                            }}
                                            type={input.type}
                                            required={input.required}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    [input.name]:
                                                        e.target.files[0],
                                                }))
                                            }
                                            className="sp1_file_upload--input"
                                        />
                                        <i className="fa-solid fa-cloud-arrow-up" />
                                        <span
                                            style={{
                                                textTransform: "capitalize",
                                                textAlign: "center",
                                            }}
                                            className="mt-2"
                                        >
                                            Upload <br /> {input.name}
                                        </span>
                                    </div>
                                    {formData[input.name] ? (
                                        <div
                                            className={
                                                style.form_file_previewer
                                            }
                                        >
                                            <img
                                                src={URL.createObjectURL(
                                                    formData[input.name]
                                                )}
                                                alt={input.name}
                                            />
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </span>
                            </div>
                        );
                    }
                })}
            </section>

            <section className={style.form_btn_container}>
                {[...form_data.form_action].map((btn, i) => {
                    // console.log({ btn });
                    return (
                        <Button
                            key={i}
                            variant={btn.color}
                            isLoading={loading}
                            size="sm"
                            onClick={() =>
                                handleSubmit({
                                    method: btn.method,
                                    url: btn.url,
                                })
                            }
                        >
                            {btn.label}
                        </Button>
                    );
                })}
            </section>
        </div>
    );
}

const selectDefaultValue = (arr = []) => {
    const defaultValue = [...arr].find((val) => {
        return val.selected;
    });

    return defaultValue.value;
};
