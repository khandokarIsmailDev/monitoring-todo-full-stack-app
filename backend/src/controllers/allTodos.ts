import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";
import { trace } from "../trace";

export const getAllTodos = async (req: Request, res: Response, next: NextFunction) => {
    const span = trace.getTracer("todo-service").startSpan("getAllTodos")
    console.log("span started", span)
    try{
        const todos  = await prisma.todo.findMany()
        res.status(200).json({
            message: "Todos fetched successfully",
            todos
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

export default getAllTodos;