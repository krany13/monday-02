import {bloggersRepository, BlogType} from "../repositories/bloggers-db-repository";
import {postsRepository, PostType} from "../repositories/posts-db-repository";
import {PaginationQueryType, PaginationType} from "../types/pagination-types";
// const posts: Array<PostType> = [{
//     id: "2", title: "REST API C#", shortDescription: "hello", content: "privet",
//     blogId: "2", blogName: "test", createdAt: new Date()
// }]

// export type PostType = {
//     id: string,
//     title: string,
//     shortDescription: string,
//     content: string,
//     blogId: string,
//     blogName: string,
//     createdAt: Date
// }

export const postsService = {
    async createPost(title: string, shortDescription: string, content: string, blogId: string): Promise<PostType | null> {
        const dateNow: Date = new Date()
        const blog = await bloggersRepository.findBlogById(blogId)
        if (!blog) return null
        const newPost =
            {
                id: String(+dateNow),
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId,
                blogName: blog.name,
                createdAt: dateNow
            }
        const createdPosts = await postsRepository.createPost(newPost)
        return createdPosts
    },
    async findPostById(id: string): Promise <PostType | null> {
        return postsRepository.findPostById(id)
        // let post = await postsCollection.findOne({id: id}, {projection: {_id: false}})
        // return post ? post : null
    },
    async deletePostById(id: string): Promise<boolean> {
        return await postsRepository.deletePostById(id)
        // for (let i = 0; i < posts.length; i++) {
        //     if (posts[i].id === id) {
        //         posts.splice(i, 1)
        //         return true;
        //     }
        // }
        // return false;
    },
    async getAllPosts(queryData: PaginationQueryType): Promise<PaginationType<PostType[]>>{
        return await postsRepository.getAllPosts(queryData)
        // return posts
    },
    async getPostsByBlogId(queryData: PaginationQueryType, blogId: string): Promise<PaginationType<PostType[]>>{
        return postsRepository.getPostsByBlogId(queryData, blogId)
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean | null> {
        return await postsRepository.updatePost(id, title, shortDescription, content, blogId)
        // if (!blog) return null
        // let post = posts.find(v => v.id === id)
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
        // if (!post) return false
        // post.title = title,
        //     post.shortDescription = shortDescription,
        //     post.content = content,
        //     post.blogId = blogId
        // post.blogName = blog.name
        // return true;

    },
    async deleteAllPosts() {
        return await postsRepository.deleteAllPosts()
        // posts.splice(0, posts.length)
    }
}