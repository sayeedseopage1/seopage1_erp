import _ from "lodash";
import React from "react";
import FilterBar from "./FilterBar/FilterBar";
import getCardData from "../../__fake_data__/required-actions/data";
import RequiredActionsCard from "./RequiredActionCards/RequiredActionsCard";
import { usePagination } from "./Pagination";
import { useState } from "react";
import { useEffect } from "react";
import { useRefresh } from "./Index";
import { useLazyGetPastRequiredActionQuery } from "../../services/api/requiredActionApiSlice";
import RequiredActionCard_Loader from "./RequiredActionCards/RequiredActionCard_Loader";

const PastRequiredActions = () => {
    const {currentPage,perPageItem,setTotalItem} = usePagination();
    const {refresh} = useRefresh();
    const [data, setData] = useState([]);
    const [slicedData, setSlicedData] = useState([]);
    const [filter, setFilter] = useState('');
    const [getPastRequiredAction , { isLoading, isFetching }] = useLazyGetPastRequiredActionQuery();

    // data fetching according to filter
    useEffect(()=>{
        getPastRequiredAction(filter)
            .unwrap()
            .then(({ pending_actions }) => {
                console.log({ pending_actions });
                setData(pending_actions);
            });
    },[filter,refresh])

    // slicing data according to paginate
    useEffect(()=>{
      if (data.length) {
          setTotalItem(data.length);
          const startIndex = (currentPage-1) * perPageItem;
          const endIndex = currentPage * perPageItem;
        //   console.log('data exist',{currentPage,perPageItem,startIndex,endIndex,data:data.slice(startIndex,endIndex) });
        setSlicedData(data.slice(startIndex,endIndex));
      }
    },[currentPage,perPageItem,data])





    const onFilter = (filter) => {
        const queryObj = _.pickBy(filter, Boolean);
        const query = new URLSearchParams(queryObj).toString();
        setFilter(query);
        console.log({query});
    };

    return (
        <div>
            <FilterBar onFilter={onFilter} change={true} />
            {(isLoading || isFetching) &&
                _.fill(Array(perPageItem),"*").map((v, i) => (
                    <RequiredActionCard_Loader key={i} />
            ))}
            {slicedData.map((data, i) => {
                return <RequiredActionsCard key={i} data={data} status={"past"} />;
            })}
        </div>
    );
};

export default PastRequiredActions;
