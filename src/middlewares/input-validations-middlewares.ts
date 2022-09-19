import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const inputValidationsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     const errorsToJson = JSON.parse(JSON.stringify(errors));
    //     let resultErrors = []
    //     for (let i = 0; i !== errorsToJson.errors.length; i++) {
    //         const error = errorsToJson.errors[i]
    //         resultErrors.push({"message": error.msg, "field": error.param})
    //     }
    //     return res.status(400).send({errorsMessages: resultErrors});
    // } else {
    //     next()
    // }
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        next()
    } else {
        const errorsOccurred = errors.array({onlyFirstError: true}).map(e => {
            return {
                message: e.msg,
                field: e.param
            }
        })
        return res.status(400).json(
            {
                "errorsMessages": errorsOccurred
            }
        )
    }
}