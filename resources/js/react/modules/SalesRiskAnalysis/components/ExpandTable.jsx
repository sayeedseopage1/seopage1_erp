import React from "react";
import PropTypes from "prop-types";

// loader component
import LoaderSpin from "./LoaderSpin";

// expend sub task
export const ExpandQuestion = ({ row, table, pageIndex }) => {
    const [loading, setLoading] = React.useState(false);
    const data = row?.original;

    const handleExpanding = (e) => {
        setLoading(true);
        if (_.size(data?.questions) > 0) {
            setLoading(false);
            if (!row.getCanExpand()) return;
            row.toggleExpanded();
        } else {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                row.toggleExpanded();
            }, 1000);
        }
    };

    return (
        <div style={{ paddingLeft: `${row.depth * 2}rem` }}>
            <button
                {...{
                    style: { cursor: "pointer" },
                    onClick: () =>
                        Number(data?.questions?.length) > 0
                            ? handleExpanding()
                            : null,
                    className: row.getIsExpanded()
                        ? "row_expending_btn active"
                        : "row_expending_btn",
                }}
            >
                {!loading && (
                    <React.Fragment>
                        {row.getIsExpanded() ? (
                            <i className="fa-solid fa-chevron-down f-12" />
                        ) : (
                            <i className="fa-solid fa-chevron-right f-12"></i>
                        )}
                        <span
                            className="d-flex align-items-center ml-2"
                            style={{ gap: "4px" }}
                        >
                            <i className="fa-solid fa-eye f-16" />
                            <span>{data?.questions?.length}</span>
                        </span>
                    </React.Fragment>
                )}

                {loading && <LoaderSpin title="" />}
            </button>
        </div>
    );
};

ExpandQuestion.propTypes = {
    row: PropTypes.object,
    table: PropTypes.object,
    pageIndex: PropTypes.number,
};
