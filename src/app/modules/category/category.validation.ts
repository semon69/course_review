import { z } from "zod";

const createCategotyValidation= z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Category name must be string',
        })
    })
})
export const categoryValidation = {
    createCategotyValidation
}