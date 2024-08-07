
import { User } from "../../utils/user-details";
import { DeveloperTableColumns } from "../components/table/columns/DeveloperTableColumns";

const auth = new User(window.Laravel.user);


function filterColumns(excludeKeys) {
  return DeveloperTableColumns?.Modal
    .filter((column) => !excludeKeys.includes(column.id))
    .filter(column => Object.keys(column).length > 0);
}


/**
 * Lead Developer All Dashboard Data
 * @type {Array} - Array of Objects
 * @property {number} id - Unique Identifier
 * @property {string} title - Title of the data
 * @property {string} subTitle - Subtitle of the data
 * @property {number} value - Value of the data
 * @property {string} valueType - Type of the value
 * @property {string} key - Unique key of the data
 * @property {string} info - Information of the data 
 * @property {boolean} hasPermissionForModal - has permission to open modal or has not have any modal for this data
 * @property {string} query - API URL for fetching data
 * @property {object} tableColumn - Table Column for this data
 * @property {array} isShowModalExtraInfo - Show extra information in modal
 * @property {boolean} isModalOpen - Modal is open or not
 */



export const DeveloperDashboardDataConstant = [
  {
    id: 1,
    title: "Num. Of Tasks Received",
    subTitle: null,
    value: 10,
    valueTypeBefore: null,
    valueTypeAfter: null,
    key: "number_of_tasks_received",
    info: null,
    hasPermissionForModal: true,
    query: "leads_received",
    responseKey: "number_of_dispute_lost_all_data_lead",
    formateResponse: () => { },
    tableColumn: filterColumns(["revision_log_min", "task_approval_date"]),
    isShowModalExtraInfo: [
      {
        id: 1,
        title: "Received Tasks",
        key: "number_of_tasks_received",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 2,
        title: "Primary Pages",
        key: "number_of_tasks_received_primary_page",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }, {
        id: 3,
        title: "Secondary Pages",
        key: "number_of_tasks_received_secondary_page",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 4,
        title: "Others",
        key: "others", // others will calculate by subtracting number_of_tasks_received_primary_page and plus number_of_tasks_received_primary_page and  number_of_tasks_received_secondary_page
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }
    ],
    isModalOpen: false,
  },
  {
    id: 2,
    title: "Num. Of Submitted Tasks",
    subTitle: null,
    value: 10,
    valueTypeBefore: null,
    valueTypeAfter: null,
    key: "submit_number_of_tasks_in_this_month",
    info: null,
    hasPermissionForModal: true,
    query: "leads_received",
    responseKey: "number_of_dispute_lost_all_data_lead",
    formateResponse: () => { },
    tableColumn: filterColumns(["revision_log_min", "task_approval_date"]),
    isShowModalExtraInfo: [
      {
        id: 1,
        title: "Submitted Tasks",
        key: "submit_number_of_tasks_in_this_month",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 2,
        title: "Submitted Tasks Primary Pages",
        key: "submit_number_of_tasks_primary_page_in_this_month",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }, {
        id: 3,
        title: "Submitted Tasks Secondary Pages",
        key: "submit_number_of_tasks_secondary_page_in_this_month",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 4,
        title: "Submitted Tasks Others",
        key: "others", // others will calculate by subtracting submit_number_of_tasks_in_this_month and plus submit_number_of_tasks_primary_page_in_this_month and  submit_number_of_tasks_secondary_page_in_this_month
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }

    ],
    isModalOpen: false,
  },
  {
    id: 3,
    title: "Num. of approved tasks on 1st attempt by Lead Developer",
    subTitle: null,
    value: 10,
    valueTypeBefore: null,
    valueTypeAfter: null,
    key: "first_attempt_approve_task_in_this_month",
    info: null,
    hasPermissionForModal: true,
    query: "leads_received",
    responseKey: "number_of_dispute_lost_all_data_lead",
    formateResponse: () => { },
    tableColumn: filterColumns(["revision_log_min", "revision_count"]),
    isShowModalExtraInfo: [
      {
        id: 1,
        title: "Number of approved tasks on 1st attempt by Lead Developer",
        key: "first_attempt_approve_task_in_this_month",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 2,
        title: "Number of approved tasks on 1st attempt by Lead Developer Primary Pages",
        key: "first_attempt_approve_task_primary_page_in_this_month",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }, {
        id: 3,
        title: "Number of approved tasks on 1st attempt by Secondary Pages",
        key: "first_attempt_approve_task_secondary_page_in_this_month",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 4,
        title: "Number of approved tasks on 1st attempt by Lead Developer Others Pages",
        key: "others", // others will calculate by subtracting first_attempt_approve_task_in_this_month and plus first_attempt_approve_task_primary_page_in_this_month and  first_attempt_approve_task_secondary_page_in_this_month
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }

    ],
    isModalOpen: false,
  },
  {
    id: 4,
    title: "Num. Of Approved Tasks On 1st Attempt By Client",
    subTitle: null,
    value: 10,
    valueTypeBefore: null,
    valueTypeAfter: null,
    key: "first_attempt_approve_task_in_this_month_client_data",
    info: null,
    hasPermissionForModal: true,
    query: "leads_received",
    responseKey: "number_of_dispute_lost_all_data_lead",
    formateResponse: () => { },
    tableColumn: filterColumns(["revision_log_min", "revision_count"]),
    isShowModalExtraInfo: [
      {
        id: 1,
        title: "Number of approved tasks on 1st attempt by Client",
        key: "first_attempt_approve_task_in_this_month_client_data",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 2,
        title: "Number of approved tasks on 1st attempt by Client Primary Pages",
        key: "first_attempt_approve_task_primary_page_in_this_month_client",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }, {
        id: 3,
        title: "Number of approved tasks on 1st attempt by Secondary Pages",
        key: "first_attempt_approve_task_secondary_page_in_this_month_client",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 4,
        title: "Number of approved tasks on 1st attempt by Client Others Pages",
        key: "others", // others will calculate by subtracting first_attempt_approve_task_in_this_month_client_data and plus first_attempt_approve_task_primary_page_in_this_month_client_data and  first_attempt_approve_task_secondary_page_in_this_month_client_data
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }
    ],
    isModalOpen: false,
  },
  {
    id: 5,
    title: "Avg num. of attempts needed for approval by Lead Developer",
    subTitle: null,
    value: 10,
    valueTypeBefore: null,
    valueTypeAfter: null,
    key: "avg_no_of_submission_needed_for_app_by_lead_dev",
    info: null,
    hasPermissionForModal: auth.getRoleId() === 5,
    query: "leads_received",
    responseKey: "number_of_dispute_lost_all_data_lead",
    formateResponse: () => { },
    tableColumn: filterColumns(["revision_log_min", "revision_count"]),
    isShowModalExtraInfo: [
      {
        id: 1,
        title: "Submitted Tasks",
        key: "submit_number_of_tasks_in_this_month",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 2,
        title: "Tasks where there was Revisions given by lead developer",
        key: "no_of_tasks_revision_given_by_lead_dev",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }
    ],
    isModalOpen: false,
  },
  {
    id: 6,
    title: "Avg Num. Of Attempts Needed For Approval By Client",
    subTitle: null,
    value: 10,
    valueTypeBefore: null,
    valueTypeAfter: null,
    key: "average_number_of_tasks_approved_client_data",
    info: null,
    hasPermissionForModal: true,
    query: "leads_received",
    responseKey: "number_of_dispute_lost_all_data_lead",
    formateResponse: () => { },
    tableColumn: filterColumns(["revision_log_min", "task_approval_date"]),
    isShowModalExtraInfo: [
      {
        id: 1,
        title: "Submitted Tasks",
        key: "submit_number_of_tasks_in_this_month",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 2,
        title: "Tasks where there was Revisions given by Client",
        key: "no_of_tasks_revision_given_by_lead_dev", //TODO: this key will be same for both lead developer revisions Need to change this key
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }
    ],
    isModalOpen: false,
  },
  {
    id: 7,
    title: "Percentage Of Tasks With Revisions",
    subTitle: null,
    value: 10,
    valueTypeBefore: null,
    valueTypeAfter: "%",
    key: "percentage_of_tasks_with_revision",
    info: null,
    hasPermissionForModal: true,
    query: "leads_received",
    responseKey: "number_of_dispute_lost_all_data_lead",
    formateResponse: () => { },
    tableColumn: filterColumns(["revision_log_min", "revision_count", "task_approval_date"]),
    isShowModalExtraInfo: [
      {
        id: 1,
        title: "Received Tasks",
        key: "number_of_tasks_received",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 2,
        title: "Primary Pages",
        key: "number_of_tasks_received_primary_page",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 3,
        title: "Secondary Pages",
        key: "number_of_tasks_received_secondary_page",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 4,
        title: "Others",
        key: "others", // others will calculate by subtracting number_of_tasks_received and plus number_of_tasks_received_primary_page and  number_of_tasks_received_secondary_page
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }

    ],
    isModalOpen: false,
  },
  {
    id: 8,
    title: "Total Number Of Revisions",
    subTitle: null,
    value: 10,
    valueTypeBefore: null,
    valueTypeAfter: "%",
    key: "number_of_total_revision_for_this_month",
    info: null,
    hasPermissionForModal: true,
    query: "leads_received",
    responseKey: "number_of_dispute_lost_all_data_lead",
    formateResponse: () => { },
    tableColumn: filterColumns(["revision_log_min", "revision_count", "task_approval_date"]),
    isShowModalExtraInfo: [
      {
        id: 1,
        title: "Received Tasks",
        key: "number_of_total_revision_for_this_month",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 2,
        title: "Primary Pages",
        key: "number_of_tasks_received_primary_page",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }, {
        id: 3,
        title: "Secondary Pages",
        key: "number_of_tasks_received_secondary_page",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 4,
        title: "Others Pages",
        key: "others", // others will calculate by subtracting number_of_total_revision_for_this_month and plus number_of_total_revision_primary_page_for_this_month and  number_of_total_revision_secondary_page_for_this_month
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }
    ],
    isModalOpen: false,
  },
  {
    id: 9,
    title: "Avg. logged time for complete tasks (In Hours)",
    subTitle: null,
    value: 10,
    valueTypeBefore: null,
    valueTypeAfter: "Hours",
    key: "average_submission_time_in_this_month",
    info: null,
    hasPermissionForModal: true,
    query: "leads_received",
    responseKey: "number_of_dispute_lost_all_data_lead",
    formateResponse: () => { },
    tableColumn: filterColumns(["task_approval_date"]),
    isShowModalExtraInfo: [
      {
        id: 1,
        title: "Received Tasks",
        key: "number_of_tasks_received",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 2,
        title: "Primary Pages",
        key: "number_of_tasks_received_primary_page",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }, {
        id: 3,
        title: "Secondary Pages",
        key: "number_of_tasks_received_secondary_page",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 4,
        title: "Others",
        key: "others", // others will calculate by subtracting number_of_total_revision_for_this_month and plus number_of_total_revision_primary_page_for_this_month and  number_of_total_revision_secondary_page_for_this_month
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }
    ],
    isModalOpen: false,
  },
  {
    id: 9,
    title: "Average Task Submission Time (In Days)",
    subTitle: null,
    value: 10,
    valueTypeBefore: null,
    valueTypeAfter: "Days",
    key: "average_submission_day_in_this_month",
    info: null,
    hasPermissionForModal: true,
    query: "leads_received",
    responseKey: "number_of_dispute_lost_all_data_lead",
    formateResponse: () => { },
    tableColumn: filterColumns(["revision_log_min", "task_approval_date"]),
    isShowModalExtraInfo: [
      {
        id: 1,
        title: "Received Tasks",
        key: "number_of_tasks_received",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 2,
        title: "Primary Pages",
        key: "number_of_tasks_received_primary_page",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }, {
        id: 3,
        title: "Secondary Pages",
        key: "number_of_tasks_received_secondary_page",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 4,
        title: "Others",
        key: "others", // others will calculate by subtracting number_of_tasks_received and plus number_of_tasks_received_primary_page and  number_of_tasks_received_secondary_page
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }
    ],
    isModalOpen: false,
  },
  {
    id: 10,
    title: "Average Number Of In-Progress Tasks",
    subTitle: null,
    value: 10,
    valueTypeBefore: null,
    valueTypeAfter: null,
    key: "average_in_progress_date_range",
    info: null,
    hasPermissionForModal: true,
    query: "leads_received",
    responseKey: "number_of_dispute_lost_all_data_lead",
    formateResponse: () => { },
    tableColumn: filterColumns(["revision_log_min", "task_approval_date"]),
    isShowModalExtraInfo: [
      {
        id: 1,
        title: "Received Tasks",
        key: "number_of_tasks_received",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 2,
        title: "Primary Pages",
        key: "number_of_tasks_received_primary_page",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }, {
        id: 3,
        title: "Secondary Pages",
        key: "number_of_tasks_received_secondary_page",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 4,
        title: "Others",
        key: "others", // others will calculate by subtracting number_of_tasks_received and plus number_of_tasks_received_primary_page and  number_of_tasks_received_secondary_page
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }
    ],
    isModalOpen: false,
  },
  {
    id: 11,
    title: "Percentage Of Tasks Where Deadline Was Missed",
    subTitle: null,
    value: 10,
    valueTypeBefore: null,
    valueTypeAfter: "%",
    key: "percentage_of_tasks_deadline",
    info: null,
    hasPermissionForModal: true,
    query: "leads_received",
    responseKey: "number_of_dispute_lost_all_data_lead",
    formateResponse: () => { },
    tableColumn: filterColumns(["revision_log_min", "task_approval_date", "revision_count"]),
    isShowModalExtraInfo: [
      {
        id: 1,
        title: "Received Tasks",
        key: "number_of_tasks_received",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 2,
        title: "Primary Pages",
        key: "number_of_tasks_received_primary_page",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }, {
        id: 3,
        title: "Secondary Pages",
        key: "number_of_tasks_received_secondary_page",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 4,
        title: "Others",
        key: "others", // others will calculate by subtracting number_of_tasks_received and plus number_of_tasks_received_primary_page and  number_of_tasks_received_secondary_page
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }

    ],
    isModalOpen: false,
  },
  {
    id: 12,
    title: "Percentage Of Tasks Where Given Estimated Time Was Missed",
    subTitle: null,
    value: 10,
    valueTypeBefore: null,
    valueTypeAfter: "%",
    key: "percentage_number_task_cross_estimate_time",
    info: null,
    hasPermissionForModal: true,
    query: "leads_received",
    responseKey: "number_of_dispute_lost_all_data_lead",
    formateResponse: () => { },

    tableColumn: filterColumns(["revision_log_min", "task_approval_date", "revision_count"]),
    isShowModalExtraInfo: [
      {
        id: 1,
        title: "Received Tasks",
        key: "number_of_tasks_received",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 2,
        title: "Primary Pages",
        key: "number_of_tasks_received_primary_page",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }, {
        id: 3,
        title: "Secondary Pages",
        key: "number_of_tasks_received_secondary_page",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 4,
        title: "Others",
        key: "others", // others will calculate by subtracting number_of_tasks_received and plus number_of_tasks_received_primary_page and  number_of_tasks_received_secondary_page
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }
    ],
    isModalOpen: false,
  },
  {
    id: 13,
    title: "Rejection Rate", // 
    subTitle: null,
    value: 10,
    valueTypeBefore: null,
    valueTypeAfter: "%",
    key: "rejection_rate_lead", // showing Dummy Data in main dashboard
    info: null,
    hasPermissionForModal: false,
    query: "leads_received",
    responseKey: "number_of_dispute_lost_all_data_lead",
    formateResponse: () => { },
    tableColumn: DeveloperTableColumns?.Modal,
    isShowModalExtraInfo: [],
    isModalOpen: false,
  },
  {
    id: 14,
    title: "Cancelation Rate",
    subTitle: null,
    value: 10,
    valueTypeBefore: null,
    valueTypeAfter: "%",
    key: "cancelation_rate_lead", // showing Dummy Data in main dashboard
    info: null,
    hasPermissionForModal: false,
    query: "leads_received",
    responseKey: "number_of_dispute_lost_all_data_lead",
    formateResponse: () => { },
    tableColumn: DeveloperTableColumns?.Modal,
    isShowModalExtraInfo: [],
    isModalOpen: false,
  }, {
    id: 15,
    title: "Rate Of Reassign",
    subTitle: null,
    value: 10,
    valueTypeBefore: null,
    valueTypeAfter: null,
    key: "rate_of_reassign_lead", // showing Dummy Data in main dashboard
    info: null,
    hasPermissionForModal: false,
    query: "leads_received",
    responseKey: "number_of_dispute_lost_all_data_lead",
    formateResponse: () => { },
    tableColumn: DeveloperTableColumns?.Modal,
    isShowModalExtraInfo: [],
    isModalOpen: false,
  },
  {
    id: 16,
    title: "No. of disputes filed",
    subTitle: null,
    value: 10,
    valueTypeBefore: null,
    valueTypeAfter: null,
    key: "number_of_dispute_filed_own",
    info: null,
    hasPermissionForModal: true,
    query: "leads_received",
    responseKey: "number_of_dispute_lost_all_data_lead",
    formateResponse: () => { },
    tableColumn: filterColumns(["revision_log_min", "task_approval_date", "revision_count"]),
    isShowModalExtraInfo: [
      {
        id: 1,
        title: "Received Tasks",
        key: "number_of_tasks_received",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 2,
        title: "Primary Pages",
        key: "number_of_tasks_received_primary_page",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }, {
        id: 3,
        title: "Secondary Pages",
        key: "number_of_tasks_received_secondary_page",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 4,
        title: "Others",
        key: "others", // others will calculate by subtracting number_of_tasks_received and plus number_of_tasks_received_primary_page and  number_of_tasks_received_secondary_page
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }
    ],
    isModalOpen: false,
  },
  {
    id: 17,
    title: " No. of disputes ",
    subTitle: null,
    value: 10,
    valueTypeBefore: null,
    valueTypeAfter: null,
    key: "number_of_dispute_filed_all",
    info: {
      content: "Overall"
    },
    hasPermissionForModal: true,
    query: "leads_received",
    responseKey: "number_of_dispute_lost_all_data_lead",
    formateResponse: () => { },
    tableColumn: filterColumns(["revision_log_min", "task_approval_date", "revision_count"]),
    isShowModalExtraInfo: [
      {
        id: 1,
        title: "Received Tasks",
        key: "number_of_tasks_received",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 2,
        title: "Primary Pages",
        key: "number_of_tasks_received_primary_page",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }, {
        id: 3,
        title: "Secondary Pages",
        key: "number_of_tasks_received_secondary_page",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 4,
        title: "Others",
        key: "others", // others will calculate by subtracting number_of_tasks_received and plus number_of_tasks_received_primary_page and  number_of_tasks_received_secondary_page
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }
    ],
    isModalOpen: false,
  },
  {
    id: 18,
    title: "No. of disputes lost",
    subTitle: null,
    value: 10,
    valueTypeBefore: null,
    valueTypeAfter: null,
    key: "number_of_dispute_lost_own",
    info: {
      content: "Raised By Developer"
    },
    hasPermissionForModal: true,
    query: "leads_received",
    responseKey: "number_of_dispute_lost_all_data_lead",
    formateResponse: () => { },
    tableColumn: filterColumns(["revision_log_min", "task_approval_date", "revision_count"]),
    isShowModalExtraInfo: [
      {
        id: 1,
        title: "Received Tasks",
        key: "number_of_tasks_received",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 2,
        title: "Primary Pages",
        key: "number_of_tasks_received_primary_page",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }, {
        id: 3,
        title: "Secondary Pages",
        key: "number_of_tasks_received_secondary_page",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 4,
        title: "Others",
        key: "others", // others will calculate by subtracting number_of_tasks_received and plus number_of_tasks_received_primary_page and  number_of_tasks_received_secondary_page
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }
    ],
    isModalOpen: false,
  },
  {
    id: 19,
    title: "No. of disputes lost",
    subTitle: null,
    value: 10,
    valueTypeBefore: null,
    valueTypeAfter: null,
    key: "number_of_dispute_lost_all_lead",
    info: {
      content: "Overall"
    },
    hasPermissionForModal: true,
    query: "leads_received",
    responseKey: "number_of_dispute_lost_all_data_lead",
    formateResponse: () => { },
    tableColumn: filterColumns(["revision_log_min", "task_approval_date", "revision_count"]),
    isShowModalExtraInfo: [
      {
        id: 1,
        title: "Received Tasks",
        key: "number_of_tasks_received",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 2,
        title: "Primary Pages",
        key: "number_of_tasks_received_primary_page",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }, {
        id: 3,
        title: "Secondary Pages",
        key: "number_of_tasks_received_secondary_page",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 4,
        title: "Others",
        key: "others", // others will calculate by subtracting number_of_tasks_received and plus number_of_tasks_received_primary_page and  number_of_tasks_received_secondary_page
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }
    ],
    isModalOpen: false,
  },
  {
    id: 20,
    title: "Hours spent in revisions",
    subTitle: null,
    value: 10,
    valueTypeBefore: null,
    valueTypeAfter: "Hours",
    key: "spent_revision_developer_lead",
    info: null,
    hasPermissionForModal: true,
    query: "leads_received",
    responseKey: "number_of_dispute_lost_all_data_lead",
    formateResponse: () => { },
    tableColumn: filterColumns(["revision_log_min", "task_approval_date", "revision_count"]),
    isShowModalExtraInfo: [
      {
        id: 1,
        title: "Received Tasks",
        key: "number_of_tasks_received",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 2,
        title: "Primary Pages",
        key: "number_of_tasks_received_primary_page",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }, {
        id: 3,
        title: "Secondary Pages",
        key: "number_of_tasks_received_secondary_page",
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: 4,
        title: "Others",
        key: "others", // others will calculate by subtracting number_of_tasks_received and plus number_of_tasks_received_primary_page and  number_of_tasks_received_secondary_page
        value: 10,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }
    ],
    isModalOpen: false,
  }
]