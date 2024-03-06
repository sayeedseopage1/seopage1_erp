export const SalesRiskAnalysisTableColumns = [
    {
      id: "policy_name",
      header: "Policy Name",
      accessorKey: "policy_name",
      cell: ({row}) => {
        const data = row?.original
        return <span>{data?.title}</span>
      }
    },
    {
      id: "department_name",
      header: "Department Name",
      accessorKey: "department_name",
      cell: ({row}) => {
        const data = row?.original
        return <span>{data?.department?.name}</span>
      }
    },
    {
      id: "policy_rules",
      header: "Policy Rules",
      accessorKey: "policy_rules",
      cell: ({row}) => {
        const data = row?.original
        return <div>
          {data?.ruleList?.map((rule, index) => {
            return <div key={index}>{rule.rule}</div>
          })}
        </div>
      }
    },
    {
      id: "applicable_points",
      header: "Applicable Points",
      accessorKey: "applicable_points",
    },
];
