import styled from "styled-components";

export const SectionWrapper = styled.div`
    padding: ${(props) => props.padding || "20px"};
    margin: ${(props) => props.margin || "0"};
    background-color: ${(props) =>
        props.backgroundColor || "var(--primaryLightBlue)"};
    border-radius: ${(props) => props.borderRadius || "var(--borderRadius)"};
    gap: ${(props) => props.gap || "0"};
    border: ${(props) => props.border || "none"};
    flex: ${(props) => props.flex || "none"};
    font-family: var(--primaryFont);
    font-style: normal;
    line-height: normal;

    &.sp1_dashboard_header_section {
        display: flex;

        .sp1_dashboard_header_user_info {
            display: flex;
            flex: 1;
        }

        .sp1_dashboard_header_filter_section {
            display: flex;
            align-items: center;

            @media screen and (max-width: 768px) {
                flex-direction: column;
            }
        }

        @media screen and (max-width: 1330px) {
            flex-direction: column;
        }
    }

    /* Developer section */
    &.sp1_dashboard_developer_content {
        display: flex;
        flex-direction: column;

        .sp1_dashboard_developer_1st_section {
            display: flex;

            .sp1_dashboard_developer_1st_section_left {
                display: flex;

                /* Media Query */

                @media screen and (max-width: 768px) {
                    flex-direction: column;
                }
            }

            .sp1_dashboard_developer_1st_section_right {
                display: flex;

                /* Media Query */
                @media screen and (max-width: 768px) {
                    flex-direction: column;
                }
            }
            @media screen and (max-width: 1411px) {
                flex-direction: column;
            }
        }
        .sp1_dashboard_developer_2nd_section {
            display: flex;

            .sp1_dashboard_developer_2nd_section_left {
                display: flex;
                flex-direction: column;

                /* Media Query */
                @media screen and (max-width: 768px) {
                    flex-direction: column;
                }
            }

            .sp1_dashboard_developer_2nd_section_right {
                display: flex;
                flex-direction: column;

                /* Media Query */
                @media screen and (max-width: 768px) {
                    flex-direction: column;
                }
            }
            @media screen and (max-width: 1177px) {
                flex-direction: column;
            }
        }
        .sp1_dashboard_developer_3rd_section {
            display: flex;

            .sp1_dashboard_developer_3rd_section_left {
                display: flex;
                flex-direction: column;

                /* Media Query */
                @media screen and (max-width: 768px) {
                    flex-direction: column;
                }
            }

            .sp1_dashboard_developer_1st_section_right {
                display: flex;
                flex-direction: column;

                /* Media Query */
                @media screen and (max-width: 768px) {
                    flex-direction: column;
                }
            }
            @media screen and (max-width: 1350px) {
                flex-direction: column;
            }
        }
        .sp1_dashboard_developer_4th_section {
            display: flex;

            .sp1_dashboard_developer_4th_section_left {
                display: flex;

                /* Media Query */
                @media screen and (max-width: 768px) {
                    flex-direction: column;
                }
            }

            .sp1_dashboard_developer_4th_section_right {
                display: flex;

                /* Media Query */
                @media screen and (max-width: 768px) {
                    flex-direction: column;
                }
            }

            @media screen and (max-width: 1435px) {
                flex-direction: column;
            }
        }
        .sp1_dashboard_developer_table_section {
            display: flex;
            @media screen and (max-width: 991px) {
                flex-direction: column;
            }
        }
    }

    /*  Lead Developer section */
    &.sp1_dashboard_lead_developer_content {
        display: flex;
        flex-direction: column;

        .sp1_dashboard_lead_developer_1st_section {
            display: flex;

            .sp1_dashboard_lead_developer_1st_section_left {
                display: flex;

                /* Media Query */

                @media screen and (max-width: 768px) {
                    flex-direction: column;
                }
            }

            .sp1_dashboard_lead_developer_1st_section_right {
                display: flex;

                /* Media Query */
                @media screen and (max-width: 768px) {
                    flex-direction: column;
                }
            }
            @media screen and (max-width: 1411px) {
                flex-direction: column;
            }
        }
        .sp1_dashboard_lead_developer_2nd_section {
            display: flex;

            .sp1_dashboard_lead_developer_2nd_section_left {
                display: flex;
                flex-direction: column;

                /* Media Query */
                @media screen and (max-width: 768px) {
                    flex-direction: column;
                }
            }

            .sp1_dashboard_lead_developer_2nd_section_right {
                display: flex;
                flex-direction: column;

                /* Media Query */
                @media screen and (max-width: 768px) {
                    flex-direction: column;
                }
            }
            @media screen and (max-width: 1177px) {
                flex-direction: column;
            }
        }
        .sp1_dashboard_lead_developer_3rd_section {
            display: flex;

            .sp1_dashboard_lead_developer_3rd_section_left {
                display: flex;
                flex-direction: column;

                /* Media Query */
                @media screen and (max-width: 768px) {
                    flex-direction: column;
                }
            }

            .sp1_dashboard_lead_developer_1st_section_right {
                display: flex;
                flex-direction: column;

                /* Media Query */
                @media screen and (max-width: 768px) {
                    flex-direction: column;
                }
            }
            @media screen and (max-width: 1350px) {
                flex-direction: column;
            }
        }
        .sp1_dashboard_lead_developer_4th_section {
            display: flex;

            .sp1_dashboard_lead_developer_4th_section_left {
                display: flex;

                /* Media Query */
                @media screen and (max-width: 768px) {
                    flex-direction: column;
                }
            }

            .sp1_dashboard_lead_developer_4th_section_right {
                display: flex;

                /* Media Query */
                @media screen and (max-width: 768px) {
                    flex-direction: column;
                }
            }

            @media screen and (max-width: 1435px) {
                flex-direction: column;
            }
        }
        .sp1_dashboard_lead_developer_table_section {
            display: flex;
            @media screen and (max-width: 991px) {
                flex-direction: column;
            }
        }
    }

    /* Sale Executive section */
    .sp1_dashboard_sale_executive_content {
        display: flex;

        .sp1_dashboard__sale_executive_3rd_section {
            display: flex;

            /* Media Query */
            @media screen and (max-width: 1374px) {
                flex-direction: column;
            }
        }

        @media screen and (max-width: 991px) {
            flex-direction: column;
        }
    }

    &.sp1_dashboard_modal_extra_info_section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: var(--primaryDarkText);
        font-size: 14px;
        font-weight: 500;
        text-align: center;
    }
`;
