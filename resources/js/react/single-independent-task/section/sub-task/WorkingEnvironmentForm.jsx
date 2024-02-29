import React, { useState } from "react";
import Input from "../../components/form/Input";
import Button from "../../components/Button";
import { useWorkingEnvironmentMutation } from "../../../services/api/SingleTaskPageApi";
import SubmitButton from "../../components/SubmitButton";
import { checkIsURL } from "../../../utils/check-is-url";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const WorkingEnvironmentForm = ({ task, onSubmit, close }) => {
    const [siteUrl, setSiteUrl] = useState("");
    const [frontendPassword, setFrontendPassword] = useState("");
    const [loginUrl, setLoginUrl] = useState("");
    const [
        siteLoginCredentialUserNameOrEmail,
        setSiteLoginCredentialUserNameOrEmail,
    ] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(null);

    const [workingEnvironment, { isLoading }] = useWorkingEnvironmentMutation();

    // handle input change
    const handleChange = (e, setState) => {
        e.preventDefault();
        setState(e.target.value);
    };

    const isValid = () => {
        let count = 0;
        const error = new Object();

        if (!siteUrl) {
            count++;
            error.siteUrl = "You have to provide Working/Staging Site's URL";
        } else if (!checkIsURL(siteUrl)) {
            count++;
            error.siteUrl = "Please enter a valid URL";
            toast.warn("Please enter a valid Working/Staging Site's URL", {
                position: "top-right",
            });
        }

        if (!loginUrl) {
            count++;
            error.loginUrl =
                "You have to provide Working/Staging Site's Admin Panel URL";
        } else if (!checkIsURL(loginUrl)) {
            count++;
            error.loginUrl = "Please enter a valid URL";
            toast.warn(
                "Please enter a valid Working/Staging Site's Admin Panel URL",
                { position: "top-right" }
            );
        }

        if (!siteLoginCredentialUserNameOrEmail) {
            count++;
            error.username =
                "You have to provide Working/Staging Site's Admin Username/Email";
        }

        if (!password) {
            count++;
            error.password =
                "You have to provide Working/Staging Site's Admin Password";
        }

        if (!frontendPassword) {
            count++;
            error.frontendPassword =
                "You have to provide Working/Staging Site's Frontend Password";
        }

        setErr(error);
        return !count;
    };

    const handleSubmit = async (e) => {
        const data = {
            project_id: task?.projectId,
            site_url: siteUrl,
            login_url: loginUrl,
            email: siteLoginCredentialUserNameOrEmail,
            password: password,
            task_id: task?.id,
            frontend_password: frontendPassword,
        };

        if (isValid()) {
            try {
                await workingEnvironment(data)
                    .unwrap()
                    .then((res) => {
                        close();
                        Swal.fire(
                            "Working environment store successfully",
                            "You can create subtask now",
                            "success"
                        ).then(({ isConfirmed }) => {
                            onSubmit();
                        });
                    });
            } catch (err) {
                console.log(err);
            }
        } else {
            toast.error("Please provide all required fields", {
                position: "top-right",
            });
        }
    };

    return (
        <div className="sp1-subtask-form w-100 --form -row">
            <div className="row">
                <div className="col-12 lg:col-6">
                    <Input
                        id="siteURL"
                        label="Working/Staging Site's URL"
                        type="text"
                        placeholder="Type Working/Staging Site's URL"
                        name="stie_url"
                        required={true}
                        value={siteUrl}
                        error={err?.siteUrl}
                        onChange={(e) => handleChange(e, setSiteUrl)}
                    />
                </div>

                <div className="col-12 lg:col-6">
                    <Input
                        id="frontendPassword"
                        label="Frontend Password"
                        type="text"
                        placeholder="Frontent Password"
                        name="frontend-end-password"
                        required={true}
                        value={frontendPassword}
                        error={err?.frontendPassword}
                        onChange={(e) => handleChange(e, setFrontendPassword)}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-12 col-md-4">
                    <Input
                        id="loginUrl"
                        label="Working/Staging Site's Admin Panel URL"
                        type="text"
                        placeholder="Type Working/Staging Site's Admin Panel URL"
                        name="login_url"
                        required={true}
                        value={loginUrl}
                        error={err?.loginUrl}
                        onChange={(e) => handleChange(e, setLoginUrl)}
                    />
                </div>

                <div className="col-12 col-md-5 h-100">
                    <Input
                        id="siteLoginCredential"
                        label="Working/Staging Site's Admin Panel Username/Email"
                        type="text"
                        placeholder="Type Working/Staging Site's Admin Panel Username/Email"
                        name="site-login-credential"
                        required={true}
                        value={siteLoginCredentialUserNameOrEmail}
                        error={err?.username}
                        onChange={(e) =>
                            handleChange(
                                e,
                                setSiteLoginCredentialUserNameOrEmail
                            )
                        }
                    />
                </div>

                <div className="col-12 col-md-3">
                    <div className="h-100 d-md-flex align-items-end">
                        <Input
                            id="password"
                            label="Password"
                            type="text"
                            placeholder="Password"
                            name="password"
                            className="mt-md-auto"
                            required={true}
                            value={password}
                            error={err?.password}
                            onChange={(e) => handleChange(e, setPassword)}
                        />
                    </div>
                </div>
            </div>

            <div className="col-12 mt-3">
                <div className="d-flex align-items-center justify-content-end">
                    <Button
                        variant="secondary"
                        className="mr-2"
                        onClick={close}
                    >
                        Cancel
                    </Button>

                    <SubmitButton onClick={handleSubmit} isLoading={isLoading}>
                        <i className="fa-regular fa-paper-plane" />
                        Create
                    </SubmitButton>

                    {/* {isLoading ? (
                        <Button onClick={handleSubmit}>
                            
                        </Button>
                    ) : (
                        <Button className="cursor-processing">
                            <div
                                className="spinner-border text-white"
                                role="status"
                                style={{
                                    width: "18px",
                                    height: "18px",
                                }}
                            ></div>
                            Processing...
                        </Button>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default WorkingEnvironmentForm;
