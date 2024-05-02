const reVsTask = [10, 20, 22, 30, 40, 50, 60, 70, 80, 90, 100];
const incentive = [0, 0, 50, 0, 0, 0, 0, 0, 0, 0];

//rev=22
//inc=50

export const idealVsAchievedChartData = [
    {
        id: 1,
        title: "Revision Vs Task ratio",
        ideal: {
            id: 1,
            title: "Revision Vs Task ratio",
            yTitle: "Incentive percentage",
            chartTag: "Ideal",
            series: [
                {
                    name: "Revision vs task ratio",
                    data: [100, 80, 50, 10, 10, 10, 10],
                },
            ],
            categories: [
                "0-10%",
                "11-20%",
                "21-35%",
                "36-50%",
                "51-65%",
                "66-80%",
                "81-100%",
            ],
            range: [
                {
                    from: 0,
                    to: 40,
                    color: "#FFA3A3",
                },
                {
                    from: 41,
                    to: 50,
                    color: "#FEBC05",
                },
                {
                    from: 51,
                    to: 80,
                    color: "#09F",
                },
                {
                    from: 81,
                    to: 100,
                    color: "#14B96A",
                },
            ],
        },
        achieved: {
            id: 1,
            title: "Revision Vs Task ratio",
            yTitle: "Incentive percentage",
            chartTag: "Achieved",
            incentive: 50,
            ratio: 22,
            range: [
                {
                    from: 0,
                    to: 40,
                    color: "#FFA3A3",
                },
                {
                    from: 41,
                    to: 50,
                    color: "#FEBC05",
                },
                {
                    from: 51,
                    to: 80,
                    color: "#09F",
                },
                {
                    from: 81,
                    to: 100,
                    color: "#14B96A",
                },
            ],
        },
    },
    {
        id: 2,
        title: "Goal Achieve Rate",
        ideal: {
            id: 2,
            title: "Goal Achieve Rate",
            yTitle: "Incentive percentage",
            chartTag: "Ideal",
            series: [
                {
                    name: "Goal Achieve Rate",
                    data: [10, 50, 80, 100, 100, 100, 100],
                },
            ],
            categories: [
                "0-40%",
                "41-50%",
                "51-74%",
                "75",
                "76-80%",
                "81-90%",
                "91-100%",
            ],
            range: [
                {
                    from: 0,
                    to: 20,
                    color: "#FFA3A3",
                },
                {
                    from: 21,
                    to: 50,
                    color: "#FEBC05",
                },
                {
                    from: 51,
                    to: 80,
                    color: "#09F",
                },
                {
                    from: 81,
                    to: 100,
                    color: "#14B96A",
                },
            ],
        },
        achieved: {
            id: 2,
            title: "Goal Achieve Rate",
            yTitle: "Incentive percentage",
            chartTag: "Achieved",
            incentive: 0,
            ratio: 0,
            range: [
                {
                    from: 0,
                    to: 20,
                    color: "#FFA3A3",
                },
                {
                    from: 21,
                    to: 50,
                    color: "#FEBC05",
                },
                {
                    from: 51,
                    to: 80,
                    color: "#09F",
                },
                {
                    from: 81,
                    to: 100,
                    color: "#14B96A",
                },
            ],
        },
    },
    {
        id: 3,
        title: "Negative points vs Positive points",
        ideal: {
            id: 1,
            title: "Negative points vs Positive points",
            yTitle: "Incentive percentage",
            chartTag: "Ideal",
            series: [
                {
                    name: "Negative points vs Positive points",
                    data: [100, 80, 50, 10, 10, 10, 10],
                },
            ],
            categories: [
                "0-10%",
                "11-20%",
                "21-35%",
                "36-50%",
                "51-65%",
                "66-80%",
                "81-100%",
            ],
            range: [
                {
                    from: 0,
                    to: 40,
                    color: "#FFA3A3",
                },
                {
                    from: 41,
                    to: 50,
                    color: "#FEBC05",
                },
                {
                    from: 51,
                    to: 80,
                    color: "#09F",
                },
                {
                    from: 81,
                    to: 100,
                    color: "#14B96A",
                },
            ],
        },
        achieved: {
            id: 2,
            title: "Negative points vs Positive points ",
            yTitle: "Incentive percentage",
            chartTag: "Achieved",
            incentive: 80,
            ratio: 57,
            range: [
                {
                    from: 0,
                    to: 20,
                    color: "#FFA3A3",
                },
                {
                    from: 21,
                    to: 50,
                    color: "#FEBC05",
                },
                {
                    from: 51,
                    to: 80,
                    color: "#09F",
                },
                {
                    from: 81,
                    to: 100,
                    color: "#14B96A",
                },
            ],
        },
    },
    {
        id: 4,
        title: "Percentage of Delayed Projects",
        ideal: {
            id: 1,
            title: "Percentage of Delayed Projects",
            yTitle: "Incentive percentage",
            chartTag: "Ideal",
            series: [
                {
                    name: "Percentage of Delayed Projects",
                    data: [120, 100, 80, 50, 10, 10, 10],
                },
            ],
            categories: [
                "0-30%",
                "31-40%",
                "41-50%",
                "51-60%",
                "61-70%",
                "71-80%",
                "100%",
            ],
            range: [
                {
                    from: 0,
                    to: 40,
                    color: "#FFA3A3",
                },
                {
                    from: 41,
                    to: 50,
                    color: "#FEBC05",
                },
                {
                    from: 51,
                    to: 80,
                    color: "#09F",
                },
                {
                    from: 81,
                    to: 120,
                    color: "#14B96A",
                },
            ],
        },
        achieved: {
            id: 2,
            title: "Percentage of Delayed Projects ",
            yTitle: "Incentive percentage",
            chartTag: "Achieved",
            incentive: 120,
            ratio: 29,
            range: [
                {
                    from: 0,
                    to: 40,
                    color: "#FFA3A3",
                },
                {
                    from: 41,
                    to: 50,
                    color: "#FEBC05",
                },
                {
                    from: 51,
                    to: 80,
                    color: "#09F",
                },
                {
                    from: 81,
                    to: 120,
                    color: "#14B96A",
                },
            ],
        },
    },
    {
        id: 5,
        title: "Milestone Cancelation Rate",
        ideal: {
            id: 1,
            title: "Milestone Cancelation Rate",
            yTitle: "Incentive percentage",
            chartTag: "Ideal",
            series: [
                {
                    name: "Milestone Cancelation Rate",
                    data: [120, 100, 50, 20, 10, 10, 10],
                },
            ],
            categories: [
                "00-03%",
                "05-05%",
                "06-10%",
                "11-15%",
                "16-20%",
                "21-30%",
                "31-100%",
            ],
            range: [
                {
                    from: 0,
                    to: 19,
                    color: "#FFA3A3",
                },
                {
                    from: 20,
                    to: 49,
                    color: "#FEBC05",
                },
                {
                    from: 50,
                    to: 80,
                    color: "#09F",
                },
                {
                    from: 81,
                    to: 120,
                    color: "#14B96A",
                },
            ],
        },
        achieved: {
            id: 2,
            title: "Milestone Cancelation Rate ",
            yTitle: "Incentive percentage",
            chartTag: "Achieved",
            incentive: 120,
            ratio: 3,
            range: [
                {
                    from: 0,
                    to: 40,
                    color: "#FFA3A3",
                },
                {
                    from: 41,
                    to: 50,
                    color: "#FEBC05",
                },
                {
                    from: 51,
                    to: 80,
                    color: "#09F",
                },
                {
                    from: 81,
                    to: 120,
                    color: "#14B96A",
                },
            ],
        },
    },
    {
        id: 6,
        title: "Deadline Miss Rate",
        ideal: {
            id: 1,
            title: "Deadline Miss Rate",
            yTitle: "Incentive percentage",
            chartTag: "Ideal",
            series: [
                {
                    name: "Deadline Miss Rate",
                    data: [100, 80, 50, 20, 10, 10, 10],
                },
            ],
            categories: [
                "0-30%",
                "31-40%",
                "41-45%",
                "46-50%",
                "51-65%",
                "66-80%",
                "81-100%",
            ],
            range: [
                {
                    from: 0,
                    to: 19,
                    color: "#FFA3A3",
                },
                {
                    from: 20,
                    to: 49,
                    color: "#FEBC05",
                },
                {
                    from: 50,
                    to: 80,
                    color: "#09F",
                },
                {
                    from: 81,
                    to: 120,
                    color: "#14B96A",
                },
            ],
        },
        achieved: {
            id: 2,
            title: "Deadline Miss Rate",
            yTitle: "Incentive percentage",
            chartTag: "Achieved",
            incentive: 80,
            ratio: 40,
            range: [
                {
                    from: 0,
                    to: 40,
                    color: "#FFA3A3",
                },
                {
                    from: 41,
                    to: 50,
                    color: "#FEBC05",
                },
                {
                    from: 51,
                    to: 80,
                    color: "#09F",
                },
                {
                    from: 81,
                    to: 120,
                    color: "#14B96A",
                },
            ],
        },
    },
    {
        id: 7,
        title: "Client Retention Rate",
        ideal: {
            id: 1,
            title: "Client Retention Rate",
            yTitle: "Incentive percentage",
            chartTag: "Ideal",
            series: [
                {
                    name: "Client Retention Rate",
                    data: [0, 50, 80, 100, 120],
                },
            ],
            categories: ["0-5%", "6-10%", "11-15%", "16-20%", "21-100%"],
            range: [
                {
                    from: 0,
                    to: 40,
                    color: "#FFA3A3",
                },
                {
                    from: 41,
                    to: 50,
                    color: "#FEBC05",
                },
                {
                    from: 51,
                    to: 80,
                    color: "#09F",
                },
                {
                    from: 81,
                    to: 120,
                    color: "#14B96A",
                },
            ],
        },
        achieved: {
            id: 2,
            title: "Client Retention Rate",
            yTitle: "Incentive percentage",
            chartTag: "Achieved",
            incentive: 80,
            ratio: 13,
            range: [
                {
                    from: 0,
                    to: 40,
                    color: "#FFA3A3",
                },
                {
                    from: 41,
                    to: 50,
                    color: "#FEBC05",
                },
                {
                    from: 51,
                    to: 80,
                    color: "#09F",
                },
                {
                    from: 81,
                    to: 120,
                    color: "#14B96A",
                },
            ],
        },
    },
];

export const upSaleCrossSaleChartData = [
    {
        id: 1,
        title: "Upsale/Cross Sale Amount",
        ideal: {
            id: 1,
            title: "Upsale/Cross Sale Amount",
            yTitle: "Incentive percentage",
            chartTag: "Ideal",
            series: [
                {
                    name: "Upsale/Cross Sale Amount",
                    data: [3, 4, 5, 5.5, 6],
                },
            ],
            categories: [
                "1-$500",
                "501-$1200",
                "1201-$1800",
                "1801-S3000",
                "3001-higher",
            ],
            range: [
                {
                    from: 0,
                    to: 3,
                    color: "#14B96A",
                },
                {
                    from: 3.1,
                    to: 4,
                    color: "#09F",
                },
                {
                    from: 4.1,
                    to: 5,
                    color: "#FEBC05",
                },
                {
                    from: 5.1,
                    to: 5.5,
                    color: "#09F",
                },
                {
                    from: 5.6,
                    to: 6,
                    color: "#14B96A",
                },
            ],
        },
        achieved: {
            id: 1,
            title: "Upsale/Cross Sale Amount",
            yTitle: "Incentive percentage",
            chartTag: "Achieved",
            incentive: 60,
            ratio: 11000,
            range: [
                {
                    from: 0,
                    to: 40,
                    color: "#FFA3A3",
                },
                {
                    from: 41,
                    to: 50,
                    color: "#FEBC05",
                },
                {
                    from: 51,
                    to: 80,
                    color: "#09F",
                },
                {
                    from: 81,
                    to: 100,
                    color: "#14B96A",
                },
            ],
        },
    },
];

export const heldAmountsDataTableHeaders = [
    {
        key: "month",
        label: "Month",
    },
    {
        key: "title",
        label: "Title",
    },
    {
        key: "totalAmount",
        label: "Total Amount",
    },
    {
        key: "disbursedAmount",
        label: "Disbursed Amount",
        description: "80% of the total amount",
    },
    {
        key: "heldAmount",
        label: "Held Amount",
        description: "20% of the total amount",
    },
    {
        key: "heldAmountBalance",
        label: "Held Amount Balance",
    },
];

export const heldAmountsData = [
    {
        month: "Feb 2024",
        title: "Monthly Incentive",
        sub_title: "For the month of January, 2024",
        total_amount: 10000,
        disbursed_amount: 8000,
        held_amount: 2000,
        held_amount_balance: 2000,
    },
    {
        month: "Mar 2024",
        title: "Monthly Incentive",
        sub_title: "For the month of February, 2024",
        total_amount: 10000,
        disbursed_amount: 8000,
        held_amount: 2000,
        held_amount_balance: 2000,
    },
    {
        month: "Apr 2024",
        title: "Monthly Incentive",
        sub_title: "For the month of March, 2024",
        total_amount: 10000,
        disbursed_amount: 8000,
        held_amount: 2000,
        held_amount_balance: 2000,
    },
    {
        month: "May 2024",
        title: "Monthly Incentive",
        sub_title: "For the month of April, 2024",
        total_amount: 10000,
        disbursed_amount: 8000,
        held_amount: 2000,
        held_amount_balance: 2000,
    },
    {
        month: "Jun 2024",
        title: "Monthly Incentive",
        sub_title: "For the month of May, 2024",
        total_amount: 10000,
        disbursed_amount: 8000,
        held_amount: 2000,
        held_amount_balance: 2000,
    },
    {
        month: "Jul 2024",
        title: "Monthly Incentive",
        sub_title: "For the month of June, 2024",
        total_amount: 10000,
        disbursed_amount: 8000,
        held_amount: 2000,
        held_amount_balance: 2000,
    },
    {
        month: "Aug 2024",
        title: "Monthly Incentive",
        total_amount: 10000,
        disbursed_amount: 8000,
        held_amount: 2000,
        held_amount_balance: 2000,
    },
    {
        month: "Sep 2024",
        title: "Monthly Incentive",
        total_amount: 10000,
        disbursed_amount: 8000,
        held_amount: 2000,
        held_amount_balance: 2000,
    },
    {
        month: "Oct 2024",
        title: "Monthly Incentive",
        total_amount: 10000,
        disbursed_amount: 8000,
        held_amount: 2000,
        held_amount_balance: 2000,
    },
    {
        month: "Nov 2024",
        title: "Monthly Incentive",
        total_amount: 10000,
        disbursed_amount: 8000,
        held_amount: 2000,
        held_amount_balance: 2000,
    },
    {
        month: "Dec 2024",
        title: "Monthly Incentive",
        total_amount: 10000,
        disbursed_amount: 8000,
        held_amount: 2000,
        held_amount_balance: 2000,
    },
    {
        month: "Jan 2025",
        title: "Monthly Incentive",
        total_amount: 10000,
        disbursed_amount: 8000,
        held_amount: 2000,
        held_amount_balance: 2000,
    },
];

// export const achivedBarChartData = [
//     {
//         id: 1,
//         title: "Revision Vs Task ratio",
//         yTitle: "Incentive percentage",
//         chartTag: "Ideal",
//         series: [
//             {
//                 name: "Revision vs task ratio",
//                 data: [100, 80, 50, 10, 10, 10, 10],
//             },
//         ],
//         categories: [
//             "0-10%",
//             "11-20%",
//             "21-35%",
//             "36-50%",
//             "51-65%",
//             "66-80%",
//             "81-100%",
//         ],
//         range: [
//             {
//                 from: 0,
//                 to: 40,
//                 color: "#FFA3A3",
//             },
//             {
//                 from: 41,
//                 to: 50,
//                 color: "#FEBC05",
//             },
//             {
//                 from: 51,
//                 to: 80,
//                 color: "#09F",
//             },
//             {
//                 from: 81,
//                 to: 100,
//                 color: "#14B96A",
//             },
//         ],
//     },
//     {
//         id: 2,
//         title: "Goal Achieve Rate",
//         yTitle: "Incentive percentage",
//         chartTag: "Ideal",
//         series: [
//             {
//                 name: "Goal Achieve Rate",
//                 data: [10, 50, 80, 100, 100, 100, 100],
//             },
//         ],
//         categories: [
//             "0-40%",
//             "41-50%",
//             "51-74%",
//             "75",
//             "76-80%",
//             "81-90%",
//             "91-100%",
//         ],
//         range: [
//             {
//                 from: 0,
//                 to: 20,
//                 color: "#FFA3A3",
//             },
//             {
//                 from: 21,
//                 to: 50,
//                 color: "#FEBC05",
//             },
//             {
//                 from: 51,
//                 to: 80,
//                 color: "#09F",
//             },
//             {
//                 from: 81,
//                 to: 100,
//                 color: "#14B96A",
//             },
//         ],
//     },
//     {
//         id: 3,
//         title: "Negative points vs Positive points ",
//         yTitle: "Incentive percentage",
//         chartTag: "Ideal",
//         series: [
//             {
//                 name: "Negative points vs Positive points ",
//                 data: [100, 80, 50, 10, 10, 10, 10],
//             },
//         ],
//         categories: [
//             "0-25%",
//             "26-35%",
//             "36-50%",
//             "51-65%",
//             "66-80%",
//             "81-95%",
//             "100%",
//         ],
//         range: [
//             {
//                 from: 0,
//                 to: 40,
//                 color: "#FFA3A3",
//             },
//             {
//                 from: 41,
//                 to: 50,
//                 color: "#FEBC05",
//             },
//             {
//                 from: 51,
//                 to: 80,
//                 color: "#09F",
//             },
//             {
//                 from: 81,
//                 to: 100,
//                 color: "#14B96A",
//             },
//         ],
//     },
//     {
//         id: 4,
//         title: "Percentage of Delayed Projects",
//         yTitle: "Incentive percentage",
//         chartTag: "Ideal",
//         series: [
//             {
//                 name: "Percentage of Delayed Projects",
//                 data: [120, 100, 80, 50, 10, 10, 10],
//             },
//         ],
//         categories: [
//             "0-30%",
//             "31-40%",
//             "41-50%",
//             "51-60%",
//             "61-70%",
//             "71-80%",
//             "100%",
//         ],
//         range: [
//             {
//                 from: 0,
//                 to: 40,
//                 color: "#FFA3A3",
//             },
//             {
//                 from: 41,
//                 to: 50,
//                 color: "#FEBC05",
//             },
//             {
//                 from: 51,
//                 to: 80,
//                 color: "#09F",
//             },
//             {
//                 from: 81,
//                 to: 120,
//                 color: "#14B96A",
//             },
//         ],
//     },
//     {
//         id: 5,
//         title: "Milestone Cancelation Rate",
//         yTitle: "Incentive percentage",
//         chartTag: "Ideal",
//         series: [
//             {
//                 name: "Milestone Cancelation Rate",
//                 data: [120, 100, 50, 20, 10, 10, 10],
//             },
//         ],
//         categories: [
//             "00-03%",
//             "05-05%",
//             "06-10%",
//             "11-15%",
//             "16-20%",
//             "21-30%",
//             "31-100%",
//         ],
//         range: [
//             {
//                 from: 0,
//                 to: 19,
//                 color: "#FFA3A3",
//             },
//             {
//                 from: 20,
//                 to: 49,
//                 color: "#FEBC05",
//             },
//             {
//                 from: 50,
//                 to: 80,
//                 color: "#09F",
//             },
//             {
//                 from: 81,
//                 to: 120,
//                 color: "#14B96A",
//             },
//         ],
//     },
//     {
//         id: 6,
//         title: "Deadline Miss Rate",
//         yTitle: "Incentive percentage",
//         chartTag: "Ideal",
//         series: [
//             {
//                 name: "Deadline Miss Rate",
//                 data: [100, 80, 50, 20, 10, 10, 10],
//             },
//         ],
//         categories: [
//             "0-30%",
//             "31-40%",
//             "41-45%",
//             "46-50%",
//             "51-65%",
//             "66-80%",
//             "81-100%",
//         ],
//         range: [
//             {
//                 from: 0,
//                 to: 19,
//                 color: "#FFA3A3",
//             },
//             {
//                 from: 20,
//                 to: 49,
//                 color: "#FEBC05",
//             },
//             {
//                 from: 50,
//                 to: 80,
//                 color: "#09F",
//             },
//             {
//                 from: 81,
//                 to: 120,
//                 color: "#14B96A",
//             },
//         ],
//     },
//     {
//         id: 7,
//         title: "Client Retention Rate",
//         yTitle: "Incentive percentage",
//         chartTag: "Ideal",
//         series: [
//             {
//                 name: "Client Retention Rate",
//                 data: [0, 50, 80, 100, 120],
//             },
//         ],
//         categories: ["0-5%", "6-10%", "11-15%", "16-20%", "21-100%"],
//         range: [
//             {
//                 from: 0,
//                 to: 40,
//                 color: "#FFA3A3",
//             },
//             {
//                 from: 41,
//                 to: 50,
//                 color: "#FEBC05",
//             },
//             {
//                 from: 51,
//                 to: 80,
//                 color: "#09F",
//             },
//             {
//                 from: 81,
//                 to: 120,
//                 color: "#14B96A",
//             },
//         ],
//     },
// ];
