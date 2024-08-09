import _ from "lodash";
import PropTypes from "prop-types";

// style
import "../table/style/dashboardDataTable.css";

// Components - Placeholder
import { Placeholder } from "../../../global/Placeholder";

const SaleExecutiveDashboardTableLoader = ({
    prevItemLength = 9,
    tableCol = 8,
}) => {
    const updateItemLength = prevItemLength;
    return _.times(updateItemLength, (item) => (
        <tr key={item} className="sp1_dashboard_data_table_tr">
            {_.times(tableCol, (i) => (
                <td key={i} className="sp1_dashboard_data_table_td pl-1">
                    <div className="d-flex align-items-center">
                        <Placeholder
                            width={i === 0 ? "50px" : "80px"}
                            height="18px"
                        />
                    </div>
                </td>
            ))}
        </tr>
    ));
};

export default SaleExecutiveDashboardTableLoader;

SaleExecutiveDashboardTableLoader.propTypes = {
    prevItemLength: PropTypes.number,
    tableCol: PropTypes.number,
};
