import * as React from "react";

import styled from "styled-components";
import RefreshButton from "../components/RefreshButton";
import DataTable from "../components/table/DataTable";
import { WonDealsTableColumns } from "../components/table/WonDealsTableColumns";
import { useWonDealsQuery } from "../../../../services/api/wonDealsApiSlice";
import { Flex } from "../components/table/ui";
import FilterBar from "../components/FilterBar";
import { useDealContext } from "../components/context/DealContext";
import DealTableExportButton from "../components/DealTableExportToExcel";
import Button from "../../../../global/Button";
import { useAuth } from "../../../../hooks/useAuth";
import styles from "../components/ui/AuthorizationButton.module.css";
import ReactModal from "react-modal";
import AuthNeedTable from "../components/table/AuthNeedTable";
import Card from "../../../../global/Card";
import { AuthNeedTableColumns } from "../components/table/AuthNeedTableCloumn";
const WonDeals = () => {
    const [isAuthNeedModalOpen, setIsAuthNeedModalOpen] = React.useState(false);
    const auth = useAuth();
    const { isEditFormEnable } = useDealContext();

    const [isCreationFormVisible, setIsCreationFormVisible] =
        React.useState(false);

    const [{ pageIndex, pageSize }, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [filter, setFilter] = React.useState({});

    const [sorting, setSorting] = React.useState([]);

    // make query string
    const queryString = (object) => {
        const queryObject = _.pickBy(object, Boolean);
        return new URLSearchParams(queryObject).toString();
    };

    // fetch data
    const { data, isFetching, refetch } = useWonDealsQuery(
        queryString({
            page: pageIndex + 1,
            limit: pageSize,
            sort_by: sorting[0]?.id,
            sort_type: sorting[0]?.desc ? "desc" : "asc",
            ...filter,
        }),
        { refetchOnMountOrArgChange: true, skip: !filter?.start_date }
    );

    const wonDeals = data?.data;
    const authNeedWonDeals = wonDeals?.data.filter(
        (deal) => deal.authorization_status === 2 && deal.is_drafted === 0
    );
    const extensionRequest = data?.total_request;

    console.log("wondeals", wonDeals);
    const onPageChange = (paginate) => {
        setPagination(paginate);
    };

    // redirect path
    const redirectTo = (url) => {
        window.location.href = url;
    };

    return (
        <React.Fragment>
            <div>
                <FilterBar setFilter={setFilter} />
                <Flex justifyContent="space-between" className="mb-3">
                    <Flex>
                        {auth.getRoleId() === 1 && (
                            <Button
                                onClick={() =>
                                    redirectTo(`/account/award-time/increase`)
                                }
                                className="bg-warning border-0 font-weight-normal"
                            >
                                <i className="fa-solid fa-clock" />
                                {extensionRequest
                                    ? ` Award Time Extension Requests (${extensionRequest})`
                                    : "Award Time Extension Requests"}
                            </Button>
                        )}

                        <DealTableExportButton filter={filter} />

                        {auth.roleId === 8 && (
                            <Button
                                onClick={() => setIsAuthNeedModalOpen(true)}
                                variant="tertiary"
                                className={styles.authorize_task}
                            >
                                <i className="fa-solid fa-hourglass-end" />
                                Authorization Needed
                                <span className="badge badge-light">
                                    {authNeedWonDeals?.length ?? 0}
                                </span>
                            </Button>
                        )}
                    </Flex>

                    <Flex>
                        {/* refresh */}
                        <RefreshButton
                            onClick={refetch}
                            isLoading={isFetching}
                            className="font-weight-normal"
                        />
                    </Flex>
                </Flex>
                <Container>
                    <DataTable
                        data={wonDeals}
                        columns={[...WonDealsTableColumns]}
                        isLoading={isFetching}
                        onPageChange={onPageChange}
                        sorting={sorting}
                        tableName="WonDealsTable"
                        setSorting={setSorting}
                    />
                </Container>
            </div>

            <ReactModal
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        margin: "auto auto",
                        zIndex: 100,
                    },
                    content: {
                        borderRadius: "10px",
                        height: "fit-content",

                        maxWidth: "1300px",
                        margin: "auto auto",
                        border: "none",
                        padding: "0px",
                        overflowY: "auto",
                    },
                }}
                isOpen={isAuthNeedModalOpen}
                onRequestClose={() => setIsAuthNeedModalOpen(false)}
            >
                <Card>
                    <Card.Head onClose={() => setIsAuthNeedModalOpen(false)}>
                        <span>Authorization Needed </span>
                    </Card.Head>
                </Card>
                <Card.Body>
                    <AuthNeedTable
                        data={authNeedWonDeals}
                        columns={[...AuthNeedTableColumns]}
                        isLoading={isFetching}
                        onPageChange={onPageChange}
                        sorting={sorting}
                        tableName="AuthNeedTable"
                        setSorting={setSorting}
                    />
                </Card.Body>
            </ReactModal>
        </React.Fragment>
    );
};

export default WonDeals;

const Container = styled.div`
    background-color: #fff;
    overflow: hidden;
    /* box-shadow: 0 0 6px rgb(0 0 0 / 20%); */
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
`;
