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
    name: "New",
    value: "new_profile"
  },
  {
    id: 2,
    name: "Mid",
    value: "mid_profile"
  },
  {
    id: 3,
    name: "Old",
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


