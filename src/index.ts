import * as dotenv from 'dotenv'
dotenv.config()
import express from "express"
import {blogsRouter} from "./routes/blogs-router";
import {postsRouter} from "./routes/posts-router";
import {testingRouter} from "./routes/testing-router";
import cors from "cors";
import {runDb} from "./repositories/db";
import {settings} from "./settings";

const app = express()

const port = settings.port

app.use(cors())
// const parserMiddleware = bodyParser()
const parserMiddleware = express.json()
app.use(parserMiddleware)

app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/testing', testingRouter)

const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`App started at port: ${port}`)
    })
}

startApp()