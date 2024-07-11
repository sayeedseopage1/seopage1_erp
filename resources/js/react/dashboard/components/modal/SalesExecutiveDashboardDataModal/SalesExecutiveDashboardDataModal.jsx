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
import Switch from "../../../../global/Switch";
import { Placeholder } from "../../../../global/Placeholder";
import SaleExecutiveDashboardTableLoader from "../../loader/SaleExecutiveDashboardTableLoader";

const SalesExecutiveDashboardDataModal = ({
    isModalOpen,
    closeModal,
    modalData,
}) => {
    const { query } = modalData;

    const { data, isLoading, isSuccess, isFetching, refetch } =
        useGetTestDataQuery(query, {
            refetchOnMountOrArgChange: true,
        });

    const isModalDataRetchingOrLoading = isFetching || isLoading;

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
                    <Switch.Case
                        condition={modalData?.isShowModalExtraInfo?.length}
                    >
                        <SectionWrapper
                            className="d-flex flex-wrap"
                            gap="10px"
                            backgroundColor="transparent"
                            padding="15px 0px"
                        >
                            {modalData?.isShowModalExtraInfo?.map((item) => (
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
                                            {item?.value} {item?.valueType}
                                        </span>
                                    </Switch.Case>
                                </SectionWrapper>
                            ))}
                        </SectionWrapper>
                    </Switch.Case>
                    <DashboardDataTable
                        tableColumns={modalData?.tableColumn}
                        tableData={[]}
                        isLoading={isLoading || isFetching}
                        tableName={modalData?.title}
                        options={{
                            isPagination: true,
                        }}
                        getLoadingComponent={SaleExecutiveDashboardTableLoader}
                    />
                </SectionWrapper>
            </Switch>
        </AntdModal>
    );
};

export default SalesExecutiveDashboardDataModal;

SalesExecutiveDashboardDataModal.propTypes = {
    isModalOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    modalData: PropTypes.object,
};
