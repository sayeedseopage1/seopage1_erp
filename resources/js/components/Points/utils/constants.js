export const goal = [
    {
        id: 'goal_1',
        title: 'Deal',
        types : [
            {
                id: 'goal_1_type_1',
                title: "Added",
                subtitle: 'Based on the number or value of new deals'
            },
            {
                id: 'goal_1_type_2',
                title: "Progressed",
                subtitle: 'Based on the number or value of deals entering a certain stage'
            },
            {
                id: 'goal_1_type_3',
                title: "Won",
                subtitle: 'Based on the number or value of won deals'
            }

        ]
        
    },
    {
        id: 'goal_2',
        title: "Forecast",
        types: [
            {
                id: 'goal_2_type_1',
                title: 'Revenue forecast',
                subtitle: 'Based on weighted value of open and won deals'
            }
        ]
    }
]



export const reports = [
    {
        id: 'report_1',
        title: 'Lead',
        types: [
            {
                id: 'report_1_type_1',
                title: 'Performance',
                subtitle: 'How many leads did you create, archive or convert to deals?',
            },
            {
                id: 'report_1_type_2',
                title: 'Conversion',
                subtitle: 'What is the rate of your leads converting to deals?',
            }
        ]
    },
    {
        id: 'report_2',
        title: 'Deal',
        types: [
            {
                id: 'report_2_type_1',
                title: 'Performance',
                subtitle: 'How much did you start, win, or lose?',
            },
            {
                id: 'report_2_type_2',
                title: 'Conversion',
                subtitle: 'What is your win or loss rate?',
            },
            {
                id: 'report_2_type_3',
                title: 'Duration',
                subtitle: 'How long is your sales cycle?',
            },
            {
                id: 'report_2_type_4',
                title: 'Progress',
                subtitle: 'Are your deals moving forward in pipeline',
            }
        ]
    }

]




// relative time period
export const relativeDates = ["Yesterday", "Today", "Tomorrow"];
export const relativePeriod = [
    "This Week",
    "Last Week",
    "This Month",
    "Last Month",
    "This Quarter",
    "Last Quarter",
    "This Year",
    "Last Year",
];

export const rollingPeriod = [
    "Past 2 weeks",
    "Past 3 months",
    "past 6 months",
    "Past 12 months",
];


// graph colors
export const bgColors =  ["#7DC6E5","#fecf4c", "rgb(246, 183, 211)", "rgb(28, 145, 143)", 'rgb(180, 98, 177)'];











// table columns
export const dataTableColumns = ["ID", "Deal created", "Owner", "Pipeline", "Title", "Value", "Active", "Activities todo", "Contact person", "Creator", "Currency", "Deal closed on", "Done activities", "Email Messages count", "Expected closed data", "Label", "Last activity date", "Last incoming email time", "Last outgoing email time", "Last stage change", "Lost reason", "Lost time", "Next activity date", "Organization", "Probability", "Stage", "Status", "Team", "Total activities", "Update time", "Weighted value", "Won time"]