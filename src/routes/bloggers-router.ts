import {Request, Response, Router} from "express";

export const bloggersRouter = Router({})

bloggersRouter.get('/', (req:Request, res: Response) => {
    res.send(bloggers)
})

bloggersRouter.get('/:id', (req:Request, res: Response) => {
    let blogger = bloggers.find(p => p.id === +req.params.id)
    if(blogger) {
        res.send(blogger)
    } else {
        res.send(404)
    }
})

bloggersRouter.delete('/:id', (req:Request, res: Response) => {
    for(let i = 0; i < bloggers.length; i ++) {
        if(bloggers[i].id === +req.params.id) {
            bloggers.splice(i, 1)
            res.send(201)
            return;
        }
    }
    res.send(404)
})

bloggersRouter.post('/', (req:Request, res: Response) => {
    const newPost = {
        id: +(new Date()),
        title: req.body.title
    }
    bloggers.push(newPost)
    res.status(201).send(newPost)
})

bloggersRouter.put('/:id', (req:Request, res: Response) => {
    let blogger = bloggers.find(p => p.id === +req.params.id)
    if(blogger) {
        blogger.title = req.body.title
        res.send(blogger)
    } else {
        res.send(404)
    }
})