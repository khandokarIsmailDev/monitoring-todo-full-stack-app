import { Request, Response,NextFunction } from "express";
import { CreateTodoSchema } from "../schemas";
import prisma from "../prisma";
export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
    try{
        //validate request body
        const parsedBody = CreateTodoSchema.safeParse(req.body)
        if(!parsedBody.success){
            res.status(400).json({
                message: "Invalid request body",
                error: parsedBody.error.errors
            })
            return;
        }

        //create todo
        const todo = await prisma.todo.create({
            data: parsedBody.data
        })
        console.log("Todo created successfully", todo)
        res.status(201).json({
            message: "Todo created successfully",
            todo
        })
        return;



    }catch(err){
        next(err)
    }
}

export default createTodo;