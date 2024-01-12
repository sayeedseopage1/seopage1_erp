import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Button from "../../../../global/Button";

const LeadAddButton = ({open}) => {
    return ReactDOM.createPortal(
        <Button className="mr-2" onClick={open}>
            <i className="fa fa-plus mr-2" aria-hidden="true"></i>
            <span>Add Lead</span>
        </Button>,
        document.getElementById("dmLeadAddButton")
    );
};

export default LeadAddButton;