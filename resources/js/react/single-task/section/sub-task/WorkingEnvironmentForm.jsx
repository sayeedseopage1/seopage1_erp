import React, { useState } from "react";
import Input from "../../components/form/Input";
import Button from "../../components/Button";
import { useWorkingEnvironmentMutation } from "../../../services/api/SingleTaskPageApi";
import SubmitButton from "../../components/SubmitButton";

const WorkingEnvironmentForm = ({task, onSubmit, close}) => {
    const [siteUrl, setSiteUrl] = useState("");
    const [frontendPassword, setFrontendPassword] = useState("");
    const [loginUrl, setLoginUrl] = useState("");
    const [
        siteLoginCredentialUserNameOrEmail,
        setSiteLoginCredentialUserNameOrEmail,
    ] = useState("");
    const [password, setPassword] = useState("");


    const [ workingEnvironment, {isLoading}] = useWorkingEnvironmentMutation();


    // handle input change
    const handleChange = (e, setState) => {
        e.preventDefault()
        setState(e.target.value);
    };


    const handleSubmit = (e) => {
        const data = {
            project_id: task?.projectId,
            site_url: siteUrl,
            login_url: loginUrl,
            email: siteLoginCredentialUserNameOrEmail,
            password: password,
            frontend_password: frontendPassword
        }

        workingEnvironment(data).unwrap().then(res => {
            close(),
            onSubmit();
        })

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
