import { User } from "../../../utils/user-details";
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
}
