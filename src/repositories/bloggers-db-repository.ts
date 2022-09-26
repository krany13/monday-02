import {blogsCollection, client} from "./db";

// const __bloggers: Array<BlogType> = [{id: "1", name: "Teddy Smith", youtubeUrl: "chain.com", createdAt: new Date()}]

export type BlogType = {
    id: string,
    name: string,
    youtubeUrl: string
    createdAt: Date
}

export const bloggersRepository = {
    async createBlog(name: string, youtubeUrl: string): Promise<BlogType> {
        const dateNow: Date = new Date()
        const newBlog =
            {
                id: String(+dateNow),
                name: name,
                youtubeUrl,
                createdAt: dateNow
            }
        await blogsCollection.insertOne(newBlog)
        // __bloggers.push(newBlog)
        return newBlog
    },
    async findBlogById(id: string): Promise<BlogType | null> {
        let blogger: BlogType | null = await blogsCollection.findOne({id: id})
        return blogger
    },
    async deleteBlogById(id: string): Promise<boolean> {
        const result = await blogsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },
    async seeBlog(): Promise<BlogType[]> {
        return blogsCollection.find({}).toArray()
    },
    async updateBlog(id: string, name: string, youtubeUrl: string): Promise<boolean> {
        const result = await client.db("videos").collection<BlogType>("blogs").updateOne({id: id},
            {$set: {name: name, youtubeUrl: youtubeUrl}})
        return result.matchedCount === 1
        //
        // let blogger = __bloggers.find(v => v.id === id)
        // if (blogger) {
        //     blogger.name = name,
        //     blogger.youtubeUrl = youtubeUrl
        //     return true;
        // } else {
        //     return false;
        // }
    },
    async deleteAllBlogs() {
        // __bloggers.splice(0, __bloggers.length)
        await blogsCollection.deleteMany({})
    }
}