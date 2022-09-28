import {MongoClient} from "mongodb";
import {settings} from "../settings";
import {BlogType} from "./bloggers-db-repository";
import {PostType} from "./posts-db-repository";


const mongoURI = settings.mongoURI

export const client = new MongoClient(mongoURI)

export const blogsCollection = client.db("videos").collection<BlogType>("blogs")
export const postsCollection = client.db("videos").collection<PostType>("posts")


export async function runDb() {
    try {
        await client.connect()
        console.log(`Connected successfully to mongo server`)
    } catch (error) {
        console.log("Can't connect to db")
        console.log(error)
        await client.close()
    }
}
