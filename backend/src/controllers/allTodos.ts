import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";

export const getAllTodos = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const todos  = await prisma.todo.findMany()
        res.status(200).json({
            message: "Todos fetched successfully",
            todos
        })
        return;
    }catch(err){
        next(err)
    }
}

export default getAllTodos;