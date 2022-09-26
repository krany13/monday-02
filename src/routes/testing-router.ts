import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {bloggersRepository} from "../repositories/bloggers-repository";

export const testingRouter = Router({})


testingRouter.delete('/all-data', async (req: Request, res:Response) => {
    postsRepository.deleteAllPosts()
    await bloggersRepository.deleteAllBlogs()
    return res.sendStatus(204)
})
