const bloggersQueryRepo = {
    getAllBlogs():BlogsOutputModel [] {
        const BlogType: BlogType[] = []
        const PostType: PostType[] = []
        return []
    }
}

type PostType = {
    _id: string,
    name: string,
    youtubeUrl: string,
    createdAt: Date
}

type BlogType = {
    _id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: Date
}

type BlogsOutputModel = {
    pagesCount: 0,
    page: 0,
    pageSize: 0,
    totalCount: 0,
    items: [
        {
            id: string,
            name: string,
            youtubeUrl: string,
            createdAt: Date
        }
    ]
}