import {Request, Response, Router} from "express";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {postsRepository} from "../repositories/posts-repository";
import {body} from "express-validator";

export const postsRouter = Router({})

const titleValidations = body('title').isString().notEmpty().isLength({max: 30})
const shortDescriptionValidations = body('shortDescription').isString().notEmpty().isLength({max: 100})
const contentValidations = body('content').isString().notEmpty().isLength({max: 1000})
const blogIdValidations = body('blogId').isString().notEmpty()

postsRouter.get('/', (req:Request, res: Response) => {
    const findPosts = postsRepository.seePost()
    return res.status(200).send(findPosts)
})

postsRouter.get('/:id', (req:Request, res: Response) => {
    let post = postsRepository.findPostById(req.params.id)
    if (post) {
        return res.send(post)
    } else {
        return res.sendStatus(404)
    }
})

postsRouter.delete('/:id', (req:Request, res: Response) => {
    const isDeleted = postsRepository.deletePostById(req.params.id)
    if (isDeleted) {
        return res.sendStatus(204)
    } else {
        return res.sendStatus(404)
    }
})

postsRouter.post('/',
    titleValidations,
    shortDescriptionValidations,
    contentValidations,
    blogIdValidations,
    (req:Request, res: Response) => {
    const newPost = postsRepository.createPost(req.body.title, req.body.shortDescription, req.body.content,
        req.body.blogId)
    return res.status(201).send(newPost)
})

postsRouter.put('/:id',
    titleValidations,
    shortDescriptionValidations,
    contentValidations,
    blogIdValidations,
    (req:Request, res: Response) => {
    const isUpdated = postsRepository.updatePost(req.params.id, req.body.title, req.body.shortDescription,
        req.body.content, req.body.blogId)
    if (isUpdated) {
        const video = bloggersRepository.findBlogById(req.params.id)
        return res.status(204).send(video)
    } else {
        return res.sendStatus(404)
    }
})