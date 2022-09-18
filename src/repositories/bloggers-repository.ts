const bloggers: Array<blogType> = [{id: 1 ,name: "Teddy Smith", youtubeUrl: "retwertert.com"}]

type blogType = {
    id: number,
    name: string,
    youtubeUrl: string
}

export const bloggersRepository = {
    createBlog(id: number, name: string, youtubeUrl: string) {
        const newBlog =
            {
                id: id,
                name: name,
                youtubeUrl: youtubeUrl
            }
        bloggers.push(newBlog)
        return newBlog
    },
    findBlogById(id: number) {
        let blogger = bloggers.find(v => v.id === id)
        return blogger
    },
    deleteBlogById(id: number) {
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
    updateBlog(id: number, name: string, youtubeUrl: string) {
        let blogger = bloggers.find(v => v.id === id)
        if (blogger) {
            blogger.name = name,
                blogger.youtubeUrl = youtubeUrl
            return true;
        } else {
            return false;
        }

    }
}