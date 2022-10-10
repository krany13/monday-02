import {blogsCollection, client} from "./db";
import {SortDirection} from "mongodb";
import {PaginationQueryType, PaginationType} from "../types/pagination-types";


export type BlogType = {
    id: string,
    name: string,
    youtubeUrl: string
    createdAt: Date
}

export const bloggersRepository = {
    async createBlog(newBlog: BlogType): Promise<BlogType> {
        await blogsCollection.insertOne({...newBlog})
        return newBlog
    },
    async findBlogById(id: string): Promise<BlogType | null> {
        let blogger: BlogType | null = await blogsCollection.findOne({id: id}, {projection: {_id: false}})
        return blogger
    },
    async deleteBlogById(id: string): Promise<boolean> {
        const result = await blogsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },
    async getAllBlogs(paginationData: PaginationQueryType): Promise<PaginationType<BlogType[]>> {
        const page = paginationData.pageNumber
        const pageSize = paginationData.pageSize
        const totalCount = await blogsCollection.countDocuments()
        const pagesCount = Math.ceil(totalCount / pageSize)
        const searchTerm = paginationData.searchNameTerm ? paginationData.searchNameTerm : "";
        const sortDirection: SortDirection = paginationData.sortDirection
        const sortBy = paginationData.sortBy
        const blogs: BlogType[] = await
        blogsCollection
            .find({"name": {$regex: searchTerm}}, {projection: {_id: 0}})
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .sort(sortBy, sortDirection)
            .toArray()
        return {pagesCount, pageSize, totalCount, page, items: blogs}
    },
    async updateBlog(id: string, name: string, youtubeUrl: string): Promise<boolean> {
        const result = await client.db("videos").collection<BlogType>("blogs").updateOne({id: id},
            {$set: {name: name, youtubeUrl: youtubeUrl}})
        return result.matchedCount === 1
    },

    async deleteAllBlogs() {
        // __bloggers.splice(0, __bloggers.length)
        await blogsCollection.deleteMany({})
    }
}