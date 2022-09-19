import {Request, Response, Router} from "express";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {body} from "express-validator";
import {type} from "os";

export const bloggersRouter = Router({})

const titleValidations = body('title').isString().notEmpty().isLength({max: 15})
const urlValidations = body('youtubeUrl').isString().notEmpty().isLength({max: 100}).isURL()
bloggersRouter.get('/', (req:Request, res: Response) => {
    const findBlogs = bloggersRepository.seeBlog()
    return res.status(200).send(findBlogs)
})

bloggersRouter.get('/:id', (req:Request, res: Response) => {
    let blog = bloggersRepository.findBlogById(req.params.id)
    if (blog) {
        return res.send(blog)
    } else {
        return res.sendStatus(404)
    }
})

bloggersRouter.delete('/:id', (req:Request, res: Response) => {
    const isDeleted = bloggersRepository.deleteBlogById(req.params.id)
    if (isDeleted) {
        return res.sendStatus(204)
    } else {
        return res.sendStatus(404)
    }
})

bloggersRouter.post('/',
    titleValidations,
    urlValidations,
    (req:Request, res: Response) => {
    const newBlog = bloggersRepository.createBlog(req.body.name, req.body.youtubeUrl)
    return res.status(201).send(newBlog)
})

bloggersRouter.put('/:id',
    titleValidations,
    urlValidations,
    (req:Request, res: Response) => {
    const isUpdated = bloggersRepository.updateBlog(req.params.id, req.body.name, req.body.youtubeUrl)
    if (isUpdated) {
        const video = bloggersRepository.findBlogById(req.params.id)
        return res.status(204).send(video)
    } else {
        return res.sendStatus(404)
    }
})