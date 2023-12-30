import React from "react";
import ReactDOM from "react-dom";
import JqueryDateRangePicker from "./JqueryDateRangePicker";
import { Flex } from "./table/ui";
import SearchBox from "../../../../global/Searchbox";
import { useUsers } from "../../../../hooks/useUsers";
import _ from "lodash";
import PersonFilter from "./PersonFilter";
import ConvertStatus from "./ConvertStatus";

import styled from "styled-components";
import Button from "../../../../global/Button";

import { useWindowSize, useDebounce } from "react-use";

const FilterBar = ({ setFilter }) => {
    const [isExpended, setIsExpended] = React.useState(false);

    const { users } = useUsers();
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [search, setSearch] = React.useState("");
    const [searchText, setSearchText] = React.useState('');
    const [client, setClient] = React.useState(null);
    const [closedBy, setClosedBy] = React.useState(null);
    const [convertStatus, setConvertStatus] = React.useState(null); 
    
    const SIZE = useWindowSize();

    const clientId = client?.id;

    const _startData = React.useMemo(() => startDate, [startDate]);
    const _endData = React.useMemo(() => endDate, [endDate]);
    const _clientId = React.useMemo(() => client?.id, [clientId]);
    const _convertStatus = React.useMemo(() => convertStatus, [convertStatus]);
    const _closedById = React.useMemo(() => closedBy?.id, [closedBy]);

    React.useEffect(() => {
        setFilter((prev) => ({
            ...prev,
            start_date: _startData,
            end_date: _endData,
            client_id: _clientId,
            client_name: client?.name,
            client_username: client?.user_name,
            status: _convertStatus?.id,
            status_title: convertStatus?.title,
            closed_by: _closedById,
            closed_by_name: closedBy?.name,
        }));
    }, [_startData,_closedById, _endData, _clientId, _convertStatus]);

    // search data
    useDebounce(() => { setSearchText(search)},500,[search] );
    React.useEffect(() => {
        setFilter((prev) => ({ ...prev, search: searchText }));
    }, [searchText]);


    return ReactDOM.createPortal(
        <React.Fragment>
            <div className="w-100 bg-white py-2">
                <Flex justifyContent="flex-start" className="px-3 flex-wrap">
                    <JqueryDateRangePicker
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                    />

                    <div
                        style={{ width: "256px" }}
                        className="px-3 border-left"
                    >
                        <SearchBox value={search} onChange={setSearch} />
                    </div>

                    {SIZE.width < 1200 ? (
                        <Button
                            variant="tertiary"
                            onClick={() => setIsExpended(true)}
                            className="font-weight-normal ml-auto"
                        >
                            Filter
                        </Button>
                    ) : null}

                    <FilterWrapper
                        className={
                            SIZE.width < 1200 && isExpended ? "expend" : ""
                        }
                    >
                        {SIZE.width < 1200 ? (
                            <Flex
                                justifyContent="space-between"
                                className="w-100 mb-3"
                            >
                                <span className="font-weight-bold">Filter</span>
                                <Button
                                    variant="tertiary"
                                    onClick={() => setIsExpended(false)}
                                >
                                    <i className="fa-solid fa-xmark" />
                                </Button>
                            </Flex>
                        ) : null}

                        <PersonFilter
                            value={client}
                            onChange={setClient}
                            title="Client"
                            display={value => value?.user_name}
                            searchBy={value => value?.user_name}
                            data={_.filter(
                                users,
                                (user) => user.role_id === null
                            )}
                        />

                        <PersonFilter
                            value={closedBy}
                            onChange={setClosedBy}
                            title="Closed By"
                            data={_.filter(users, (user) =>
                                _.includes([1, 7, 8], Number(user.role_id))
                            )}
                        />

                        <ConvertStatus
                            value={convertStatus}
                            onChange={setConvertStatus}
                            data={[
                                { id: "0", title: "Contact Made" },
                                { id: "1", title: "Qualified" },
                                { id: "2", title: "Requirements Defined" },
                                { id: "3", title: "Proposal Made" },
                                { id: "4", title: "Negotiation Started" },
                                { id: "5", title: "Milestone Breakdown" },
                                { id: "won", title: "Won" },
                                { id: "lost", title: "Lost" },
                            ]}
                        />
                    </FilterWrapper>
                </Flex>
            </div>
        </React.Fragment>,
        document.getElementById("dmDealsFilterBarContainer")
    );
};

export default FilterBar;

const FilterWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    @media (max-width: 1200px) {
        position: fixed;
        top: 0;
        right: -300px;
        flex-direction: column;
        height: 100vh;
        z-index: 999;
        background-color: #fff;
        transition: right 0.4s ease-in-out;
        box-shadow: -10px 0 20px rgb(0 0 0 / 10%);
        padding: 1rem;

        &.expend {
            right: 0;
        }
    }
`;
