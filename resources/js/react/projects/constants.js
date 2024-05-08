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





export const projectData = {
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
            }
        }

    }

}



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