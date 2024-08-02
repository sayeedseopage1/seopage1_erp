import { Link, useSearchParams } from "react-router-dom";
import styles from "../../employee-evaluation/pages/EmployeeEvaluation.module.css";
export const EvaluationTypeFilterTabs = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const data = props.data;

    const handleRouteChange = (e, params) => {
        e.preventDefault();

        // Create a new URLSearchParams object with the new parameters
        const newSearchParams = new URLSearchParams();

        // Set new parameters
        for (const [key, value] of Object.entries(params)) {
            newSearchParams.set(key, value);
        }

        // Update the searchParams state with the new URLSearchParams object
        setSearchParams(newSearchParams);
    };

    const badge = (type) => {
        return _.size(data[type]);
    };
    return (
        <ul className={styles.tabs}>
            <li>
                <Link
                    to="#"
                    data-type="pending"
                    onClick={(e) => handleRouteChange(e, { show: "pending" })}
                    data-active={searchParams.get("show") === "pending"}
                >
                    Pending{" "}
                    <span className="badge badge-light">
                        {badge("pending")}
                    </span>
                </Link>
            </li>

            <li>
                <Link
                    to="#"
                    data-type="authorized"
                    onClick={(e) =>
                        handleRouteChange(e, { show: "authorized" })
                    }
                    data-active={searchParams.get("show") === "authorized"}
                >
                    Accepted{" "}
                    <span className="badge badge-light">
                        {badge("authorized")}
                    </span>
                </Link>
            </li>

            <li>
                <Link
                    to="#"
                    data-type="denied"
                    onClick={(e) => handleRouteChange(e, { show: "denied" })}
                    data-active={searchParams.get("show") === "denied"}
                >
                    Denied{" "}
                    <span className="badge badge-light">{badge("denied")}</span>
                </Link>
            </li>
            <li>
                <Link
                    to="#"
                    data-type="all"
                    onClick={(e) => handleRouteChange(e, { show: "all" })}
                    data-active={searchParams.get("show") === "all"}
                >
                    All{" "}
                    <span className="badge badge-light">{badge("all")}</span>
                </Link>
            </li>
        </ul>
    );
};
