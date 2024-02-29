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
import { useGetCountryQuery } from "../../../../services/api/leadApiSlice";
import ReactDatePicker from "react-datepicker";
import style from "./dmLeades.module.css";
import dayjs from "dayjs";
import { Flex } from "./table/ui";
import { SelectionMenuWrapper } from "./ui/leadStyledComponent";
import CKEditor from "../../../../ckeditor/index";
import Button from "../../../../global/Button";
import axios from "axios";
import Select from "../../../../global/Select";
import { useStoreDmLeadMutation } from "../../../../services/api/dmLeadsApiSlice";
import { toast } from "react-toastify";
import validator from "validator";
import { isStateAllHaveValue, markEmptyFieldsValidation } from "../../../../utils/stateValidation";
import { formatAPIErrors } from "../../../../utils/formatAPIErrors";

// initial form data
const initialData = {
    client_name: "",
    project_id: "",
    project_link: "",
    deadline: "",
    bid_value: "",
    bid_value2: "",
    value: "",
    project_type: "",
    original_currency_id: "",
    country: "",
    description: "",
    cover_letter: "",
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

const FreeLancerModal = ({ close, source, setSource, setStep }) => {
    const [formData, setFormData] = React.useState(initialData);
    const [freelancerInputData, setFreelancerInputData] = React.useState({
        project_type: "fixed",
        client_name: "",
        project_id: "",
        project_link: "",
        deadline: "",
        bid_value: "",
        bid_value2: "",
        value: "",
        description: "",
        cover_letter: "",
        original_currency_id: "",
        country: "",
    });
    const [freelancerInputValidation, setFreelancerInputValidation] = React.useState({
        client_name: false,
        country: false,
        project_id: false,
        isProjectIdUnique: false,
        project_link: false,
        deadline: false,
        bid_value: false,
        bid_value2: false,
        value: false,
        project_type: false,
        original_currency_id: false,
        isProjectLinkValid: false,
        description: false,
        cover_letter: false,
        total_spent: false,
        original_currency_id: false,
        isSubmitting: false
    });
    const [validationErrors, setValidationErrors] = React.useState([]);
    const [error, setError] = React.useState(initialData);
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
        setFreelancerInputData((state) => ({
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
        setFreelancerInputData((state) => ({
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

        if(freelancerInputData.project_type === "hourly") delete freelancerInputData.deadline;
        const isEmpty = isStateAllHaveValue(freelancerInputData);
        if (isEmpty) {
            const validation = markEmptyFieldsValidation(freelancerInputData);
            setFreelancerInputValidation({
                ...freelancerInputValidation,
                ...validation,
                isProjectIdUnique: false,
                isSubmitting: true,
            });

            return;
        }

        const isProjectLinkValid = validator.isURL(freelancerInputData.project_link, {
            protocols: ['http','https','ftp'],
        });

        if(!isProjectLinkValid){
            setFreelancerInputValidation({
                ...freelancerInputValidation,
                isProjectLinkValid: true,
            });
            return;
        }

        


        try {
            const res = await storeDmLead({
                ...freelancerInputData,
                lead_source: source,
            }).unwrap();
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
                setSource("");
                setStep({
                    stepCount: 1,
                    stepName: "Lead Source",
                })
                handleClose();
            }
        } catch (error) {
            if(error?.status === 422){
                const errors = formatAPIErrors(error?.data?.errors); 
                setValidationErrors(errors);
                if(errors.includes("The project id has already been taken.")){
                    setFreelancerInputValidation({
                        ...freelancerInputValidation,
                        isProjectIdUnique: true,
                    });
                } else if(errors.includes("The project link format is invalid.")){
                    setFreelancerInputValidation({
                        ...freelancerInputValidation,
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
        setFreelancerInputData((state) => ({
            ...state,
            original_currency_id: value.id,
        }));
    };

    // handle clientCountrySelection
    const handleClientCountrySelection = (value) => {
        setClientCountry(value);
        setFormData((state) => ({
            ...state,
            country: value.nicename,
        }));
        setFreelancerInputData((state) => ({
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
            setFreelancerInputData((prev) => ({
                ...prev,
                deadline: dayjs(deadline).format(),
            }));
        }
    }, [deadline]);


    React.useEffect(() => {
        if(freelancerInputValidation.isSubmitting){
            const validation = markEmptyFieldsValidation(freelancerInputData);
            setFreelancerInputValidation({
                ...freelancerInputValidation,
                ...validation,
                project_link:false,
                isProjectIdUnique: false,
                isProjectLinkValid: !validator.isURL(freelancerInputData.project_link),
            });
            if(validationErrors?.length){
                setFreelancerInputValidation({
                    ...freelancerInputValidation,
                    isProjectIdUnique: validationErrors?.includes("The project id has already been taken."),
                    isProjectLinkValid: validationErrors?.includes("The project link format is invalid."),
                });
            }
        }
    }, [freelancerInputData, freelancerInputValidation.isSubmitting, freelancerInputValidation.isProjectLinkValid, validationErrors]);




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
                                placeholder="Type project name from Freelancer.com"
                            />
                            
                            {
                                freelancerInputValidation.client_name && <ErrorText>Please enter the project name!</ErrorText>
                            }
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
                                name="project_id"
                                min={0}
                                onKeyPress={handleOnkeypress}
                                value={formData.project_id}
                                onChange={handleInputChange}
                                placeholder="Type project id from Freelancer.com"
                            />
                            
                            {
                                freelancerInputValidation.project_id && <ErrorText>Project Id is required</ErrorText>
                            }
                            {
                                freelancerInputValidation.isProjectIdUnique && <ErrorText>Project Id has already been taken</ErrorText>
                            }
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
                                placeholder="Copy the project URL from the browser and paste it here."
                            />
                            {
                                freelancerInputValidation.project_link && <ErrorText>Please enter correct project link (freelancer.com) with http or https!</ErrorText>
                            }
                            {
                                freelancerInputValidation.isProjectLinkValid && <ErrorText>Invalid URL! please add with http or https!</ErrorText>
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
                                freelancerInputValidation.original_currency_id && <ErrorText>Please select correct currency!</ErrorText>
                            }
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
                            
                            {
                                freelancerInputValidation.country && <ErrorText>Country is required</ErrorText>
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
                                                 min={0}
                                                 onKeyPress={handleOnkeypress}
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
                                            {
                                                freelancerInputValidation.bid_value && <ErrorText>Minimum Hourly Rate is required</ErrorText>
                                            }
                                        </div>
                                        <div className="col-md-6">
                                            <Input
                                                 min={0}
                                                 onKeyPress={handleOnkeypress}
                                                name="bid_value2"
                                                value={formData.bid_value2}
                                                onChange={handleInputChange}
                                                placeholder="Maximum"
                                            />
                                           
                                            {
                                                freelancerInputValidation.bid_value2 && <ErrorText>Maximum Hourly Rate is required</ErrorText>
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
                                        freelancerInputValidation.deadline && <ErrorText>Please select project deadline from freelancer.com!</ErrorText>
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
                                                 min={0}
                                                 onKeyPress={handleOnkeypress}
                                                name="bid_value"
                                                value={formData.bid_value}
                                                onChange={handleInputChange}
                                                placeholder="Minimum"
                                            />
                                            
                                            {
                                                freelancerInputValidation.bid_value && <ErrorText>Please enter maximum project budget!</ErrorText>
                                            }
                                        </div>
                                        <div className="col-md-6">
                                            <Input
                                                 min={0}
                                                 onKeyPress={handleOnkeypress}
                                                name="bid_value2"
                                                value={formData.bid_value2}
                                                onChange={handleInputChange}
                                                placeholder="Maximum"
                                            />
                                            
                                            {
                                                freelancerInputValidation.bid_value2 && <ErrorText>Please enter minimum project budget!</ErrorText>
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
                                 min={0}
                                 onKeyPress={handleOnkeypress}
                                name="value"
                                value={formData.value}
                                onChange={handleInputChange}
                                placeholder="Enter Bid value"
                            />
                            
                            {
                                freelancerInputValidation.value && <ErrorText>Please enter bid value!</ErrorText>
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
                                freelancerInputValidation.description && <ErrorText>Copy the project description from Freelancer.com and paste it here!</ErrorText>
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
                                freelancerInputValidation.cover_letter && <ErrorText>Copy the cover letter you submitted when placing the bid and paste it here. Do not forget to format it (If needed)!</ErrorText>
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

export default FreeLancerModal;
