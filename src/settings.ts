

export const settings ={
    port: parseInt(process.env.PORT!, 10)  || 5000,
    mongoURI: process.env.mongoURI || "mongodb://localhost:27017"
}