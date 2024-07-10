import * as React from "react";
import { useCurrencyListQuery } from "../../../../services/api/currencyApiSlice";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";
import axios from "axios";
// styled component
import {
    DialogPanelWrapper,
    SelectionMenuWrapper,
} from "./ui/dealStyledComponent";
import {
    ErrorText,
    Input,
    InputGroup,
    Label,
    RadioInput,
    RadioLabel,
} from "./ui/form";
import { Flex } from "./table/ui";
import validator from "validator";

// custom component
import Card from "../../../../global/Card";
import Button from "../../../../global/Button";
import Select from "../../../../global/Select";
import CKEditor from "../../../../ckeditor/index";
import { useDealCreateMutation } from "../../../../services/api/dealApiSlice";
import { useEffect } from "react";
import { is } from "immutable";
import {
    isStateAllHaveValue,
    markEmptyFieldsValidation,
} from "../../../../utils/stateValidation";
import { getValidFields } from "../../../SalesRiskAnalysis/helper/createFromValidation";

const DealCreationForm = ({ isOpen, close }) => {
    return (
        <React.Fragment>
            <Dialog as="div" open={isOpen} onClose={() => null}>
                <DialogPanelWrapper>
                    <Dialog.Panel className="dialog-panel">
                        <DealCreationFormControl close={close} />
                    </Dialog.Panel>
                </DialogPanelWrapper>
            </Dialog>
        </React.Fragment>
    );
};

export default DealCreationForm;

// initial form data
const initialData = {
    client_username: "",
    client_name: "",
    project_name: "",
    project_link: "",
    project_type: "",
    amount: "",
    original_currency_id: "",
    country: "",
    description: "",
    comments: "",
};

const initialValidation = {
    client_username: false,
    client_name: false,
    project_name: false,
    project_link: false,
    project_type: false,
    amount: false,
    original_currency_id: false,
    country: false,
    description: false,
    comments: false,
    isProjectLinkInValid: false,
    isSubmitting: false,
};

// form
const DealCreationFormControl = ({ close }) => {
    const [formData, setFormData] = React.useState(initialData);
    const [formDataValidation, setFormDataValidation] =
        React.useState(initialValidation);
    const [error, setError] = React.useState(initialData);
    const [currency, setCurrency] = React.useState(null);
    const [selectedClient, setSelectedClient] = React.useState(null);

    //client suggestions

    const [suggestions, setSuggestions] = React.useState([]);
    const [showBar, setShowBar] = React.useState(false);
    const [clientStatus, setClientStatus] = React.useState("");
    const [clientCountry, setClientCountry] = React.useState(null);
    const [countries, setCountries] = React.useState(null);
    const [clients, setClients] = React.useState(null);

    React.useEffect(() => {
        // Check if clients data is already in sessionStorage
        const storedClients = sessionStorage.getItem("clients");

        if (storedClients) {
            // Use clients data from sessionStorage
            setClients(JSON.parse(storedClients));
        } else {
            // Fetch clients data
            axios.get(`/account/get-clients`).then(({ data }) => {
                // Save clients data in sessionStorage
                sessionStorage.setItem("clients", JSON.stringify(data));
                setClients(data);
            });
        }

        if (formData.client_username === "") {
            setClientStatus("");
        }
    }, []);

    React.useEffect(() => {
        axios.get(`/account/get-all-country`).then(({ data }) => {
            setCountries(data);
        });
    }, [countries]);

    // api hooks
    const { data: currencies } = useCurrencyListQuery();
    const [dealCreate, { isLoading }] = useDealCreateMutation();

    // input field change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // setShowBar(true);
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // if (clients) {
        //     const filteredClients = clients?.filter((client) =>
        //         client.user_name?.toLowerCase().includes(value?.toLowerCase())
        //     );

        //     console.log("inside clients", clients);

        //     if (filteredClients.length === 0 && value.trim() !== "") {
        //         setClientStatus("new client");
        //     } else {
        //         setClientStatus("existing client");
        //     }

        //     setSuggestions(filteredClients);
        // }
    };

    const handleInputChangeUsername = (e) => {
        const { name, value } = e.target;
        setShowBar(true);
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (clients) {
            const filteredClients = clients?.filter((client) =>
                client.user_name?.toLowerCase().includes(value?.toLowerCase())
            );

            if (filteredClients.length === 0 && value.trim() !== "") {
                setClientStatus("new client");
                setSelectedClient(null);
            } else {
                setClientStatus("existing client");
            }

            setSuggestions(filteredClients);
        }
    };

    const handleUserSelection = (user) => {
        setShowBar(false);
        setFormData({
            ...formData,
            client_username: user.user_name,
            client_name: user.name,
        });
        setFormData((state) => ({
            ...state,
            country: user?.country_id,
        }));
        const country = countries?.data.find((c) => c?.id === user?.country_id);
        setSelectedClient(user);
        setClientCountry(country);
        setClientStatus("existing client");
    };

    const highlightMatch = (text, query) => {
        const index = text.toLowerCase().indexOf(query.toLowerCase());
        if (index !== -1) {
            return (
                <span>
                    {text.substring(0, index)}
                    <strong>
                        {text.substring(index, index + query.length)}
                    </strong>
                    {text.substring(index + query.length)}
                </span>
            );
        }
        return text;
    };

    // rich editor field change

    const handleEditorDataChange = (value, name) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // control project type change
    React.useEffect(() => {
        setFormData((state) => ({
            ...state,
            amount: "",
            original_currency_id: "",
        }));
        setCurrency(null);
    }, [formData.project_type]);

    // handle submission
    const handleSubmit = async (e) => {
        e.preventDefault();
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

        const isProjectLinkInValid = validator.isURL(formData.project_link, {
            protocols: ["http", "https", "ftp"],
        });

        if (!isProjectLinkInValid) {
            setFormDataValidation({
                ...formDataValidation,
                isProjectLinkInValid: true,
            });
            return;
        }

        try {
            const res = await dealCreate(formData).unwrap();
            if (res.status === "success") {
                toast.success("Deal Created Successfully");
                handleClose();
            }
        } catch (error) {
            toast.error("Failed to create deal");
        }
    };

    // handle close form
    const handleClose = () => {
        setFormData({ initialData });
        setFormDataValidation(initialValidation);
        setCurrency(null);
        setSelectedClient(null);
        close();
    };

    // handle currencySelection
    const handleCurrencySelection = (value) => {
        setCurrency(value);
        setFormData((state) => ({ ...state, original_currency_id: value.id }));
    };

    // handle clientCountrySelection
    const handleClientCountrySelection = (value) => {
        setClientCountry(value);
        setFormData((state) => ({
            ...state,
            country: value?.id,
        }));
    };

    // filter
    const getCurrencies = (data, query) => {
        return data?.filter((d) =>
            d?.currency_code?.toLowerCase()?.includes(query?.toLowerCase())
        );
    };

    // filter
    const getCountries = (data, query) => {
        return data?.filter(
            (d) =>
                d?.name?.toLowerCase()?.includes(query?.toLowerCase()) ||
                d?.iso3?.toLowerCase()?.includes(query?.toLowerCase()) ||
                d?.nicename?.toLowerCase()?.includes(query?.toLowerCase()) ||
                d?.iso?.toLowerCase()?.includes(query?.toLowerCase())
        );
    };

    useEffect(() => {
        if (formDataValidation?.isSubmitting) {
            const payload = formData;
            let updatedDormDataValidation = formDataValidation;
            if (payload?.project_type === "hourly") {
                updatedDormDataValidation["amount"] = false;
                delete payload?.amount;
            }
            const validation = getValidFields(
                payload,
                updatedDormDataValidation
            );
            setFormDataValidation({
                ...formDataValidation,
                ...validation,
                isProjectLinkInValid:
                    formData.project_link &&
                    !validator.isURL(formData.project_link, {
                        protocols: ["http", "https", "ftp"],
                    }),
            });
        }
    }, [formData]);

    return (
        <Card>
            <Card.Head onClose={handleClose}>Create Deal</Card.Head>

            <Card.Body className="p-4 pb-0">
                <form>
                    <div className="row" onClick={() => setShowBar(false)}>
                        {/* client username */}
                        <div
                            className="col-md-6"
                            style={{ position: "relative" }}
                        >
                            <InputGroup>
                                <Label>
                                    {" "}
                                    Client Username <sup>*</sup> :{" "}
                                </Label>
                                <Input
                                    type="text"
                                    name="client_username"
                                    value={formData.client_username}
                                    onChange={handleInputChangeUsername}
                                    placeholder="Enter client username"
                                />
                                {suggestions.length > 0 && showBar && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "70px",
                                            textAlign: "left",
                                            listStyle: "none",
                                            padding: "10px",
                                            zIndex: 10000000,
                                            backgroundColor: "white",
                                            maxHeight: "205px",
                                            maxWidth: "250px",
                                            overflowY: "hidden",
                                            overflowX: "hidden",
                                            boxShadow:
                                                "0px 0px 10px rgba(0, 0, 0, 0.1)",
                                            border: "1px solid #ccc",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        <ul>
                                            {suggestions.map((user, index) => (
                                                <li
                                                    style={{
                                                        padding: "4px",

                                                        cursor: "pointer",
                                                        marginBottom: "3px",
                                                        transition:
                                                            "background-color 0.3s ease",
                                                    }}
                                                    key={index}
                                                    onClick={() =>
                                                        handleUserSelection(
                                                            user
                                                        )
                                                    }
                                                    onMouseOver={(e) => {
                                                        e.currentTarget.style.backgroundColor =
                                                            "#f0f0f0";
                                                    }}
                                                    onMouseOut={(e) => {
                                                        e.currentTarget.style.backgroundColor =
                                                            "transparent";
                                                    }}
                                                >
                                                    {highlightMatch(
                                                        user.user_name,
                                                        formData.client_username
                                                    )}
                                                    {`(${user.name})`}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {/* {error?.client_username && (
                                    <ErrorText>
                                        {" "}
                                        {error?.client_username}{" "}
                                    </ErrorText>
                                )} */}
                                {formDataValidation?.client_username && (
                                    <ErrorText>
                                        {" "}
                                        Client Username is required
                                    </ErrorText>
                                )}
                            </InputGroup>
                        </div>

                        {/* Client Name */}
                        <div className="col-md-6">
                            <InputGroup>
                                <Label>
                                    {" "}
                                    Client Name <sup>*</sup> :{" "}
                                </Label>
                                <Input
                                    type="text"
                                    name="client_name"
                                    value={formData.client_name}
                                    onChange={handleInputChangeUsername}
                                    placeholder="Enter client name"
                                />
                                {clientStatus ? (
                                    <div
                                        className={`badge ${
                                            clientStatus === "existing client"
                                                ? "badge-primary"
                                                : "badge-warning"
                                        }`}
                                    >
                                        {clientStatus === "existing client"
                                            ? "Existing Client"
                                            : "New Client"}
                                    </div>
                                ) : (
                                    ""
                                )}

                                {/* {error?.client_name && (
                                    <ErrorText>
                                        {" "}
                                        {error?.client_name}{" "}
                                    </ErrorText>
                                )} */}
                                {formDataValidation?.client_name && (
                                    <ErrorText>
                                        {" "}
                                        Client Name is required
                                    </ErrorText>
                                )}
                            </InputGroup>
                        </div>

                        {/* Project Name */}
                        <div className="col-md-6">
                            <InputGroup>
                                <Label>
                                    {" "}
                                    Project Name <sup>*</sup> :{" "}
                                </Label>
                                <Input
                                    type="text"
                                    name="project_name"
                                    value={formData.project_name}
                                    onChange={handleInputChange}
                                    placeholder="Enter project name"
                                />
                                {/* {error?.project_name && (
                                    <ErrorText>
                                        {" "}
                                        {error?.project_name}{" "}
                                    </ErrorText>
                                )} */}
                                {formDataValidation?.project_name && (
                                    <ErrorText>
                                        {" "}
                                        Project Name is required
                                    </ErrorText>
                                )}
                            </InputGroup>
                        </div>

                        {/* Project Link */}
                        <div className="col-md-6">
                            <InputGroup>
                                <Label>
                                    {" "}
                                    Project Link <sup>*</sup> :{" "}
                                </Label>
                                <Input
                                    type="url"
                                    name="project_link"
                                    value={formData.project_link}
                                    onChange={handleInputChange}
                                    placeholder="Enter project link"
                                />
                                {/* {error?.project_link && (
                                    <ErrorText>
                                        {" "}
                                        {error?.project_link}{" "}
                                    </ErrorText>
                                )} */}
                                {formDataValidation?.isProjectLinkInValid && (
                                    <ErrorText>
                                        The project link format is invalid.{" "}
                                    </ErrorText>
                                )}
                                {formDataValidation?.project_link && (
                                    <ErrorText>
                                        Project Link is required
                                    </ErrorText>
                                )}
                            </InputGroup>
                        </div>

                        {/* Project Type */}
                        <div className="col-md-6">
                            <InputGroup>
                                <Label>
                                    {" "}
                                    Project Type <sup>*</sup> :{" "}
                                </Label>
                                <Flex justifyContent="flex-start">
                                    <RadioLabel>
                                        <RadioInput
                                            type="radio"
                                            name="project_type"
                                            value="fixed"
                                            checked={
                                                formData.project_type ===
                                                "fixed"
                                            }
                                            onChange={handleInputChange}
                                        />
                                        Fixed Project
                                    </RadioLabel>

                                    <RadioLabel>
                                        <RadioInput
                                            type="radio"
                                            name="project_type"
                                            value="hourly"
                                            checked={
                                                formData.project_type ===
                                                "hourly"
                                            }
                                            onChange={handleInputChange}
                                        />
                                        Hourly Project
                                    </RadioLabel>
                                </Flex>

                                {error?.project_type && (
                                    <ErrorText>
                                        {" "}
                                        {error?.project_type}{" "}
                                    </ErrorText>
                                )}
                                {formDataValidation?.project_type && (
                                    <ErrorText>
                                        Project Type is required
                                    </ErrorText>
                                )}
                            </InputGroup>
                        </div>

                        {/* Project Budget */}
                        <div className="col-md-6">
                            <InputGroup>
                                <Label>
                                    {" "}
                                    Project Budget <sup>*</sup> :{" "}
                                </Label>
                                <Input
                                    type="number"
                                    name="amount"
                                    disabled={
                                        formData.project_type === "hourly"
                                    }
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    placeholder="Enter project Budget"
                                />
                                {/* {error?.amount && (
                                    <ErrorText> {error?.amount} </ErrorText>
                                )} */}
                                {formDataValidation?.amount && (
                                    <ErrorText>
                                        {" "}
                                        Project Budget is required{" "}
                                    </ErrorText>
                                )}
                            </InputGroup>
                        </div>

                        {/* Currency */}
                        <div className="col-md-6">
                            <InputGroup>
                                <Label>
                                    {" "}
                                    Currency <sup>*</sup> :{" "}
                                </Label>
                                <SelectionMenuWrapper>
                                    <Select
                                        value={currency}
                                        onChange={handleCurrencySelection}
                                        display={(value) =>
                                            value?.currency_code ?? "--"
                                        }
                                        className="selection"
                                    >
                                        <Select.Options>
                                            <Select.SearchControllerWrapper>
                                                {(query) =>
                                                    getCurrencies(
                                                        currencies?.data,
                                                        query
                                                    )?.map((currency) => (
                                                        <Select.Option
                                                            key={currency.id}
                                                            value={currency}
                                                        >
                                                            {({ selected }) => (
                                                                <div>
                                                                    {
                                                                        currency?.currency_code
                                                                    }{" "}
                                                                    ({" "}
                                                                    {
                                                                        currency?.currency_symbol
                                                                    }{" "}
                                                                    )
                                                                </div>
                                                            )}
                                                        </Select.Option>
                                                    ))
                                                }
                                            </Select.SearchControllerWrapper>
                                        </Select.Options>
                                    </Select>
                                </SelectionMenuWrapper>
                                {/* {error?.original_currency_id && (
                                    <ErrorText>
                                        {" "}
                                        {error?.original_currency_id}{" "}
                                    </ErrorText>
                                )} */}
                                {formDataValidation?.original_currency_id && (
                                    <ErrorText>
                                        {" "}
                                        Currency is required{" "}
                                    </ErrorText>
                                )}
                            </InputGroup>
                        </div>

                        {/* Client Country */}
                        <div className="col-md-6">
                            <InputGroup>
                                <Label>
                                    {" "}
                                    Client Country <sup>*</sup> :{" "}
                                </Label>
                                <SelectionMenuWrapper>
                                    <Select
                                        value={clientCountry}
                                        onChange={handleClientCountrySelection}
                                        display={(value) =>
                                            value
                                                ? `${value?.nicename} ( ${value?.iso3} )`
                                                : "--"
                                        }
                                        className="selection"
                                        disabled={
                                            selectedClient?.country_id &&
                                            selectedClient?.country_id ===
                                                clientCountry?.id
                                        }
                                    >
                                        <Select.Options>
                                            <Select.SearchControllerWrapper>
                                                {(query) =>
                                                    getCountries(
                                                        countries?.data,
                                                        query
                                                    )?.map((country) => (
                                                        <Select.Option
                                                            key={country.id}
                                                            value={country}
                                                        >
                                                            {({ selected }) => (
                                                                <div>
                                                                    {
                                                                        country?.nicename
                                                                    }{" "}
                                                                    {country?.iso3
                                                                        ? `( ${country?.iso3} )`
                                                                        : ""}
                                                                </div>
                                                            )}
                                                        </Select.Option>
                                                    ))
                                                }
                                            </Select.SearchControllerWrapper>
                                        </Select.Options>
                                    </Select>
                                </SelectionMenuWrapper>
                                {/* {error?.country ? (
                                    <ErrorText> {error?.country} </ErrorText>
                                ) : (
                                    <></>
                                )} */}
                                {formDataValidation?.country && (
                                    <ErrorText> Country is required </ErrorText>
                                )}
                            </InputGroup>
                        </div>
                        {/* Project Description */}
                        <div className="col-12">
                            <InputGroup>
                                <Label>
                                    Project Description <sup>*</sup> :{" "}
                                </Label>
                                <div className="sp1_st_write_comment_editor pr-0">
                                    <CKEditor
                                        data={formData.description}
                                        onChange={(e, editor) =>
                                            handleEditorDataChange(
                                                editor.getData(),
                                                "description"
                                            )
                                        }
                                    />
                                </div>
                                {/* {error?.description && (
                                    <ErrorText>
                                        {" "}
                                        {error?.description}{" "}
                                    </ErrorText>
                                )} */}
                                {formDataValidation?.description && (
                                    <ErrorText>
                                        Project Description is required
                                    </ErrorText>
                                )}
                            </InputGroup>
                        </div>

                        {/* Cover Letter */}
                        <div className="col-12">
                            <InputGroup>
                                <Label>
                                    {" "}
                                    Cover Letter <sup>*</sup> :{" "}
                                </Label>
                                <div className="sp1_st_write_comment_editor pr-0">
                                    <CKEditor
                                        data={formData.comments}
                                        onChange={(e, editor) =>
                                            handleEditorDataChange(
                                                editor.getData(),
                                                "comments"
                                            )
                                        }
                                    />
                                </div>

                                {/* {error?.comments && (
                                    <ErrorText> {error?.comments} </ErrorText>
                                )} */}
                                {formDataValidation?.comments && (
                                    <ErrorText>
                                        Cover Letter is required
                                    </ErrorText>
                                )}
                            </InputGroup>
                        </div>
                    </div>
                </form>
            </Card.Body>

            <Card.Footer className="px-4 pb-4">
                <Button variant="tertiary" onClick={handleClose}>
                    Close
                </Button>
                <Button
                    isLoading={isLoading}
                    loaderTitle="Processing..."
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Card.Footer>
        </Card>
    );
};
