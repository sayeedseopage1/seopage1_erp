import _ from "lodash";
import { PolicyTypeItemValuesType, PolicyTypeItems } from "../constant";
import { FormatJsonCountry, getYesNoValue } from "./countriesFormat";

export const formatEditPolicyData = (data) => {

  let policies = []

  const valueTypes = PolicyTypeItemValuesType?.data?.regularTypes?.data

  data.ruleList.map((item) => {
    let payload = {
      id: item.id,
      policyName: data.title,
      department: data.department,
      comment: item.comment,
      policyType: PolicyTypeItems?.data?.find((policy) => policy.name === item.type),
      title: item.title,
      valueType: item.type === 'yesNo' ? "" : item.type === 'list' ? {
        id: 1,
        label: "Countries",
        name: "countries",
      } : valueTypes?.find((type) => type.name === item.
        value_type),
      value: !_.includes(
        ["range", "yesNo", "list"],
        item.type
      )
        ? item.value
        : "",
      from: item?.type === "range" ? item.value.split(', ')[0] : "",
      to: item?.type === "range" ? item.value.split(', ')[1] : "",
      yes: item?.type === "yesNo" ? getYesNoValue(item, "yes", "point") : "",
      no: item?.type === "yesNo" ? getYesNoValue(item, "no", "point") : '',
      yesComment: item.type === 'yesNo' ? getYesNoValue(item, "yes", "comment") : "",
      noComment: item.type === 'yesNo' ? getYesNoValue(item, "no", "comment") : "",
      ruleComment: item.type === 'yesNo' ? "" : item.comment,
      countries: item.type === 'list' ? FormatJsonCountry(item?.value) : [],
      points: item.points,

    }

    policies.push(payload)
  });

  return policies

}


export const formatEditRuleData = (data, selectedRow) => {

  const formatCountry = FormatJsonCountry(selectedRow?.value)
  let updatedCountry = [...formatCountry]

  const payload = {
    id: selectedRow.id,
    policyName: data.title,
    department: data.department,
    comment: data.comment,
    policyType: PolicyTypeItems.data.find(
      (item) => item?.name === selectedRow?.type
    ),
    title: selectedRow.title,
    valueType: {
      id: 1,
      label: "Countries",
      name: "countries",
    },
    comment: selectedRow?.comment,
    from:
      selectedRow?.type === "range"
        ? selectedRow?.value?.split(",")[0]
        : "",
    to:
      selectedRow?.type === "range"
        ? selectedRow?.value?.split(", ")[1]?.trim()
        : "",
    yes:
      selectedRow?.type === "yesNo"
        ? getYesNoValue(selectedRow, "yes", "point")
        : "",
    no:
      selectedRow?.type === "yesNo"
        ? getYesNoValue(selectedRow, "no", "point")
        : "",
    value: !_.includes(
      ["range", "yesNo", "list"],
      selectedRow?.type
    )
      ? selectedRow?.value
      : "",
    ruleComment: selectedRow?.comment,
    yesComment:
      selectedRow?.type === "yesNo"
        ? getYesNoValue(selectedRow, "yes", "comment")
        : "",
    noComment:
      selectedRow?.type === "yesNo"
        ? getYesNoValue(selectedRow, "no", "comment")
        : "",
    countries:
      selectedRow?.type === "list"
        ? [...FormatJsonCountry(selectedRow?.value)]
        : "",
    points: selectedRow?.points,
  };



  return payload;
}


export const formatEditRuleDataPayload = (editRuleData) => {
  const payload = {
    title: editRuleData?.title,
    policyType: editRuleData?.policyType?.name,
    id: editRuleData?.id,
  };
  if (editRuleData.value) payload.value = editRuleData.value;
  if (!_.isEmpty(editRuleData.valueType))
    payload.valueType = editRuleData.valueType.name;
  if (editRuleData.from) payload.from = editRuleData.from;
  if (editRuleData.to) payload.to = editRuleData.to;
  if (editRuleData.points) payload.points = editRuleData.points;
  if (editRuleData.yes && editRuleData.no) {
    payload.value = {
      yes: {
        point: editRuleData.yes,
        comment: editRuleData.yesComment,
      },
      no: {
        point: editRuleData.no,
        comment: editRuleData.noComment,
      },
    };
  }
  if (editRuleData.countries?.length > 0) {
    payload.countries = editRuleData.countries.map((country) => ({
      [country.iso]: country.niceName,
    }));
  }
  if (editRuleData.ruleComment) {
    payload.comment = editRuleData.ruleComment;
  }


  return payload;
}

export const formatEditPolicyDataPayload = (editPolicyDefaultData, editPolicyInputData, editPolicyDeleteData) => {
  const payload = {
    id: editPolicyDefaultData?.id,
    title: editPolicyDefaultData?.policyName,
    department: editPolicyDefaultData?.department?.id,
    comment: editPolicyDefaultData?.comment,
    deletedRuleIds: editPolicyDeleteData,
    ruleList: editPolicyInputData.map((item) => {
      const rule = {
        policyType: item.policyType?.name,
        title: item.title,
        id: item?.id?.length > 13 ? "newRule" : item.id,
      };
      if (item.value) rule.value = item.value;
      if (!_.isEmpty(item.valueType))
        rule.valueType = item.valueType.name;
      if (item.from) rule.from = item.from;
      if (item.to) rule.to = item.to;
      if (item.points) rule.points = item.points;
      if (item.yes && item.no) {
        rule.value = {
          yes: {
            point: item.yes,
            comment: item.yesComment,
          },
          no: {
            point: item.no,
            comment: item.noComment,
          },
        };
      }
      if (item.countries?.length > 0) {
        rule.countries = item.countries.map((country) => ({
          [country.iso]: country.niceName,
        }));
      }
      if (item.ruleComment) rule.comment = item.ruleComment;
      return rule;
    }),
  };
  return payload;
}