import React from "react";
import PropTypes from "prop-types";

// Components - UI - Modal
import AntdModal from "../../UI/AntdModal/AntdModal";

// Components - UI - Custom
import CustomModalHeader from "../../UI/CustomModalHeader/CustomModalHeader";

// Services - API
import { useGetTestDataQuery } from "../../../../services/api/dashboardApiSlice";

// Components - UI - Styled
import { SectionWrapper } from "../../UI/StyledComponents";

// Components - Table
import DashboardDataTable from "../../table/DashboardDataTable";

// Components - Loader
import LeadDashboardModalTableLoader from "../../loader/LeadDashboardModalTableLoader";
import { Placeholder } from "../../../../global/Placeholder";

// Components - UI - Shared
import RefreshButton from "../../shared/RefreshButton";

// Components - Logic - Global
import Switch from "../../../../global/Switch";

// Hooks
import { useGetLeadDevDashboardModalData } from "../../../hooks/useGetLeadDevDashboardModalData";


const LeadDeveloperDataModal = ({
    isModalOpen,
    closeModal,
    modalData,
    filter,
    userData,
}) => {
    const { leadDevDashboardModalData, modalExtraInfo } =
        useGetLeadDevDashboardModalData(modalData, filter, userData);

    const { query } = modalData;

    const { isLoading, isFetching, refetch } = useGetTestDataQuery(query, {
        refetchOnMountOrArgChange: true,
    });

    const isModalDataRetchingOrLoading = isLoading || isFetching;

    return (
        <AntdModal
            isModalOpen={isModalOpen}
            parentClassName="sp1_lead_developer_data_modal"
            isCentered
            width="1200px"
        >
            <Switch>
                <CustomModalHeader
                    title={modalData?.title}
                    closeModal={closeModal}
                />
                <SectionWrapper
                    backgroundColor="var(--priMaryWhiteBg)"
                    padding="15px 30px"
                >
                    <SectionWrapper
                        backgroundColor="var(--priMaryWhiteBg)"
                        className="d-flex pb-0 pr-0 justify-content-end py-1"
                    >
                        <RefreshButton
                            onClick={() => refetch()}
                            isLoading={isModalDataRetchingOrLoading}
                        />
                    </SectionWrapper>
                    <Switch.Case condition={modalExtraInfo?.length}>
                        <SectionWrapper
                            className="d-flex flex-wrap"
                            gap="10px"
                            backgroundColor="transparent"
                            padding="15px 0px"
                        >
                            {modalExtraInfo?.map((item) => (
                                <SectionWrapper
                                    key={item.id}
                                    className="sp1_dashboard_modal_extra_info_section"
                                    padding="15px 0"
                                    border="1px solid var(--primaryDarkBorderBlue)"
                                    borderRadius="var(--borderRadius)"
                                    backgroundColor="var(--primaryDarkBlue)"
                                    flex="1"
                                    gap="10px"
                                >
                                    <span>{item?.title}</span>
                                    <Switch.Case
                                        condition={isModalDataRetchingOrLoading}
                                    >
                                        <Placeholder width="60px" />
                                    </Switch.Case>
                                    <Switch.Case
                                        condition={
                                            !isModalDataRetchingOrLoading
                                        }
                                    >
                                        <span>
                                            {item.valueTypeBefore}
                                            {item?.value} {item?.valueTypeAfter}
                                        </span>
                                    </Switch.Case>
                                </SectionWrapper>
                            ))}
                        </SectionWrapper>
                    </Switch.Case>
                    <DashboardDataTable
                        tableColumns={modalData?.tableColumn}
                        tableData={[]}
                        isLoading={isModalDataRetchingOrLoading}
                        tableName={modalData?.title}
                        options={{
                            isPagination: true,
                        }}
                        getLoadingComponent={LeadDashboardModalTableLoader}
                        tableStyles={{
                            height: {
                                maxHeight: "44vh",
                            },
                        }}
                    />
                </SectionWrapper>
            </Switch>
        </AntdModal>
    );
};

export default LeadDeveloperDataModal;

LeadDeveloperDataModal.propTypes = {
    isModalOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    modalData: PropTypes.object,
    filter: PropTypes.object,
    userData: PropTypes.object,
};
