import {NextFunction, Request, Response} from "express";

export const basicAuthorization = (req: Request, res: Response, next: NextFunction) => {
    const stdAuth = {login: "admin", password: "qwerty"}
    const auth = req.headers.authorization
    if (!auth) return res.sendStatus(401)
    const token = auth.split(" ")[1]
    const [login, password] = Buffer.from(token, 'base64').toString().split(':')
    const validHeader = `Basic ${login}:${password}`
    if(login !== stdAuth.login || password !== stdAuth.password) {
        return res.sendStatus(401)
    } else {
        next()
    }
}
// const auth = require('basic-auth')

// const basicAuthorization = async (req: any, res:any, next: NextFunction) => {
//     const user = await auth(req)
//
//     const username: string = 'admin'
//     const password: string = 'qwerty'
//
//     if(user && user.name.toLowerCase() === username.toLowerCase() && user.pass === password){
//         next()
//     } else {
//         res.status(401)
//     }
//
//
// }
// export default basicAuthorization