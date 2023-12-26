import { z } from 'zod';

const tagsSchemaZod = z.object({
  name: z.string(),
  isDeleted: z.boolean(),
});

const detailsSchemaZod = z.object({
  level: z.string(),
  description: z.string(),
});

const courseSchemaZod = z
  .object({
    body: z.object({
      title: z.string(),
      instructor: z.string(),
      categoryId: z.string(),
      price: z.number().positive(),
      tags: z.array(tagsSchemaZod),
      startDate: z.string(),
      endDate: z.string(),
      language: z.string(),
      provider: z.string(),
      details: detailsSchemaZod,
    }),
  })

const updateTagsSchemaZod = z
  .object({
    name: z.string().optional(),
    isDeleted: z.boolean().optional(),
  })
  .optional();

const updateDetailsSchemaZod = z
  .object({
    level: z.string().optional(),
    description: z.string().optional(),
  })
  .optional();

const updateCourseSchemaZod = z.object({
  body: z.object({
    title: z.string().optional(),
    instructor: z.string().optional(),
    categoryId: z.string().optional(),
    price: z.number().positive().optional(),
    tags: z.array(updateTagsSchemaZod).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    language: z.string().optional(),
    provider: z.string().optional(),
    details: updateDetailsSchemaZod.optional(),
  }),
});

export const courseValidation = {
  courseSchemaZod,
  updateCourseSchemaZod,
};
