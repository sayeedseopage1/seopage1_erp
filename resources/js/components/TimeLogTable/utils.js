

// sort function
export function sort(data, config = 'dece') {
    const _data = [...data];
    const { sortBy, direction } = config;

    const sortedData = _data.sort((a, b) => {
        if(direction === 'dece'){
            return b[sortBy] - a[sortBy];
        }else return a[sortBy] - b[sortBy];
    })

    return sortedData;
}


// paginate
export function paginate(data, currentPage, nPaginate ){
    if (data.length <= nPaginate) return data;
    const startIndex = (currentPage - 1) * nPaginate;
    return data.slice(startIndex, startIndex + nPaginate);
}