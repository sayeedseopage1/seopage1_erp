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
    risk_factor: priceQuotations?.risk_factor === "Yes" ? priceQuotations?.risk_percentage : null,
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