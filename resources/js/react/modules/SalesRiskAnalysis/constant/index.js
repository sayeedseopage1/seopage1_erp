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



export const DummyHeaderData = {
  project_name: "Design a website for a digital printi",
  person: "Shah Waliullah Shanto",
  deadline: "05 days",
  clients_name: "Patricia F.",
  authorizer: "A.Khalid"
}


export const DummyQuestionsPoints = [
  {
    id: 1,
    policy_id: 1,
    questions: [
      {
        id: 1,
        question: "Do we need to create a homepage",
        answer: "Yes (2:00 Hours)",
        parent_id: null,
      },
      {
        id: 2,
        question: "How many other primary pages do we need to create?",
        answer: "3 pages (2:00 Hours)",
        parent_id: null,
      },
      {
        id: 3,
        question: "How many secondary pages will be there?",
        answer: "2 pages (2:00 Hours)",
        parent_id: null,
      },
      {
        id: 4,
        question: "How many hours of other works will be needed here Functional works you have input the hours count depending on the difficulties involved",
        answer: "3:30 Hours",
        parent_id: null,
      }
    ],
    points: "-01($30/hours)"
  },
  {
    id: 2,
    policy_id: 2,
    questions: [
      {
        id: 1,
        question: "Did the client fund full milestone?",
        answer: "No",
        parent_id: null,
      },
      {
        id: 2,
        question: "What amount of milestone did he create?",
        answer: "$300",
        parent_id: 1,
      },
      {
        id: 3,
        question: "Why did he create xxx% of milestone?",
        answer: "The client's bank is rejecting his card after creating 2-3 milestones. He will do the rest tomorrow",
        parent_id: 1,
      }
    ],
    points: "0"
  },
  {
    id: 3,
    policy_id: 3,
    questions: [
      {
        id: 1,
        question: "Did the client mention anything like he tried to get this done by someone else before and he failed?",
        answer: "Yes",
        parent_id: null,
      },
    ],
    points: "-01"
  },
  {
    id: 4,
    policy_id: 4,
    questions: [
      {
        id: 1,
        question: "Did the client mention anything like he tried to get this  done by someone else before and he failed?",
        answer: "yes",
        parent_id: null,
      },
      {
        id: 2,
        question: "Was it due to the technical challenge",
        answer: "yes",
        parent_id: 1,
      },
      {
        id: 3,
        question: "What did he exactly say?",
        answer: "Clients needs to custom options for shipping",
        parent_id: 1,
      }
    ],
    points: "-01"
  },
  {
    id: 5,
    policy_id: 5,
    questions: [
      {
        id: 1,
        question: "Did the client mention anything like he tried to get this done by someone else before and he failed?",
        answer: "yes",
        parent_id: null,
      },
      {
        id: 2,
        question: "Was it due to the technical challenge",
        answer: "yes",
        parent_id: 1,
      },
      {
        id: 3,
        question: "What did he exactly say?",
        answer: "Clients needs to custom options for shipping",
        parent_id: 1,
      }
    ],
    points: "-01"
  },
  {
    id: 6,
    policy_id: 6,
    questions: [
      {
        id: 1,
        question: "Did the client mention anything like he tried to get this done by someone else before and he failed?",
        answer: "yes",
        parent_id: null,
      },
      {
        id: 2,
        question: "Was it due to the technical challenge",
        answer: "yes",
        parent_id: 1,
      },
      {
        id: 3,
        question: "What did he exactly say?",
        answer: "Clients needs to custom options for shipping",
        parent_id: 1,
      }
    ],
    points: "-01"
  },
  {
    id: 7,
    policy_id: 7,
    questions: [
      {
        id: 1,
        question: "Did the client mention anything like he tried to get this done by someone else before and he failed?",
        answer: "yes",
        parent_id: null,
      },
      {
        id: 2,
        question: "Was it due to the technical challenge",
        answer: "yes",
        parent_id: 1,
      },
      {
        id: 3,
        question: "What did he exactly say?",
        answer: "Clients needs to custom options for shipping",
        parent_id: 1,
      }
    ],
    points: "-01"
  }
]


export const DummyPolicyReportData = {
  data: [
    {
      id: 1,
      client: "Client 1",
      project: "Project 1",
      deal: "Deal 1",
      lead: "Lead 1",
      country: "Country 1",
      award_time: "2022-01-01",
      gained_points: 10,
      status: "Active",
      action: "Action 1"
    },
    {
      id: 2,
      client: "Client 2",
      project: "Project 2",
      deal: "Deal 2",
      lead: "Lead 2",
      country: "Country 2",
      award_time: "2022-01-02",
      gained_points: 20,
      status: "Inactive",
      action: "Action 2"
    },
    {
      id: 3,
      client: "Client 3",
      project: "Project 3",
      deal: "Deal 3",
      lead: "Lead 3",
      country: "Country 3",
      award_time: "2022-01-03",
      gained_points: 30,
      status: "Active",
      action: "Action 3"
    },
    {
      id: 4,
      client: "Client 4",
      project: "Project 4",
      deal: "Deal 4",
      lead: "Lead 4",
      country: "Country 4",
      award_time: "2022-01-04",
      gained_points: 40,
      status: "Inactive",
      action: "Action 4"
    },
    {
      id: 5,
      client: "Client 5",
      project: "Project 5",
      deal: "Deal 5",
      lead: "Lead 5",
      country: "Country 5",
      award_time: "2022-01-05",
      gained_points: 50,
      status: "Active",
      action: "Action 5"
    },
    {
      id: 6,
      client: "Client 6",
      project: "Project 6",
      deal: "Deal 6",
      lead: "Lead 6",
      country: "Country 6",
      award_time: "2022-01-06",
      gained_points: 60,
      status: "Inactive",
      action: "Action 6"
    },
    {
      id: 7,
      client: "Client 7",
      project: "Project 7",
      deal: "Deal 7",
      lead: "Lead 7",
      country: "Country 7",
      award_time: "2022-01-07",
      gained_points: 70,
      status: "Active",
      action: "Action 7"
    },
    {
      id: 8,
      client: "Client 8",
      project: "Project 8",
      deal: "Deal 8",
      lead: "Lead 8",
      country: "Country 8",
      award_time: "2022-01-08",
      gained_points: 80,
      status: "Inactive",
      action: "Action 8"
    },
    {
      id: 9,
      client: "Client 9",
      project: "Project 9",
      deal: "Deal 9",
      lead: "Lead 9",
      country: "Country 9",
      award_time: "2022-01-09",
      gained_points: 90,
      status: "Active",
      action: "Action 9"
    },
    {
      id: 10,
      client: "Client 10",
      project: "Project 10",
      deal: "Deal 10",
      lead: "Lead 10",
      country: "Country 10",
      award_time: "2022-01-10",
      gained_points: 100,
      status: "Inactive",
      action: "Action 10"
    }
  ]
}
