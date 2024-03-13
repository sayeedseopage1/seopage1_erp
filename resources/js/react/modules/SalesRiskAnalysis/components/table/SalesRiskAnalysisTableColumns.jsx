import MultiSelectShowDropDown from "../MultiSelectShowDropDown";
import Switch from "../Switch";
import EditIcon from "../ui/EditIcon";
import { SalesPointsContainer } from "../ui/Styles/ui";

export const SalesRiskAnalysisTableColumns = [
    {
        id: "policy_name",
        header: "Policy Name",
        accessorKey: "policy_name",
        cell: ({ row, table }) => {
            const data = row?.original;
            const action = table.options.meta;
            return (
                <div className="d-flex align-items-center">
                    <span
                        style={{
                            color: "#000000",
                            fontSize: "14px",
                            fontFamily: "Poppins",
                        }}
                    >
                        {data?.title}
                    </span>
                    <button
                        onClick={() => {
                            action.handleAddQuestions(data);
                        }}
                        className="btn btn-info ml-4"
                    >
                        Questions
                    </button>
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
        id: "policy_rules",
        header: "Policy Rules",
        accessorKey: "policy_rules",
        cell: ({ row }) => {
            const data = row?.original;
            const countries = data?.ruleList?.find(
                (item) => item?.type === "list"
            );
            let countriesList = [];

            if (countries?.value) {
                const parsedValue = JSON.parse(countries.value);
         
                parsedValue.forEach((obj) => {
                    const iso = Object.keys(obj)[0]; // Extracting the ISO code
                    const name = obj[iso]; // Extracting the country name
                    countriesList.push({
                        name: name.toUpperCase(),
                        niceName: name,
                        iso: iso,
                    });
                });
            }

            const validPolicyTypes = [
                "lessThan",
                "greaterThan",
                "fixed",
                "range",
            ];
            return (
                <div className="d-flex justify-content-center align-items-center flex-column">
                    {data?.ruleList?.map((rule, index) => {
                        return (
                            <Switch>
                                <Switch.Case condition={rule?.type === "yesNo"}>
                                    <p
                                        style={{
                                            color: "#8F8F8F",
                                            fontSize: "14px",
                                            fontFamily: "Poppins",
                                        }}
                                        className="py-3"
                                    >
                                        {rule.title}
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
                                        >
                                            Yes
                                        </li>
                                        <li
                                            style={{
                                                listStyle: "disc",
                                                padding: "4px 0",
                                            }}
                                        >
                                            No
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
                                            className="py-3 mr-2"
                                        >
                                            {rule.title}
                                        </p>
                                        <MultiSelectShowDropDown
                                            data={countriesList}
                                            multiple
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
                                        className="py-3"
                                    >
                                        {rule.title}
                                    </p>
                                </Switch.Case>
                            </Switch>
                        );
                    })}
                    <div className="">
                        <button
                            style={{
                                fontSize: "13px",
                            }}
                            className="btn btn-info"
                        >
                            <i
                                className="fa fa-edit mr-2"
                                aria-hidden="true"
                            ></i>{" "}
                            Edit Policy
                        </button>
                        <button
                            style={{
                                fontSize: "13px",
                            }}
                            className="btn btn-success ml-2"
                        >
                            <i
                                className="fa fa-plus mr-2"
                                aria-hidden="true"
                            ></i>{" "}
                            Add New Rule
                        </button>
                    </div>
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
                    {data?.ruleList?.map((rule, index) => {
                        return (
                            <Switch>
                                <Switch.Case
                                    condition={
                                        !_.includes(["yesNo"], rule?.type)
                                    }
                                >
                                    <SalesPointsContainer
                                        key={rule?.id}
                                        className="py-3"
                                    >
                                        <div className="d-flex align-items-center justify-content-end">
                                            <p>{rule?.point}</p>
                                            <div
                                                onClick={() => {
                                                    action.handleEditApplicablePoint(
                                                        data,
                                                        rule
                                                    );
                                                }}
                                                role="button"
                                            >
                                                <EditIcon />
                                            </div>
                                            <button
                                                className="btn btn-success"
                                                style={{
                                                    fontSize: "12px",
                                                    padding: "3px 12px",
                                                    marginLeft: "10px",
                                                }}
                                                onClick={() => {
                                                    action.handleRuleActions(
                                                        rule,
                                                        data
                                                    );
                                                }}
                                            >
                                                Enable
                                            </button>
                                        </div>
                                    </SalesPointsContainer>
                                </Switch.Case>
                                <Switch.Case
                                    condition={_.includes(
                                        ["yesNo"],
                                        rule?.type
                                    )}
                                >
                                    <div className="d-flex justify-content-start align-items-start flex-column">
                                        <div
                                            style={{
                                                height: "40px",
                                                width: "100%",
                                            }}
                                        />
                                        <SalesPointsContainer key={rule?.id}>
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
                                                        {
                                                            rule?.value?.split(
                                                                ","
                                                            )[0]
                                                        }
                                                    </span>
                                                    <div
                                                        onClick={() => {
                                                            action.handleEditApplicablePoint(
                                                                data,
                                                                rule,
                                                                "yes"
                                                            );
                                                        }}
                                                        role="button"
                                                    >
                                                        <EditIcon />
                                                    </div>
                                                    <button
                                                        className="btn btn-success"
                                                        style={{
                                                            fontSize: "12px",
                                                            padding: "3px 12px",
                                                            marginLeft: "10px",
                                                        }}
                                                        onClick={() => {
                                                            action.handleRuleActions(
                                                                rule,
                                                                data,
                                                            );
                                                        }}
                                                    >
                                                        Enable
                                                    </button>
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
                                                        {
                                                            rule?.value?.split(
                                                                ","
                                                            )[1]
                                                        }
                                                    </span>
                                                    <div
                                                        onClick={() => {
                                                            action.handleEditApplicablePoint(
                                                                data,
                                                                rule,
                                                                "no"
                                                            );
                                                        }}
                                                        role="button"
                                                        className="d-flex align-items-center"
                                                    >
                                                        <EditIcon />
                                                    </div>
                                                    <button
                                                        className="btn btn-success"
                                                        style={{
                                                            fontSize: "12px",
                                                            padding: "3px 12px",
                                                            marginLeft: "10px",
                                                        }}
                                                        onClick={() => {
                                                            action.handleRuleActions(
                                                                rule,
                                                                data
                                                            );
                                                        }}
                                                    >
                                                        Enable
                                                    </button>
                                                </li>
                                            </ul>
                                        </SalesPointsContainer>
                                    </div>
                                </Switch.Case>
                            </Switch>
                        );
                    })}
                    <div
                        style={{
                            height: "33px",
                            width: "253px",
                        }}
                    />
                </div>
            );
        },
    },
];
