import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {body, param} from "express-validator";
import {inputValidationsMiddleware} from "../middlewares/input-validations-middlewares";
import {basicAuthorization} from "../middlewares/auth-middleware";
import {bloggersRepository} from "../repositories/bloggers-repository";

export const postsRouter = Router({})

const titleValidations = body('title').isString().trim().notEmpty().isLength({max: 30})
const shortDescriptionValidations = body('shortDescription').isString().trim().notEmpty().isLength({max: 100})
const contentValidations = body('content').isString().trim().notEmpty().isLength({max: 1000})
const blogIdValidations = body('blogId').isString().trim().notEmpty().custom(async (value) => {
    const blogger = await bloggersRepository.findBlogById(value)
    if (blogger) return true
    return false
})



postsRouter.get('/', (req: Request, res: Response) => {
    const findPosts = postsRepository.seePost()
    return res.status(200).send(findPosts)
})

postsRouter.get('/:id', (req: Request, res: Response) => {
    let post = postsRepository.findPostById(req.params.id)
    if (post) {
        return res.send(post)
    } else {
        return res.sendStatus(404)
    }
})

postsRouter.delete('/:id',
    basicAuthorization,
    (req: Request, res: Response) => {
        const isDeleted = postsRepository.deletePostById(req.params.id)
        if (isDeleted) {
            return res.sendStatus(204)
        } else {
            return res.sendStatus(404)
        }
    })

postsRouter.post('/',
    basicAuthorization,
    titleValidations,
    shortDescriptionValidations,
    contentValidations,
    blogIdValidations,
    inputValidationsMiddleware,
    (req: Request, res: Response) => {
        const newPost = postsRepository.createPost(req.body.title, req.body.shortDescription, req.body.content,
            req.body.blogId)
        return res.status(201).send(newPost)
    })

postsRouter.put('/:id',
    basicAuthorization,
    titleValidations,
    shortDescriptionValidations,
    contentValidations,
    blogIdValidations,
    inputValidationsMiddleware,
    async (req: Request, res: Response) => {
        const isUpdated = await postsRepository.updatePost(req.params.id, req.body.title, req.body.shortDescription,
            req.body.content, req.body.blogId)
        if (isUpdated) {
            const video = postsRepository.findPostById(req.params.id)
            return res.status(204).send(video)
        } else {
            return res.sendStatus(404)
        }
    })