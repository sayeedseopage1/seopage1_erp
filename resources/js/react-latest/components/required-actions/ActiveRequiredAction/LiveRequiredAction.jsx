import React from "react";
import RequiredActionsCard from "../RequiredActionCards/RequiredActionsCard";
import FilterBar from "../FilterBar/FilterBar";
import _ from "lodash";
import { usePagination } from "../Pagination";
import { useState } from "react";
import { useEffect } from "react";
import { useLazyGetLiveRequiredActionQuery } from "../../../services/api/requiredActionApiSlice";
import RequiredActionCard_Loader from "../RequiredActionCards/RequiredActionCard_Loader";
import { useRefresh } from "../Index";
import { User } from "../../../utils/user-details";
import useCounterStore from "../../Zustand/store";

const currentUser = new User(window.Laravel.user);

const LiveRequiredAction = () => {
    const { count } = useCounterStore();
    const { currentPage, perPageItem, setTotalItem } = usePagination();
    const { refresh, setLoading, user } = useRefresh();
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [slicedData, setSlicedData] = useState([]);
    const [dateFilter, setDateFilter] = useState({});
    // const [userFilter, setUserFilter] = useState(null);
    const [searchFilter, setSearchFilter] = useState("");
    const [viewFilter, setViewFilter] = useState("");
    const [getLiveRequiredAction, { isLoading, isFetching }] =
        useLazyGetLiveRequiredActionQuery();

    // global refresh loading
    useEffect(() => {
        setLoading(isFetching || isLoading);
    }, [isFetching, isLoading]);

    // data fetching according to filter
    useEffect(() => {
        const queryObj = _.pickBy(
            { ...dateFilter, user_id: user?.id },
            Boolean
        );
        const query = new URLSearchParams(queryObj).toString();
        // console.log({query});
        getLiveRequiredAction(query)
            .unwrap()
            .then(({ pending_actions }) => {
                setData(pending_actions);
            });
    }, [dateFilter, refresh, user, count]);

    // filter data according to search
    useEffect(() => {
        if (searchFilter) {
            const newData = data.filter((d) => {
                return d?.heading
                    ?.toLowerCase()
                    ?.includes(searchFilter.toLowerCase());
            });
            setFilterData(newData);
        } else {
            setFilterData(data);
        }
    }, [searchFilter, data]);

    // filter data according to view
    useEffect(() => {
        if (viewFilter === "all") {
            setFilterData(data);
        }
        // console.log({ viewFilter });
    }, [viewFilter, data]);

    // slicing data according to paginate
    useEffect(() => {
        if (filterData.length) {
            setTotalItem(filterData.length);
            const startIndex = (currentPage - 1) * perPageItem;
            const endIndex = currentPage * perPageItem;
            setSlicedData(filterData.slice(startIndex, endIndex));
        } else {
            setTotalItem((prev) => prev);
            setSlicedData([]);
        }
    }, [currentPage, perPageItem, filterData]);

    // on filter function
    const onFilter = ({ search, date, view }) => {
        if (JSON.stringify(date) !== JSON.stringify(dateFilter)) {
            setDateFilter({ ...date });
        }
        setSearchFilter(search);
        setViewFilter(view);
    };

    return (
        <div>
            <FilterBar
                onFilter={onFilter}
                change={true}
                setFilterData={setFilterData}
                data={data}
            />
            {(isLoading || isFetching) &&
                _.fill(Array(perPageItem), "*").map((v, i) => (
                    <RequiredActionCard_Loader key={i} />
                ))}
            {!isLoading &&
                !isFetching &&
                slicedData.map((data, i) => {
                    return (
                        <RequiredActionsCard
                            key={i}
                            role={user ? user.role_id : currentUser.roleId}
                            data={data}
                            status={"live"}
                        />
                    );
                })}
        </div>
    );
};

export default LiveRequiredAction;
