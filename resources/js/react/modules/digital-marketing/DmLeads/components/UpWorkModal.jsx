import React, { useEffect } from "react";
import {
    ErrorText,
    Input,
    InputGroup,
    Label,
    RadioInput,
    RadioLabel,
} from "./ui/form";
import { useCurrencyListQuery } from "../../../../services/api/currencyApiSlice";
import ReactDatePicker from "react-datepicker";
import style from "./dmLeades.module.css";
import dayjs from "dayjs";
import { Flex } from "./table/ui";
import { SelectionMenuWrapper } from "./ui/leadStyledComponent";
import CKEditor from "../../../../ckeditor/index";
import Select from "../../../../global/Select";
import axios from "axios";
import Button from "../../../../global/Button";
import { useStoreDmLeadMutation } from "../../../../services/api/dmLeadsApiSlice";
import { toast } from "react-toastify";
import { isStateAllHaveValue, markEmptyFieldsValidation } from "../../../../utils/stateValidation";
import validator from "validator";
import { formatAPIErrors } from "../../../../utils/formatAPIErrors";

// initial form data
const initialData = {
    client_name: "",
    country: "",
    project_link: "",
    deadline: "",
    bid_value: "",
    bid_value2: "",
    value: "",
    project_type: "fixed",
    original_currency_id: "",
    description: "",
    cover_letter: "",
    total_spent: "",
    // project_id: "",
    // project_name: "",
    // bidding_minutes: "",
    // bidding_seconds: "",
    // explanation: "",
    // insight_screenshot: "",
    // bidpage_screenshot: "",
    // projectpage_screenshot: "",

    // client_username: "",
    // amount: "",
};

const UpWorkModal = ({ close, source, setSource, setStep }) => {
    const [formData, setFormData] = React.useState(initialData);
    const [upworkInputData, setUpworkInputData] = React.useState({
        client_name: "",
        country: "",
        project_link: "",
        deadline: "",
        bid_value: "",
        bid_value2: "",
        value: "",
        project_type: "fixed",
        original_currency_id: "",
        description: "",
        cover_letter: "",
        total_spent: "",
        original_currency_id: "",
    })
    const [upworkInputValidation, setUpworkInputValidation] = React.useState({
        client_name: false,
        country: false,
        project_link: false,
        isProjectLinkValid: false,
        deadline: false,
        bid_value: false,
        bid_value2: false,
        value: false,
        project_type: false,
        original_currency_id: false,
        description: false,
        cover_letter: false,
        total_spent: false,
        original_currency_id: false,
        isSubmitting: false
    });
    const [error, setError] = React.useState(initialData);
    const [validationErrors, setValidationErrors] = React.useState([]);
    const [currency, setCurrency] = React.useState(null);
    const [clientCountry, setClientCountry] = React.useState(null);
    const [type, setType] = React.useState("fixed");
    const [deadline, setDeadline] = React.useState(null);
    const [countries, setCountries] = React.useState(null);

    // api hooks
    const { data: currencies } = useCurrencyListQuery();
    const [storeDmLead, { isLoading }] = useStoreDmLeadMutation();

    React.useEffect(() => {
        axios.get(`/account/get-all-country`).then(({ data }) => {
            setCountries(data);
        });
    }, []);

    // input field change
    const handleInputChange = (e) => {
        setFormData((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
        setUpworkInputData((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const handleOnkeypress = e => {
        const keyCode = e.keyCode || e.which;
        if (
            (keyCode < 48 || keyCode > 57) && // 0-9
            keyCode !== 8 && // Backspace
            keyCode !== 37 && // Left arrow
            keyCode !== 39 // Right arrow
        ) {
            e.preventDefault();
        }
    }


    // rich editor field change
    const handleEditorDataChange = (editor, key) => {
        setFormData((state) => ({
            ...state,
            [key]: editor.getData(),
        }));
        setUpworkInputData((state) => ({
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
        setFormData(prev => ({...prev, project_type: "fixed"}));
    }, []);

    // handle submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(upworkInputData.project_type === "hourly") delete upworkInputData.deadline;
        const isEmpty = isStateAllHaveValue(upworkInputData);
        if (isEmpty) {
            const validation = markEmptyFieldsValidation(upworkInputData);
            setUpworkInputValidation({
                ...upworkInputValidation,
                ...validation,
                isSubmitting: true,
            });
            return;
        }


        const isProjectURLValid = validator.isURL(upworkInputData.project_link, {
            protocols: ['http','https','ftp'],
        });


        if(!isProjectURLValid){
            setUpworkInputValidation({
                ...upworkInputValidation,
                isProjectLinkValid: true,
                isSubmitting: true,
            });
            return;
        }



        // const isValid = () => {
        //     const _error = {};

        //     for (const key in formData) {
        //         // console.log("inside loop");
        //         if (key === "explanation" || key === "bidpage_screenshot") {
        //             continue;
        //         } else {
        //             // console.log({ key, value: formData[key] });
        //             // custom client side error message
        //             if (key === "client_name") {
        //                 if (!formData[key]) {
        //                     _error[key] = "Please enter the project name!";
        //                 }
        //             } else if (key === "project_id") {
        //                 if (!formData[key]) {
        //                     _error[key] = "Please enter the project id!";
        //                 }
        //             } else if (key === "project_link") {
        //                 if (!formData[key]) {
        //                     _error[key] =
        //                         `Please enter correct project link (${source}) with https!`;
        //                 }
        //                 // else if (!validator.isURL(formData[key])) {
        //                 //     _error[key] = "Invalid URL";
        //                 // }
        //             } else if (key === "deadline") {
        //                 if (!formData[key]) {
        //                     _error[key] =
        //                         "Please select project deadline from Upwork.com!";
        //                 }
        //             } else if (key === "bid_value") {
        //                 if (!formData[key]) {
        //                     _error[key] =
        //                         "Please enter maximum project budget!";
        //                 }
        //             } else if (key === "bid_value2") {
        //                 if (!formData[key]) {
        //                     _error[key] =
        //                         "Please enter minimum project budget!";
        //                 }
        //             } else if (key === "value") {
        //                 if (!formData[key]) {
        //                     _error[key] = "Please enter bid value!";
        //                 }
        //             } else if (key === "bidding_minutes") {
        //                 if (!formData[key]) {
        //                     _error[key] =
        //                         "Please enter bidding delayed time (minutes)!";
        //                 }
        //             } else if (key === "bidding_seconds") {
        //                 if (!formData[key]) {
        //                     _error[key] =
        //                         "Please enter bidding delayed time (seconds)!";
        //                 }
        //             } else if (key === "description") {
        //                 if (!formData[key]) {
        //                     _error[key] =
        //                         `Copy the project description from ${source} and paste it here!`;
        //                 }
        //             } else if (key === "cover_letter") {
        //                 if (!formData[key]) {
        //                     _error[key] =
        //                         "Copy the cover letter you submitted when placing the bid and paste it here. Do not forget to format it (If needed)!";
        //                 }
        //             } else if (key === "insight_screenshot") {
        //                 if (!formData[key]) {
        //                     _error[key] =
        //                         `Please enter project insight page screenshot link (${source}) with https!`;
        //                 }
        //                 // else if (!validator.isURL(formData[key])) {
        //                 //     _error[key] = "Invalid URL";
        //                 // }
        //             } else if (key === "projectpage_screenshot") {
        //                 if (!formData[key]) {
        //                     _error[key] =
        //                         `Please enter project page screenshot link (${source}) with https!`;
        //                 }
        //                 // else if (!validator.isURL(formData[key])) {
        //                 //     _error[key] = "Invalid URL";
        //                 // }
        //             } else if (key === "original_currency_id") {
        //                 if (!formData[key]) {
        //                     _error[key] = "Please select correct currency!";
        //                 }
        //             } else if (key === "country") {
        //                 if (!formData[key]) {
        //                     _error[key] = "Please select client country!";
        //                 }
        //             } else if (key === "total_spent") {
        //                 if (!formData[key]) {
        //                     _error[key] = "Please enter total spent!";
        //                 }
        //             }
        //         }
        //     }

        //     // if project type hourly no need amount
        //     if (formData["project_type"] === "hourly") {
        //         delete _error["deadline"];
        //     }

        //     setError(_error);
        //     return Object.keys(_error)?.length === 0;
        // };
        // // console.log(formData,error);

        // if (!isValid()) {
        //     toast.error("Please provide all required data!");
        //     return null;
        // }

        try {
            const res = await storeDmLead({...upworkInputData,lead_source:source}).unwrap();
            
            // console.log(res);
            if (res?.status === 400) {
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
                setStep({
                    stepCount: 1,
                    stepName: "Lead Source",
                })
                setSource("");
                handleClose();
            }
        } catch (error) {
            if(error?.status === 422){
                const errors = formatAPIErrors(error?.data?.errors);  
                setValidationErrors(errors);
                if(errors.includes("The project id has already been taken.")){
                    setUpworkInputValidation({
                        ...upworkInputValidation,
                        isProjectIdUnique: true,
                    });
                } else if(errors.includes("The project link format is invalid.")){
                    console.log("inside");
                    setUpworkInputValidation({
                        ...upworkInputValidation,
                        isProjectLinkValid: true,
                    });
                }
                errors.forEach(error => {
                    toast.error(error);
                });
            } else {
                toast.error("Something went wrong");
            }
           
        }
    };

    // handle close form
    const handleClose = () => {
        setFormData({ ...initialData });
        setUpworkInputData({});
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
        setUpworkInputData((state) => ({ ...state, original_currency_id: value.id }));
    };

    // handle clientCountrySelection
    const handleClientCountrySelection = (value) => {
        setClientCountry(value);
        setFormData((state) => ({
            ...state,
            country: value.nicename,
        }));
        setUpworkInputData((state) => ({
            ...state,
            country: value.nicename,
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
            setUpworkInputData((prev) => ({
                ...prev,
                deadline: dayjs(deadline).format(),
            }));
        }
    }, [deadline]);


        // Check if fields are empty
    useEffect(() => {
            if(upworkInputValidation.isSubmitting){
                const validation = markEmptyFieldsValidation(upworkInputData);
                console.log(!validator.isURL(upworkInputData.project_link));
                setUpworkInputValidation({
                    ...upworkInputValidation,
                    ...validation,
                    project_link:false,
                    isProjectIdUnique: false,
                    isProjectLinkValid: !validator.isURL(upworkInputData.project_link) ,
                });

                if(validationErrors?.length ){
                    setUpworkInputValidation({
                        ...upworkInputValidation,
                        isProjectLinkValid: validationErrors.includes("The project link format is invalid."),
                    });
                }

            }
    }, [upworkInputData, upworkInputValidation.isSubmitting, upworkInputValidation.isProjectLinkValid, validationErrors]);


    return (
        <div>
            <form>
                <div className="row">

                    {/* Source */}
                    <div className="col-md-12 mb-2">
                        <h2 className="text-center">{source}</h2>
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
                                name="client_name"
                                value={formData.client_name}
                                onChange={handleInputChange}
                                placeholder="Type project name from Upwork.com"
                            />
                            
                            {
                                upworkInputValidation.client_name && <ErrorText>Please enter the project name!</ErrorText>
                            }
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
                            
                            {
                                upworkInputValidation.country && <ErrorText>Please select client country!</ErrorText>
                            }
                        </InputGroup>
                    </div>

                    {/* Project Id */}
                    {/* <div className="col-md-6">
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
                    </div> */}

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
                                placeholder="Copy the project URL from the browser and paste it here."
                            />
                           
                            {
                                upworkInputValidation.project_link && <ErrorText>Please enter correct project link (Upwork.com) with http or https!</ErrorText>
                            }
                            {
                                upworkInputValidation.isProjectLinkValid && <ErrorText>Invalid URL! Please add http or https also</ErrorText>
                            }
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
                                            formData.project_type === "fixed"
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
                                            formData.project_type === "hourly"
                                        }
                                        onChange={(e) => {
                                            setType(e.target.value);
                                            handleInputChange(e);
                                        }}
                                    />
                                    Hourly Project
                                </RadioLabel>
                            </Flex>
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
                           
                            {
                                upworkInputValidation.original_currency_id && <ErrorText>Please select correct currency!</ErrorText>
                            }
                        </InputGroup>
                    </div>

                    {/* Total spent  */}
                    <div className="col-md-4">
                        <InputGroup>
                            <Label>
                                {" "}
                                Total Spent <sup>*</sup> :{" "}
                            </Label>
                            <Input
                                type="number"
                                name="total_spent"
                                min={0}
                                onKeyPress={handleOnkeypress}
                                defaultValue={formData.total_spent}
                                onChange={handleInputChange}
                                placeholder="Enter Total Spent"
                            />
                           
                            {
                                upworkInputValidation.total_spent && <ErrorText>Please enter total spent!</ErrorText>
                            }
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
                                                type="number"
                                                min={0}
                                                onKeyPress={handleOnkeypress}
                                                name="bid_value"
                                                value={formData.bid_value}
                                                onChange={handleInputChange}
                                                placeholder="Minimum"
                                            />
                                           
                                            {
                                                upworkInputValidation.bid_value && <ErrorText>Please enter maximum project budget!</ErrorText>
                                            }
                                        </div>
                                        <div className="col-md-6">
                                            <Input
                                                type="number"
                                                min={0}
                                                onKeyPress={handleOnkeypress}
                                                name="bid_value2"
                                                value={formData.bid_value2}
                                                onChange={handleInputChange}
                                                placeholder="Maximum"
                                            />
                                           
                                            {
                                                upworkInputValidation.bid_value2 && <ErrorText>Please enter minimum project budget!</ErrorText>
                                            }
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
                                        placeholderText="dd-mm-yyyy"
                                    />
                                   
                                    {
                                        upworkInputValidation.deadline && <ErrorText>Please select project deadline from Upwork.com!</ErrorText>
                                    }
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
                                                type="number"
                                                name="bid_value"
                                                min={0}
                                                pattern="[0-9]*"
                                                value={formData.bid_value}
                                                onKeyPress={handleOnkeypress}
                                                onChange={handleInputChange}
                                                placeholder="Minimum"
                                            />
                                          
                                            {
                                                upworkInputValidation.bid_value && <ErrorText>Please enter maximum project budget!</ErrorText>
                                            }
                                        </div>
                                        <div className="col-md-6">
                                            <Input
                                                type="text"
                                                name="bid_value2"
                                                onKeyPress={handleOnkeypress}
                                                value={formData.bid_value2}
                                                min={0}
                                                onChange={handleInputChange}
                                                placeholder="Maximum"
                                            />
                                           
                                            {
                                                upworkInputValidation.bid_value2 && <ErrorText>Please enter minimum project budget!</ErrorText>
                                            }
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
                                onKeyPress={handleOnkeypress}
                                value={formData.value}
                                min={0}
                                onChange={handleInputChange}
                                placeholder="Enter Bid value"
                            />
                            {
                                upworkInputValidation.value && <ErrorText>Please enter bid value!</ErrorText>
                            }
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
                            
                            {
                                upworkInputValidation.description && <ErrorText>Copy the project description from Upwork.com and paste it here!</ErrorText>
                            }
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

                       
                            {
                                upworkInputValidation.cover_letter && <ErrorText>Copy the cover letter you submitted when placing the bid and paste it here. Do not forget to format it (If needed)!</ErrorText>
                            }
                        </InputGroup>
                    </div>

                    {/* Submit */}
                    <div className="col-12 d-flex justify-content-end">
                        <Button
                            isLoading={isLoading}
                            loaderTitle="Submitting..."
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpWorkModal;
