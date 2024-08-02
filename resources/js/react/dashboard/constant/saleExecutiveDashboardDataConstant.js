import { SalesExecutiveDashboardTableColumn } from "../components/table/columns/SalesExecutiveDashboardTableColumn";


const checkIsAdmin = () => {
  const user = window.Laravel.user
  if (user) {
    return user.role_id === 1
  }
}



/**
 * Filters the columns of the Sales Executive Dashboard table.
 *
 * @param {string[]} excludeKeys - An array of column IDs to exclude from the result.
 * @returns {Object[]} - The filtered list of columns.
 */

function filterColumns(excludeKeys) {
  return SalesExecutiveDashboardTableColumn?.Modal
    .filter((column) => !excludeKeys.includes(column.id))
    .filter(column => Object.keys(column).length > 0);
}


/**
 * @typedef {Object} SaleExecutiveDashboardData
 * @property {number} id - Unique identifier for the dashboard data item.
 * @property {string} title - Title of the dashboard item.
 * @property {string|null} subTitle - Subtitle of the dashboard item.
 * @property {string|null} value - The value associated with the dashboard item.
 * @property {string|null} valueTypeBefore - Any value type string to be shown before the value.
 * @property {string|null} valueTypeAfter - Any value type string to be shown after the value.
 * @property {string} key - The key associated with the dashboard item.
 * @property {string|null} info - Additional information about the dashboard item.
 * @property {boolean} hasPermissionForModal - Flag indicating if the user has permission to view the modal for this item.
 * @property {string} query - The query key used to fetch the data.
 * @property {string} responseKey - The key used to extract the relevant data from the response.
 * @property {function(Object[]): Object[]} formateResponse - Function to format the response data.
 * @property {Object[]} tableColumn - The columns to be shown in the table.
 * @property {Object[]} isShowModalExtraInfo - Extra information to be shown in the modal.
 * @property {boolean} isModalOpen - Flag indicating if the modal is open.
 */

/**
 * Sale Executive Dashboard Data Constants
 * @type {SaleExecutiveDashboardData[]}
 */

export const SaleExecutiveDashboardDataConstant = [
  {
    id: 1,
    title: "Number Of Leads",
    subTitle: null,
    value: null,
    valueTypeBefore: null,
    valueTypeAfter: null,
    key: "number_of_leads_received",
    info: null,
    hasPermissionForModal: true,
    query: "leads_received",
    responseKey: "number_of_leads_received_list",
    formateResponse: (response) => {
      if (response && response.length > 0) {
        const formattedResponse = response.map(item => {
          const biddingTime = `${item.bidding_minutes} min ${item.bidding_seconds} Sec`

          return {
            project_name: item?.client_name, // using client_name as project name on backend for send response,
            project_budget: `${item?.bid_value}${item?.currency?.currency_symbol}`,
            created_at: item?.created_at,
            bidding_time: biddingTime,
            created_by: item?.added_by_user,
            deal_status: item?.deal_status,
            is_admin: checkIsAdmin(), // This function data is not available in the response data so we are using this function to check the user is admin or not from the window object of the browser
          }

        })
        return formattedResponse;
      }
    },
    tableColumn: filterColumns(["bidding_minutes"]),
    isShowModalExtraInfo: [
      {
        id: "1",
        title: "Total Number Of Leads",
        key: "number_of_leads_received",
        value: null,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: "2",
        title: "Total Number Of Leads For Fixed Project",
        key: "number_of_leads_received_fixed",
        value: null,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: "3",
        title: "Total Number Of Leads For Hourly Project",
        key: "number_of_leads_received_hourly",
        value: null,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }

    ],
    isModalOpen: false,
  },
  {
    id: 2,
    title: "Avg. Bidding Amount",
    subTitle: null,
    value: null,
    valueTypeBefore: null,
    valueTypeAfter: "USD",
    key: "average_number_of_leads_amount",
    info: {
      content: "For Leads"
    },
    hasPermissionForModal: true,
    query: "leads_received",
    responseKey: "number_of_leads_received_list",
    formateResponse: (response) => {
      if (response && response.length > 0) {
        const formattedResponse = response.map(item => {
          const biddingTime = `${item.bidding_minutes} min ${item.bidding_seconds} Sec`

          return {
            project_name: item?.client_name, // using client_name as project name on backend for send response,
            project_budget: `${item?.bid_value}${item?.currency?.currency_symbol}`,
            created_at: item?.created_at,
            bidding_time: biddingTime,
            created_by: item?.added_by_user,
            deal_status: item?.deal_status,
            is_admin: checkIsAdmin(), // This function data is not available in the response data so we are using this function to check the user is admin or not from the window object of the browser
          }

        })
        return formattedResponse;
      }
    },
    tableColumn: filterColumns(["bidding_minutes"]),
    isShowModalExtraInfo: [
      {
        id: "1",
        title: "Total Number Of Leads",
        key: "number_of_leads_received",
        value: null,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: "2",
        title: "Total Number Of Leads For Fixed Project",
        key: "number_of_leads_received_fixed",
        value: null,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: "3",
        title: "Total Number Of Leads For Hourly Project",
        key: "number_of_leads_received_hourly",
        value: null,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }

    ],
    isModalOpen: false,
  },
  {
    id: 2,
    title: "Number Of Leads That Got Converted To Deals",
    subTitle: null,
    value: null,
    valueTypeBefore: null,
    valueTypeAfter: null,
    key: "number_of_leads_convert_deals",
    info: null,
    hasPermissionForModal: true,
    query: "convert_deals",
    responseKey: "number_of_leads_convert_deals_list",
    formateResponse: (response) => {
      if (response && response.length > 0) {
        const formattedResponse = response.map(item => {
          const biddingTime = `${item.bidding_minutes} min ${item.bidding_seconds} Sec`

          return {
            project_name: item?.client_name, // using client_name as project name on backend for send response,
            project_budget: `${item?.bid_value}${item?.currency?.currency_symbol}`,
            created_at: item?.created_at,
            bidding_time: biddingTime,
            created_by: item?.added_by_user,
            deal_status: item?.deal_status,
            is_admin: checkIsAdmin(), // This function data is not available in the response data so we are using this function to check the user is admin or not from the window object of the browser
          }

        })
        return formattedResponse;
      }
    },
    tableColumn: filterColumns(["bidding_minutes"]),
    isShowModalExtraInfo: [
      {
        id: "1",
        title: "Total Number Of Converted Deals",
        key: "number_of_leads_convert_deals",
        value: null,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: "2",
        title: "Total Number Of Converted Deals (Fixed)",
        key: "number_of_leads_convert_deals_fixed",
        value: null,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: "3",
        title: "Total Number Of Converted Deals (Hourly)",
        key: "number_of_leads_convert_deals_hourly",
        value: null,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }
    ],
    isModalOpen: false,
  },
  {
    id: 3,
    title: "Number Of Leads That Got Converted To Won Deals",
    subTitle: null,
    value: null,
    valueTypeBefore: null,
    valueTypeAfter: null,
    key: "number_of_leads_convert_won_deals",
    info: null,
    hasPermissionForModal: true,
    query: "convert_won_deals",
    responseKey: "number_of_leads_convert_won_deals_list",
    formateResponse: (response) => {
      if (response && response.length > 0) {
        const formattedResponse = response.map(item => {
          const biddingTime = `${item.bidding_minutes} min ${item.bidding_seconds} Sec`

          return {
            project_name: item?.client_name, // using client_name as project name on backend for send response,
            project_budget: `${item?.bid_value} ${item?.currency?.currency_symbol}`,
            created_at: item?.created_at,
            bidding_time: biddingTime,
            created_by: item?.added_by_user,
            deal_status: item?.deal_status,
            is_admin: checkIsAdmin(), // This function data is not available in the response data so we are using this function to check the user is admin or not from the window object of the browser // This function data is not available in the response data so we are using this function to check the user is admin or not from the window object of the browser
          }

        })
        return formattedResponse;
      }
    },
    tableColumn: filterColumns(["bidding_minutes"]),
    isShowModalExtraInfo: [
      {
        id: "1",
        title: "Total Number Of Converted Lead To Won Deals",
        key: "number_of_leads_convert_won_deals",
        value: null,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: "2",
        title: "Total Number Of Converted Lead To Won Deals (Fixed)",
        key: "number_of_leads_convert_won_deals_fixed",
        value: null,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: "3",
        title: "Total Number Of Converted Lead To Won Deals (Hourly)",
        key: "number_of_leads_convert_won_deals_hourly",
        value: null,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }
    ],
    isModalOpen: false,
  },
  {
    id: 4,
    title: "Avg. Bidding Delay Time",
    subTitle: null,
    value: null,
    valueTypeBefore: null,
    valueTypeAfter: null,
    key: "average_bidding_delay_time",
    info: null,
    hasPermissionForModal: true,
    query: "leads_received",
    responseKey: "number_of_leads_received_list",
    formateResponse: (response) => {
      if (response && response.length > 0) {
        const formattedResponse = response.map(item => {
          const biddingTime = `${item.bidding_minutes} min ${item.bidding_seconds} Sec`

          return {
            project_name: item?.client_name, // using client_name as project name on backend for send response,
            project_budget: `${item?.bid_value}${item?.currency?.currency_symbol}`,
            created_at: item?.created_at,
            bidding_time: biddingTime,
            created_by: item?.added_by_user,
            deal_status: item?.deal_status,
            is_admin: checkIsAdmin(), // This function data is not available in the response data so we are using this function to check the user is admin or not from the window object of the browser
          }

        })
        return formattedResponse;
      }
    },
    tableColumn: filterColumns([]),
    isShowModalExtraInfo: [
      {
        id: "1",
        title: "Total Number Of Leads",
        key: "number_of_leads_received",
        value: null,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: "2",
        title: "Total Number Of Bidding Delay Time (Fixed)",
        key: "number_of_leads_received_fixed",
        value: null,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: "3",
        title: "Total Number Of Bidding Delay Time (Hourly)",
        key: "number_of_leads_received_hourly",
        value: null,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }
    ],
    isModalOpen: false,
  },
  {
    id: 5,
    title: "Bidding Frequency",
    subTitle: null,
    value: null,
    valueTypeBefore: null,
    valueTypeAfter: null,
    key: "bidding_frequency",
    info: null,
    hasPermissionForModal: true,
    query: "leads_received",
    responseKey: "number_of_leads_received_list",
    formateResponse: (response) => {
      if (response && response.length > 0) {
        const formattedResponse = response.map(item => {
          const biddingTime = `${item.bidding_minutes} min ${item.bidding_seconds} Sec`

          return {
            project_name: item?.client_name, // using client_name as project name on backend for send response,
            project_budget: `${item?.bid_value}${item?.currency?.currency_symbol}`,
            created_at: item?.created_at,
            bidding_time: biddingTime,
            created_by: item?.added_by_user,
            deal_status: item?.deal_status,
            is_admin: checkIsAdmin(), // This function data is not available in the response data so we are using this function to check the user is admin or not from the window object of the browser
          }

        })
        return formattedResponse;
      }
    },
    tableColumn: filterColumns(["bidding_minutes"]),
    isShowModalExtraInfo: [
      {
        id: "1",
        title: "Total Number Of Leads",
        key: "number_of_leads_received",
        value: null,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: "2",
        title: "Total Number Of Leads For Fixed Project",
        key: "number_of_leads_received_fixed",
        value: null,
        valueTypeBefore: null,
        valueTypeAfter: null,
      },
      {
        id: "3",
        title: "Total Number Of Leads For Hourly Project",
        key: "number_of_leads_received_hourly",
        value: null,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }
    ],
    isModalOpen: false,
  },
  {
    id: 6,
    title: "Number Of Won Deals",
    subTitle: null,
    value: null,
    valueTypeBefore: null,
    valueTypeAfter: null,
    key: "no_of_won_deals_count",
    info: null,
    hasPermissionForModal: true,
    query: "num_of_won_deal",
    responseKey: "no_of_won_deals_list",
    formateResponse: (response) => {
      if (response && response.length > 0) {
        const formattedResponse = response.map(item => {
          const biddingTime = `${item?.bidding_minutes} min ${item?.bidding_seconds} Sec`
          return {
            project_name: item?.project_name,
            project_budget: `${item?.bid_value}${item?.currency?.currency_symbol}`,
            created_at: item?.created_at,
            bidding_time: biddingTime,
            created_by: item?.user,
            deal_status: item?.deal_status,
            is_admin: checkIsAdmin(), // This function data is not available in the response data so we are using this function to check the user is admin or not from the window object of the browser
          }

        })
        return formattedResponse;
      }
    },
    tableColumn: filterColumns(["project_budget", "bidding_minutes"]),
    isShowModalExtraInfo: [
      {
        id: "1",
        title: "Total Number Of Leads",
        key: "number_of_leads_received",
        value: null,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }
    ],
    isModalOpen: false,
  },
  {
    id: 7,
    title: "Value Of Won Deals",
    subTitle: null,
    value: null,
    valueTypeBefore: null,
    valueTypeAfter: "USD",
    key: "no_of_won_deals_value",
    info: null,
    hasPermissionForModal: true,
    query: "num_of_won_deal",
    responseKey: "no_of_won_deals_list",
    formateResponse: (response) => {
      if (response && response.length > 0) {
        const formattedResponse = response.map(item => {
          const biddingTime = `${item?.bidding_minutes} min ${item?.bidding_seconds} Sec`
          return {
            project_name: item?.project_name,
            project_budget: `${item?.bid_value}${item?.currency?.currency_symbol}`,
            created_at: item?.created_at,
            bidding_time: biddingTime,
            created_by: item?.user,
            deal_status: item?.deal_status,
            is_admin: checkIsAdmin(), // This function data is not available in the response data so we are using this function to check the user is admin or not from the window object of the browser
          }

        })
        return formattedResponse;
      }
    },
    tableColumn: filterColumns(["project_budget", "bidding_minutes"]),
    isShowModalExtraInfo: [
      {
        id: 1,
        title: "Total Number Of Leads",
        key: "no_of_won_deals_count",
        value: null,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }
    ],
    isModalOpen: false,
  },
  {
    id: 8,
    title: "Project Completion/Won Deal Ratio",
    subTitle: null,
    value: null,
    valueTypeBefore: null,
    valueTypeAfter: null,
    key: "finished_project_ratio",
    info: null,
    hasPermissionForModal: true,
    query: "finished_project",
    responseKey: "finished_project_list",
    formateResponse: (response) => {
      if (response && response.length > 0) {
        const formattedResponse = response.map(item => {
          const biddingTime = `${item?.bidding_minutes} min ${item?.bidding_seconds} Sec`
          return {
            project_name: item?.project_name,
            project_budget: `${item?.bid_value}${item?.currency?.currency_symbol}`,
            created_at: item?.created_at,
            bidding_time: biddingTime,
            created_by: item?.user,
            deal_status: item?.deal_status,
            is_admin: checkIsAdmin(), // This function data is not available in the response data so we are using this function to check the user is admin or not from the window object of the browser
          }

        })
        return formattedResponse;
      }
    },
    tableColumn: filterColumns(["project_budget", "bidding_minutes"]),
    isShowModalExtraInfo: [
      {
        id: 1,
        title: "Total Number Of Leads",
        key: "finished_project_count",
        value: null,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }
    ],
    isModalOpen: false,
  },
  {
    id: 9,
    title: "Canceled Project Count/Won Deal Ration",
    subTitle: null,
    value: null,
    valueTypeBefore: null,
    valueTypeAfter: null,
    key: "canceled_project_ratio",
    info: null,
    hasPermissionForModal: true,
    query: "canceled_project",
    responseKey: "canceled_project_list",
    formateResponse: (response) => {
      if (response && response.length > 0) {
        const formattedResponse = response.map(item => {
          const biddingTime = `${item?.bidding_minutes} min ${item?.bidding_seconds} Sec`
          return {
            project_name: item?.project_name,
            project_budget: `${item?.bid_value}${item?.currency?.currency_symbol}`,
            created_at: item?.created_at,
            bidding_time: biddingTime,
            created_by: item?.user,
            deal_status: item?.deal_status,
            is_admin: checkIsAdmin(), // This function data is not available in the response data so we are using this function to check the user is admin or not from the window object of the browser
          }

        })
        return formattedResponse;
      }
    },
    tableColumn: filterColumns(["project_budget", "bidding_minutes"]),
    isShowModalExtraInfo: [
      {
        id: 1,
        title: "Total Number Of Leads",
        key: "canceled_project_count",
        value: null,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }
    ],
    isModalOpen: false,
  },
  {
    id: 10,
    title: "Avg. Deal Amount",
    subTitle: null,
    value: null,
    valueTypeBefore: null,
    valueTypeAfter: "USD",
    key: "avg_deal_amount",
    info: null,
    hasPermissionForModal: true,
    query: "num_of_won_deal",
    responseKey: "no_of_won_deals_list",
    formateResponse: (response) => {
      if (response && response.length > 0) {
        const formattedResponse = response.map(item => {
          const biddingTime = `${item?.bidding_minutes} min ${item?.bidding_seconds} Sec`
          return {
            project_name: item?.project_name,
            project_budget: `${item?.bid_value}${item?.currency?.currency_symbol}`,
            created_at: item?.created_at,
            bidding_time: biddingTime,
            created_by: item?.user,
            deal_status: item?.deal_status,
            is_admin: checkIsAdmin(), // This function data is not available in the response data so we are using this function to check the user is admin or not from the window object of the browser
          }

        })
        return formattedResponse;
      }
    },
    tableColumn: filterColumns(["project_budget", "bidding_minutes"]),
    isShowModalExtraInfo: [
      {
        id: 1,
        title: "Total Number Of Leads",
        key: "no_of_won_deals_count",
        value: null,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }
    ],
    isModalOpen: false,
  },
  {
    id: 11,
    title: "Rejected Project Count/Won Deal Ratio",
    subTitle: null,
    value: null,
    valueTypeBefore: null,
    valueTypeAfter: null,
    key: "rejected_project_ratio",
    info: null,
    hasPermissionForModal: true,
    query: "rejected_project",
    responseKey: "rejected_project_list",
    formateResponse: (response) => {
      if (response && response.length > 0) {
        const formattedResponse = response.map(item => {
          const biddingTime = `${item?.bidding_minutes} min ${item?.bidding_seconds} Sec`
          return {
            project_name: item?.project_name,
            project_budget: `${item?.bid_value}${item?.currency?.currency_symbol}`,
            created_at: item?.created_at,
            bidding_time: biddingTime,
            created_by: item?.user,
            deal_status: item?.deal_status,
            is_admin: checkIsAdmin(), // This function data is not available in the response data so we are using this function to check the user is admin or not from the window object of the browser
          }

        })
        return formattedResponse;
      }
    },
    tableColumn: filterColumns(["project_budget", "bidding_minutes"]),
    isShowModalExtraInfo: [
      {
        id: 1,
        title: "Total Number Of Leads",
        key: "rejected_project_count",
        value: null,
        valueTypeBefore: null,
        valueTypeAfter: null,
      }
    ],
    isModalOpen: false,
  }
]