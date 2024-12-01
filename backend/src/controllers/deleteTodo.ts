import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import { DeleteTodoSchema } from "../schemas";
import { trace } from "../trace";

export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  const span = trace.getTracer("todo-service").startSpan("deleteTodo")
  console.log("span started", span)
  try {
    
    const parsedBody = DeleteTodoSchema.safeParse(req.body);
    if (!parsedBody.success) {
      res.status(400).json({
        message: "Invalid request body",
        error: parsedBody.error.errors,
      });
      return;
    }

    const deletedTodo = await prisma.todo.delete({
      where: {
        id: parsedBody.data.id,
      },
    });

    res.status(200).json({
      message: "Todo deleted successfully",
      deletedTodo,
    });
    return;
  } catch (err) {
    span.recordException(err as Error)
    next(err);
  }finally{
    span.end()
    console.log("span ended", span)
  }
};

export default deleteTodo;
