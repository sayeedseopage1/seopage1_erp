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
    description: "",
    comments: "",
};

// form
const DealCreationFormControl = ({ close }) => {
    const [formData, setFormData] = React.useState(initialData);
    const [error, setError] = React.useState(initialData);
    const [currency, setCurrency] = React.useState(null);

    //client suggestions

    const [suggestions, setSuggestions] = React.useState([]);
    const [showBar, setShowBar] = React.useState(false);
    const [clientStatus, setClientStatus] = React.useState("");
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

            console.log("inside clients", clients);

            if (filteredClients.length === 0 && value.trim() !== "") {
                setClientStatus("new client");
            } else {
                setClientStatus("existing client");
            }

            setSuggestions(filteredClients);
        }
    };

    const handleUserSelection = (user) => {
        setShowBar(false);
        setFormData({
            client_username: user.user_name,
            client_name: user.name,
        });

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

        const isValid = () => {
            const _error = new Object();

            // check falsy data
            Object.keys(formData).map((key) => {
                if (key === "project_link") {
                    if (!formData[key]) {
                        _error[key] = "This Field is required!";
                    } else if (!validator.isURL(formData[key])) {
                        _error[key] = "Invalid URL";
                    }
                } else if (!formData[key]) {
                    _error[key] = "This Field is required!";
                }
            });

            // if project type hourly no need amount
            if (
                _error.hasOwnProperty("amount") &&
                formData.hasOwnProperty("project_type") &&
                formData["project_type"] === "hourly"
            ) {
                delete _error["amount"];
                delete _error["original_currency_id"];
            }

            setError(_error);
            return Object.keys(_error)?.length === 0;
        };

        if (!isValid()) {
            toast.error("Please provide all required data!");
            return null;
        }

        try {
            const res = await dealCreate(formData).unwrap();
            if (res.status === "success") {
                toast.success("Deal Created Successfully");
                handleClose();
            }
        } catch (error) {
            console.log({ error });
        }
    };

    // handle close form
    const handleClose = () => {
        setFormData({ initialData });
        setCurrency(null);
        close();
    };

    // handle currencySelection
    const handleCurrencySelection = (value) => {
        setCurrency(value);
        setFormData((state) => ({ ...state, original_currency_id: value.id }));
    };

    // filter
    const getCurrencies = (data, query) => {
        return data?.filter((d) =>
            d?.currency_code?.toLowerCase()?.includes(query?.toLowerCase())
        );
    };

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
                                {error?.client_username && (
                                    <ErrorText>
                                        {" "}
                                        {error?.client_username}{" "}
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

                                {error?.client_name && (
                                    <ErrorText>
                                        {" "}
                                        {error?.client_name}{" "}
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
                                {error?.project_name && (
                                    <ErrorText>
                                        {" "}
                                        {error?.project_name}{" "}
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
                                {error?.project_link && (
                                    <ErrorText>
                                        {" "}
                                        {error?.project_link}{" "}
                                    </ErrorText>
                                )}
                            </InputGroup>
                        </div>

                        {/* Project Type */}
                        <div className="col-md-4">
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
                            </InputGroup>
                        </div>

                        {/* Project Budget */}
                        <div className="col-md-4">
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
                                {error?.amount && (
                                    <ErrorText> {error?.amount} </ErrorText>
                                )}
                            </InputGroup>
                        </div>

                        {/* Currency */}
                        <div className="col-md-4">
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
                                {error?.original_currency_id && (
                                    <ErrorText>
                                        {" "}
                                        {error?.original_currency_id}{" "}
                                    </ErrorText>
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
                                {error?.description && (
                                    <ErrorText>
                                        {" "}
                                        {error?.description}{" "}
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

                                {error?.comments && (
                                    <ErrorText> {error?.comments} </ErrorText>
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
