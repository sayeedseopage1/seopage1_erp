import { useState } from "react";
import { useGetFormDataQuery } from "../../../../../../services/api/requiredActionApiSlice";
import Button from "../../../../../../ui/Button";
import CKEditorComponent from "../../../../../../ui/ckeditor";
import { useRefresh } from "../../../../Index";
import ProjectChallenge from "./ProjectChallenge";
import { useEffect } from "react";
import style from "../../../../../../styles/required-action-card.module.css";
import { toast } from "react-toastify";

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
                setFormData((prev) => {
                    return {
                        ...prev,
                        [input.name]: input.value,
                    };
                });
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
        
        // console.log({ url, method, form });
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
                            <div
                                key={i}
                                className={style.form_textArea_label}
                            >
                                <span>
                                    <b>{input.label} :</b>{" "}
                                    {
                                        input?.required && 
                                        <b style={{ color: "red" }}>
                                            * This field is Required
                                        </b>
                                    }
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
