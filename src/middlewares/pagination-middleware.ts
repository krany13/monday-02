import {query} from "express-validator";

export const paginationValidationRules = [
query('pageNumber').isInt(),
query('pageSize').isInt()
]