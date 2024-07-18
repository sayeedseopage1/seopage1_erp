import _ from "lodash";
import PropTypes from "prop-types";

// Components - Placeholder
import { Placeholder } from "../../../../../global/Placeholder";

const AccountListTableLoader = ({ prevItemLength = 10, tableCol }) => {
    const updateItemLength = prevItemLength === 0 ? 10 : prevItemLength;
    return _.times(updateItemLength, (item) => (
        <tr key={item} className="sp1_price_quotation_tr">
            <td className="sp1_price_quotation_td px-2">
                <div className="d-flex align-items-center">
                    <Placeholder width="80px" height="13px" />
                </div>
            </td>
            <td className="sp1_price_quotation_td px-2">
                <div className="d-flex justify-content-center flex-column">
                    <Placeholder width="80px" height="13px" />
                </div>
            </td>
            <td className="sp1_price_quotation_td px-2">
                <div className="d-flex justify-content-center flex-column">
                    <Placeholder width="80px" height="13px" />
                </div>
            </td>
            <td className="sp1_price_quotation_td px-2">
                <div className="d-flex align-items-center">
                    <Placeholder width="80px" height="13px" />
                </div>
            </td>
            <td className="sp1_price_quotation_td px-2">
                <div className="d-flex align-items-center">
                    <Placeholder width="80px" height="13px" />
                </div>
            </td>
            <td className="sp1_price_quotation_td px-2">
                <div className="d-flex align-items-center justify-content-center">
                    <Placeholder width="80px" height="13px" />
                </div>
            </td>
            <td className="sp1_price_quotation_td px-2">
                <div className="d-flex align-items-center justify-content-center">
                    <Placeholder width="80px" height="13px" />
                </div>
            </td>
            <td className="sp1_price_quotation_td px-2">
                <div className="d-flex align-items-center justify-content-center">
                    <Placeholder width="80px" height="13px" />
                </div>
            </td>
            <td className="sp1_price_quotation_td px-2">
                <div className="d-flex align-items-center justify-content-center">
                    <Placeholder width="25px" height="25px" />
                    <Placeholder width="25px" height="25px" className="ml-2" />
                </div>
            </td>
        </tr>
    ));
};

export default AccountListTableLoader;

AccountListTableLoader.propTypes = {
    prevItemLength: PropTypes.number,
    tableCol: PropTypes.number,
};
