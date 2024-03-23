export const PolicyTypeItems = {
  label: 'Policy Type',
  emptyOptionsLabel: 'Select Policy Type',
  id: 'policyType',
  data: [
    {
      id: 1,
      label: "Less Than",
      name: "lessThan",
    },
    {
      id: 2,
      label: "Greater Than",
      name: "greaterThan",
    },
    {
      id: 3,
      label: "Fixed",
      name: "fixed",
    },
    {
      id: 4,
      label: "Range",
      name: "range",
    },
    {
      id: 5,
      label: "Yes/No",
      name: "yesNo",
    },
    {
      id: 6,
      label: "List",
      name: "list",
    }
  ]
}

export const PolicyTypeItemValuesType = {
  label: 'Value Type',
  emptyOptionsLabel: 'Select Value Type',
  id: 'valueType',
  data: {
    regularTypes: {
      label: 'Policy Rules Type',
      emptyOptionsLabel: 'Select Policy Rules Type',
      id: 'valueType',
      data: [
        {
          id: 1,
          label: "Percentage",
          name: "percentage"
        },
        {
          id: 2,
          label: "Currency",
          name: "currency"
        },
        {
          id: 3,
          label: "Hourly",
          name: "hourly"
        },
        {
          id: 4,
          label: "Days",
          name: "days"
        }
      ]
    },
    yesNoTypes: {
      label: 'Policy Rules Type',
      emptyOptionsLabel: 'Select Policy Rules Type',
      id: 'valueType',
      data: [
        {
          id: 1,
          label: "Yes",
          name: "yes"
        },
        {
          id: 2,
          label: "No",
          name: "no"
        }
      ]
    },
    listTypes: {
      label: 'Policy Rules Type',
      emptyOptionsLabel: 'Select Policy Rules Type',
      id: 'valueType',
      data: [
        {
          id: 1,
          label: "Countries",
          name: "countries"
        }
      ]
    }
  }
}

export const QuestionsTypes = {
  label: 'Questions Type',
  emptyOptionsLabel: 'Select Answer Type',
  id: 'questionsType',
  data: [
    {
      id: 1,
      label: "Text",
      name: "text"
    },
    {
      id: 2,
      label: "Yes/No",
      name: "yesNo"
    },
    {
      id: 3,
      label: "Numeric",
      name: "numeric"
    },
    {
      id: 4,
      label: "List",
      name: "list"
    },
    {
      id: 5,
      label: "Long Text",
      name: "longText"
    }

  ]
}


export const DummyQuestions = [
  {
    id: 1,
    question: "How many hours of other works will be needed here? Functional works you have input the hours count depending on the difficulties involved",
    type: "text",
    questions: [
      {
        id: 1,
        question: "How many hours of other works will be needed here? Functional works you have input the hours count depending on the difficulties involved",
        type: "text",
        questions: [
          {
            id: 1,
            question: "How many hours of other works will be needed here? Functional works you have input the hours count depending on the difficulties involved",
            type: "text",
            questions: []
          }
        ]
      }
    ]
  },
  {
    id: 2,
    question: "Did the client fund full milestone?",
    type: "yesNo",
    questions: []
  },
  {
    id: 3,
    question: "How many hours of other works will be needed here? Functional works you have input the hours count depending on the difficulties involved",
    type: "numeric",
    questions: []
  },
  {
    id: 4,
    question: "How many hours of other works will be needed here? Functional works you have input the hours count depending on the difficulties involved",
    type: "list",
    value: [
      {
        id: 1,
        name: "A. The client's bank is rejecting his card after creating 2-3 milestones. He will do the rest tomorrow"
      },
      {
        id: 2,
        name: "B. The client is getting error from the system after creating 1-3 milestones. He will try again in a few hours or so"
      },
      {
        id: 3,
        name: "C. The client will create the milestones as we complete the previous milestones work"
      },
      {
        id: 4,
        name: "D. The client doesn't have enough money now. He will create the rest of the milestones next week or after a few days after having money again"
      }
    ],
    questions: []
  },
  {
    id: 5,
    question: "How many hours of other works will be needed here? Functional works you have input the hours count depending on the difficulties involved",
    type: "longText",
    questions: []
  }
]