import "./bootstrap";
import "./react/TimeLogTable";
import "./react/Insights/main";
import "./react/Points/main";
import "./react/Incentives/main";
import "./react/QualifiedSales/main";
// import "./react/PendingAction/main";
import "./react/single-independent-task/index";
import "./react/single-task/index";
import "./react/tasks/index";
import "./react/projects/index";
import "./react/disputes/index";
import "./react/portfolios/index";
import "./react/RevisionCalculator/main";
// import './react/revison-page/main'

// react latest components
import "./react-latest/routes/routes";

import { createPopper } from "@popperjs/core";
var toggle = document.querySelectorAll(".sp1_deal-stage-wrapper");

toggle.forEach((element) => {
    var tooltip = element.querySelector(".sp1_deal-stage-content");
    element.addEventListener("mouseover", function () {
        tooltip.setAttribute("role", "tooltip");
        createPopper(element, tooltip, {
            placement: "bottom",
            modifiers: [
                {
                    name: "flip",
                    options: {
                        fallbackPlacements: ["top", "right", "left", "right"],
                    },
                },
            ],
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const numberInput = document.querySelector("input[type='number']");
    numberInput?.addEventListener("wheel", function (e) {
        e.currentTarget.blur();
    });
});
