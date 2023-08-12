// paginate
export function paginate(data, currentPage, nPaginate ){
    if (data.length <= nPaginate) return data;
    const startIndex = (currentPage - 1) * nPaginate;
    return data.slice(startIndex, startIndex + nPaginate);
}
