import _ from "lodash";
import React from "react";
import Avatar from "../../global/Avatar";
import { useAuth } from "../../hooks/useAuth";
import AnswerQuestion from "./AnswerQuestion";
import disputesStyle from "./disputes.module.css";
import dayjs from "dayjs";

/**
 *
 * * Responsible for rendering user details on dispute modal
 *
 */

const UserSection = ({
    row,
    sectionTitle = "section_title",
    user = {
        id: null,
        name: "",
        avatar: null,
        designation: "",
    },
    comment = "",
    questions = [],
    reason = "",
    getUserById,
    additionalInformation= null
}) => {
    const auth = useAuth();

    // get answered question
    const filterByHasReplied = (questions) => {
        const isTopManagement = _.includes([1, 8], auth?.getRoleId());
        if (isTopManagement) return questions;
        return _.filter(questions, (question) => question.replies);
    };

    return (
        <React.Fragment>
            <div className="mt-3 pb-2 py-2 position-relative">
                <hr />
                <span className="badge badge-secondary divider-text">
                    {sectionTitle}
                </span>
            </div>

            <table className="dispute-preview-table">
                <tbody>
                    <tr>
                        <td className="whitespace-nowrap py-2">
                            {sectionTitle}:
                        </td>
                        <td className="py-2 px-3">
                            <div className="d-flex align-items-center">
                                <Avatar
                                    src={user.avatar}
                                    alt={user.name}
                                    name={user.name}
                                    type="circle"
                                    width={32}
                                    height={32}
                                />

                                <div className="px-2">
                                    <a
                                        href={`/account/employees/${user.id}`}
                                        className="d-block"
                                    >
                                        {user.name}
                                    </a>
                                    <span
                                        className="d-block f-10"
                                        style={{
                                            color: "#777",
                                            marginTop: "-0.30rem",
                                        }}
                                    >
                                        {user.designation}
                                    </span>
                                </div>
                            </div>
                        </td>
                    </tr>

                    {reason ? (
                        <tr>
                            <td className="py-2"> Reason: </td>
                            <td className="px-3 py-2 "> {reason} </td>
                        </tr>
                    ) : null}

                    {
                        additionalInformation?.status ?
                            <>
                                <tr>
                                    <td className="py-2">Is the client paying additional for these change? </td>
                                    <td className="px-3 py-2">{additionalInformation?.status}</td>
                                </tr>

                                {additionalInformation?.status?.toLowerCase() === 'yes' ?
                                    <tr>
                                        <td className="py-2"> Amount </td>
                                        <td className="px-3 py-2">{additionalInformation?.amount}</td>
                                    </tr>
                                :null}

                                {additionalInformation?.status?.toLowerCase() === 'no' ?
                                    <tr>
                                        <td className="py-2"> Why client is not paying additionally for these change?</td>
                                        <td className="px-3 py-2">{additionalInformation?.denyComment}</td>
                                    </tr>
                                :null}
                            </>
                        :null
                    }

                    {comment ?
                        <tr>
                            <td className="py-2">Explanation:</td>
                            <td className={`px-3 py-2 ${disputesStyle.explanation_container}`}>
                                <div
                                    className={`sp1_ck_content`}
                                    dangerouslySetInnerHTML={{
                                        __html: comment,
                                    }}
                                />
                                <div className={disputesStyle.explanation_date}>
                                    <span>- by <a href={`/account/employees/${user?.id}`}>{user?.name}</a> on {dayjs(row?.revision_created_at).format(`MMM DD, YYYY [at] hh:mm A`)}</span>
                                </div>
                            </td>
                        </tr>
                    :null }

                    {_.size(questions) ? (
                        <tr>
                            <td className="py-2">Submitted Answer:</td>
                            <td className="px-3 py-2">
                                <div
                                    className="d-flex flex-column"
                                    style={{ gap: "16px" }}
                                >
                                    {_.map(
                                        filterByHasReplied(questions),
                                        (data, index) => (
                                            <AnswerQuestion
                                                key={index}
                                                data={data}
                                                index={index}
                                                getUserById={getUserById}
                                            />
                                        )
                                    )}
                                </div>
                            </td>
                        </tr>
                    ) : null}
                </tbody>
            </table>
        </React.Fragment>
    );
};

export default UserSection;
