import _ from "lodash";
import PropTypes from "prop-types";

// style
import "../table/style/dashboardDataTable.css";

// Components - Placeholder
import { Placeholder } from "../../../global/Placeholder";


const LeadDashboardModalTableLoader = ({ prevItemLength = 10, tableCol }) => {
    const updateItemLength = prevItemLength === 0 ? 10 : prevItemLength;
    return _.times(updateItemLength, (item) => (
      <tr key={item} className="sp1_dashboard_data_table_tr">
           <td className="sp1_dashboard_data_table_td pl-1">
                <div className="d-flex align-items-center">
                    <Placeholder width="50px" height="18px" />
                </div>
            </td>
           <td className="sp1_dashboard_data_table_td">
                <div className="d-flex justify-content-center flex-column">
                    <Placeholder width="80px" height="18px" />
                </div>
            </td>
           <td className="sp1_dashboard_data_table_td">
                <div className="d-flex align-items-center">
                    <Placeholder width="80px" height="18px" />
                </div>
            </td>
           <td className="sp1_dashboard_data_table_td">
                <div className="d-flex align-items-center">
                    <Placeholder width="80px" height="18px" />
                </div>
            </td>
           <td className="sp1_dashboard_data_table_td">
                <div className="d-flex align-items-center">
                    <Placeholder width="80px" height="18px" />
                </div>
            </td>
           <td className="sp1_dashboard_data_table_td">
                <div className="d-flex align-items-center">
                    <Placeholder width="80px" height="18px" />
                </div>
            </td>
           <td className="sp1_dashboard_data_table_td">
                <div className="d-flex align-items-center">
                    <Placeholder width="80px" height="18px" />
                </div>
            </td>
           <td className="sp1_dashboard_data_table_td">
                <div className="d-flex align-items-center">
                    <Placeholder width="80px" height="18px" />
                </div>
            </td>
        </tr>
    ));
};

export default LeadDashboardModalTableLoader;

LeadDashboardModalTableLoader.propTypes = {
    prevItemLength: PropTypes.number,
    tableCol: PropTypes.number,
};