/**
 * Paginates an array of items based on the current page and items per page.
 *
 * @param {Array} items - The array of items to be paginated.
 * @param {number} currentPage - The current page number.
 * @param {number} itemsPerPage - The number of items per page.
 * @return {Array} The paginated array of items.
 */
export const antdPaginate = (items, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items?.slice(startIndex, endIndex);
};
