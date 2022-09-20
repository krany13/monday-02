import express, {Request, Response} from "express"
import bodyParser from "body-parser"
import {bloggersRouter} from "./routes/bloggers-router";
import {postsRouter} from "./routes/posts-router";
import {testingRouter} from "./routes/testing-router";

const app = express()

const port =  process.env.PORT || 5000

const parserMiddleware = bodyParser()
app.use(parserMiddleware)

app.use('/bloggers', bloggersRouter)
app.use('/posts', postsRouter)
app.use('/testing', testingRouter)
app.use('/testingv2', testingRouter)

app.listen(port, () => {
})
