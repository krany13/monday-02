import {Request, Response, Router} from "express";

export const postsRouter = Router({})




postsRouter.get('/', (req:Request, res: Response) => {
    res.send(posts)
})



postsRouter.get('/:id', (req:Request, res: Response) => {
    let post = posts.find(p => p.id === +req.params.id)
    if(post) {
        res.send(post)
    } else {
        res.send(404)
    }
})


postsRouter.delete('/:id', (req:Request, res: Response) => {
    for(let i = 0; i < posts.length; i ++) {
        if(posts[i].id === +req.params.id) {
            posts.splice(i, 1)
            res.send(201)
            return;
        }
    }
    res.send(404)
})

postsRouter.post('/', (req:Request, res: Response) => {
    const newPost = {
        id: +(new Date()),
        title: req.body.title
    }
    posts.push(newPost)
    res.status(201).send(newPost)
})

postsRouter.put('/:id', (req:Request, res: Response) => {
    let post = posts.find(p => p.id === +req.params.id)
    if(post) {
        post.title = req.body.title
        res.send(post)
    } else {
        res.send(404)
    }
})