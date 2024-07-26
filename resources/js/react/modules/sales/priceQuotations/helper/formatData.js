import dayjs from "dayjs";
import { getHourWithMin } from ".";



const getOtherWorksDataValue = (otherWorksData, parentValue) => {
  return otherWorksData.find((work) => work.parent_value === parentValue)?.value;
}


export const formatPriceQuotationsForPayload = (priceQuotations) => {

  // Get the other works data
  const contentWriting = getOtherWorksDataValue(priceQuotations?.other_works_data, "content_writing");
  const uiDesign = getOtherWorksDataValue(priceQuotations?.other_works_data, "ui_design");
  const logo = getOtherWorksDataValue(priceQuotations?.other_works_data, "logo_creation");
  const others = getOtherWorksDataValue(priceQuotations?.other_works_data, "other");

  // Get the speed optimization value
  const speedOptimization = priceQuotations?.other_works.find((work) => work?.value === "speed_optimization")

  const payload = {
    deal_stage_id: priceQuotations?.deal_stage_id?.id,
    project_cms_id: priceQuotations?.project_cms_id?.id,
    project_niche_id: priceQuotations?.project_niche_id?.id,
    no_of_primary_pages: Number(priceQuotations?.no_of_primary_pages),
    no_of_secondary_pages: Number(priceQuotations?.no_of_secondary_pages),
    platform_account_id: priceQuotations?.platform_account_id?.id === 0 ? null : priceQuotations?.platform_account_id?.id,
    currency_id: priceQuotations?.currency_id?.id,
    deadline_type: priceQuotations?.deadline_type.id,
    risk_factor: priceQuotations?.risk_factor === "Yes" ?  Number(priceQuotations?.risk_percentage) : null,
    no_of_major_functionalities: priceQuotations?.major_works === "Yes" ? Number(priceQuotations?.no_of_major_functionalities) : null,
    no_of_days: priceQuotations?.deadline_type?.id === 2 ? Number(priceQuotations?.no_of_days) : null,
    content_writing: contentWriting ? Number(contentWriting) : null,
    no_of_ui_design_page: uiDesign ? Number(uiDesign) : null,
    no_of_logo: logo ? Number(logo) : null,
    others_hours: others ? Number(others) : null,
    speed_optimization: speedOptimization?.value ? 1 : null,
  }

  return payload;
}




export const formatInvoiceData = (priceQuotations) => {
  const formatData = (date, addExtraDay = 0) => {
    return dayjs(date)?.add(addExtraDay, 'day')?.format("DD.MM.YYYY")
  }

  const payload = {
    serial_no: priceQuotations?.serial_no,
    create_at: formatData(priceQuotations?.created_at),
    invoiceDeadline: formatData(priceQuotations?.created_at, 1), // hear Add 1 Days extra
    total_calculated_hours: getHourWithMin(priceQuotations?.total_calculated_hours),
    total_price: priceQuotations?.usd_budget_with_additional_percent,
    client: {
      client_name: priceQuotations?.deal_stage?.client_name,
      client_username: priceQuotations?.deal_stage?.client_username,
      message_thread: priceQuotations?.deal_stage?.message_link
    },
    serviceProvider: {
      id: priceQuotations?.platform_account?.id,
      company_name: priceQuotations?.platform_account?.company_name,
      name: priceQuotations?.platform_account?.name,
      username: priceQuotations?.platform_account?.username,
    },
    items: [
      {
        sl: 1,
        items: "Number of primary pages",
        quantity: priceQuotations?.no_of_primary_pages,
        descriptions: "Approximate working hours needed",
        total_hours: getHourWithMin(priceQuotations?.total_hours_of_primary_page),
      },
      {
        sl: 2,
        items: "Number of secondary pages",
        quantity: priceQuotations?.no_of_secondary_pages,
        descriptions: "Approximate working hours needed",
        total_hours: getHourWithMin(priceQuotations?.total_hours_of_secondary_page),
      },
      {
        sl: 3,
        items: "Number of functional work",
        quantity: priceQuotations?.no_of_major_functionalities === null ? 0 : priceQuotations?.no_of_major_functionalities,
        descriptions: "Approximate working hours needed",
        total_hours: getHourWithMin(priceQuotations?.total_hours_of_major_functionality),

      },
      {
        sl: 4,
        items: "Developers",
        quantity: "This will be Other works",
        descriptions: "Approximate working hours needed",
        total_hours: getHourWithMin(priceQuotations?.total_hours_of_others_works),
      }
    ]
  }

  return payload
}
