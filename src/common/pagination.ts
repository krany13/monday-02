import {PaginationQueryType} from "../types/pagination-types";

export const getPaginationData = (query: any): PaginationQueryType => {
    // const pageNumber = typeof +query.pageNumber === 'number' ? +query.pageNumber : 1
    const pageNumber = isNaN(query.pageNumber) ? 1 : +query.pageNumber
    const pageSize = isNaN(query.pageSize) ? 10 : +query.pageSize
    const searchNameTerm = typeof query.searchNameTerm === 'string' ? query.searchNameTerm : ""
    const sortDirection = query.sortDirection === 'asc' ? query.sortDirection : "desc"
    const sortBy = query.sortBy ? query.sortBy : 'createdAt'

    return {pageNumber, pageSize, searchNameTerm, sortDirection, sortBy}
}
