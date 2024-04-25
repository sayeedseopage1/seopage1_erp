import _ from "lodash";
import { SalesPointsContainer } from "../Styles/ui/ui";
import Tooltip from "../Tooltip";
import EditIcon from "../Styles/ui/EditIcon";
import Switch from "../../../../../global/Switch";

export const PointFactorsColumns = [
    {
        id: "title",
        header: "Criteria",
        accessorKey: "title",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <div className="d-flex justify-content-start align-items-center" style={{ flex: 1 }}>
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
                        {data?.id === 12 ? (
                            <>
                                <Tooltip text={"lorem ipsum dolor sit amet consectetur adipisicing elit consequuntur officiis temporibus"}>
                                    {" "}
                                    <i style={{
                                        fontSize: "15px",
                                    }} className="fa-solid fa-circle-info "></i>
                                </Tooltip>
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
                // FIXME: this style can be changed
                <div className="d-flex flex-column justify-content-start align-items-start" style={{ width: "450px" }}>
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
                                maxWidth: "450px",
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
                                            // FIXME: this style can be changed
                                                <Switch.Case condition={factor?.point_type === 1}>
                                                    <p className={`${factor?.points < 0 && 'text-danger'}`} style={{ whiteSpace: "nowrap", }}>
                                                        {factor?.points} {(factor?.points == 1 || factor?.points == -1 || factor?.points == 0) ? 'Point' : 'Points'}
                                                    </p>
                                                </Switch.Case>
                                                <Switch.Case condition={factor?.point_type === 2}>
                                                // FIXME: this style can be changed
                                                    <p className={`${factor?.points < 0 && 'text-danger'}`} style={{ whiteSpace: "nowrap", }}>
                                                        {factor?.points}% of the project budget
                                                    </p>
                                                </Switch.Case>
                                            </Switch>
                                        </div>

                                        <div
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
