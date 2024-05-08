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
            refId: 1,
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
            refId: 1,
            title: "Revision Vs Task ratio",
            yTitle: "Incentive percentage",
            chartTag: "Achieved",
            incentive: 50,
            ratio: 22,
            ybarDataValueType: "percent",
            shortTitle: "R.T.R",
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
            refId: 2,
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
            refId: 2,
            title: "Goal Achieve Rate",
            yTitle: "Incentive percentage",
            chartTag: "Achieved",
            incentive: 0,
            ratio: 0,
            ybarDataValueType: "percent",
            shortTitle: "G.A.R",
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
            refId: 3,
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
            refId: 3,
            title: "Negative points vs Positive points ",
            yTitle: "Incentive percentage",
            chartTag: "Achieved",
            incentive: 80,
            ratio: 30,
            ybarDataValueType: "percent",
            shortTitle: "N.P.P",
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
            refId: 4,
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
            refId: 4,
            title: "Percentage of Delayed Projects ",
            yTitle: "Incentive percentage",
            chartTag: "Achieved",
            incentive: 30,
            ratio: 29,
            ybarDataValueType: "percent",
            shortTitle: "P.D.P",
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
            refId: 5,
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
            refId: 5,
            title: "Milestone Cancelation Rate ",
            yTitle: "Incentive percentage",
            chartTag: "Achieved",
            incentive: 80,
            ratio: 3,
            ybarDataValueType: "percent",
            shortTitle: "M.C.R",
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
            refId: 6,
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
            refId: 6,
            title: "Deadline Miss Rate",
            yTitle: "Incentive percentage",
            chartTag: "Achieved",
            incentive: 80,
            ratio: 40,
            ybarDataValueType: "percent",
            shortTitle: "D.M.R",
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
            refId: 7,
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
            refId: 7,
            title: "Client Retention Rate",
            yTitle: "Incentive percentage",
            chartTag: "Achieved",
            incentive: 80,
            ratio: 13,
            ybarDataValueType: "percent",
            shortTitle: "C.R.R",
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
        id: 8,
        title: "Upsale/Cross Sale Amount",
        ideal: {
            id: 1,
            refId: 8,
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
            refId: 8,
            title: "Upsale/Cross Sale Amount",
            yTitle: "Incentive percentage",
            chartTag: "Achieved",
            incentive: 60,
            ratio: 200,
            ybarDataValueType: "money",
            shortTitle: "U.C.A",
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

export const bonusPointsChartData = [
    {
        id: 9,
        title: "Bonus Points Based on Released Amount",
        ideal: {
            id: 1,
            refId: 9,
            title: "Bonus Points Based on Released Amount",
            yTitle: "Bonus Points",
            chartTag: "Ideal",
            series: [
                {
                    name: "Bonus Points",
                    data: [10, 20, 40, 60, 80, 120],
                },
            ],
            categories: [
                "0-6000",
                "6001-8000",
                "8001-10000",
                "10001-12000",
                "12001-14000",
                "14001-Higher",
            ],
            range: [
                {
                    from: 0,
                    to: 20,
                    color: "#FFA3A3",
                },
                {
                    from: 20,
                    to: 40,
                    color: "#09F",
                },
                {
                    from: 40,
                    to: 60,
                    color: "#FEBC05",
                },
                {
                    from: 60,
                    to: 80,
                    color: "#09F",
                },
                {
                    from: 80,
                    to: 100,
                    color: "#14B96A",
                },
                {
                    from: 100,
                    to: 120,
                    color: "#14B96A",
                },
            ],
        },
        achieved: {
            id: 1,
            refId: 9,
            title: "Bonus Points Based on Released Amount",
            yTitle: "Bonus Points",
            chartTag: "Achieved",
            incentive: 60,
            ratio: 100,
            ybarDataValueType: "money",
            shortTitle: "B.P.B.A",
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
        id: 10,
        title: "Unreleased Payment Amount",
        ideal: {
            id: 1,
            refId: 10,
            title: "Unreleased Payment Amount",
            yTitle: "Incentive Percentage ",
            chartTag: "Ideal",
            series: [
                {
                    name: "Bonus Points",
                    data: [10, 20, 40, 60, 80, 120],
                },
            ],
            categories: [
                "0-6000",
                "6001-8000",
                "8001-10000",
                "10001-12000",
                "12001-14000",
                "14001-Higher",
            ],
            range: [
                {
                    from: 0,
                    to: 20,
                    color: "#FFA3A3",
                },
                {
                    from: 20,
                    to: 40,
                    color: "#09F",
                },
                {
                    from: 40,
                    to: 60,
                    color: "#FEBC05",
                },
                {
                    from: 60,
                    to: 80,
                    color: "#09F",
                },
                {
                    from: 80,
                    to: 100,
                    color: "#14B96A",
                },
                {
                    from: 100,
                    to: 120,
                    color: "#14B96A",
                },
            ],
        },
        achieved: {
            id: 1,
            refId: 10,
            title: "Unreleased Payment Amount",
            yTitle: "Incentive Percentage ",
            chartTag: "Achieved",
            incentive: 35,
            ratio: 10,
            ybarDataValueType: "money",
            shortTitle: "U.P.A",
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

export const quarterlyAndYearlyTableHeaders = [
    {
        key: "month",
        label: "Month",
    },
    {
        key: "regularPoints",
        label: "Regular points",
    },
    {
        key: "actualPoints",
        label: "Actual points",
    },
    {
        key: "upsaleCrossSalePoints",
        label: "Upsale/cross sale points",
    },
    {
        key: "bonusPoints",
        label: "Bonus points",
    },
    {
        key: "incentiveAmount",
        label: "Incentive amount (BDT)",
    },
    {
        key: "cumulativeIncentiveAmount",
        label: "Cumulative incentive amount (TK)",
    },
];

export const quarterlyAndYearlyTableData = [
    {
        month: "January, 2023",
        regularPoints: 100,
        actualPoints: 120,
        upsaleCrossSalePoints: 30,
        bonusPoints: 25,
        incentiveAmount: "300 BDT",
        cumulativeIncentiveAmount: "300 TK",
    },
    {
        month: "February, 2023",
        regularPoints: 120,
        actualPoints: 130,
        upsaleCrossSalePoints: 35,
        bonusPoints: 30,
        incentiveAmount: "320 BDT",
        cumulativeIncentiveAmount: "620 TK",
    },
    {
        month: "March, 2023",
        regularPoints: 140,
        actualPoints: 150,
        upsaleCrossSalePoints: 40,
        bonusPoints: 35,
        incentiveAmount: "340 BDT",
        cumulativeIncentiveAmount: "960 TK",
    },
    {
        month: "April, 2023",
        regularPoints: 160,
        actualPoints: 170,
        upsaleCrossSalePoints: 45,
        bonusPoints: 40,
        incentiveAmount: "360 BDT",
        cumulativeIncentiveAmount: "1320 TK",
    },
    {
        month: "May, 2023",
        regularPoints: 180,
        actualPoints: 190,
        upsaleCrossSalePoints: 50,
        bonusPoints: 45,
        incentiveAmount: "380 BDT",
        cumulativeIncentiveAmount: "1700 TK",
    },
    {
        month: "June, 2023",
        regularPoints: 200,
        actualPoints: 210,
        upsaleCrossSalePoints: 55,
        bonusPoints: 50,
        incentiveAmount: "400 BDT",
        cumulativeIncentiveAmount: "2100 TK",
    },
    {
        month: "July, 2023",
        regularPoints: 220,
        actualPoints: 230,
        upsaleCrossSalePoints: 60,
        bonusPoints: 55,
        incentiveAmount: "420 BDT",
        cumulativeIncentiveAmount: "2520 TK",
    },
    {
        month: "August, 2023",
        regularPoints: 240,
        actualPoints: 250,
        upsaleCrossSalePoints: 65,
        bonusPoints: 60,
        incentiveAmount: "440 BDT",
        cumulativeIncentiveAmount: "2960 TK",
    },
    {
        month: "September, 2023",
        regularPoints: 260,
        actualPoints: 270,
        upsaleCrossSalePoints: 70,
        bonusPoints: 65,
        incentiveAmount: "460 BDT",
        cumulativeIncentiveAmount: "3420 TK",
    },
    {
        month: "October, 2023",
        regularPoints: 280,
        actualPoints: 290,
        upsaleCrossSalePoints: 75,
        bonusPoints: 70,
        incentiveAmount: "480 BDT",
        cumulativeIncentiveAmount: "3900 TK",
    },
    {
        month: "November, 2023",
        regularPoints: 300,
        actualPoints: 310,
        upsaleCrossSalePoints: 80,
        bonusPoints: 75,
        incentiveAmount: "500 BDT",
        cumulativeIncentiveAmount: "4400 TK",
    },
    {
        month: "December, 2023",
        regularPoints: 320,
        actualPoints: 330,
        upsaleCrossSalePoints: 85,
        bonusPoints: 80,
        incentiveAmount: "520 BDT",
        cumulativeIncentiveAmount: "4920 TK",
    },
];

export const statsInfoData = {
    regular_points: 0,
    incentive_points: 400,
    stats_info: [
        {
            id: 1,
            title: "Revision vs task ratio",
            achieved: 80,
        },
        {
            id: 2,
            title: "Goal achieve rate",
            achieved: 0,
        },
        {
            id: 3,
            title: "Negative points vs positive points",
            achieved: 80,
        },
        {
            id: 4,
            title: "Percentage of delayed projects",
            achieved: 29,
        },
        {
            id: 5,
            title: "Milestone cancelation rate",
            achieved: 3,
        },
        {
            id: 6,
            title: "Deadline miss rate",
            achieved: 40,
        },
        {
            id: 7,
            title: "Client retention rate",
            achieved: 80,
        },
        {
            id: 8,
            title: "Average",
            achieved: 0,
        },
    ],
};

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
