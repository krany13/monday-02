import express, {Request, Response} from "express"
import bodyParser from "body-parser"

const app = express()

const port =  process.env.PORT || 3000

const bloggers = [{id: 1 ,title: "Teddy Smith"}]
const posts = [{id: 2 ,title: "REST API C#"}]

const parserMiddleware = bodyParser()
app.use(parserMiddleware)

app.get('/bloggers', (req:Request, res: Response) => {
    res.send(bloggers)
})

app.get('/posts', (req:Request, res: Response) => {
    res.send(posts)
})

app.get('/bloggers/:id', (req:Request, res: Response) => {
    let blogger = bloggers.find(p => p.id === +req.params.id)
    if(blogger) {
        res.send(blogger)
    } else {
        res.send(404)
    }
})

app.get('/posts/:id', (req:Request, res: Response) => {
    let post = posts.find(p => p.id === +req.params.id)
    if(post) {
        res.send(post)
    } else {
        res.send(404)
    }
})

app.delete('/bloggers/:id', (req:Request, res: Response) => {
    for(let i = 0; i < bloggers.length; i ++) {
        if(bloggers[i].id === +req.params.id) {
            bloggers.splice(i, 1)
            res.send(201)
            return;
        }
    }
    res.send(404)
})

app.delete('/posts/:id', (req:Request, res: Response) => {
    for(let i = 0; i < posts.length; i ++) {
        if(posts[i].id === +req.params.id) {
            posts.splice(i, 1)
            res.send(201)
            return;
        }
    }
    res.send(404)
})

app.post('/posts', (req:Request, res: Response) => {
    const newPost = {
        id: +(new Date()),
        title: req.body.title
    }
    posts.push(newPost)
    res.status(201).send(newPost)
})

app.post('/bloggers', (req:Request, res: Response) => {
    const newPost = {
        id: +(new Date()),
        title: req.body.title
    }
    posts.push(newPost)
    res.status(201).send(newPost)
})

app.put('/bloggers/:id', (req:Request, res: Response) => {
    let blogger = bloggers.find(p => p.id === +req.params.id)
    if(blogger) {
        blogger.title = req.body.title
        res.send(blogger)
    } else {
        res.send(404)
    }
})




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
