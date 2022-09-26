import {BlogType} from "./bloggers-db-repository";


const bloggers: Array<BlogType> = [{id: "1" ,name: "Teddy Smith", youtubeUrl: "chain.com", createdAt: new Date()}]


export const bloggersRepository = {
    async createBlog(name: string, youtubeUrl: string) : Promise<BlogType>{
        const dateNow: Date = new Date()
        const newBlog =
            {
                id: String(bloggers.length + 1),
                name: name,
                youtubeUrl,
                createdAt: dateNow
            }
        bloggers.push(newBlog)
        return newBlog
    },
    async findBlogById(id: string): Promise<BlogType | null>{
        let blogger = bloggers.find(v => v.id === id)
        return blogger!
    },
    async deleteBlogById(id: string) : Promise<boolean>{
        for (let i = 0; i < bloggers.length; i++) {
            if (bloggers[i].id === id) {
                bloggers.splice(i, 1)
                return true;
            }
        }
        return false;
    },
    async seeBlog() : Promise<BlogType[]>{
        return bloggers
    },
    async updateBlog(id: string, name: string, youtubeUrl: string) : Promise<boolean>{
        let blogger = bloggers.find(v => v.id === id)
        if (blogger) {
            blogger.name = name,
                blogger.youtubeUrl = youtubeUrl
            return true;
        } else {
            return false;
        }
    },
    deleteAllBlogs() {
        bloggers.splice(0, bloggers.length)
    }
}