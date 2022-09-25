import {MongoClient} from "mongodb";

const mongoURI = process.env.mongoURI || "mongodb://localhost:27017/"

export const client = new MongoClient(mongoURI)

export async function runDb() {
    try {
        await client.connect()

        await client.db("bloggers").command({ping: 1})
        console.log("Connected successfully to mongo server")
    } catch {
        console.log("Can't connect to db")
        await client.close()
    }
}

//TODO в postsRepository добавить createAt
//TODO переписать Blogs под монгошку