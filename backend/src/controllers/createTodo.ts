import { Request, Response,NextFunction } from "express";
import { CreateTodoSchema } from "../schemas";
import prisma from "../prisma";
import { trace } from "../trace";


export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
    const span = trace.getTracer("todo-service").startSpan("createTodo")
    console.log("span started", span)

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
        span.recordException(err as Error)
        next(err)
    }finally{
        span.end()
        console.log("span ended", span)
    }
}

export default createTodo;