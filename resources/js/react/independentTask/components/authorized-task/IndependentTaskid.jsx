import _ from "lodash";
import * as React from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";
import { useGetIndependentTaskAuthorizationConversationsQuery } from "../../../services/api/independentTaskApiSlice";
import { User } from "../../../utils/user-details";

const IndependentTaskId = ({ data }) => {
    const [refElement, setRefElement] = React.useState(null);
    const [popperElement, setPopperElement] = React.useState(null);
    const [arrowRef, setArrowRef] = React.useState(null);

    // get conversation
    const {
        data: conversationData,
        isLoading: isConversationLoading,
        isFetching,
        refetch: conversationRefetch,
    } = useGetIndependentTaskAuthorizationConversationsQuery(data.id);

    // Popper Element
    const { styles, attributes } = usePopper(refElement, popperElement, {
        placement: "top",
        modifiers: [
            {
                name: "offset",
                options: { offset: [0, 5] },
            },
            {
                name: "arrow",
                options: {
                    element: arrowRef,
                },
            },
        ],
    });

    //
    const user = new User(window.Laravel.user);

    const notAnswered = _.filter(conversationData?.data, (c) => !c.replied_by);
    const auth = _.includes([1, 8], user.getRoleId());

    const HAS_QUESTION = !auth && _.size(notAnswered);
    console.log({data: conversationData?.data})
    const HAS_UPDATE = _.size(_.filter(conversationData?.data, c => c.has_update));

    return (
        <React.Fragment>
            <div
                ref={setRefElement}
                className="d-flex align-items-center"
                style={{ gap: "10px", width: "fit-content" }}
            >
                <a
                    href={`/account/tasks/${data?.u_id}`}
                    className="hover-underline multine-ellipsis"
                >
                    {data?.u_id}
                </a>
            </div>


            {/* popper ref */}
            {
               (HAS_QUESTION || HAS_UPDATE) ?
               <PopperElement
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes.popper}
                >
                    <ToolTip>
                        {HAS_QUESTION ? `${HAS_QUESTION} Questions`: ''}
                        {HAS_UPDATE ? `Has Update`: ''}
                    </ToolTip>

                    <Arrow ref={setArrowRef} style={styles.arrow} />
                </PopperElement>
                : null
            }
       </React.Fragment>
    );
};

export default IndependentTaskId;

const PopperElement = styled.div`
    z-index: 2;
`;

const ToolTip = styled.div`
    width: fit-content;
    padding: 0 10px;
    background: var(--header_color);
    color: #fff;
    font-size: 10px;
    border-radius: 10px;
    white-space: nowrap;
`;

const Arrow = styled.div`
    overflow: hidden;
    width: 12px;
    height: 10px;

    &::before {
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: rgb(29, 130, 245);
        content: "";
        /* border: 1px solid #41c7e2; */
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
        transform-origin: center;
        top: -7px;
        left: 1px;
    }
`;
