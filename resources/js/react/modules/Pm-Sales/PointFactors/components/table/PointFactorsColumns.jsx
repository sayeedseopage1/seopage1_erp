import _ from "lodash";
import { SalesPointsContainer } from "../Styles/ui/ui";
import Tooltip from "../Tooltip";
import EditIcon from "../Styles/ui/EditIcon";
import Switch from "../../../../../global/Switch";
import { auth } from "../../../PmIncentive/constants";
import { Popover } from "antd";
import { IoInformationCircle } from "react-icons/io5";

export const PointFactorsColumns = [
    {
        id: "title",
        header: "Criteria",
        accessorKey: "title",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <div className="d-flex justify-content-start align-items-center" style={{ width: "260px", flex: "1" }}>
                    <span
                        style={{
                            color: "#000",
                            fontSize: "14px",
                            fontFamily: "Poppins",
                        }}
                        className="py-3"
                    >
                        {data?.title}
                    </span>
                    <span className="ml-2">
                        {data?.description !== null ? (
                            <>
                                <Popover
                                    content={data?.description}
                                    overlayStyle={{
                                        width: "220px"
                                    }}
                                >
                                    <IoInformationCircle size={15} className='informationCircle' />
                                </Popover>
                            </>
                        ) : (
                            ""
                        )}
                    </span>
                </div>
            );
        },
    },
    {
        id: "factors",
        header: "Factors",
        accessorKey: "factors",
        cell: ({ row, table }) => {
            const data = row?.original;
            return (
                <div className="d-flex flex-column justify-content-start align-items-start" style={{ width: "500px" }}>
                    {
                        _.map(data?.factors, (factor) => {
                            const textStyle = {
                                color: "#000",
                                opacity: factor?.status == 0 ? ".25" : "1",
                                fontSize: "14px",
                                fontFamily: "Poppins",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: "500px",
                            };
                            return (
                                <p
                                    key={factor?.id}
                                    style={textStyle}
                                    className="py-3"
                                    title={factor?.title}
                                >
                                    {factor?.title}
                                </p>
                            );
                        })
                    }
                </div>
            );
        },
    },
    {
        id: "points",
        header: "Points",
        accessorKey: "points",
        cell: ({ row, table }) => {
            const data = row?.original;
            const action = table.options.meta;
            return (
                <div className="d-flex flex-column justify-content-start align-items-end">
                    {
                        _.map(data?.factors, (factor) => {
                            const textStyle = {
                                opacity: factor?.status == 0 ? ".25" : "1",
                            };
                            return (
                                <SalesPointsContainer
                                    key={factor?.id}
                                    className="py-3"
                                >
                                    <div className="d-flex align-items-center justify-content-end">
                                        <div style={textStyle}>
                                            <Switch key={factor?.id}>
                                                <Switch.Case condition={factor?.point_type === 1}>
                                                    <p className={`${factor?.points < 0 && 'text-danger'}`} style={{ whiteSpace: "nowrap", }}>
                                                        {factor?.points} {(factor?.points == 1 || factor?.points == -1 || factor?.points == 0) ? 'Point' : 'Points'}
                                                    </p>
                                                </Switch.Case>
                                                <Switch.Case condition={factor?.point_type === 2}>
                                                    <p className={`${factor?.points < 0 && 'text-danger'}`} style={{ whiteSpace: "nowrap", }}>
                                                        {factor?.points}% of the project budget
                                                    </p>
                                                </Switch.Case>
                                            </Switch>
                                        </div>

                                        {
                                            auth?.isHasRolePermission(1) && <div
                                                onClick={() => {
                                                    action.handleEditFactor(
                                                        factor
                                                    );
                                                }}
                                                role="button"
                                            >
                                                <Tooltip
                                                    text={`Edit Factors
                                                    `}
                                                >
                                                    <EditIcon className="cursor-pointer" />
                                                </Tooltip>
                                            </div>
                                        }


                                    </div>
                                </SalesPointsContainer>
                            );
                        })
                    }
                </div>
            );
        },
    },

];
