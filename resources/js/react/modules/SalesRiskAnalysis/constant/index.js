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
    comment: "This is a text comment",
    placeholder: "Please Enter Text",
    parent_id: null,
    questions: [
      {
        id: 2,
        question: "How many hours of other works will be needed here? Functional works you have input the hours count depending on the difficulties involved",
        type: "numeric",
        comment: "This is a text comment",
        placeholder: "Please Enter Number",
        parent_id: 1,
        questions: [
          {
            id: 3,
            question: "How many hours of other works will be needed here? Functional works you have input the hours count depending on the difficulties involved",
            type: "text",
            questions: [],
            parent_id: 2,
            placeholder: "Please Enter Text",
            comment: "This is a text comment"
          }
        ]
      }
    ]
  },
  {
    id: 4,
    question: "Did the client fund full milestone?",
    type: "yesNo",
    placeholder: "Please select yes or no",
    parent_id: null,
    questions: [
      {
        id: 5,
        question: "Yes How many hours of other works will be needed here? Functional works you have input the hours count depending on the difficulties involved",
        type: "text",
        value: "yes",
        parent_id: 4,
        placeholder: "Please Enter Text",
        questions: [
          {
            id: 6,
            question: "How many hours of other works will be needed here? Functional works you have input the hours count depending on the difficulties involved",
            type: "list",
            parent_id: 5,
            placeholder: "Please select from list",
            value: [
              {
                id: 1,
                name: "The client's bank is rejecting his card after creating 2-3 milestones. He will do the rest tomorrow"
              },
              {
                id: 2,
                name: "The client is getting error from the system after creating 1-3 milestones. He will try again in a few hours or so"
              },
              {
                id: 3,
                name: "The client will create the milestones as we complete the previous milestones work"
              },
              {
                id: 4,
                name: "The client doesn't have enough money now. He will create the rest of the milestones next week or after a few days after having money again"
              }
            ],
            questions: [
              {
                id: 7,
                question: "3 How many hours of other works will be needed here? Functional works you have input the hours count depending on the difficulties involved",
                type: "text",
                placeholder: "Please Enter Text",
                value: 3,
                parent_id: 6,
                questions: [],
                comment: "This is a text comment"
              }, {
                id: 8,
                question: "2 How many hours of other works will be needed here? Functional works you have input the hours count depending on the difficulties involved",
                type: "text",
                placeholder: "Please Enter Text",
                value: 2,
                questions: [],
                parent_id: 6,
                comment: "This is a text comment"
              }, {
                id: 9,
                question: "1 How many hours of other works will be needed here? Functional works you have input the hours count depending on the difficulties involved",
                type: "text",
                parent_id: 6,
                placeholder: "Please Enter Text",
                value: 1,
                questions: [],
                comment: "This is a text comment"
              }
            ],
            comment: "This is a text comment"
          }
        ],
        comment: "This is a text comment"
      },
      {
        id: 10,
        question: "No How many hours of other works will be needed here? Functional works you have input the hours count depending on the difficulties involved",
        type: "text",
        parent_id: 4,
        placeholder: "Please Enter Text",
        value: "no",
        questions: [
          {
            id: 11,
            question: "How many hours of other works will be needed here? Functional works you have input the hours count depending on the difficulties involved",
            type: "longText",
            parent_id: 10,
            placeholder: 'Describe Here',
            questions: [],
            comment: "This is a text comment"
          }
        ],
        comment: "This is a text comment"
      }
    ],
    comment: "This is a yes no comment"
  },
  {
    id: 12,
    question: "How many hours of other works will be needed here? Functional works you have input the hours count depending on the difficulties involved",
    type: "numeric",
    parent_id: null,
    placeholder: "Please enter number",
    comment: "This is a numeric comment",
    questions: [
      {
        id: 20,
        question: "How many hours of other works will be needed here? Functional works you have input the hours count depending on the difficulties involved",
        type: "text",
        questions: [],
        parent_id: 12,
        placeholder: "Please Enter Text",
        comment: "This is a text comment"
      }
    ]
  },
  {
    id: 13,
    question: "How many hours of other works will be needed here? Functional works you have input the hours count depending on the difficulties involved",
    type: "list",
    parent_id: null,
    placeholder: "Please select from list",
    value: [
      {
        id: 1,
        name: "The client's bank is rejecting his card after creating 2-3 milestones. He will do the rest tomorrow"
      },
      {
        id: 2,
        name: "The client is getting error from the system after creating 1-3 milestones. He will try again in a few hours or so"
      },
      {
        id: 3,
        name: "The client will create the milestones as we complete the previous milestones work"
      },
      {
        id: 4,
        name: "The client doesn't have enough money now. He will create the rest of the milestones next week or after a few days after having money again"
      }
    ],
    questions: [
      {
        id: 14,
        question: "3 How many hours of other works will be needed here? Functional works you have input the hours count depending on the difficulties involved",
        type: "text",
        parent_id: 13,
        placeholder: "Please Enter Text",
        value: 3,
        questions: [],
        comment: "This is a text comment"
      }, {
        id: 15,
        question: "2 How many hours of other works will be needed here? Functional works you have input the hours count depending on the difficulties involved",
        type: "text",
        parent_id: 13,
        placeholder: "Please Enter Text",
        value: 2,
        questions: [],
        comment: "This is a text comment"
      }, {
        id: 16,
        question: "1 How many hours of other works will be needed here? Functional works you have input the hours count depending on the difficulties involved",
        type: "text",
        parent_id: 13,
        placeholder: "Please Enter Text",
        value: 1,
        questions: [],
        comment: "This is a text comment"
      }
    ],
    comment: "This is a list comment"
  },
  {
    id: 17,
    question: "How many hours of other works will be needed here? Functional works you have input the hours count depending on the difficulties involved",
    type: "longText",
    placeholder: 'Describe Here',
    parent_id: null,
    questions: [
      {
        id: 18,
        question: "Did the client fund full milestone?",
        type: "yesNo",
        parent_id: 17,
        comment: "This is a yes no comment",
        questions: []
      }
    ],
    comment: "This is a long text comment"
  }
]
