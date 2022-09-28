import {bloggersRepository} from "./bloggers-db-repository";
import {postsCollection, client} from "./db";

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
        await postsCollection.insertOne({...newPost})
        // posts.push(newPost)
        return newPost
    },
    async findPostById(id: string): Promise <PostType | null> {
        let post: PostType | null = await postsCollection.findOne({id: id}, {projection: {_id: false}})
        return post
        // let post = await postsCollection.findOne({id: id}, {projection: {_id: false}})
        // return post ? post : null
    },
    async deletePostById(id: string): Promise<boolean> {
        const result = await postsCollection.deleteOne({id: id})
        return result.deletedCount === 1
        // for (let i = 0; i < posts.length; i++) {
        //     if (posts[i].id === id) {
        //         posts.splice(i, 1)
        //         return true;
        //     }
        // }
        // return false;
    },
    async getAllPosts(): Promise<PostType[]>{
        return postsCollection.find({}, {projection: {_id: false}}).toArray()
        // return posts
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean | null> {
        const result =  await client.db("videos").collection<PostType>("posts").updateOne({id: id},
            {$set: {title: title, shortDescription: shortDescription, content: content, blogId:blogId}})
        return result.matchedCount === 1
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
        await postsCollection.deleteMany({})
        // posts.splice(0, posts.length)
    }
}