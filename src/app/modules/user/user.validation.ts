import { z } from "zod";

const userSchemaZod = z.object({
  body: z.object({
    username: z.string(),
    password: z.string(),
    email: z.string(),
    role: z.enum(['user', 'admin']),
  }),
});

const loginUserSchemaZod = z.object({
  body: z.object({
    username: z.string(),
    password: z.string()
  }),
});

export const userValidation = {
    userSchemaZod,
    loginUserSchemaZod
}