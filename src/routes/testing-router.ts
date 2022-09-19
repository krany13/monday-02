import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-repository";

export const testingRouter = Router({})


testingRouter.delete('/all-data', (req: Request, res:Response) => {
    const isAllDelete = postsRepository.deleteAllPosts()
    res.sendStatus(204)
})
