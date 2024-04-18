import { FormatJsonCountry, getYesNoValue } from "../../helper/countriesFormat";
import MultiSelectShowDropDown from "../MultiSelectShowDropDown";
import Switch from "../Switch";
import Tooltip from "../Tooltip";
import { SalesPointsContainer } from "../ui/Styles/ui";
import "../Styles/salesRiskAnalysisTableColumns.css";

export const SaleRiskAuthorizePolicesModalTableColumns = [
    {
        id: "policy_name",
        header: "Policy Name",
        accessorKey: "policy_name",
        cell: ({ row, table }) => {
            const data = row?.original;
            return (
                <div className="d-flex flex-column">
                    <div className="d-flex align-items-center mb-2">
                        <span
                            style={{
                                color: "#000000",
                                fontSize: "14px",
                                fontFamily: "Poppins",
                            }}
                        >
                            {data?.title}
                        </span>
                        <span className="ml-2">
                            {data?.comment ? (
                                <Tooltip text={data?.comment}>
                                    {" "}
                                    <i className="fa-solid fa-circle-info "></i>
                                </Tooltip>
                            ) : (
                                ""
                            )}
                        </span>
                    </div>
                </div>
            );
        },
    },
    {
        id: "department_name",
        header: "Department Name",
        accessorKey: "department_name",
        cell: ({ row }) => {
            const data = row?.original;
            console.log(data);
            return (
                <div className="d-flex justify-content-center align-items-center">
                    <span
                        style={{
                            color: "#8F8F8F",
                            fontSize: "14px",
                            fontFamily: "Poppins",
                        }}
                    >
                        {data?.department?.name}
                    </span>
                </div>
            );
        },
    },
    {
        id: "policy_key",
        header: "Policy Key",
        accessorKey: "policy_key",
        cell: ({ row, table }) => {
            const policyKeys = table?.options?.meta?.handleSendPolicyType();
            const data = row?.original;
            const policyKey = policyKeys?.data?.find(
                (key) => key.name === data?.key
            );

            return (
                <div className="d-flex justify-content-center align-items-center">
                    <span
                        style={{
                            color: "#8F8F8F",
                            fontSize: "14px",
                            fontFamily: "Poppins",
                        }}
                    >
                        {policyKey?.label}
                    </span>
                </div>
            );
        },
    },
    {
        id: "policy_rules",
        header: "Policy Rules",
        accessorKey: "policy_rules",
        cell: ({ row, table }) => {
            const data = row?.original;
            const action = table?.options?.meta;
            const activeRule = action?.handlerSendActiveRuleOnThisRecord();
            const validPolicyTypes = [
                "lessThan",
                "greaterThan",
                "fixed",
                "range",
            ];

            const getStatus = (id) => {
                let statusData = {
                    status: false,
                    value: "",
                    id: "",
                };
                const findActiveRule = Object.entries(activeRule).find(
                    ([key, value]) => {
                        if (key === id) {
                            statusData = {
                                status: true,
                                value: value,
                                id: id,
                            };
                        } else {
                            statusData = {
                                status: false,
                                value: "",
                                id: "",
                            };
                        }
                    }
                );

                if(activeRule[id]){
                    console.log("inside d")
                }

                return statusData;
            };

            return (
                <div className="d-flex justify-content-center align-items-center flex-column">
                    {data?.ruleList?.map((rule, index) => {
                        console.log(getStatus);
                        return (
                            <Switch key={rule?.id}>
                                <Switch.Case condition={rule?.type === "yesNo"}>
                                    <p
                                        style={{
                                            color: "#8F8F8F",
                                            fontSize: "14px",
                                            fontFamily: "Poppins",
                                        }}
                                        className="py-3 d-flex align-items-center"
                                    >
                                        {rule.title}
                                        <span className="ml-2">
                                            {rule?.comment ? (
                                                <Tooltip text={rule?.comment}>
                                                    {" "}
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
                                            marginLeft: "35px",
                                        }}
                                    >
                                        <li
                                            style={{
                                                listStyle: "disc",
                                                padding: "4px 0",
                                            }}
                                            className="d-flex align-items-center"
                                        >
                                            Yes{" "}
                                            <span className="ml-2">
                                                {getYesNoValue(
                                                    rule,
                                                    "yes",
                                                    "comment"
                                                ) ? (
                                                    <Tooltip
                                                        text={getYesNoValue(
                                                            rule,
                                                            "yes",
                                                            "comment"
                                                        )}
                                                    >
                                                        {" "}
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
                                            className="d-flex align-items-center"
                                        >
                                            No{" "}
                                            <span className="ml-2">
                                                {getYesNoValue(
                                                    rule,
                                                    "no",
                                                    "comment"
                                                ) ? (
                                                    <Tooltip
                                                        text={getYesNoValue(
                                                            rule,
                                                            "no",
                                                            "comment"
                                                        )}
                                                    >
                                                        {" "}
                                                        <i className="fa-solid fa-circle-info"></i>
                                                    </Tooltip>
                                                ) : (
                                                    ""
                                                )}
                                            </span>
                                        </li>
                                    </ul>
                                </Switch.Case>
                                <Switch.Case condition={rule?.type === "list"}>
                                    <div className="d-flex">
                                        <p
                                            style={{
                                                color: "#8F8F8F",
                                                fontSize: "14px",
                                                fontFamily: "Poppins",
                                            }}
                                            className="py-3 mr-2 d-flex align-items-center"
                                        >
                                            <span className="mr-2">
                                                {" "}
                                                {rule.title}
                                            </span>
                                            {rule?.comment ? (
                                                <Tooltip text={rule?.comment}>
                                                    {" "}
                                                    <i className="fa-solid fa-circle-info "></i>
                                                </Tooltip>
                                            ) : (
                                                ""
                                            )}
                                        </p>
                                        <MultiSelectShowDropDown
                                            data={
                                                rule.type === "list"
                                                    ? FormatJsonCountry(
                                                          rule?.value
                                                      )
                                                    : []
                                            }
                                            rowDetails={rule}
                                            multiple
                                            isShow={false}
                                            handleEditCountryList={() => {
                                                action.handleEditCountryList(
                                                    data,
                                                    rule
                                                );
                                            }}
                                        />
                                    </div>
                                </Switch.Case>
                                <Switch.Case
                                    condition={_.includes(
                                        validPolicyTypes,
                                        rule?.type
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
                                        <span className="mr-2">
                                            {rule.title}
                                        </span>
                                        {rule?.comment ? (
                                            <Tooltip text={rule?.comment}>
                                                <i className="fa-solid fa-circle-info"></i>
                                            </Tooltip>
                                        ) : (
                                            ""
                                        )}
                                    </p>
                                </Switch.Case>
                            </Switch>
                        );
                    })}
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

            return (
                <div className="d-flex justify-content-end flex-column align-items-end">
                    {data?.ruleList?.map((rule, index) => {
                        return (
                            <Switch key={rule?.id}>
                                <Switch.Case
                                    condition={
                                        !_.includes(["yesNo"], rule?.type)
                                    }
                                >
                                    <SalesPointsContainer
                                        key={rule?.id}
                                        className="py-3"
                                    ></SalesPointsContainer>
                                </Switch.Case>
                                <Switch.Case
                                    condition={_.includes(
                                        ["yesNo"],
                                        rule?.type
                                    )}
                                >
                                    <div className="d-flex py-3"></div>
                                    <ul>
                                        <li
                                            style={{
                                                padding: "4px 0",
                                            }}
                                            className="d-flex align-items-center justify-content-end"
                                        >
                                            <span
                                                style={{
                                                    marginRight: "10px",
                                                }}
                                            >
                                                {" "}
                                                {getYesNoValue(
                                                    rule,
                                                    "yes",
                                                    "point"
                                                )}
                                            </span>
                                        </li>
                                        <li
                                            style={{
                                                padding: "4px 0",
                                            }}
                                            className="d-flex align-items-center justify-content-end"
                                        >
                                            <span
                                                style={{
                                                    marginRight: "10px",
                                                }}
                                            >
                                                {getYesNoValue(
                                                    rule,
                                                    "no",
                                                    "point"
                                                )}
                                            </span>
                                        </li>
                                    </ul>
                                </Switch.Case>
                            </Switch>
                        );
                    })}
                </div>
            );
        },
    },
];
