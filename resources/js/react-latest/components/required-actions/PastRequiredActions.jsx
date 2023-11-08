import _ from "lodash";
import React from "react";
import FilterBar from "./FilterBar/FilterBar";
import getCardData from "../../__fake_data__/required-actions/data";
import RequiredActionsCard from "./RequiredActionCards/RequiredActionsCard";
import { usePagination } from "./Pagination";
import { useState } from "react";
import { useEffect } from "react";

const PastRequiredActions = () => {
    const {currentPage,perPageItem,setTotalItem} = usePagination();
    const [data, setData] = useState([]);
    const [slicedData, setSlicedData] = useState([]);
    const [filter, setFilter] = useState('')

    // data fetching according to filter
    useEffect(()=>{
        const cardData = getCardData(50);
        // console.log({cardData});
        setData(cardData);
    },[filter])

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
            {slicedData.map((data, i) => {
                return <RequiredActionsCard key={i} data={data} status={"past"} />;
            })}
        </div>
    );
};

export default PastRequiredActions;
