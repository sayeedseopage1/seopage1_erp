import { CalendarOneDayIcon } from "../Icons/CalenderOneDayIcon";
import ForecastIcon from "../Icons/ForecastIcon";
import { USDCircle } from "../Icons/USDCircle";
import { LeadIcon } from "../Icons/LeadIcon";
import  GoalIcon  from "../Icons/GoalIcon";
import PropTypes from 'prop-types';
import { MoveIcon } from "../Icons/MoveIcon";
import ResizeCorner from "../Icons/ResizeCorner";
import { SettingGearIcon } from "../Icons/SettingGearIcon";
import { EmptyTableData } from "../Icons/EmptyTableIcon";

export const Icon = ({type, className=""}) => {
    switch(type) {
        case 'Deal':
            return <USDCircle className={className} />
        case 'Activity':
            return <CalendarOneDayIcon className={className} />
        case 'Lead':
            return <LeadIcon className={className} />
        case 'Goal': 
            return <GoalIcon className={className} />
        case 'Forecast':
            return <ForecastIcon className={className} />
        case 'Move':
            return <MoveIcon className={className} />
        case 'Resize':
            return <ResizeCorner className={className} />
        case 'Setting':
            return <SettingGearIcon className={className} />
        case 'EmptyTable':
            return <EmptyTableData className={className} />
        default:
            return null;
    }
}


Icon.propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
}
