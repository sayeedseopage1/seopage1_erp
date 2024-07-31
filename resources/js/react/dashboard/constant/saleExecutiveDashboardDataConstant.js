import { SalesExecutiveDashboardTableColumn } from "../components/table/columns/SalesExecutiveDashboardTableColumn";




function filterColumns(excludeKeys) {
  return SalesExecutiveDashboardTableColumn?.Modal
    .filter((column) => !excludeKeys.includes(column.id))
    .filter(column => Object.keys(column).length > 0);
}


export const SaleExecutiveDashboardDataConstant = [
  {
    id: 1,
    title: "Number Of Leads",
    subTitle: null,
    value: 10,
    valueType: null,
    key: "number_of_leads_received",
    info: null,
    hasPermissionForModal: true,
    query: "start_date=2024-07-02&end_date=2024-07-09&status=10",
    tableColumn: filterColumns(["bidding_minutes"]),
    isShowModalExtraInfo: [
      {
        id: "1",
        title: "Total Number Of Leads",
        key: "number_of_leads_received_get",
        value: 10,
        valueType: null,
      },
      {
        id: "2",
        title: "Total Number Of Leads For Fixed Project",
        key: "number_of_leads_received_fixed",
        value: 10,
        valueType: null,
      },
      {
        id: "3",
        title: "Total Number Of Leads For Hourly Project",
        key: "number_of_leads_received_hourly",
        value: 10,
        valueType: null,
      }

    ],
    isModalOpen: false,
  },
  {
    id: 2,
    title: "Avg. Bidding Amount",
    subTitle: null,
    value: 10,
    valueType: null,
    key: "average_number_of_leads_amount",
    info: {
      content: "For Leads"
    },
    hasPermissionForModal: true,
    query: "start_date=2024-07-02&end_date=2024-07-09&status=10",
    tableColumn: filterColumns(["bidding_minutes"]),
    isShowModalExtraInfo: [
      {
        id: "1",
        title: "Total Number Of Leads",
        key: "number_of_leads_received_get",
        value: 10,
        valueType: null,
      },
      {
        id: "2",
        title: "Total Number Of Leads For Fixed Project",
        key: "number_of_leads_received_fixed",
        value: 10,
        valueType: null,
      },
      {
        id: "3",
        title: "Total Number Of Leads For Hourly Project",
        key: "number_of_leads_received_hourly",
        value: 10,
        valueType: null,
      }

    ],
    isModalOpen: false,
  },
  {
    id: 2,
    title: "Number Of Leads That Got Converted To Deals",
    subTitle: null,
    value: 10,
    valueType: null,
    key: "number_of_leads_convert_deals",
    info: null,
    hasPermissionForModal: true,
    query: "start_date=2024-07-02&end_date=2024-07-09&status=10",
    tableColumn: filterColumns(["bidding_minutes"]),
    isShowModalExtraInfo: [
      {
        id: "1",
        title: "Total Number Of Converted Deals",
        key: "number_of_leads_convert_deals_get",
        value: 10,
        valueType: null,
      },
      {
        id: "2",
        title: "Total Number Of Converted Deals (Fixed)",
        key: "number_of_leads_convert_deals_fixed",
        value: 10,
        valueType: null,
      },
      {
        id: "3",
        title: "Total Number Of Converted Deals (Hourly)",
        key: "number_of_leads_convert_deals_hourly",
        value: 10,
        valueType: null,
      }
    ],
    isModalOpen: false,
  },
  {
    id: 3,
    title: "Number Of Leads That Got Converted To Won Deals",
    subTitle: null,
    value: 10,
    valueType: null,
    key: "number_of_leads_convert_won_deals",
    info: null,
    hasPermissionForModal: true,
    query: "start_date=2024-07-02&end_date=2024-07-09&status=10",
    tableColumn: filterColumns(["bidding_minutes"]),
    isShowModalExtraInfo: [
      {
        id: "1",
        title: "Total Number Of Converted Lead To Won Deals",
        key: "number_of_leads_convert_won_deals_get",
        value: 10,
        valueType: null,
      },
      {
        id: "2",
        title: "Total Number Of Converted Lead To Won Deals (Fixed)",
        key: "number_of_leads_convert_won_deals_fixed",
        value: 10,
        valueType: null,
      },
      {
        id: "3",
        title: "Total Number Of Converted Lead To Won Deals (Hourly)",
        key: "number_of_leads_convert_won_deals_hourly",
        value: 10,
        valueType: null,
      }
    ],
    isModalOpen: false,
  },
  {
    id: 4,
    title: "Avg. Bidding Delay Time",
    subTitle: null,
    value: 10,
    valueType: null,
    key: "average_bidding_delay_time",
    info: null,
    hasPermissionForModal: true,
    query: "start_date=2024-07-02&end_date=2024-07-09&status=10",
    tableColumn: filterColumns([]),
    isShowModalExtraInfo: [
      {
        id: "1",
        title: "Total Number Of Leads",
        key: "number_of_leads_received_get",
        value: 10,
        valueType: null,
      },
      {
        id: "2",
        title: "Total Number Of Bidding Delay Time (Fixed)",
        key: "number_of_leads_received_fixed",
        value: 10,
        valueType: null,
      },
      {
        id: "3",
        title: "Total Number Of Bidding Delay Time (Hourly)",
        key: "number_of_leads_received_hourly",
        value: 10,
        valueType: null,
      }
    ],
    isModalOpen: false,
  },
  {
    id: 5,
    title: "Bidding Frequency",
    subTitle: null,
    value: 10,
    valueType: null,
    key: "bidding_frequency",
    info: null,
    hasPermissionForModal: true,
    query: "start_date=2024-07-02&end_date=2024-07-09&status=10",
    tableColumn: filterColumns(["bidding_minutes"]),
    isShowModalExtraInfo: [
      {
        id: "1",
        title: "Total Number Of Leads",
        key: "number_of_leads_received_get",
        value: 10,
        valueType: null,
      },
      {
        id: "2",
        title: "Total Number Of Leads For Fixed Project",
        key: "number_of_leads_received_fixed",
        value: 10,
        valueType: null,
      },
      {
        id: "3",
        title: "Total Number Of Leads For Hourly Project",
        key: "number_of_leads_received_hourly",
        value: 10,
        valueType: null,
      }
    ],
    isModalOpen: false,
  },
  {
    id: 6,
    title: "Number Of Won Deals",
    subTitle: null,
    value: 10,
    valueType: null,
    key: "no_of_won_deals_count",
    info: null,
    hasPermissionForModal: true,
    query: "start_date=2024-07-02&end_date=2024-07-09&status=10",
    tableColumn: filterColumns(["project_budget", "bidding_minutes"]),
    isShowModalExtraInfo: [
      {
        id: "1",
        title: "Total Number Of Leads",
        key: "number_of_leads_received_get",
        value: 10,
        valueType: null,
      }
    ],
    isModalOpen: false,
  },
  {
    id: 7,
    title: "Value Of Won Deals",
    subTitle: null,
    value: 10,
    valueType: "%",
    key: "no_of_won_deals_value",
    info: null,
    hasPermissionForModal: true,
    query: "start_date=2024-07-02&end_date=2024-07-09&status=10",
    tableColumn: filterColumns(["project_budget", "bidding_minutes"]),
    isShowModalExtraInfo: [
      {
        id: 1,
        title: "Total Number Of Leads",
        key: "no_of_won_deals_count",
        value: 10,
        valueType: null,
      }
    ],
    isModalOpen: false,
  },
  {
    id: 8,
    title: "Project Completion/Won Deal Ratio",
    subTitle: null,
    value: 10,
    valueType: null,
    key: "finished_project_ratio",
    info: null,
    hasPermissionForModal: true,
    query: "start_date=2024-07-02&end_date=2024-07-09&status=10",
    tableColumn: filterColumns(["project_budget", "bidding_minutes"]),
    isShowModalExtraInfo: [
      {
        id: 1,
        title: "Total Number Of Leads",
        key: "finished_project_count",
        value: 10,
        valueType: null,
      }
    ],
    isModalOpen: false,
  },
  {
    id: 9,
    title: "Canceled Project Count/Won Deal Ration",
    subTitle: null,
    value: 10,
    valueType: "Days",
    key: "canceled_project_ratio",
    info: null,
    hasPermissionForModal: true,
    query: "start_date=2024-07-02&end_date=2024-07-09&status=10",
    tableColumn: filterColumns(["project_budget", "bidding_minutes"]),
    isShowModalExtraInfo: [
      {
        id: 1,
        title: "Total Number Of Leads",
        key: "canceled_project_count",
        value: 10,
        valueType: null,
      }
    ],
    isModalOpen: false,
  },
  {
    id: 10,
    title: "Avg. Deal Amount",
    subTitle: null,
    value: 10,
    valueType: null,
    key: "avg_deal_amount",
    info: null,
    hasPermissionForModal: true,
    query: "start_date=2024-07-02&end_date=2024-07-09&status=10",
    tableColumn: filterColumns(["project_budget", "bidding_minutes"]),
    isShowModalExtraInfo: [
      {
        id: 1,
        title: "Total Number Of Leads",
        key: "no_of_won_deals_count",
        value: 10,
        valueType: null
      }
    ],
    isModalOpen: false,
  },
  {
    id: 11,
    title: "Rejected Project Count/Won Deal Ratio",
    subTitle: null,
    value: 10,
    valueType: "%",
    key: "rejected_project_ratio",
    info: null,
    hasPermissionForModal: true,
    query: "start_date=2024-07-02&end_date=2024-07-09&status=10",
    tableColumn: filterColumns(["project_budget", "bidding_minutes"]),
    isShowModalExtraInfo: [
      {
          id: 1,
          title: "Total Number Of Leads",
          key: "rejected_project_count",
          value: 10,
          valueType: null,
      }
    ],
    isModalOpen: false,
  }
]