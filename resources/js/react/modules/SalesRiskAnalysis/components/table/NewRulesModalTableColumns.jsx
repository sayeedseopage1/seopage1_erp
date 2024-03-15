import _ from "lodash";
import Switch from "../Switch";
import EditIcon from "../ui/EditIcon";
import { SalesPointsContainer } from "../ui/Styles/ui";
import MultiSelectShowDropDown from "../MultiSelectShowDropDown";
import Tooltip from "../Tooltip";

const validPolicyTypes = ["lessThan", "greaterThan", "fixed", "range"];

export const NewRulesModalTableColumnsData = [
    {
        id: "rules_name",
        header: "Rules Name",
        accessorKey: "rules_name",

        cell: ({ row }) => {
            const data = row?.original;
            return (
                <div className="d-flex justify-content-start align-items-start flex-column">
                    <Switch>
                        <Switch.Case
                            condition={_.includes(
                                validPolicyTypes,
                                data?.policyType.name
                            )}
                        >
                            <p
                                style={{
                                    color: "#8F8F8F",
                                    fontSize: "14px",
                                    fontFamily: "Poppins",
                                }}
                                className="py-3 d-flex"
                            >
                                {data.title}

                                {data?.comment ? (
                                    <>
                                        <Tooltip text={data?.comment}>
                                            {" "}
                                            <i class="fa-solid fa-circle-info ml-2"></i>
                                        </Tooltip>
                                    </>
                                ) : (
                                    ""
                                )}
                            </p>
                        </Switch.Case>
                        <Switch.Case
                            condition={data?.policyType.name === "yesNo"}
                        >
                            <p
                                style={{
                                    color: "#8F8F8F",
                                    fontSize: "14px",
                                    fontFamily: "Poppins",
                                }}
                                className="py-3 d-flex"
                            >
                                {data.title}
                                {data?.comment ? (
                                    <>
                                        <Tooltip text={data?.comment}>
                                            {" "}
                                            <i class="fa-solid fa-circle-info ml-2"></i>
                                        </Tooltip>
                                    </>
                                ) : (
                                    ""
                                )}
                            </p>
                            <ul
                                style={{
                                    listStyle: "disc",
                                    padding: "0 1.5rem",
                                }}
                            >
                                <li
                                    style={{
                                        listStyle: "disc",
                                        padding: "4px 0",
                                    }}
                                    className="d-flex"
                                >
                                    Yes{" "}
                                    {data?.yesComment ? (
                                        <>
                                            <Tooltip text={data?.yesComment}>
                                                {" "}
                                                <i class="fa-solid fa-circle-info ml-2"></i>
                                            </Tooltip>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </li>
                                <li
                                    style={{
                                        listStyle: "disc",
                                        padding: "4px 0",
                                    }}
                                    className="d-flex"
                                >
                                    No
                                    {data?.noComment ? (
                                        <>
                                            <Tooltip text={data?.noComment}>
                                                {" "}
                                                <i class="fa-solid fa-circle-info ml-2"></i>
                                            </Tooltip>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </li>
                            </ul>
                        </Switch.Case>
                        <Switch.Case
                            condition={data?.policyType.name === "list"}
                        >
                            <div className="d-flex">
                                <p
                                    style={{
                                        color: "#8F8F8F",
                                        fontSize: "14px",
                                        fontFamily: "Poppins",
                                    }}
                                    className="py-3 pr-2 d-flex"
                                >
                                    {data.title}
                                    {data?.comment ? (
                                        <>
                                            <Tooltip text={data?.comment}>
                                                {" "}
                                                <i class="fa-solid fa-circle-info ml-2"></i>
                                            </Tooltip>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </p>
                                <MultiSelectShowDropDown
                                    data={data?.countries}
                                    multiple
                                />
                            </div>
                        </Switch.Case>
                    </Switch>
                </div>
            );
        },
    },
    {
        id: "rules_type",
        header: "Rules Type",
        accessorKey: "rules_type",
        cell: ({ row }) => {
            const data = row?.original;

            return (
                <div className="d-flex justify-content-start align-items-start flex-column">
                    <Switch.Case condition={data?.policyType.name !== "yesNo"}>
                        <p
                            style={{
                                color: "#8F8F8F",
                                fontSize: "14px",
                                fontFamily: "Poppins",
                            }}
                            className="py-3"
                        >
                            {data?.valueType?.label}
                        </p>
                    </Switch.Case>
                    <Switch.Case condition={data?.policyType.name === "yesNo"}>
                        <div
                            style={{
                                height: "56px",
                                width: "100%",
                            }}
                        />
                        <ul
                            style={{
                                listStyle: "disc",
                                padding: "0 1.5rem",
                            }}
                        >
                            <li
                                style={{
                                    listStyle: "disc",
                                    padding: "4px 0",
                                }}
                            >
                                Not Applicable
                            </li>
                            <li
                                style={{
                                    listStyle: "disc",
                                    padding: "4px 0",
                                }}
                            >
                                Not Applicable
                            </li>
                        </ul>
                    </Switch.Case>
                </div>
            );
        },
    },
    {
        id: "value",
        header: "Value",
        accessorKey: "value",
        cell: ({ row }) => {
            const data = row?.original;

            return (
                <div className="d-flex justify-content-start align-items-start flex-column">
                    <Switch>
                        <Switch.Case
                            condition={_.includes(
                                ["lessThan", "greaterThan", "fixed"],
                                data?.policyType.name
                            )}
                        >
                            <p
                                style={{
                                    color: "#8F8F8F",
                                    fontSize: "14px",
                                    fontFamily: "Poppins",
                                }}
                                className="py-3"
                            >
                                {data.value}
                            </p>
                        </Switch.Case>
                        <Switch.Case
                            condition={_.includes(
                                ["range"],
                                data?.policyType.name
                            )}
                        >
                            <p
                                style={{
                                    color: "#8F8F8F",
                                    fontSize: "14px",
                                    fontFamily: "Poppins",
                                }}
                                className="py-3"
                            >
                                {data.from}-{data.to}
                            </p>
                        </Switch.Case>
                        <Switch.Case
                            condition={data?.policyType.name === "yesNo"}
                        >
                            <div
                                style={{
                                    height: "56px",
                                    width: "100%",
                                }}
                            />
                            <ul
                                style={{
                                    listStyle: "disc",
                                    padding: "0 1.5rem",
                                }}
                            >
                                <li
                                    style={{
                                        listStyle: "disc",
                                        padding: "4px 0",
                                    }}
                                >
                                    Not Applicable
                                </li>
                                <li
                                    style={{
                                        listStyle: "disc",
                                        padding: "4px 0",
                                    }}
                                >
                                    Not Applicable
                                </li>
                            </ul>
                        </Switch.Case>
                        <Switch.Case
                            condition={data?.policyType.name === "list"}
                        >
                            <div className="d-flex">
                                <p
                                    style={{
                                        color: "#8F8F8F",
                                        fontSize: "14px",
                                        fontFamily: "Poppins",
                                    }}
                                    className="py-3 pr-2"
                                >
                                    Not Applicable
                                </p>
                            </div>
                        </Switch.Case>
                    </Switch>
                </div>
            );
        },
    },
    {
        id: "applicable_points",
        header: "Applicable Points",
        accessorKey: "applicable_points",
        cell: ({ row, table }) => {
            const data = row?.original;
            const action = table.options.meta;
            return (
                <div className="d-flex justify-content-end flex-column align-items-end">
                    <Switch>
                        <Switch.Case
                            condition={_.includes(
                                [...validPolicyTypes, "list"],
                                data?.policyType?.name
                            )}
                        >
                            <SalesPointsContainer className="py-3">
                                <p>{data?.points}</p>
                                <div
                                    onClick={() => {
                                        action.editSingleRules(data);
                                    }}
                                    className=" d-flex"
                                    role="button"
                                >
                                    <EditIcon />
                                </div>
                                <div
                                    onClick={() => {
                                        action.deleteSingleRules(data);
                                    }}
                                >
                                    <i
                                        className="fa-solid fa-trash ml-2"
                                        style={{
                                            fontSize: "20px",
                                        }}
                                    ></i>
                                </div>
                            </SalesPointsContainer>
                        </Switch.Case>
                        <Switch.Case
                            condition={data?.policyType?.name === "yesNo"}
                        >
                            <SalesPointsContainer className="py-3 flex-column">
                                <div className="py-3 d-flex">
                                    <div
                                        onClick={() => {
                                            action.editSingleRules(data);
                                        }}
                                        role="button"
                                    >
                                        <EditIcon />
                                    </div>
                                    <div
                                        onClick={() => {
                                            action.deleteSingleRules(data);
                                        }}
                                    >
                                        <i
                                            className="fa-solid fa-trash ml-2"
                                            style={{
                                                fontSize: "20px",
                                            }}
                                        ></i>
                                    </div>
                                </div>
                                <ul>
                                    <li
                                        style={{
                                            padding: "4px 0",
                                        }}
                                    >
                                        {data?.yes}
                                    </li>
                                    <li
                                        style={{
                                            padding: "4px 0",
                                        }}
                                    >
                                        {data?.no}
                                    </li>
                                </ul>
                            </SalesPointsContainer>
                        </Switch.Case>
                    </Switch>
                </div>
            );
        },
    },
];
