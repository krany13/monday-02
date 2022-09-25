import express, {Request, Response} from "express"
import bodyParser from "body-parser"
import {blogsRouter} from "./routes/blogs-router";
import {postsRouter} from "./routes/posts-router";
import {testingRouter} from "./routes/testing-router";
import {basicAuthorization} from "./middlewares/auth-middleware";
import cors from "cors";
import {runDb} from "./repositories/db";

const app = express()

const port =  process.env.PORT || 5000

app.use(cors())
// const parserMiddleware = bodyParser()
const parserMiddleware = express.json()
app.use(parserMiddleware)

app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/testing', testingRouter)

const  startApp = async () => {
  await runDb()
    app.listen(port, () => {
        console.log(`App started at port: ${port}`)
    })
}

startApp()