import {bloggersRepository, BlogType} from "./bloggers-db-repository";
import {postsCollection, client, blogsCollection} from "./db";
import {SortDirection} from "mongodb";
import {PaginationQueryType, PaginationType} from "../types/pagination-types";

const posts: Array<PostType> = [{
    id: "2", title: "REST API C#", shortDescription: "hello", content: "privet",
    blogId: "2", blogName: "test", createdAt: new Date()
}]

export type PostType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: Date
}


export const postsRepository = {
    async createPost(newPost: PostType): Promise<PostType | null> {
        await postsCollection.insertOne({...newPost})
        // posts.push(newPost)
        return newPost
    },
    async findPostById(id: string): Promise<PostType | null> {
        let post: PostType | null = await postsCollection.findOne({id: id}, {projection: {_id: false}})
        return post
    },
    async deletePostById(id: string): Promise<boolean> {
        const result = await postsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },
    async getPostsByBlogId(paginationData: PaginationQueryType, blogId: string): Promise<PaginationType<PostType[]>> {
        const page = paginationData.pageNumber
        const pageSize = paginationData.pageSize
        const totalCount = await postsCollection.countDocuments()
        const pagesCount = Math.ceil(totalCount / pageSize)
        const sortDirection: SortDirection = paginationData.sortDirection
        const sortBy = paginationData.sortBy
        const posts: PostType[] = await postsCollection
            .find({blogId: blogId}, {projection: {_id: 0}})
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .sort(sortBy, sortDirection)
            .toArray()
        return {pagesCount, pageSize, totalCount, page, items: posts}
    },
    async getAllPosts(paginationData: PaginationQueryType): Promise<PaginationType<PostType[]>> {
        // return postsCollection.find({}, {projection: {_id: false}}).toArray()
        const page = paginationData.pageNumber
        const pageSize = paginationData.pageSize
        const totalCount = await postsCollection.countDocuments()
        const pagesCount = Math.ceil(totalCount / pageSize)
        const sortDirection: SortDirection = paginationData.sortDirection
        const sortBy = paginationData.sortBy
        const posts: PostType[] = await
            postsCollection
                .find({}, {projection: {_id: 0}})
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .sort(sortBy, sortDirection)
                .toArray()
        console.log(posts)
        return {pagesCount, pageSize, totalCount, page, items: posts}
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean | null> {
        const result = await client.db("videos").collection<PostType>("posts").updateOne({id: id},
            {$set: {title: title, shortDescription: shortDescription, content: content, blogId: blogId}})
        return result.matchedCount === 1
    },
    async deleteAllPosts() {
        await postsCollection.deleteMany({})
        // posts.splice(0, posts.length)
    }
}