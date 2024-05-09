import { progress } from "framer-motion";

export const projectTaskTableDefaultVisibleColumns = (auth, type) => ({
    task: true,
    timer_status: true,
    milestone: auth.getRoleId() !== 5,
    deliverable: true,
    project: true,
    client: true,
    project_manager: true,
    creation_date: true,
    due_date: true,
    start_date: true,
    completion_date: auth.getRoleId() !== 5,
    approved_on: true,
    estimated_time: true,
    hours_logged: true,
    assigned_by: true,
    assigned_to: auth.getRoleId() !== 5,
    status: true,
    progress: auth.getRoleId() !== 5,
    report: true,
});





export const projectData = [
    {
        projectType: "Hourly",
        projectData: {
            client: {
                name: "Jill De",
                country: {
                    iso: "au",
                    nicename: "Australia",
                    country_id: 13,
                },
                image_url: "ghdfdhf",
                client_id: 251,
            },
            pm: {
                name: "Belayat Hossain",
                country: {
                    iso: "bd",
                    nicename: "Bangladesh",
                    country_id: 19,
                },
                image_url: "dghgfhg",
                pm_id: 1,
            },
            project: {
                start_date: "2021-09-01",
                deadline: "2021-09-30",
                project_id: 1,
                progress: 50,
                project_budget: 1000,
                upsell_actual_amount: 200,
                currency: "USD",
                currency_symbol: "$",
                deal: {
                    deal_id: 1,
                    original_currency: {
                        currency_code: "AUD",
                        amount: 650,
                    },
                    profile_link: "https://www.freelancer.com/u/mbjsolutions?from=messaging&ref_project_id=38007534",
                    message_link: [
                        "https://www.freelancer.com/messages/thread/326491443?filter=active",
                        "https://www.freelancer.com/messages/thread/326491443?filter=active",
                    ]

                }

            }

        }
    },
    {
        projectType: "Fixed",
        projectData: {
            client: {
                name: "Jill De",
                country: {
                    iso: "au",
                    nicename: "Australia",
                    country_id: 13,
                },
                image_url: "ghdfdhf",
                client_id: 251,
            },
            pm: {
                name: "Belayat Hossain",
                country: {
                    iso: "bd",
                    nicename: "Bangladesh",
                    country_id: 19,
                },
                image_url: "dghgfhg",
                pm_id: 1,
            },
            project: {
                start_date: "2021-09-01",
                deadline: "2021-09-30",
                project_id: 1,
                progress: 50,
                project_budget: 1000,
                upsell_actual_amount: 200,
                currency: "USD",
                currency_symbol: "$",
                deal: {
                    deal_id: 1,
                    original_currency: {
                        currency_code: "AUD",
                        amount: 650,
                    },
                    profile_link: "https://www.freelancer.com/u/mbjsolutions?from=messaging&ref_project_id=38007534",
                    message_link: [
                        "https://www.freelancer.com/messages/thread/326491443?filter=active",
                    ]
                }

            },


        }
    }

]



export const ProjectProgressStatus = [
    {
        id: 1,
        name: "Under Revision",
        color: "#D21010",
        tag: "under_revision",
        count: 0
    },
    {
        id: 2,
        name: "To Do",
        color: "#F5C308",
        tag: "to_do",
        count: 0
    },
    {
        id: 3,
        name: "Doing",
        color: "#00B5FF",
        tag: "doing",
        count: 0
    },
    {
        id: 4,
        name: "Completed",
        color: "#679C0D",
        tag: "completed",
        count: 0
    },
    {
        id: 5,
        name: "Under Review",
        color: "#E7D107",
        tag: "under_review",
        count: 0
    },
    {
        id: 6,
        name: "Overdue",
        color: "#F00",
        tag: "overdue",
        count: 0
    },
    {
        id: 7,
        name: "Awaiting App.",
        color: "#3D0AF5",
        tag: "awaiting_app",
        count: 0
    },
    {
        id: 8,
        name: "Submitted Task",
        color: "#F50AD5",
        tag: "submitted_task",
        count: 0
    }
]


export const ProjectBudgetData = {
    project_budget: [
        {
            id: 1,
            title: "Project Budget",
            price: "1000",
            currency: "USD",
            currency_symbol: "$",
            icon: "/images/dollar-circle.png"
        },
        {
            id: 2,
            title: "Project Budget",
            price: "650",
            currency: "AUD",
            currency_symbol: "AUD",
            icon: "/images/money-tick.png"
        }
    ],
    upsold_amount: [
        {
            id: 1,
            title: "Upsold Amount",
            price: "200",
            currency: "USD",
            currency_symbol: "$",
            icon: "/images/dollar-circle.png"
        },
        {
            id: 2,
            title: "Upsold Amount",
            price: "130",
            currency: "AUD",
            currency_symbol: "AUD",
            icon: "/images/money-tick.png"
        }
    ],
    hours_logged: [
        {
            id: 1,
            time: "04:33 hour",
            icon: "/images/timer.png",
            title: "Hours Logged"
        },
        {
            id: 2,
            title: "Estimated Time",
            time: "04:33 hour",
            icon: "/images/timer.png"
        }
    ],
    earning_expenses: [

        {
            id: 1,
            title: "Earning",
            price: "800",
            currency: "USD",
            currency_symbol: "$",
            icon: "/images/dollar-circle.png"
        },
        {
            id: 2,
            title: "Earning",
            price: "200",
            currency: "AUD",
            currency_symbol: "AUD",
            icon: "/images/money-tick.png"
        },
        {
            id: 3,
            title: "Expenses",
            price: "200",
            currency: "USD",
            currency_symbol: "$",
            icon: "/images/dollar-circle.png"
        }
    ]

}


export const DashboardTaskTableData = [
    {
        "task_id": 1,
        "task_name": "Task 1: This is a placeholder task name for Task 1, providing the minimum length required to meet the requested 150 character requirement. This is just filler text to demonstrate the format of the JSON array.",
        "creation_date": "2021-09-01",
        "due_date": "2021-09-30",
        "status": "Completed",
        "tracking_start_time": "2021-09-01 10:00:00",
        "estimated_hours": "10",
        "logged_hours": "5"
    },
    {
        "task_id": 2,
        "task_name": "Task 2: This is a placeholder task name for Task 2, providing the minimum length required to meet the requested 150 character requirement. This is just filler text to demonstrate the format of the JSON array.",
        "creation_date": "2021-10-05",
        "due_date": "2021-10-31",
        "status": "Doing",
        "tracking_start_time": "2021-10-05 09:00:00",
        "estimated_hours": "15",
        "logged_hours": "8"
    },
    {
        "task_id": 3,
        "task_name": "Task 3: This is a placeholder task name for Task 3, providing the minimum length required to meet the requested 150 character requirement. This is just filler text to demonstrate the format of the JSON array.",
        "creation_date": "2021-11-15",
        "due_date": "2021-12-15",
        "status": "Completed",
        "tracking_start_time": "2021-11-15 08:30:00",
        "estimated_hours": "20",
        "logged_hours": "10"
    },
    {
        "task_id": 4,
        "task_name": "Task 4: This is a placeholder task name for Task 4, providing the minimum length required to meet the requested 150 character requirement. This is just filler text to demonstrate the format of the JSON array.",
        "creation_date": "2022-01-03",
        "due_date": "2022-01-31",
        "status": "Completed",
        "tracking_start_time": "2022-01-03 11:00:00",
        "estimated_hours": "8",
        "logged_hours": "8"
    },
    {
        "task_id": 5,
        "task_name": "Task 5: This is a placeholder task name for Task 5, providing the minimum length required to meet the requested 150 character requirement. This is just filler text to demonstrate the format of the JSON array.",
        "creation_date": "2022-02-10",
        "due_date": "2022-03-10",
        "status": "To Do",
        "tracking_start_time": null,
        "estimated_hours": "12",
        "logged_hours": "0"
    },
    {
        "task_id": 6,
        "task_name": "Task 6: This is a placeholder task name for Task 6, providing the minimum length required to meet the requested 150 character requirement. This is just filler text to demonstrate the format of the JSON array.",
        "creation_date": "2022-03-20",
        "due_date": "2022-04-20",
        "status": "To Do",
        "tracking_start_time": null,
        "estimated_hours": "18",
        "logged_hours": "0"
    },
    {
        "task_id": 7,
        "task_name": "Task 7: This is a placeholder task name for Task 7, providing the minimum length required to meet the requested 150 character requirement. This is just filler text to demonstrate the format of the JSON array.",
        "creation_date": "2022-05-05",
        "due_date": "2022-05-31",
        "status": "Doing",
        "tracking_start_time": "2022-05-05 08:00:00",
        "estimated_hours": "25",
        "logged_hours": "12"
    },
    {
        "task_id": 8,
        "task_name": "Task 8: This is a placeholder task name for Task 8, providing the minimum length required to meet the requested 150 character requirement. This is just filler text to demonstrate the format of the JSON array.",
        "creation_date": "2022-06-15",
        "due_date": "2022-07-15",
        "status": "Doing",
        "tracking_start_time": "2022-06-15 10:15:00",
        "estimated_hours": "30",
        "logged_hours": "15"
    }
]
export const DashboardMileStoneTableData = [
    {
        "milestone_id": 1,
        "milestone_name": "Updated Milestone 1",
        "milestone_cost": "600",
        "milestone_currency": "EUR",
        "milestone_currency_symbol": "€",
        "creation_date": "2021-09-30",
        "status": "Paid"
    },
    {
        "milestone_id": 2,
        "milestone_name": "Special Achievement",
        "milestone_cost": "750",
        "milestone_currency": "GBP",
        "milestone_currency_symbol": "£",
        "creation_date": "2021-09-30",
        "status": "Unpaid"
    },
    {
        "milestone_id": 3,
        "milestone_name": "Goal Reached",
        "milestone_cost": "400",
        "milestone_currency": "CAD",
        "milestone_currency_symbol": "CA$",
        "creation_date": "2021-09-30",
        "status": "Paid"
    },
    {
        "milestone_id": 4,
        "milestone_name": "New Phase Initiated",
        "milestone_cost": "550",
        "milestone_currency": "AUD",
        "milestone_currency_symbol": "A$",
        "creation_date": "2021-09-30",
        "status": "Unpaid"
    },
    {
        "milestone_id": 5,
        "milestone_name": "Achievement Unlocked",
        "milestone_cost": "800",
        "milestone_currency": "JPY",
        "milestone_currency_symbol": "¥",
        "creation_date": "2021-09-30",
        "status": "Paid"
    },
    {
        "milestone_id": 6,
        "milestone_name": "Next Level Attained",
        "milestone_cost": "350",
        "milestone_currency": "CHF",
        "milestone_currency_symbol": "CHF",
        "creation_date": "2021-09-30",
        "status": "Unpaid"
    },
    {
        "milestone_id": 7,
        "milestone_name": "Victory Unleashed",
        "milestone_cost": "700",
        "milestone_currency": "INR",
        "milestone_currency_symbol": "₹",
        "creation_date": "2021-09-30",
        "status": "Paid"
    },
    {
        "milestone_id": 8,
        "milestone_name": "Triumph Achieved",
        "milestone_cost": "600",
        "milestone_currency": "CNY",
        "milestone_currency_symbol": "¥",
        "creation_date": "2021-09-30",
        "status": "Unpaid"
    }
]

