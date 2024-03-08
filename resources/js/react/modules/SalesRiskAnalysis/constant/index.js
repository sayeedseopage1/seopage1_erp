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
      id: 'rulesType',
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
      id: 'rulesType',
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
      id: 'rulesType',
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