import express, {Request, Response} from "express"
import bodyParser from "body-parser"
import {bloggersRouter} from "./routes/bloggers-router";
import {postsRouter} from "./routes/posts-router";
import {testingRouter} from "./routes/testing-router";
import {basicAuthorization} from "./middlewares/auth-middleware";
import cors from "cors";

const app = express()

const port =  process.env.PORT || 5000

app.use(cors())
// const parserMiddleware = bodyParser()
const parserMiddleware = express.json()
app.use(parserMiddleware)

app.use('/blogs', bloggersRouter)
app.use('/posts', postsRouter)
app.use('/testing', testingRouter)

app.listen(port, () => {
})
