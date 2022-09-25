import {bloggersRepository} from "./bloggers-repository";

const posts: Array<postType> = [{id: "2" ,title: "REST API C#", shortDescription: "hello", content: "privet",
blogId: "2", blogName: "test", createdAt: new Date()}]

type postType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string | null,
    createdAt: Date
}

export const postsRepository = {
    createPost(title: string, shortDescription: string, content: string, blogId: string) {
        const dateNow: Date = new Date()
        const blog = bloggersRepository.findBlogById(blogId)
        const newPost =
            {
                id: String(posts.length + 1),
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId,
                blogName: blog!.name,
                createdAt: dateNow
            }
        posts.push(newPost)
        return newPost
    },
    findPostById(id: string) {
        let post = posts.find(v => v.id === id)
        return post
    },
    deletePostById(id: string) {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                posts.splice(i, 1)
                return true;
            }
        }
        return false;
    },
    seePost() {
        return posts
    },
    updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string) {
        const blog = bloggersRepository.findBlogById(blogId)
        let post = posts.find(v => v.id === id)
        if (post) {
            post.title = title,
            post.shortDescription = shortDescription,
            post.content = content,
            post.blogId = blogId
            post.blogName = blog!.name
            return true;
        } else {
            return false;
        }
    },
    deleteAllPosts() {
        posts.splice(0, posts.length)
    }
}