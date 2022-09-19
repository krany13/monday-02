import {Request, Response, Router} from "express";
import {bloggersRepository} from "../repositories/bloggers-repository";

export const testingRouter = Router({})


testingRouter.delete('/all-data', (req: Request, res:Response) => {
    const isAllDelete = bloggersRepository.deleteAllBlogs()
    res.sendStatus(204)
})
