import React from "react";
import { Placeholder } from "./Placeholder";
import style from "../styles/comments.module.css";
import _ from "lodash";

export default function CommentsPlaceholder() {
    return (
        <div className={`${style.commentsBody_loadingArea}`}>
            {_.fill(Array(10), "*").map((v, i) => {
                return (
                    <React.Fragment key={i}>
                        <LeftSideComment />
                        <RightSideComment />
                    </React.Fragment>
                );
            })}
        </div>
    );
}

const LeftSideComment = () => {
    return (
        <div
            className="d-flex"
            style={{
                gap: "0 6px",
                marginTop: "10px",
            }}
        >
            <Placeholder height={"30px"} width={"30px"} type="circle" />
            <section
                style={{
                    flex: "1 1 75%",
                    display: "flex",
                    gap: "6px",
                    flexFlow: "column nowrap",
                }}
            >
                <Placeholder height={"20px"} width={"200px"} />
                <span
                    style={{
                        width: "75%",
                        height: "100px",
                        overflow: "hidden",
                    }}
                >
                    <Placeholder
                        width={"75%"}
                        height={"100px"}
                        style={{
                            transform: "scale(3.5)",
                        }}
                    />
                </span>
            </section>
        </div>
    );
};

const RightSideComment = () => {
    return (
        <section
            style={{
                display: "flex",
                gap: "6px",
                flexFlow: "column nowrap",
                alignItems: "end",
                marginTop: "10px",
            }}
        >
            <Placeholder height={"20px"} width={"200px"} />
            <span
                style={{
                    width: "75%",
                    height: "100px",
                    overflow: "hidden",
                }}
            >
                <Placeholder
                    width={"75%"}
                    height={"100px"}
                    style={{
                        transform: "scale(3.5)",
                    }}
                />
            </span>
        </section>
    );
};
