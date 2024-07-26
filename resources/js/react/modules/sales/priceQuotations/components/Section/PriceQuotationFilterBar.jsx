import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { useWindowSize } from "react-use";

// Components - UI- Shared
import JqueryDateRangePicker from "../Shared/JqueryDateRangePicker";
import PersonFilter from "../Shared/PersonFilter";
import styled from "styled-components";
import Button from "../../../../../global/Button";
import { Flex } from "../../../../../global/styled-component/Flex";

const PriceQuotationFilterBar = ({ setFilter, clientsData, userListData }) => {
    const [client, setClient] = React.useState(null);
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [addedBy, setAddedBy] = React.useState(null);
    const SIZE = useWindowSize();
    const [isExpended, setIsExpended] = React.useState(false);

    const _startData = React.useMemo(() => startDate, [startDate]);
    const _endData = React.useMemo(() => endDate, [endDate]);

    React.useEffect(() => {
        setFilter((prev) => ({
            ...prev,
            start_date: _startData,
            end_date: _endData,
            client_username: client?.name ?? null,
            added_by: addedBy?.id ?? null,
        }));
    }, [_startData, _endData, client, addedBy]);

    return ReactDOM.createPortal(
        <div className="sp1_task_filter_bar">
            <JqueryDateRangePicker
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                customDayRange={60}
                onApply={() => {}}
            />

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
                className={SIZE.width < 1200 && isExpended ? "expend" : ""}
            >
                {SIZE.width < 1200 ? (
                    <Flex justifyContent="space-between" className="w-100 mb-3">
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
                    display={(value) => value?.name}
                    searchBy={(value) => value?.name}
                    data={clientsData}
                />
                <PersonFilter
                    value={addedBy}
                    onChange={setAddedBy}
                    title="Added By"
                    display={(value) => value?.name}
                    searchBy={(value) => value?.name}
                    data={userListData}
                />
            </FilterWrapper>
        </div>,
        document.getElementById("priceQuotationFilterContainer")
    );
};

export default PriceQuotationFilterBar;

PriceQuotationFilterBar.propTypes = {
    setFilter: PropTypes.func,
    clientsData: PropTypes.array,
    userListData: PropTypes.array,
};

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
