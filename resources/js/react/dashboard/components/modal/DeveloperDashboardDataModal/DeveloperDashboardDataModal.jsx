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

// Components - UI - Shared
import RefreshButton from "../../shared/RefreshButton";
import DeveloperDashboardModalTableLoader from "../../loader/DeveloperDashboardModalTableLoader";

const DeveloperDashboardDataModal = ({ isModalOpen, closeModal, modalData }) => {
    const { query } = modalData;

    const { data, isLoading, isSuccess, isFetching, refetch } =
        useGetTestDataQuery(query, {
            refetchOnMountOrArgChange: true,
        });

    return (
        <AntdModal
            isModalOpen={isModalOpen}
            parentClassName="sp1_lead_developer_data_modal"
            isCentered
            width="1200px"
        >
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
                        isLoading={isFetching || isLoading}
                    />
                </SectionWrapper>
                <DashboardDataTable
                    tableColumns={modalData?.tableColumn}
                    tableData={[]}
                    isLoading={isLoading || isFetching}
                    tableName={modalData?.title}
                    options={{
                        isPagination: true,
                    }}
                    getLoadingComponent={DeveloperDashboardModalTableLoader}
                />
            </SectionWrapper>
        </AntdModal>
    );
};

export default DeveloperDashboardDataModal;

DeveloperDashboardDataModal.propTypes = {
    isModalOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    modalData: PropTypes.object,
};
