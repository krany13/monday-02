import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {bloggersRepository} from "../repositories/bloggers-repository";

export const testingRouter = Router({})


testingRouter.delete('/all-data', (req: Request, res:Response) => {
    const isAllDelete = postsRepository.deleteAllPosts()
    const isAllDeleted = bloggersRepository.deleteAllBlogs()
    res.sendStatus(204)
})
