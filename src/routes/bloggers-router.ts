import {Request, Response, Router} from "express";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {body} from "express-validator";
import {inputValidationsMiddleware} from "../middlewares/input-validations-middlewares";
import {basicAuthorization} from "../middlewares/auth-middleware";

export const bloggersRouter = Router({})

const nameValidations = body('name').isString().notEmpty().isLength({max: 15})
const urlValidations = body('youtubeUrl').isString().withMessage('1').trim().notEmpty().withMessage('2').isLength({max: 100}).withMessage('3').matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+$/).withMessage('4')
bloggersRouter.get('/', (req: Request, res: Response) => {
    const findBlogs = bloggersRepository.seeBlog()
    return res.status(200).send(findBlogs)
})

bloggersRouter.get('/:id', (req: Request, res: Response) => {
    let blog = bloggersRepository.findBlogById(req.params.id)
    if (blog) {
        return res.send(blog)
    } else {
        return res.sendStatus(404)
    }
})

bloggersRouter.delete('/:id',
    basicAuthorization,
    (req: Request, res: Response) => {
        const isDeleted = bloggersRepository.deleteBlogById(req.params.id)
        if (isDeleted) {
            return res.sendStatus(204)
        } else {
            return res.sendStatus(404)
        }
    })

bloggersRouter.post('/',
    nameValidations,
    urlValidations,
    inputValidationsMiddleware,
    (req: Request, res: Response) => {
        const newBlog = bloggersRepository.createBlog(req.body.name, req.body.youtubeUrl)
        res.status(201).send(newBlog)
    })

bloggersRouter.put('/:id',
    basicAuthorization,
    nameValidations,
    urlValidations,
    inputValidationsMiddleware,
    (req: Request, res: Response) => {
        const isUpdated = bloggersRepository.updateBlog(req.params.id, req.body.name, req.body.youtubeUrl)
        if (isUpdated) {
            const video = bloggersRepository.findBlogById(req.params.id)
            return res.status(204).send(video)
        } else {
            return res.sendStatus(404)
        }
    })