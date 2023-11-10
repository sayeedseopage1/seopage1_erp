import { User } from "../../../utils/user-details";
import RequiredActionCard_Loader from "./RequiredActionCard_Loader";
<<<<<<< Updated upstream
import RequiredActionsCard_Admin_Expire from "./RoleWiseCard/Admin/RequiredActionsCard_Admin_Expire";
import RequiredActionsCard_Admin_Live from "./RoleWiseCard/Admin/RequiredActionsCard_Admin_Live";
import RequiredActionsCard_Admin_Past from "./RoleWiseCard/Admin/RequiredActionsCard_Admin_Past";
import RequiredActionsCard_Developer_Expire from "./RoleWiseCard/Developer/RequiredActionsCard_Developer_Expire";
import RequiredActionsCard_Developer_Live from "./RoleWiseCard/Developer/RequiredActionsCard_Developer_Live";
import RequiredActionsCard_Developer_Past from "./RoleWiseCard/Developer/RequiredActionsCard_Developer_Past";
import RequiredActionsCard_LeadDev_Expire from "./RoleWiseCard/LeadDeveloper/RequiredActionsCard_LeadDev_Expire";
import RequiredActionsCard_LeadDev_Live from "./RoleWiseCard/LeadDeveloper/RequiredActionsCard_LeadDev_Live";
import RequiredActionsCard_LeadDev_Past from "./RoleWiseCard/LeadDeveloper/RequiredActionsCard_LeadDev_Past";
import RequiredActionsCard_PM_Expire from "./RoleWiseCard/ProjectManager/RequiredActionsCard_PM_Expire";
import RequiredActionsCard_PM_Live from "./RoleWiseCard/ProjectManager/RequiredActionsCard_PM_Live";
import RequiredActionsCard_PM_Past from "./RoleWiseCard/ProjectManager/RequiredActionsCard_PM_Past";
import RequiredActionsCard_TeamLead_Expire from "./RoleWiseCard/TeamLead/RequiredActionsCard_TeamLead_Expire";
import RequiredActionsCard_TeamLead_Live from "./RoleWiseCard/TeamLead/RequiredActionsCard_TeamLead_Live";
import RequiredActionsCard_TeamLead_Past from "./RoleWiseCard/TeamLead/RequiredActionsCard_TeamLead_Past";

const currentUser = new User(window.Laravel.user);

export default function RequiredActionsCard({ data, status }) {
    const handleCard = (role) => {
        switch (role) {
            case 1: // management or admin
                if (status === "live") {
                    return <RequiredActionsCard_Admin_Live data={data} />;
                } else if (status === "expire") {
                    return <RequiredActionsCard_Admin_Expire data={data} />;
                } else {
                    return <RequiredActionsCard_Admin_Past data={data} />;
                }

            case 8: // team lead
                if (status === "live") {
                    return <RequiredActionsCard_TeamLead_Live data={data} />;
                } else if (status === "expire") {
                    return <RequiredActionsCard_TeamLead_Expire data={data} />;
                } else {
                    return <RequiredActionsCard_TeamLead_Past data={data} />;
                }

            //   case 8: // sales lead

            case 4: // project manager
                if (status === "live") {
                    return <RequiredActionsCard_PM_Live data={data} />;
                } else if (status === "expire") {
                    return <RequiredActionsCard_PM_Expire data={data} />;
                } else {
                    return <RequiredActionsCard_PM_Past data={data} />;
                }

            case 6: // lead developer
                if (status === "live") {
                    return <RequiredActionsCard_LeadDev_Live data={data} />;
                } else if (status === "expire") {
                    return <RequiredActionsCard_LeadDev_Expire data={data} />;
                } else {
                    return <RequiredActionsCard_LeadDev_Past data={data} />;
                }

            case 5: // developer
                if (status === "live") {
                    return <RequiredActionsCard_Developer_Live data={data} />;
                } else if (status === "expire") {
                    return <RequiredActionsCard_Developer_Expire data={data} />;
                } else {
                    return <RequiredActionsCard_Developer_Past data={data} />;
                }

            default:
                return;
        }
    };

    return handleCard(currentUser.roleId);
=======
import RequiredActionsCard_Admin from "./RequiredActionsCard_Admin";
import RequiredActionsCard_Dev from "./RequiredActionsCard_Dev";
import RequiredActionsCard_Lead_Dev from "./RequiredActionsCard_Lead_Dev";
import RequiredActionsCard_PM from "./RequiredActionsCard_PM";
import RequiredActionsCard_Sales_Executive from "./RequiredActionsCard_Sales_Executive";
import RequiredActionsCard_Sales_Lead from "./RequiredActionsCard_Sales_Lead";

const currentUser = new User(window.Laravel.user);

export default function RequiredActionsCard({ data , temp=true }) {
    
  const handleCard = (role)=>{
    switch (role) {
      case 1: // management or admin
        return <RequiredActionsCard_Admin data={data} temp={temp} />
        // return <RequiredActionCard_Loader temp={temp} />
      
      case 8: // team lead
        return <RequiredActionsCard_Admin data={data} temp={temp} />
      
      // case no_role: // sales lead
      //   return <RequiredActionsCard_Sales_Lead data={data} temp={temp} />
      
      case 7: // sales executive
        return <RequiredActionsCard_Sales_Executive data={data} temp={temp} />
      
      case 4: // project manager
        return <RequiredActionsCard_PM data={data} temp={temp} />
      
      case 6: // lead developer
        return <RequiredActionsCard_Lead_Dev data={data} temp={temp} />
      
      case 5: // developer
        return <RequiredActionsCard_Dev data={data} temp={temp} />
    
      default:
        return;
    }
  }

  return handleCard(currentUser.roleId);
>>>>>>> Stashed changes
}

// export default function RequiredActionsCard({ data, temp = true }) {
//     return temp ? (
//         <RequiredActionsCard__Active data={data} />
//     ) : (
//         <RequiredActionsCard__Past data={data} />
//     );
// }
