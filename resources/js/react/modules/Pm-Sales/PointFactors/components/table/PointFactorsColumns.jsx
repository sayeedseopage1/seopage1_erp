import _ from "lodash";
import { SalesPointsContainer } from "../Styles/ui/ui";
import Tooltip from "../Tooltip";
import EditIcon from "../Styles/ui/EditIcon";

export const PointFactorsColumns = [
    {
        id: "title",
        header: "Criteria",
        accessorKey: "title",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <div className="d-flex justify-content-start align-items-center">
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
                <div className="d-flex flex-column justify-content-start align-items-start">
                    {
                        _.map(data?.factors, (factor) => {
                            return (
                                <p
                                    key={factor?.id}
                                    style={{
                                        color: "#000",
                                        fontSize: "14px",
                                        fontFamily: "Poppins",
                                    }}
                                    className="py-3"
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
                <div className="d-flex justify-content-end flex-column align-items-end">
                    {
                        _.map(data?.factors, (factor) => {
                            return (
                                <SalesPointsContainer
                                    key={factor?.id}
                                    className="py-3"
                                >
                                    <div className="d-flex align-items-center justify-content-end">
                                        <p>{factor?.points}</p>
                                        <div
                                            onClick={() => {
                                                action.handleEditFactor(
                                                    factor?.id
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
