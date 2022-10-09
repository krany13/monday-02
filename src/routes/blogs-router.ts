import {Request, Response, Router} from "express";
import {bloggersService} from "../domain/bloggers-service";
import {body} from "express-validator";
import {inputValidationsMiddleware} from "../middlewares/input-validations-middlewares";
import {basicAuthorization} from "../middlewares/auth-middleware";

export const blogsRouter = Router({})

const nameValidations = body('name').isString().trim().not().isEmpty().isLength({max: 15})
const urlValidations = body('youtubeUrl').isString().trim().notEmpty().isLength({max: 100}).matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+$/)

blogsRouter.get('/', async (req: Request, res: Response) => {
    // const page = req.query.page
    const findBlogs = await bloggersService.getAllBlogs()
    return res.status(200).send(findBlogs)
})

blogsRouter.get('/:id', async (req: Request, res: Response) => {
    let blog = await bloggersService.findBlogById(req.params.id)
    if (blog) {
        return res.send(blog)
    } else {
        return res.sendStatus(404)
    }
})

blogsRouter.delete('/:id',
    basicAuthorization,
    async (req: Request, res: Response) => {
        const isDeleted = await bloggersService.deleteBlogById(req.params.id)
        if (isDeleted) {
            return res.sendStatus(204)
        } else {
            return res.sendStatus(404)
        }
    })

blogsRouter.post('/',
    basicAuthorization,
    nameValidations,
    urlValidations,
    inputValidationsMiddleware,
    async (req: Request, res: Response) => {
        const newBlog = await bloggersService.createBlog(req.body.name, req.body.youtubeUrl)
        res.status(201).send(newBlog)
    })

blogsRouter.put('/:id',
    basicAuthorization,
    nameValidations,
    urlValidations,
    inputValidationsMiddleware,
    async (req: Request, res: Response) => {
        const isUpdated = await bloggersService.updateBlog(req.params.id, req.body.name, req.body.youtubeUrl)
        if (isUpdated) {
            const video = await bloggersService.findBlogById(req.params.id)
            return res.status(204).send(video)
        } else {
            return res.sendStatus(404)
        }
    })