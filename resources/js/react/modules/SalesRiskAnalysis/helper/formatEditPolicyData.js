// policyName: "",
//         department: {},
//         policyType: {},
//         title: "",
//         valueType: {},
//         value: "",
//         from: "",
//         to: "",
//         yes: "",
//         no: "",
//         comment: "",
//         yesComment: "",
//         noComment: "",
//         ruleComment: "",
//         countries: [],
//         points: "",

import _ from "lodash";
import { PolicyTypeItemValuesType, PolicyTypeItems } from "../constant";
import { FormatJsonCountry } from "./countriesFormat";

export const formatEditPolicyData = (data) => {

  let policies = []

  const valueTypes = PolicyTypeItemValuesType.data


  const formatData = data.ruleList.map((item) => {
    let payload = {
      policyName: data.title,
      department: data.department,
      comment: item.comment,
      policyType: PolicyTypeItems?.data?.find((policy) => policy.name === item.type),
      title: item.title,
      valueType: item.type === 'yesNo' ? "" : item.type === 'list' ? {
        id: 1,
        label: "Countries",
        name: "countries",
      } : valueTypes?.regularTypes?.data.find((type) => type.name === item.type),
      value: !_.includes(
        ["range", "yesNo", "list"],
        item.type
      )
        ? item.value
        : "",
      from: item?.type === "range" ? item.value.split(', ')[0] : "",
      to: item?.type === "range" ? item.value.split(', ')[1] : "",
      yes: item?.type === "yesNo" ? item.value.split(', ')[0] : "",
      no: item?.type === "yesNo" ? item.value.split(', ')[1] : '',
      yesComment: item.type === 'yesNo' ? item.comment : "",
      noComment: item.type === 'yesNo' ? item.comment : "",
      ruleComment: item.type === 'yesNo' ? "" : item.comment,
      countries: item.type === 'list' ? FormatJsonCountry(item?.value) : [],
      points: item.points,

    }

    policies.push(payload)
  });

  return policies

}