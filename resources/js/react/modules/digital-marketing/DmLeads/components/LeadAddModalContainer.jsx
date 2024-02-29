import { Dialog } from "@headlessui/react";
import Card from "../../../../global/Card";
import {
    DialogPanelWrapper,
    SelectionMenuWrapper,
} from "./ui/leadStyledComponent";
import { useEffect, useState } from "react";
import { ErrorText, InputGroup, Label } from "./ui/form";
import Select from "../../../../global/Select";
import Button from "../../../../global/Button";
import UpWorkModal from "./UpWorkModal";
import FreeLancerModal from "./FreeLancerModal";

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
const LeadAddModalContainer = ({ isOpen, close }) => {
    const [step, setStep] = useState({
        stepCount: 1,
        stepName: "Lead Source",
    });
    const [source, setSource] = useState("");
    
    return (
        <Dialog as="div" open={isOpen} onClose={() => null}>
            <DialogPanelWrapper>
                <Dialog.Panel className="dialog-panel">
                    <Card
                        style={{
                            width: step.stepCount === 1 ? "500px" : "auto",
                            margin: "0 auto",
                        }}
                    >
                        <Card.Head
                            onClose={() => {
                                close();
                                setStep({
                                    stepCount: 1,
                                    stepName: "Lead Source",
                                });
                                setSource("");
                            }}
                        >
                            {step.stepCount === 1
                                ? "Lead Source"
                                : "Lead Details"}
                        </Card.Head>
                        <Card.Body className="pt-4 pb-0">
                            <div className="row">
                                {(() => {
                                    if (step.stepCount === 1) {
                                        return (
                                            <div className="col-md-12">
                                                <InputGroup>
                                                    <Label>
                                                        {" "}
                                                        Lead Source <sup>
                                                            *
                                                        </sup>{" "}
                                                        :{" "}
                                                    </Label>
                                                    <SelectionMenuWrapper>
                                                        <Select
                                                            value={source}
                                                            onChange={(
                                                                value
                                                            ) => {
                                                                setSource(
                                                                    value
                                                                );
                                                            }}
                                                            display={(value) =>
                                                                value || "--"
                                                            }
                                                            className="selection"
                                                        >
                                                            <Select.Options className="w-100">
                                                                {/* <Select.SearchControllerWrapper> */}
                                                                <Select.Option
                                                                    value={
                                                                        "Upwork.com"
                                                                    }
                                                                >
                                                                    {({
                                                                        selected,
                                                                    }) => (
                                                                        <div>
                                                                            Upwork.com
                                                                        </div>
                                                                    )}
                                                                </Select.Option>
                                                                <Select.Option
                                                                    value={
                                                                        "Freelancer.com"
                                                                    }
                                                                >
                                                                    {({
                                                                        selected,
                                                                    }) => (
                                                                        <div>
                                                                            Freelancer.com
                                                                        </div>
                                                                    )}
                                                                </Select.Option>
                                                                {/* </Select.SearchControllerWrapper> */}
                                                            </Select.Options>
                                                        </Select>
                                                    </SelectionMenuWrapper>
                                                    {!source ? (
                                                        <ErrorText>
                                                            Please select lead
                                                            source!
                                                        </ErrorText>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </InputGroup>
                                            </div>
                                        );
                                    }
                                    else{
                                      if (source === "Upwork.com") {
                                        return <UpWorkModal setSource={setSource} setStep={setStep} close={close} source={source}/>
                                      }else{
                                        return <FreeLancerModal etSource={setSource} setStep={setStep} close={close} source={source}/>
                                      }
                                    }
                                })()}
                            </div>
                        </Card.Body>
                        <Card.Footer className="px-4 pb-4">
                            {step.stepCount === 1 ? (
                                <Button
                                    isLoading={false}
                                    disabled={!source}
                                    onClick={() => {
                                        setStep({
                                            stepCount: 2,
                                            stepName: source,
                                        });
                                    }}
                                >
                                    Submit
                                </Button>
                            ) : (
                                <></>
                            )}
                        </Card.Footer>
                    </Card>
                </Dialog.Panel>
            </DialogPanelWrapper>
        </Dialog>
    );
};

export default LeadAddModalContainer;
