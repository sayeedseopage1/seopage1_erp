export const salesDashboardModalData = {
    reports: [
        // {
        //     entry: { type: "activity", name: "Activity" },
        //     types: [
        //         {
        //             title: "Activities Performance",
        //             subtitle:
        //                 "How many activities were added, completed or planned?",
        //         },
        //         {
        //             title: "Emails Performance",
        //             subtitle: "How many emails were sent, received or opened?",
        //         },
        //     ],
        // },
        {
            entry: { type: "leads", name: "Lead" },
            types: [
                {
                    title: "Performance",
                    subtitle:
                        "How many leads did you create, archive or convert to deals?",
                },
                {
                    title: "Conversion",
                    subtitle:
                        "What is the rate of your leads converting to deals?",
                },
            ],
        },
        {
            entry: { type: "deal", name: "Deal" },
            types: [
                {
                    title: "Performance",
                    subtitle: "How much did you start, win, or lose?",
                },
                {
                    title: "Conversion",
                    subtitle: "What is your win or loss rate?",
                },
                {
                    title: "Duration",
                    subtitle: "How long is your sales cycle?",
                },
                {
                    title: "Progress",
                    subtitle: "Are your deals moving forward in pipeline",
                },
            ],
        },

        // {
        //     entry: { type: "forecast", name: "Forecast and subscription" },
        //     types: [
        //         {
        //             title: "Revenue forecast",
        //             subtitle: "What is your expected revenue?",
        //         },
        //         {
        //             title: "Subscription revenue",
        //             subtitle: "What is your subscription revenue?",
        //         },
        //     ],
        // },
    ],

    goals: [
        {
            entry: { type: "deal", name: "Deal" },
            types: [
                {
                    title: "Added",
                    subtitle: "Based on the number or value of new deals",
                },
                {
                    title: "Progressed",
                    subtitle:
                        "Based on the number or value of deals entering a certain stage",
                },
                {
                    title: "Won",
                    subtitle: "Based on the number or value of won deals",
                },
            ],
        },
        // {
        //     entry: { type: "activity", name: "Activity" },
        //     types: [
        //         {
        //             title: "Added",
        //             subtitle: "Based on the number or value of new activities",
        //         },
        //         {
        //             title: "Completed",
        //             subtitle:
        //                 "Based on the number of activities marked as done",
        //         },
        //     ],
        // },
        {
            entry: { type: "forecast", name: "Forecast" },
            types: [
                {
                    title: "Revenue forecast",
                    subtitle: "Based on weighted value of open and won deals",
                },
            ],
        },
    ],
};
