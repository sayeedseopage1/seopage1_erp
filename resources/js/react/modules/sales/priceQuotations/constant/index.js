import { SiFreelancer } from "react-icons/si";

import FiverrImg from "../../../../../../../public/images/fiverr.png";
import UpworkImg from "../../../../../../../public/images/upwork.png";


// Constants for Price Quotations module
export const PlatformOptions = [
  {
    "id": 1,
    "name": "Freelancer.com",
    "value": "freelancer.com",
    icon: SiFreelancer,
    color: "#29B2FE",
    type: "svg"
  },
  {
    "id": 2,
    "name": "Upwork",
    "value": "upwork",
    icon: UpworkImg,
    type: "img"
  },
  {
    "id": 3,
    "name": "Fiverr",
    "value": "fiverr",
    icon: FiverrImg,
    type: "img"
  }
]



export const ProfileTypeOptions = [
  {
    id: 1,
    name: "New Profile",
    value: "new_profile"
  },
  {
    id: 2,
    name: "Mid Profile",
    value: "mid_profile"
  },
  {
    id: 3,
    name: "Old Profile",
    value: "old_profile"
  },
]

//Speed optimization
// Content writing
// Logo creation
// UI design
// Other
export const PriceQuotationsDataInputOptions = {
  category: [
    {
      id: 1,
      name: "Content Uploads",
      value: "content_uploads"
    },
    {
      id: 2,
      name: "Content Writing",
      value: "content_writing"
    },
    {
      id: 3,
      name: "Graphic Design",
      value: "graphic_design"
    },
    {
      id: 4,
      name: "Setup Domain and Hosting",
      value: "setup_domain_and_hosting"
    },
    {
      id: 5,
      name: "Speed Optimization",
      value: "speed_optimization"
    }
  ],
  subCategory: [
    {
      id: 1,
      name: "Content writing",
      value: "content_writing"
    },
    {
      id: 2,
      name: "Logo creation",
      value: "logo_creation"
    },
    {
      id: 3,
      name: "Speed Optimization",
      value: "speed_optimization"
    },
    {
      id: 4,
      name: "UI design",
      value: "ui_design"
    },
    {
      id: 5,
      name: "Other",
      value: "other"
    }
  ],
  deadline: [
    {
      id: 1,
      name: "Flexible",
      value: "flexible"
    }, {
      id: 2,
      name: "Fixed",
      value: "fixed"
    }
  ]
}



export const PriceQuotationsInvoiceDummyData = {
  client: {
    name: "Joseph Swami",
    user_id: "Joseph S.",
  },
  serviceProvider: {
    company: "",
    name: "",
    platform_account_id: ""

  },
  serial_no: "",
  deadline: "20 July 2021",
  total_hours: 90,
  total_price: "",
  message_link: "https://www.freelancer.com/u/investorksa?from=messaging",
  items: [
    {
      sl: 1,
      items: "Number of primary pages",
      quantity: null,
      descriptions: "Approximate working hours needed",
      total_hours: "",
      key: "total_hours_of_primary_page",
    },
    {
      sl: 2,
      items: "Number of secondary pages",
      quantity: null,
      descriptions: "Approximate working hours needed",
      total_hours: "",
      key: "total_hours_of_secondary_page"
    },
    {
      sl: 3,
      items: "Number of functional work",
      quantity: null,
      descriptions: "Approximate working hours needed",
      total_hours: "",
      key: "total_hours_of_major_functionality"

    },
    {
      sl: 4,
      items: "Developers",
      quantity: "This will be Other works",
      descriptions: "Approximate working hours needed",
      total_hours: "",
      key: "total_hours_of_others_works"
    }
  ]

}



export const InvoiceDummyData = {
  "id": 1,
  "serial_no": "SEOPAGE1-2024-001",
  "deal_stage_id": 176,
  "project_cms_id": 1,
  "project_niche_id": 1,
  "no_of_primary_pages": 1,
  "no_of_secondary_pages": 4,
  "no_of_major_functionalities": null,
  "risk_factor": null,
  "total_hours_of_primary_page": "7.08",
  "total_hours_of_secondary_page": "5.62",
  "total_hours_of_major_functionality": "0.00",
  "total_hours_of_others_works": "30.00",
  "total_calculated_hours": "42.70",
  "currency_id": 1,
  "deadline_type": 2,
  "no_of_days": "10.00",
  "platform_account_id": 1,
  "calculated_actual_budget": "1300.50",
  "calculated_usd_budget": "1300.50",
  "project_budget": null,
  "added_by": {
    "id": 230,
    "name": "Riadus Salehin",
    "user_name": null,
    "email": "riad1@seopage1.net",
    "two_factor_secret": null,
    "two_factor_recovery_codes": null,
    "two_factor_confirmed": 0,
    "two_factor_email_confirmed": 0,
    "image": "avatar_blank.png",
    "mobile": "01958363552",
    "gender": "male",
    "salutation": "mr",
    "locale": "en",
    "status": "active",
    "login": "enable",
    "onesignal_player_id": null,
    "last_login": "2024-07-19T08:04:11+06:00",
    "email_notifications": 1,
    "country_id": 18,
    "dark_theme": 0,
    "rtl": 0,
    "two_fa_verify_via": null,
    "two_factor_code": null,
    "two_factor_expires_at": null,
    "admin_approval": 1,
    "permission_sync": 1,
    "google_calendar_status": 1,
    "role_id": 1,
    "shift": null,
    "activation_status": 1,
    "image_url": "http://172.27.27.88:8000/user-uploads/avatar/avatar_blank.png",
    "modules": [
      "clients",
      "projects",
      "tickets",
      "invoices",
      "estimates",
      "events",
      "messages",
      "tasks",
      "timelogs",
      "contracts",
      "notices",
      "payments",
      "orders",
      "knowledgebase",
      "employees",
      "attendance",
      "expenses",
      "leaves",
      "leads",
      "holidays",
      "products",
      "reports",
      "settings"
    ],
    "user_other_role": true,
    "role": [
      {
        "user_id": 230,
        "role_id": 1
      },
      {
        "user_id": 230,
        "role_id": 2
      }
    ],
    "client_details": null,
    "session": null,
    "employee_detail": {
      "id": 42,
      "user_id": 230,
      "employee_id": "Seopage1/061",
      "address": "Springwood, House No. 5/A, Road No. 01, Shekhertek, PC Culture Housing, Mohammadpur, Dhaka - 1207",
      "hourly_rate": null,
      "slack_username": null,
      "department_id": 8,
      "designation_id": 20,
      "joining_date": "2022-05-01T06:00:00+06:00",
      "last_date": null,
      "added_by": 1,
      "last_updated_by": 1,
      "attendance_reminder": "2023-07-28",
      "date_of_birth": "1992-03-12T00:00:00+06:00",
      "calendar_view": "task,events,holiday,tickets,leaves",
      "about_me": "I am an SEO specialist with experience in Laravel-based web development and currently working as a project manager for an internal ERP software development project for my company. My skills in SEO include understanding the technical aspects of optimizing a website built on the Laravel framework for search engines and having experience working with the latest SEO techniques and strategies, including on-page optimization, link building, keyword research, and analytics. I am able to work closely with developers to implement technical SEO changes and track the success of those changes through analytics. I also provide guidance on content creation and promotion to ensure that the website is reaching its target audience.\r\n\r\nAs a Project Manager, I am responsible for leading and coordinating the internal ERP software development project, including managing the project team, setting project timelines, and ensuring that the project stays on track. I have experience managing projects from start to finish, including planning, execution, monitoring, controlling, and closing the project. I am skilled in project management tools and methodologies. I am able to communicate effectively with stakeholders and team members to ensure that the project is delivered on time and to the satisfaction of the stakeholders.",
      "reporting_to": 62,
      "upcoming_birthday": "2025-03-12",
      "designation": {
        "id": 20,
        "name": "Manager",
        "parent_id": 16,
        "added_by": null,
        "last_updated_by": null
      }
    }
  },
  "created_at": "2024-07-19T02:21:09.000000Z",
  "updated_at": "2024-07-19T02:21:09.000000Z",
  "deal_stage": {
    "id": 176,
    "short_code": "DSEOP1RYGI3F",
    "client_username": "Koloboyy",
    "client_name": "Rene K.",
    "client_badge": "new client",
    "project_name": "Looking for Website Design! Professional and no Wordpress Indian Work! Modern Website Design for Cannabis Shop!",
    "message_link": "https://www.freelancer.com/u/investorksa?from=messaging",
    "client": null
  },
  "project_cms": {
    "id": 1,
    "cms_name": "WordPress"
  },
  "project_niche": {
    "id": 1,
    "category_name": "Fitness"
  },
  "currency": {
    "id": 1,
    "currency_name": "Dollars",
    "currency_symbol": "$",
    "currency_code": "USD",
    "exchange_rate": 1
  },
  "platform_account": {
    "id": 1,
    "type": 1,
    "company_name": "Seopage1",
    "username": "cimiju",
    "name": "Lewis Conrad",
    "user_url": "http://172.27.27.88:8000/account/all-platform-accounts",
    "email": "fenevuda@mailinator.com",
    "profile_type": 1,
    "generated_on": "2024-07-23 00:00:00",
    "multiplying_factor": "1.00",
    "confirmation_of_data_accuracy": 1,
    "status": 1,
    "added_by": 230,
    "created_at": "2024-07-16T05:07:26.000000Z",
    "updated_at": "2024-07-16T09:20:27.000000Z"
  }
}


export const QuotationTableLabel = {
  cms: "CMS",
  category: "Category",
  primary_page: "Primary Page",
  secondary_page: "Secondary Page",
  major_functionalities: "Any Major Functionalities needed?",
  others_works: "How many hours of other works needed",
  risk_factors: "Risk Factors involved",
  currency: "Currency",
}


