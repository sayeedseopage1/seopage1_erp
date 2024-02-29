import { Dialog } from "@headlessui/react";
import React, { useMemo } from "react";
import styles from "./DealConversionForm.module.css";
import { ErrorText, Input, InputGroup, Label } from "../ui/form";
import CKEditorComponent from "../../../../../ckeditor";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useDmDealConversionMutation } from "../../../../../services/api/dmLeadsApiSlice";
import { isStateAllHaveValue, markEmptyFieldsValidation } from "../../../../../utils/stateValidation";
import validator from "validator";
import { formatAPIErrors } from "../../../../../utils/formatAPIErrors";

const DealConversionForm = ({ row, isOpen, close, ...rest }) => {
    const [messageLinks, setMessageLinks] = React.useState([
        { value: "", id: "abc" },
    ]);
    const [formData, setFormData] = React.useState({
        status: "Contact Made",
        client_username: "",
        profile_link: "",
        comments: "",
    });

    const [formDataValidation, setFormDataValidation] = React.useState({
        client_username: false,
        profile_link: false,
        isProfileLinkValid: false,
        comments: false,
        isSubmitting: false,
    });
    const [error, setError] = React.useState(null);

    const onClose = (e) => {
        e.preventDefault();
        setMessageLinks([{ value: "", id: "abc" }]);
        setFormData({
            status: "Contact Made",
            client_username: "",
            profile_link: "",
            comments: "",
        });
        close();
    };

    // handel form input on change event
    const handleOnChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // handle message link multiple import;
    const addNewLink = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const uniqueId = Math.random().toString(6).slice(2);

        setMessageLinks((prev) => [...prev, { value: "", id: uniqueId}]);
    };
    // remove
    const removeInputField = (e, id) => {
        e.preventDefault();
        e.stopPropagation();

        let data = messageLinks.filter((d) => d.id !== id);
        setMessageLinks(data);
    };

    // change editor
    const handleEditorDataChange = (e, editor) => {
        const data = editor.getData();
        setFormData((prev) => ({ ...prev, comments: data }));
    };

    // change
    const handleMessageLinkChange = (e, link) => {
        const _link = {
            ...link,
            value: e.target.value,
        };
        const data = messageLinks.map((d) => (d.id !== link.id ? d : _link));
        setMessageLinks(data);
    };

    const [dealConversion, { isLoading }] = useDmDealConversionMutation();

    // handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isEmpty = isStateAllHaveValue(formData);
        if (isEmpty) {
            const validation = markEmptyFieldsValidation(formData);
            setFormDataValidation({
                ...formDataValidation,
                ...validation,
                isSubmitting: true,
            });
            return;
        }

        const isProfileLinkValid = validator.isURL(formData.profile_link, {
            protocols: ['http','https','ftp'],
        });

        if(!isProfileLinkValid){
            setFormDataValidation({
                ...formDataValidation,
                isProfileLinkValid: true,
            });
            return;
        }


        const messageLinksErrors = {};
        _.forEach(messageLinks, (m) => {
            if (!m.value || !validator.isURL(m.value)) {
                messageLinksErrors[m.id] =
                    "Valid URL is required for Client Message Thread Link";
            }
        });

        console.log(messageLinksErrors);
        if (!_.isEmpty(messageLinksErrors)) {
            setError((err) => ({ ...err, message_links: messageLinksErrors }));
            return;
        }

        console.log("form data", formData);

        

        const data = {
            ...formData,
            id: row.original.id,
            message_link: messageLinks.map(link => link.value),
        };

        try {
            const res = await dealConversion(data);
            if (res.data.status === 400) {
                setError(res.data.errors);
            } else {
                toast.success("Deal Convert successfully");
                window.location.href = `/account/deals/${res.data.deal_id}`;
            }
        } catch (error) {
            if (error.data) {
                setError(error.data.errors);
            }
            if(error?.status === 422){
                const errors = formatAPIErrors(error?.data?.errors); 
                if(errors.includes("The project link format is invalid.")){
                    setFormDataValidation({
                        ...formDataValidation,
                        isProfileLinkValid: true,
                    });
                }
                errors.forEach(error => {
                    toast.error(error);
                });
            } else {
                toast.error("Something went wrong");
            }
            console.log(error);
        }
    };




    React.useEffect(() => {
        if(formDataValidation.isSubmitting){
            const validation = markEmptyFieldsValidation(formData);
            setFormDataValidation({
                ...formDataValidation,
                ...validation,
                profile_link:false,
                isProfileLinkValid: !validator.isURL(formData.profile_link, {
                    protocols: ['http','https','ftp']
                }),
            });
         
        }
    }, [formData, formDataValidation.isSubmitting, formDataValidation.isProfileLinkValid, ]); 




    return (
        <React.Fragment>
            <Dialog
                as="div"
                open={isOpen}
                onClose={onClose}
                className={styles.modal}
            >
                <div className={styles.overlay}>
                    <Dialog.Panel className={styles.panel}>
                        <div className={styles.header}>
                            <Dialog.Title className={styles.dialogTitle}>
                                Convert Lead to Deal (Contact Made)
                            </Dialog.Title>
                            <button
                                aria-label="closeDialogBox"
                                onClick={onClose}
                                className={styles.xCloseBtn}
                            >
                                <i className="fa-solid fa-xmark" />
                            </button>
                        </div>

                        <form onSubmit={(e) => e.preventDefault()}>
                            <InputGroup>
                                <Label>
                                    Status <sup>*</sup>
                                </Label>
                                <Input
                                    type="text"
                                    value={formData.status}
                                    aria-readonly={true}
                                    readOnly={true}
                                />
                            </InputGroup>

                            <InputGroup>
                                <Label>
                                    Client Username <sup>*</sup>
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="Enter Client Username"
                                    value={formData.client_username}
                                    name="client_username"
                                    onChange={handleOnChange}
                                />
                                {error?.client_username ? (
                                    <ErrorText>
                                        {" "}
                                        {error?.client_username[0]}{" "}
                                    </ErrorText>
                                ) : null}
                                {
                                    formDataValidation.client_username && <ErrorText>Client Username is required</ErrorText>
                                }
                            </InputGroup>

                            <InputGroup>
                                <Label>
                                    Client Profile Link <sup>*</sup>
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="Enter Client Profile Link"
                                    value={formData.profile_link}
                                    name="profile_link"
                                    onChange={handleOnChange}
                                />

                                
                                {
                                    formDataValidation.profile_link && <ErrorText>Client Profile Link is required! Please add also http</ErrorText>
                                }
                                {
                                    formDataValidation.isProfileLinkValid && <ErrorText>Client Profile Link is not valid! Please add also http</ErrorText>
                                }
                            </InputGroup>


                            <InputGroup>
                                <Label>
                                    Client Message Thread Link <sup>*</sup>
                                </Label>
                                {messageLinks.map((link, index) => (
                                    <>
                                    <Flex
                                        alignItems="center"
                                        gap="10px"
                                        key={index}
                                        className="mb-3"
                                    >
                                        <Input
                                            type="text"
                                            placeholder="Add link here..."
                                            value={link.value}
                                            onChange={(e) =>
                                                handleMessageLinkChange(e, link)
                                            }
                                            name="message_link"
                                        />
                                    
                                        {messageLinks.length > 1 && (
                                            <RemoveButton
                                                onClick={(e) =>
                                                    removeInputField(e, link.id)
                                                }
                                                aria-label="removeMessageLinkField"
                                            >
                                                <i className="fa-regular fa-trash-can" />
                                            </RemoveButton>
                                        )}
                                    </Flex>
                                    {!_.isEmpty(error?.message_links) ? (
                                            <ErrorText>
                                                {error?.message_links[link.id]}
                                            </ErrorText>
                                        ) : null}
                                     </>
                                ))}

                                <button onClick={addNewLink} className="px-2 btn btn-primary">
                                    + Add Another
                                </button>
                            </InputGroup>

                            <InputGroup>
                                <Label>
                                    Comment <sup>*</sup>
                                </Label>
                                <EditorContainer>
                                    <CKEditorComponent
                                        data={formData.comments}
                                        onChange={handleEditorDataChange}
                                   />
                                </EditorContainer>

                                {error?.comments ? (
                                    <ErrorText>
                                        {" "}
                                        {error?.comments[0]}{" "}
                                    </ErrorText>
                                ) : null}
                                {
                                    formDataValidation.comments && <ErrorText>Comment is required</ErrorText>
                                }
                            </InputGroup>
                        </form>

                        <Flex justifyContent="flex-end">
                            <CloseButton onClick={onClose}>Close</CloseButton>
                            <ConvertButton disabled={isLoading} onClick={handleSubmit}>
                              {isLoading ? 'Processing...' : 'Convert'}
                            </ConvertButton>
                        </Flex>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </React.Fragment>
    );
};

export default DealConversionForm;

export const Flex = styled.div`
    display: flex;
    align-items: ${(props) => props.alignItems ?? "center"};
    flex-direction: ${(props) => props.flexDirection ?? "row"};
    justify-content: ${(props) => props.justifyContent ?? "center"};
    gap: ${(props) => props.gap ?? "10px"};
`;

const RemoveButton = styled.button`
    background: tomato;
    padding: 10px 12px;
    color: white;
    border-radius: 4px;
    &:hover {
        opacity: 0.8;
    }
`;

const EditorContainer = styled.div`
    & > .ck-content {
        min-height: 130px;
    }

    & > .ck-editor__editable_inline {
        border: 1px solid #ddd !important;
        border-top: 0px !important;
    }
`;

const ConvertButton = styled.button`
    padding: 10px 16px;
    border-radius: 6px;
    color: #fff;
    border: 1px solid #ddd;
    background-color: var(--header_color);
`;

const CloseButton = styled(ConvertButton)`
    background-color: #ddd;
    color: #000;
`;
