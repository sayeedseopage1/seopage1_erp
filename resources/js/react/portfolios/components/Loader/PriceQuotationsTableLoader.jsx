import _ from "lodash";
import PropTypes from "prop-types";
import { Placeholder } from "../../../global/Placeholder";

// Components - Placeholder
const PriceQuotationsTableLoader = ({ prevItemLength = 10, tableCol }) => {
    const updateItemLength = prevItemLength === 0 ? 10 : prevItemLength;
    return _.times(updateItemLength, (item) => (
        <tr key={item} className="sp1_price_quotation_tr">
            <td className="sp1_price_quotation_td pl-2">
                <div className="d-flex align-items-center">
                    <Placeholder
                        width="30px"
                        height="30px"
                        type="circle"
                        className="mb-0"
                    />
                    <Placeholder width="80px" height="13px" className="ml-1" />
                </div>
            </td>
            <td className="sp1_price_quotation_td">
                <div className="d-flex justify-content-center align-items-start flex-column">
                    <Placeholder width="80px" height="13px" className="mb-1" />
                    <Placeholder width="50px" height="13px" />
                </div>
            </td>
            <td className="sp1_price_quotation_td">
                <div className="d-flex align-items-center">
                    <Placeholder
                        width="30px"
                        height="30px"
                        type="circle"
                        className="mb-0"
                    />
                    <Placeholder width="80px" height="13px" className="ml-1" />
                </div>
            </td>
            <td className="sp1_price_quotation_td">
                <div className="d-flex align-items-center justify-content-center">
                    <Placeholder width="80px" height="13px" className="my-3" />
                </div>
            </td>
            <td className="sp1_price_quotation_td pr-3">
                <div className="d-flex align-items-center justify-content-center">
                    <Placeholder width="80px" height="13px" className="my-3" />
                </div>
            </td>
            <td className="sp1_price_quotation_td pr-3">
                <div className="d-flex align-items-center justify-content-center">
                    <Placeholder width="80px" height="13px" className="my-3" />
                </div>
            </td>
            <td className="sp1_price_quotation_td pr-3">
                <div className="d-flex align-items-center justify-content-center">
                    <Placeholder width="80px" height="13px" className="my-3" />
                </div>
            </td>
            <td className="sp1_price_quotation_td pr-3">
                <div className="d-flex align-items-center justify-content-center">
                    <Placeholder width="80px" height="13px" className="my-3" />
                </div>
            </td>
            <td className="sp1_price_quotation_td pr-3">
                <div className="d-flex align-items-center justify-content-center">
                    <Placeholder width="80px" height="13px" className="my-3" />
                </div>
            </td>
        </tr>
    ));
};

export default PriceQuotationsTableLoader;

PriceQuotationsTableLoader.propTypes = {
    prevItemLength: PropTypes.number,
    tableCol: PropTypes.number,
};
