import _ from "lodash";
import PropTypes from "prop-types";
import { Placeholder } from "../../../../global/Placeholder";
import { useAuth } from "../../../../hooks/useAuth";
import Switch from "../Switch";

export default function SalesRiskAuthorizeTableLoader({
    prevItemLength = 5
}) {
    const updateItemLength = prevItemLength === 0 ? 8 : prevItemLength;
    const auth = useAuth();
    return _.times(updateItemLength, (item) => (
        <Switch>
            <Switch.Case condition={auth.getRoleId() === 1}>
                <tr key={item} className="sp1_tasks_tr">
                    <td className="sp1_tasks_td pr-3">
                        <div className="d-flex justify-content-end flex-column align-items-start">
                            <Placeholder
                                width="90px"
                                height="15px"
                                className="my-3"
                            />
                            <Placeholder
                                width="90px"
                                height="15px"
                                className="my-3"
                            />
                            <Placeholder
                                width="90px"
                                height="15px"
                                className="my-3"
                            />
                        </div>
                    </td>
                    <td className="sp1_tasks_td">
                        <div className="d-flex justify-content-center flex-column align-items-center">
                            <Placeholder
                                width="80px"
                                height="15px"
                                className="my-3"
                            />
                            <Placeholder
                                width="80px"
                                height="15px"
                                className="my-3"
                            />
                            <Placeholder
                                width="80px"
                                height="15px"
                                className="my-3"
                            />
                        </div>
                    </td>
                    <td className="sp1_tasks_td pl-2">
                        <div className="d-flex justify-content-end flex-column align-items-end mr-2">
                            <Placeholder
                                width="30px"
                                height="15px"
                                className="mb-1"
                            />
                        </div>
                    </td>
                </tr>
            </Switch.Case>
            <Switch.Case condition={auth.getRoleId() === 8}>
                <tr key={item} className="sp1_tasks_tr">
                    <td className="sp1_tasks_td pr-3">
                        <div className="d-flex justify-content-end flex-column align-items-start">
                            <Placeholder
                                width="90px"
                                height="15px"
                                className="my-3"
                            />
                        </div>
                    </td>
                    <td className="sp1_tasks_td pl-2">
                        <div className="d-flex justify-content-end flex-column align-items-end mr-2">
                            <Placeholder
                                width="50px"
                                height="15px"
                                className="mb-1"
                            />
                        </div>
                    </td>
                </tr>
            </Switch.Case>
        </Switch>
    ));
}

SalesRiskAuthorizeTableLoader.propTypes = {
    prevItemLength: PropTypes.number
};
