import _ from "lodash";
import { PolicyTypeItemValuesType, PolicyTypeItems, QuestionsTypes } from "../constant";
import { FormatJsonCountry, getYesNoValue } from "./countriesFormat";

const formatValueType = (item) => {
  if (item.type === "yesNo") {
    return "";
  } else if (item.type === "list") {
    return {
      id: 1,
      label: "Countries",
      name: "countries",
    };
  } else {
    return PolicyTypeItemValuesType?.data?.regularTypes?.data.find(
      (item) => item?.name === item?.value_type
    );
  }

}

export const formatEditPolicyData = (data) => {

  let policies = []

  data.ruleList.map((item) => {
    let payload = {
      id: item.id,
      policyName: data.title,
      department: data.department,
      comment: item.comment,
      policyType: PolicyTypeItems?.data?.find((policy) => policy.name === item.type),
      title: item.title,
      valueType: formatValueType(item),
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

  const payload = {
    id: selectedRow.id,
    policyName: data.title,
    department: data.department,
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
    key: editPolicyDefaultData?.key?.name,
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


export const formatSingleRuleData = (row, selectedRule, policyKeys) => {
  const valueTypeConst =
    PolicyTypeItemValuesType?.data?.regularTypes?.data;

  const getVueType = (type) => {
    if (!_.includes(["yesNo", "list"], type)) {
      return valueTypeConst.find(
        (item) => item?.name === selectedRule?.value_type
      );
    } else if (type === "list") {
      return {
        id: 1,
        label: "Countries",
        name: "countries",
      };
    } else {
      return "";
    }
  };
  const payload = {
    id: selectedRule.id,
    policyName: row.title,
    policyId: row.id,
    department: row.department,
    key: policyKeys?.data.find(item => item.name === row.key),
    policyType: PolicyTypeItems.data.find(
      (item) => item?.name === selectedRule?.type
    ),
    title: selectedRule.title,
    valueType: getVueType(selectedRule?.type),
    comment: row?.comment,
    from:
      selectedRule?.type === "range"
        ? selectedRule?.value?.split(",")[0]
        : "",
    to:
      selectedRule?.type === "range"
        ? selectedRule?.value?.split(", ")[1]?.trim()
        : "",
    yes:
      selectedRule?.type === "yesNo"
        ? getYesNoValue(selectedRule, "yes", "point")
        : "",
    no:
      selectedRule?.type === "yesNo"
        ? getYesNoValue(selectedRule, "no", "point")
        : "",
    value: !_.includes(
      ["range", "yesNo", "list"],
      selectedRule?.type
    )
      ? selectedRule?.value
      : "",
    ruleComment: selectedRule?.comment,
    yesComment:
      selectedRule?.type === "yesNo"
        ? getYesNoValue(selectedRule, "yes", "comment")
        : "",
    noComment:
      selectedRule?.type === "yesNo"
        ? getYesNoValue(selectedRule, "no", "comment")
        : "",
    countries:
      selectedRule?.type === "list"
        ? FormatJsonCountry(selectedRule?.value)
        : "",
    points: selectedRule?.points,
  };

  return payload;
}


const flattened = [];
/**
 * Flattens the nested questions in the provided array.
 * @param {Array} questions - The array of questions to flatten.
 * @returns {Array} - The flattened array of questions.
 */
const flattenQuestions = (questions) => {
  const flatten = (question) => {
    const existingIndex = flattened.findIndex(item => item.id === question.id);
    if (existingIndex !== -1) {
      flattened.splice(existingIndex, 1); // Remove existing question with the same id
    }
    flattened.push(question);
    if (question.questions && question.questions.length > 0) {
      question.questions.forEach(flatten);
    }
  };


  questions.forEach(flatten);
  return flattened;
};


const helperSingleQuestions = (item) => {

  return {
    title: item?.title,
    type: item?.type,
    placeholder: item?.placeholder,
    parent_question: null,
    parent_question_for:
      item?.type === "yesNo" ? item?.value : "",
    parent_id: item?.parent_id,
    ruleList: item?.rule_list,
    comment: item?.comment,
    id: item?.id,
    policy_id: item?.policy_id,
    listItem: item?.type === "list" ? item?.value : [],
  };

}


const formatParentQuestion = (parentQuestion, item) => {
  if (parentQuestion?.type === "yesNo" || parentQuestion?.type === "list") {
    return item.value
  }
  return ""
}

/**
 * Formats a single question item by setting its parent question and other properties.
 * @param {Object} item - The question item to format.
 * @param {Array} questionsList - The array of questions to search for parent question.
 * @returns {Object} - The formatted question item.
 */
const formatSingleQuestions = (item) => {
  // Find the parent question in the flattened array
  const parentQuestion = item?.parent_id
    ? flattened?.find((question) => question?.id === item?.parent_id)
    : null;
  // Return the formatted question item
  return {
    title: item?.title,
    type: QuestionsTypes.data.find((type) => type?.name === item?.type),
    placeholder: item?.placeholder,
    parent_question: _.isEmpty(parentQuestion) ? null : helperSingleQuestions(parentQuestion),
    parent_question_for: formatParentQuestion(parentQuestion, item),
    parent_id: item?.parent_id,
    ruleList: item?.rule_list,
    comment: item?.comment,
    id: item?.id,
    key: item?.key,
    policy_id: item?.policy_id,
    policy_title: item?.policy_title,
    listItem: item?.type === "list" ? item?.value : [],
  };
};


/**
 * Recursively retrieves and formats child questions for a given array of questions.
 * @param {Array} questions - The array of questions to retrieve child questions for.
 * @returns {Array} - The formatted array of child questions.
 */

const getChildQuestions = (questions) => {
  return questions.map((question) => ({
    ...formatSingleQuestions(question),
    questions: question.questions.length > 0 ? getChildQuestions(question.questions) : [],
  }));
};

/**
 * Formats the question data by setting parent questions and flattening nested questions.
 * @param {Array} questionsList - The array of questions to format.
 * @returns {Array} - The formatted array of questions.
 */

export const formatQuestionData = (questionsList, setAllQuestions) => {
  setAllQuestions([]);
  flattenQuestions(questionsList);
  setAllQuestions(flattened);
  return questionsList.map((item) => ({
    ...formatSingleQuestions(item),
    questions: item.questions.length > 0 ? getChildQuestions(item.questions) : [],
  })).filter((item) => !item.parent_id);
};
