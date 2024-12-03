import { z } from "zod";

export const CreateTodoSchema = z.object({
    id: z.string(),
    taskName: z.string().min(1),
    description: z.string().optional(),
    dueDate: z.string(),
    category: z.string(),
})

export const UpdateTodoSchema = z.object({
    id: z.string(),
    taskName: z.string().min(1),
    description: z.string().optional(),
    dueDate: z.string(),
    category: z.string(),
})

export const DeleteTodoSchema = z.object({
    id: z.string(),
})
