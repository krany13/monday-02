import {bloggersRepository} from "./bloggers-db-repository";

const posts: Array<postType> = [{
    id: "2", title: "REST API C#", shortDescription: "hello", content: "privet",
    blogId: "2", blogName: "test", createdAt: new Date()
}]

type postType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: Date
}

export const postsRepository = {
    async createPost(title: string, shortDescription: string, content: string, blogId: string): Promise<postType | null> {
        const dateNow: Date = new Date()
        const blog = await bloggersRepository.findBlogById(blogId)
        if (!blog) return null
        const newPost =
            {
                id: String(posts.length + 1),
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId,
                blogName: blog.name,
                createdAt: dateNow
            }
        posts.push(newPost)
        return newPost
    },
    findPostById(id: string): postType | null {
        let post = posts.find(v => v.id === id)
        return post ? post : null
    },
    deletePostById(id: string): boolean {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                posts.splice(i, 1)
                return true;
            }
        }
        return false;
    },
    getAllPosts(): postType[] {
        return posts
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean | null> {
        const blog = await bloggersRepository.findBlogById(blogId)
        if (!blog) return null
        let post = posts.find(v => v.id === id)
        // if (post) {
        //     post.title = title,
        //         post.shortDescription = shortDescription,
        //         post.content = content,
        //         post.blogId = blogId
        //     post.blogName = blog.name
        //     return true;
        // } else {
        //     return false;
        // }
        if (!post) return false
        post.title = title,
            post.shortDescription = shortDescription,
            post.content = content,
            post.blogId = blogId
        post.blogName = blog.name
        return true;

    },
    deleteAllPosts() {
        posts.splice(0, posts.length)
    }
}