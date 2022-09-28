import {bloggersRepository, BlogType} from "../repositories/bloggers-db-repository";


export const bloggersService = {
    async createBlog(name: string, youtubeUrl: string): Promise<BlogType> {
        const dateNow: Date = new Date()
        const newBlog =
            {
                id: String(+dateNow),
                name: name,
                youtubeUrl,
                createdAt: dateNow
            }
        const createdBlogs = await bloggersRepository.createBlog(newBlog)
        return createdBlogs
    },
    async findBlogById(id: string): Promise<BlogType | null> {
        return bloggersRepository.findBlogById(id)
    },
    async deleteBlogById(id: string): Promise<boolean> {
        return await bloggersRepository.deleteBlogById(id)
        // const result = await blogsCollection.deleteOne({id: id})
        // return result.deletedCount === 1
    },
    async getAllBlogs(): Promise<BlogType[]> {
        return bloggersRepository.getAllBlogs()
    },
    async updateBlog(id: string, name: string, youtubeUrl: string): Promise<boolean> {
        return await bloggersRepository.updateBlog(id, name, youtubeUrl)
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
        // await blogsCollection.deleteMany({})
        return await bloggersRepository.deleteAllBlogs()
    }
}