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
import { FormatJsonCountry, getYesNoValue } from "./countriesFormat";

export const formatEditPolicyData = (data) => {

  let policies = []

  const valueTypes = PolicyTypeItemValuesType.data


  data.ruleList.map((item) => {
    console.log(item)
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
      } : PolicyTypeItems.data.find((type) => type.name === item.type),
      value: !_.includes(
        ["range", "yesNo", "list"],
        item.type
      )
        ? item.value
        : "",
      from: item?.type === "range" ? item.value.split(', ')[0] : "",
      to: item?.type === "range" ? item.value.split(', ')[1] : "",
      yes: item?.type === "yesNo" ? getYesNoValue(item,"yes","point") : "",
      no: item?.type === "yesNo" ? getYesNoValue(item, "no" , "point") : '',
      yesComment: item.type === 'yesNo' ? getYesNoValue(item, "yes" , "comment") : "",
      noComment: item.type === 'yesNo' ? getYesNoValue(item, "no" , "comment") : "",
      ruleComment: item.type === 'yesNo' ? "" : item.comment,
      countries: item.type === 'list' ? FormatJsonCountry(item?.value) : [],
      points: item.points,

    }

    console.log(payload)

    policies.push(payload)
  });

  return policies

}