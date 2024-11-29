import { z } from "zod";

export const CreateTodoSchema = z.object({
    taskName: z.string().min(1),
    description: z.string().optional(),
    dueDate: z.date(),
    category: z.string(),
})
