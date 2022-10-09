import {NextFunction, Request, Response} from "express";
import {PostType} from "../repositories/posts-db-repository";
import {bloggersService} from "../domain/bloggers-service";

type PaginationItemsType = BlogType[] | PostType[]


// const page = parseInt(req.query.page)
// const limit = parseInt(req.query.limit)
// const startIndex = (page - 1) * limit
// const endIndex = page * limit
// const result = {}
// if(startIndex>0){
//     result.previous = {
//         page: page - 1,
//         limit: limit
//     }
// }
// if(endIndex<0){
//     result.next = {
//         page: page + 1,
//         limit: limit
//     }
// }
// result.result = (какой-то объект).slice(startIndex, endIndex)
//  return res.send(result)

// const sortCreate = () => {
//     return [newBlog].sort((u1, u2) => {
//         if(u1.createdAt<u2.createdAt) return -1
//         if(u1.createdAt>u2.createdAt) return 1
//
//         return 0
//     })
// }

export type PaginationType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: PaginationItemsType
}

// export type PostType = {
//     id: string,
//     title: string,
//     shortDescription: string,
//     content: string,
//     blogId: string,
//     blogName: string,
//     createdAt: Date
// }

export type BlogType = {
    id: string,
    name: string,
    youtubeUrl: string,
    createdAt: Date
}
