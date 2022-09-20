const bloggers: Array<blogType> = [{id: "1" ,name: "Teddy Smith", youtubeUrl: "chain.com"}]

type blogType = {
    id: string,
    name: string,
    youtubeUrl: string
}

export const bloggersRepository = {
    createBlog(name: string, youtubeUrl: string) {
        const newBlog =
            {
                id: String(bloggers.length + 1),
                name: name,
                youtubeUrl,
            }
        bloggers.push(newBlog)
        return newBlog
    },
    findBlogById(id: string) {
        let blogger = bloggers.find(v => v.id === id)
        return blogger
    },
    deleteBlogById(id: string) {
        for (let i = 0; i < bloggers.length; i++) {
            if (bloggers[i].id === id) {
                bloggers.splice(i, 1)
                return true;
            }
        }
        return false;
    },
    seeBlog() {
        return bloggers
    },
    updateBlog(id: string, name: string, youtubeUrl: string) {
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