import * as React from "react";
import { useCurrencyListQuery } from "../../../../services/api/currencyApiSlice";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";
import style from "./lead.module.css";

// styled component
import {
    DialogPanelWrapper,
    SelectionMenuWrapper,
} from "./ui/leadStyledComponent";
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
import {
    useGetCountryQuery,
    useLeadCreateMutation,
} from "../../../../services/api/leadApiSlice";
import axios from "axios";
import ReactDatePicker from "react-datepicker";
import dayjs from "dayjs";

const LeadCreationForm = ({ isOpen, close }) => {
    return (
        <React.Fragment>
            <Dialog as="div" open={isOpen} onClose={() => null}>
                <DialogPanelWrapper>
                    <Dialog.Panel className="dialog-panel">
                        <LeadCreationFormControl close={close} />
                    </Dialog.Panel>
                </DialogPanelWrapper>
            </Dialog>
        </React.Fragment>
    );
};

export default LeadCreationForm;

// initial form data
const initialData = {
    client_name: "",
    project_id: "",
    // project_name: "",
    project_link: "",
    project_type: "",
    deadline: "",
    bid_value: "",
    bid_value2: "",
    value: "",
    bidding_minutes: "",
    bidding_seconds: "",
    description: "",
    cover_letter: "", // cover letter
    explanation: "",
    insight_screenshot: "",
    bidpage_screenshot: "",
    projectpage_screenshot: "",

    original_currency_id: "",
    country: "",

    // client_username: "",
    // amount: "",
    // original_currency_id: "",
};

// form
const LeadCreationFormControl = ({ close, presetInitialData = null }) => {
    const [formData, setFormData] = React.useState(
        presetInitialData ?? initialData
    );
    const [error, setError] = React.useState(initialData);
    const [currency, setCurrency] = React.useState(null);
    const [clientCountry, setClientCountry] = React.useState(null);
    const [countries, setCountries] = React.useState(null);
    const [type, setType] = React.useState("fixed");
    const [deadline, setDeadline] = React.useState(null);

    React.useEffect(() => {
        axios.get(`/account/get-all-country`).then(({ data }) => {
            setCountries(data);
        });
    }, []);

    // api hooks
    const { data: currencies } = useCurrencyListQuery();
    // const { data: countries } = useGetCountryQuery();
    const [leadCreate, { isLoading }] = useLeadCreateMutation();

    // input field change
    const handleInputChange = (e) => {
        setFormData((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    // rich editor field change

    const handleEditorDataChange = (editor, key) => {
        setFormData((state) => ({
            ...state,
            [key]: editor.getData(),
        }));
    };

    // control project type change
    React.useEffect(() => {
        setFormData((state) => ({
            ...state,
            // amount: "",
            original_currency_id: "",
        }));
        setCurrency(null);
    }, [formData.project_type]);

    React.useEffect(() => {
        formData.project_type = "fixed";
    }, []);

    // handle submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = () => {
            const _error = {};

            for (const key in formData) {
                // console.log("inside loop");
                if (key === "explanation" || key === "bidpage_screenshot") {
                    continue;
                } else {
                    // console.log({ key, value: formData[key] });
                    // custom client side error message
                    if (key === "client_name") {
                        if (!formData[key]) {
                            _error[key] = "Please enter the project name!";
                        }
                    } else if (key === "project_id") {
                        if (!formData[key]) {
                            _error[key] = "Please enter the project id!";
                        }
                    } else if (key === "project_link") {
                        if (!formData[key]) {
                            _error[key] =
                                "Please enter correct project link (Freelancer.com) with https!";
                        }
                        // else if (!validator.isURL(formData[key])) {
                        //     _error[key] = "Invalid URL";
                        // }
                    } else if (key === "deadline") {
                        if (!formData[key]) {
                            _error[key] =
                                "Please select project deadline from Freelancer.com!";
                        }
                    } else if (key === "bid_value") {
                        if (!formData[key]) {
                            _error[key] =
                                "Please enter maximum project budget!";
                        }
                    } else if (key === "bid_value2") {
                        if (!formData[key]) {
                            _error[key] =
                                "Please enter minimum project budget!";
                        }
                    } else if (key === "value") {
                        if (!formData[key]) {
                            _error[key] = "Please enter bid value!";
                        }
                    } else if (key === "bidding_minutes") {
                        if (!formData[key]) {
                            _error[key] =
                                "Please enter bidding delayed time (minutes)!";
                        }
                    } else if (key === "bidding_seconds") {
                        if (!formData[key]) {
                            _error[key] =
                                "Please enter bidding delayed time (seconds)!";
                        }
                    } else if (key === "description") {
                        if (!formData[key]) {
                            _error[key] =
                                "Copy the project description from Freelancer.com and paste it here!";
                        }
                    } else if (key === "cover_letter") {
                        if (!formData[key]) {
                            _error[key] =
                                "Copy the cover letter you submitted when placing the bid and paste it here. Do not forget to format it (If needed)!";
                        }
                    } else if (key === "insight_screenshot") {
                        if (!formData[key]) {
                            _error[key] =
                                "Please enter project insight page screenshot link (Freelancer.com) with https!";
                        }
                        // else if (!validator.isURL(formData[key])) {
                        //     _error[key] = "Invalid URL";
                        // }
                    } else if (key === "projectpage_screenshot") {
                        if (!formData[key]) {
                            _error[key] =
                                "Please enter project page screenshot link (Freelancer.com) with https!";
                        }
                        // else if (!validator.isURL(formData[key])) {
                        //     _error[key] = "Invalid URL";
                        // }
                    } else if (key === "original_currency_id") {
                        if (!formData[key]) {
                            _error[key] = "Please select correct currency!";
                        }
                    } else if (key === "country") {
                        if (!formData[key]) {
                            _error[key] = "Please select client country!";
                        }
                    }
                }
            }

            // if project type hourly no need amount
            if (formData["project_type"] === "hourly") {
                delete _error["deadline"];
            }

            setError(_error);
            return Object.keys(_error)?.length === 0;
        };
        // console.log(formData,error);

        if (!isValid()) {
            toast.error("Please provide all required data!");
            return null;
        }

        try {
            const res = await leadCreate(formData).unwrap();
            // console.log(res);
            if (res.status === 400) {
                const _serverError = {};
                const _errorMssg = { ...res?.message?.customMessages };

                for (const key in _errorMssg) {
                    const [clientErrorKey] = key.split(".");
                    _serverError[clientErrorKey] = _errorMssg[key];
                }
                // console.log(_serverError,_errorMssg);
                setError(_serverError);
            } else {
                toast.success("Lead Created Successfully");
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
        setClientCountry(null);
        setDeadline(null);
        setError(initialData);
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
            country: value.id,
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
        return data?.filter((d) =>
            d?.name?.toLowerCase()?.includes(query?.toLowerCase())
        );
    };

    React.useEffect(() => {
        if (deadline) {
            setFormData((prev) => ({
                ...prev,
                deadline: dayjs(deadline).format(),
            }));
        }
    }, [deadline]);

    return (
        <Card>
            <Card.Head onClose={handleClose}>Create Lead</Card.Head>

            <Card.Body className="p-4 pb-0">
                <form>
                    <div className="row">
                        {/* Project Name */}
                        <div className="col-md-6">
                            <InputGroup>
                                <Label>
                                    {" "}
                                    Project Name <sup>*</sup> :{" "}
                                </Label>
                                <Input
                                    type="text"
                                    name="client_name"
                                    value={formData.client_name}
                                    onChange={handleInputChange}
                                    placeholder="Enter project name"
                                />
                                {error?.client_name ? (
                                    <ErrorText>
                                        {" "}
                                        {error?.client_name}{" "}
                                    </ErrorText>
                                ) : (
                                    <></>
                                )}
                            </InputGroup>
                        </div>

                        {/* Project Id */}
                        <div className="col-md-6">
                            <InputGroup>
                                <Label>
                                    {" "}
                                    Project Id <sup>*</sup> :{" "}
                                </Label>
                                <Input
                                    type="text"
                                    name="project_id"
                                    value={formData.project_id}
                                    onChange={handleInputChange}
                                    placeholder="Enter project id"
                                />
                                {error?.project_id ? (
                                    <ErrorText> {error?.project_id} </ErrorText>
                                ) : (
                                    <></>
                                )}
                            </InputGroup>
                        </div>

                        {/* Project Link */}
                        <div className="col-md-12">
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
                                {error?.project_link ? (
                                    <ErrorText>
                                        {" "}
                                        {error?.project_link}{" "}
                                    </ErrorText>
                                ) : (
                                    <></>
                                )}
                            </InputGroup>
                        </div>

                        {type === "hourly" ? (
                            <>
                                {/* hourly rate */}
                                <div className="col-md-6">
                                    <InputGroup>
                                        <Label>
                                            {" "}
                                            Hourly Rate <sup>*</sup> :{" "}
                                        </Label>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Input
                                                    type="text"
                                                    name="bid_value"
                                                    value={formData.bid_value}
                                                    onChange={handleInputChange}
                                                    placeholder="Minimum"
                                                />
                                                {error?.bid_value ? (
                                                    <ErrorText>
                                                        {" "}
                                                        {error?.bid_value}{" "}
                                                    </ErrorText>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                            <div className="col-md-6">
                                                <Input
                                                    type="text"
                                                    name="bid_value2"
                                                    value={formData.bid_value2}
                                                    onChange={handleInputChange}
                                                    placeholder="Maximum"
                                                />
                                                {error?.bid_value2 ? (
                                                    <ErrorText>
                                                        {" "}
                                                        {error?.bid_value2}{" "}
                                                    </ErrorText>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                        </div>
                                    </InputGroup>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Deadline */}
                                <div className="col-md-4">
                                    <InputGroup className="d-flex flex-column">
                                        <Label>
                                            {" "}
                                            Project Deadline <sup>*</sup> :{" "}
                                        </Label>
                                        <ReactDatePicker
                                            className={`${style.deadline_picker}`}
                                            name="deadline"
                                            minDate={new Date()}
                                            selected={deadline}
                                            value={
                                                deadline
                                                    ? dayjs(deadline).format(
                                                          "DD-MM-YYYY"
                                                      )
                                                    : ""
                                            }
                                            onChange={(date) => {
                                                setDeadline(date);
                                            }}
                                            placeholderText="Project Deadline"
                                        />
                                        {error?.deadline ? (
                                            <ErrorText>
                                                {" "}
                                                {error?.deadline}{" "}
                                            </ErrorText>
                                        ) : (
                                            <></>
                                        )}
                                    </InputGroup>
                                </div>

                                {/* Project budget */}
                                <div className="col-md-4">
                                    <InputGroup>
                                        <Label>
                                            {" "}
                                            Project Budget <sup>*</sup> :{" "}
                                        </Label>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Input
                                                    type="text"
                                                    name="bid_value"
                                                    value={formData.bid_value}
                                                    onChange={handleInputChange}
                                                    placeholder="Minimum"
                                                />
                                                {error?.bid_value ? (
                                                    <ErrorText>
                                                        {" "}
                                                        {error?.bid_value}{" "}
                                                    </ErrorText>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                            <div className="col-md-6">
                                                <Input
                                                    type="text"
                                                    name="bid_value2"
                                                    value={formData.bid_value2}
                                                    onChange={handleInputChange}
                                                    placeholder="Maximum"
                                                />
                                                {error?.bid_value2 ? (
                                                    <ErrorText>
                                                        {" "}
                                                        {error?.bid_value2}{" "}
                                                    </ErrorText>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                        </div>
                                    </InputGroup>
                                </div>
                            </>
                        )}

                        {/* Bid value */}
                        <div
                            className={`${
                                type === "hourly" ? "col-md-6" : "col-md-4"
                            }`}
                        >
                            <InputGroup>
                                <Label>
                                    {" "}
                                    Bid value <sup>*</sup> :{" "}
                                </Label>
                                <Input
                                    type="number"
                                    name="value"
                                    value={formData.value}
                                    onChange={handleInputChange}
                                    placeholder="Enter Bid value"
                                />
                                {error?.value ? (
                                    <ErrorText> {error?.value} </ErrorText>
                                ) : (
                                    <></>
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
                                            onChange={(e) => {
                                                setType(e.target.value);
                                                handleInputChange(e);
                                            }}
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
                                            onChange={(e) => {
                                                setType(e.target.value);
                                                handleInputChange(e);
                                            }}
                                        />
                                        Hourly Project
                                    </RadioLabel>
                                </Flex>

                                {/* {error?.project_type ? (
                                    <ErrorText>
                                        {" "}
                                        {error?.project_type}{" "}
                                    </ErrorText>
                                ) : (
                                    <></>
                                )} */}
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
                                {error?.original_currency_id ? (
                                    <ErrorText>
                                        {" "}
                                        {error?.original_currency_id}{" "}
                                    </ErrorText>
                                ) : (
                                    <></>
                                )}
                            </InputGroup>
                        </div>

                        {/* Client Country */}
                        <div className="col-md-4">
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
                                {error?.country ? (
                                    <ErrorText> {error?.country} </ErrorText>
                                ) : (
                                    <></>
                                )}
                            </InputGroup>
                        </div>

                        {/* Bidding Delay Time  */}
                        <div className="col-md-12">
                            <InputGroup>
                                <Label>
                                    {" "}
                                    Bidding Delay Time <sup>*</sup> :{" "}
                                </Label>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Input
                                            type="text"
                                            name="bidding_minutes"
                                            value={formData.bidding_minutes}
                                            onChange={handleInputChange}
                                            placeholder="Minutes"
                                        />
                                        {error?.bidding_minutes ? (
                                            <ErrorText>
                                                {" "}
                                                {error?.bidding_minutes}{" "}
                                            </ErrorText>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <Input
                                            type="text"
                                            name="bidding_seconds"
                                            value={formData.bidding_seconds}
                                            onChange={handleInputChange}
                                            placeholder="Seconds"
                                        />
                                        {error?.bidding_seconds ? (
                                            <ErrorText>
                                                {" "}
                                                {error?.bidding_seconds}{" "}
                                            </ErrorText>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            </InputGroup>
                        </div>

                        {/* Project Description */}
                        <div className="col-12">
                            <InputGroup>
                                <Label>
                                    {" "}
                                    Project Description <sup>*</sup> :{" "}
                                </Label>
                                <div className="sp1_st_write_comment_editor pr-0">
                                    <CKEditor
                                        data={formData.description}
                                        onChange={(e, editor) =>
                                            handleEditorDataChange(
                                                editor,
                                                "description"
                                            )
                                        }
                                    />
                                </div>
                                {error?.description ? (
                                    <ErrorText>
                                        {" "}
                                        {error?.description}{" "}
                                    </ErrorText>
                                ) : (
                                    <></>
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
                                        data={formData.cover_letter}
                                        onChange={(e, editor) =>
                                            handleEditorDataChange(
                                                editor,
                                                "cover_letter"
                                            )
                                        }
                                    />
                                </div>

                                {error?.cover_letter ? (
                                    <ErrorText>
                                        {" "}
                                        {error?.cover_letter}{" "}
                                    </ErrorText>
                                ) : (
                                    <></>
                                )}
                            </InputGroup>
                        </div>

                        {/* Explanation */}
                        <div className="col-12">
                            <InputGroup>
                                <Label> Explanation {"(if Delay)"} : </Label>
                                <div className="sp1_st_write_comment_editor pr-0">
                                    <CKEditor
                                        data={formData.explanation}
                                        onChange={(e, editor) =>
                                            handleEditorDataChange(
                                                editor,
                                                "explanation"
                                            )
                                        }
                                    />
                                </div>
                                {error?.explanation ? (
                                    <ErrorText>
                                        {" "}
                                        {error?.explanation}{" "}
                                    </ErrorText>
                                ) : (
                                    <></>
                                )}
                            </InputGroup>
                        </div>

                        {/* Bids insight page (screenshot link) */}
                        <div className="col-md-12">
                            <InputGroup>
                                <Label>
                                    {" "}
                                    Bids Insight Page (Screenshot) <sup>
                                        *
                                    </sup>{" "}
                                    :{" "}
                                </Label>
                                <Input
                                    type="url"
                                    name="insight_screenshot"
                                    value={formData.insight_screenshot}
                                    onChange={handleInputChange}
                                    placeholder="Take a screenshot of the bids insight page, and share the link here."
                                />
                                {error?.insight_screenshot ? (
                                    <ErrorText>
                                        {" "}
                                        {error?.insight_screenshot}{" "}
                                    </ErrorText>
                                ) : (
                                    <></>
                                )}
                            </InputGroup>
                        </div>

                        {/* Bids page (screenshot link) */}
                        <div className="col-md-12">
                            <InputGroup>
                                <Label> Bids Page (Screenshot) : </Label>
                                <Input
                                    type="url"
                                    name="bidpage_screenshot"
                                    value={formData.bidpage_screenshot}
                                    onChange={handleInputChange}
                                    placeholder="Take a screenshot of the bid page, and share the link here."
                                />
                                {error?.bidpage_screenshot ? (
                                    <ErrorText>
                                        {" "}
                                        {error?.bidpage_screenshot}{" "}
                                    </ErrorText>
                                ) : (
                                    <></>
                                )}
                            </InputGroup>
                        </div>

                        {/* Project page (screenshot link) */}
                        <div className="col-md-12">
                            <InputGroup>
                                <Label>
                                    {" "}
                                    Project Page (Screenshot) <sup>
                                        *
                                    </sup> :{" "}
                                </Label>
                                <Input
                                    type="url"
                                    name="projectpage_screenshot"
                                    value={formData.projectpage_screenshot}
                                    onChange={handleInputChange}
                                    placeholder="Take a screenshot of the project page, and share the link here."
                                />
                                {error?.projectpage_screenshot ? (
                                    <ErrorText>
                                        {" "}
                                        {error?.projectpage_screenshot}{" "}
                                    </ErrorText>
                                ) : (
                                    <></>
                                )}
                            </InputGroup>
                        </div>
                    </div>
                </form>
            </Card.Body>

            <Card.Footer className="px-4 pb-4">
                <Button
                    isLoading={isLoading}
                    variant="tertiary"
                    onClick={handleClose}
                >
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
