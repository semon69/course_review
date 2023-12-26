import { z } from "zod";

const reviewSchemaZod = z.object({
    body: z.object({
        courseId: z.string(),
        rating: z.number(),
        review: z.string()
    })
})
export const reviewValidation = {
    reviewSchemaZod
}