import "./bootstrap";
import "./components/TimeLogTable";
import "./components/Insights/main";
import "./components/Points/main";
import "./components/Incentives/main";
import "./components/QualifiedSales/main";
// import "./components/PendingAction/main";
import "./components/single-task/index"



import { createPopper } from '@popperjs/core';
var toggle = document.querySelectorAll('.sp1_deal-stage-wrapper');

toggle.forEach(element => { 
    var tooltip = element.querySelector('.sp1_deal-stage-content'); 
    element.addEventListener('mouseover', function(){ 
        tooltip.setAttribute('role', 'tooltip');
        createPopper(element, tooltip, {
            placement: 'bottom',
            modifiers: [
                {
                    name: 'flip',
                    options: {
                      fallbackPlacements: ['top', 'right', 'left', 'right'],
                    },
                },
            ]
        });
    }) 
});