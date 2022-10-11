import {PostType} from "../repositories/posts-db-repository";
import {SortDirection} from "mongodb";
import {BlogType} from "../repositories/bloggers-db-repository";

export type PaginationType<T> = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: T
}

export type PaginationQueryType = {
    searchNameTerm?: string | null;
    pageNumber: number;
    pageSize: number;
    sortBy: string;
    sortDirection: SortDirection;
}

export type PaginationItemsType = BlogType[] | PostType[]

//Sample
// const BlogPage: PaginationType<BlogType[]> = {pagesCount,pageSize ...}