const posts: Array<postType> = [{id: "2" ,title: "REST API C#", shortDescription: "hello", content: "privet",
blogId: "2", blogName: "test"}]

type postType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
}

export const postsRepository = {
    createPost(id: string, title: string, shortDescription: string, content: string, blogId: string, blogName: string) {
        const newPost =
            {
                id: id,
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId,
                blogName: blogName
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
        let post = posts.find(v => v.id === id)
        if (post) {
            post.title = title,
                post.shortDescription = shortDescription,
                post.content = content,
                post.blogId = blogId
            return true;
        } else {
            return false;
        }

    }
}