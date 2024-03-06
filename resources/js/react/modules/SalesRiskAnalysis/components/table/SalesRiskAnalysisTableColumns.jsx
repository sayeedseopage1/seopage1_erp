import EditIcon from "../ui/EditIcon";
import { SalesPointsContainer } from "../ui/Styles/ui";

export const SalesRiskAnalysisTableColumns = [
    {
      id: "policy_name",
      header: "Policy Name",
      accessorKey: "policy_name",
      cell: ({row}) => {
        const data = row?.original
        return (
          <span 
            style={{
              color: "#000000",
              fontSize: "14px",
              fontFamily: "Poppins",
            }}
          >
            {data?.title}
          </span>
        )
      }
    },
    {
      id: "department_name",
      header: "Department Name",
      accessorKey: "department_name",
      cell: ({row}) => {
        const data = row?.original
        return (
          <div 
            className="d-flex justify-content-center align-items-center"
          > 
            <span  
              style={{
                color: "#8F8F8F",
                fontSize: "14px",
                fontFamily: "Poppins",
              }}
            >
              {data?.department?.name}
            </span>
          </div>
        )
      }
    },
    {
      id: "policy_rules",
      header: "Policy Rules",
      accessorKey: "policy_rules",
      cell: ({row}) => {
        const data = row?.original
        return (
          <div 
            className="d-flex justify-content-center align-items-center flex-column"
          >
            {
              data?.ruleList?.map((rule, index) => {
                return (
                  <p 
                    style={{
                      color: "#8F8F8F",
                      fontSize: "14px",
                      fontFamily: "Poppins",
                    }} 
                    className="py-3" 
                    key={rule?.id}
                  >
                    {rule.title}
                  </p>
                )
              })
            }
          </div>
        )
      }
    },
    {
      id: "applicable_points",
      header: "Applicable Points",
      accessorKey: "applicable_points",
      cell: ({row}) => {
        const data = row?.original
        return (
          <div 
            className="d-flex justify-content-end flex-column align-items-end"
          >
            {
              data?.ruleList?.map((rule, index) => {
                return ( 
                  <SalesPointsContainer  
                    key={rule?.id}
                    className="py-3"
                  > 
                   <p>{rule?.point}</p> 
                   <div><EditIcon/></div>
                  </SalesPointsContainer>)
              })
            }
          </div>
        )
      }
    },
];
