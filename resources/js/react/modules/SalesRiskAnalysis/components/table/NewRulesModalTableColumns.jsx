import _ from "lodash";
import Switch from "../Switch";
import EditIcon from "../ui/EditIcon";

// ui components
import Tooltip from "../Tooltip";
import MultiSelectShowDropDown from "../MultiSelectShowDropDown";
import { SalesPointsContainer } from "../ui/Styles/ui";

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
                                data?.policyType?.name
                            )}
                        >
                            <p
                                style={{
                                    color: "#8F8F8F",
                                    fontSize: "14px",
                                    fontFamily: "Poppins",
                                }}
                                className="py-3 d-flex align-items-center"
                            >
                                {data.title}
                                <span className="ml-2">
                                    {" "}
                                    {data?.ruleComment ? (
                                        <Tooltip text={data?.ruleComment}>
                                            <i className="fa-solid fa-circle-info"></i>
                                        </Tooltip>
                                    ) : (
                                        ""
                                    )}
                                </span>
                            </p>
                        </Switch.Case>
                        <Switch.Case
                            condition={data?.policyType?.name === "yesNo"}
                        >
                            <p
                                style={{
                                    color: "#8F8F8F",
                                    fontSize: "14px",
                                    fontFamily: "Poppins",
                                }}
                                className="py-3 d-flex align-items-center"
                            >
                                {data.title}
                                <span className="ml-2">
                                    {data?.ruleComment ? (
                                        <Tooltip text={data?.ruleComment}>
                                            <i className="fa-solid fa-circle-info"></i>
                                        </Tooltip>
                                    ) : (
                                        ""
                                    )}
                                </span>
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
                                    <span className="ml-2">
                                        {data?.yesComment ? (
                                            <Tooltip text={data?.yesComment}>
                                                <i className="fa-solid fa-circle-info"></i>
                                            </Tooltip>
                                        ) : (
                                            ""
                                        )}
                                    </span>
                                </li>
                                <li
                                    style={{
                                        listStyle: "disc",
                                        padding: "4px 0",
                                    }}
                                    className="d-flex"
                                >
                                    No{" "}
                                    <span className="ml-2">
                                        {data?.noComment ? (
                                            <Tooltip text={data?.noComment}>
                                                <i className="fa-solid fa-circle-info"></i>
                                            </Tooltip>
                                        ) : (
                                            ""
                                        )}
                                    </span>
                                </li>
                            </ul>
                        </Switch.Case>
                        <Switch.Case
                            condition={data?.policyType?.name === "list"}
                        >
                            <div className="d-flex">
                                <p
                                    style={{
                                        color: "#8F8F8F",
                                        fontSize: "14px",
                                        fontFamily: "Poppins",
                                    }}
                                    className="py-3 pr-2 d-flex align-items-center"
                                >
                                    {data.title}
                                    <span className="ml-2">
                                        {data?.ruleComment ? (
                                            <Tooltip text={data?.ruleComment}>
                                                <i className="fa-solid fa-circle-info"></i>
                                            </Tooltip>
                                        ) : (
                                            ""
                                        )}
                                    </span>
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
        header: "Value Type",
        accessorKey: "rules_type",
        cell: ({ row }) => {
            const data = row?.original;
            return (
                <div className="d-flex justify-content-start align-items-start flex-column">
                    <Switch.Case condition={data?.policyType?.name !== "yesNo"}>
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
                    <Switch.Case condition={data?.policyType?.name === "yesNo"}>
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
                                data?.policyType?.name
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
                                data?.policyType?.name
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
                            condition={data?.policyType?.name === "yesNo"}
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
                            condition={data?.policyType?.name === "list"}
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
                                <button
                                    onClick={() => {
                                        action.editSingleRules({
                                            ...data,
                                            index: row?.index,
                                        });
                                    }}
                                    className="d-flex bg-transparent border-none"
                                    onKeyDown={() => {
                                        action.editSingleRules({
                                            ...data,
                                            index: row?.index,
                                        });
                                    }}
                                    
                                >
                                    <EditIcon />
                                </button>
                                <button
                                    onClick={() => {
                                        action.deleteSingleRules(data);
                                    }}
                                    onKeyDown={() => {
                                        action.deleteSingleRules(data);
                                    }}
                                    className="d-flex bg-transparent border-none items-center"
                                >
                                    <i
                                        className="fa-solid fa-trash ml-2"
                                        style={{
                                            fontSize: "20px",
                                        }}
                                    ></i>
                                </button>
                            </SalesPointsContainer>
                        </Switch.Case>
                        <Switch.Case
                            condition={data?.policyType?.name === "yesNo"}
                        >
                            <SalesPointsContainer className="py-3 flex-column">
                                <div className="py-3 d-flex">
                                    <button
                                        onClick={() => {
                                            action.editSingleRules(data);
                                        }}
                                        onKeyDown={() => {
                                            action.editSingleRules(data);
                                        }}
                                        className="bg-transparent border-none"
                                    >
                                        <EditIcon />
                                    </button>
                                    <button
                                        onClick={() => {
                                            action.deleteSingleRules(data);
                                        }}
                                        onKeyDown={() => {
                                            action.deleteSingleRules(data);
                                        }}
                                        className="d-flex bg-transparent border-none items-center"
                                    >
                                        <i
                                            className="fa-solid fa-trash ml-2"
                                            style={{
                                                fontSize: "20px",
                                            }}
                                        ></i>
                                    </button>
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
