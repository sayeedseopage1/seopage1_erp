import { User } from "../../../utils/user-details";
import RequiredActionsCard__Active from "./ActionWiseCard/RequiredActionsCard__Active";
import RequiredActionsCard__Past from "./ActionWiseCard/RequiredActionsCard__Past";
import RequiredActionCard_Loader from "./RequiredActionCard_Loader";
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
import RequiredActionsCard_UI_Expire from "./RoleWiseCard/UI-Graphics/RequiredActionsCard_UI_Expire";
import RequiredActionsCard_UI_Live from "./RoleWiseCard/UI-Graphics/RequiredActionsCard_UI_Live";
import RequiredActionsCard_UI_Past from "./RoleWiseCard/UI-Graphics/RequiredActionsCard_UI_Past";

// const currentUser = new User(window.Laravel.user);

export default function RequiredActionsCard({ role, data, status }) {
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

            case 8: // team lead / sales lead
                if (status === "live") {
                    return <RequiredActionsCard_TeamLead_Live data={data} />;
                } else if (status === "expire") {
                    return <RequiredActionsCard_TeamLead_Expire data={data} />;
                } else {
                    return <RequiredActionsCard_TeamLead_Past data={data} />;
                }

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

            case 9: // ui/ux
                if (status === "live") {
                    return <RequiredActionsCard_UI_Live data={data} />;
                } else if (status === "expire") {
                    return <RequiredActionsCard_UI_Expire data={data} />;
                } else {
                    return <RequiredActionsCard_UI_Past data={data} />;
                }

            case 10: // graphics
                if (status === "live") {
                    return <RequiredActionsCard_UI_Live data={data} />;
                } else if (status === "expire") {
                    return <RequiredActionsCard_UI_Expire data={data} />;
                } else {
                    return <RequiredActionsCard_UI_Past data={data} />;
                }

            default:
                return;
        }
    };

    return handleCard(role);
}

// export default function RequiredActionsCard({ data, temp = true }) {
//     return temp ? (
//         <RequiredActionsCard__Active data={data} />
//     ) : (
//         <RequiredActionsCard__Past data={data} />
//     );
// }
