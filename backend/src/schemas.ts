import { z } from "zod";

export const CreateTodoSchema = z.object({
    taskName: z.string().min(1),
    description: z.string().optional(),
    dueDate: z.string(),
    category: z.string(),
})

export const UpdateTodoSchema = z.object({
    id: z.number(),
    taskName: z.string().min(1),
    description: z.string().optional(),
    dueDate: z.string(),
    category: z.string(),
})