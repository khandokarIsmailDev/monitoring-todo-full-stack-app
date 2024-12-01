import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import { UpdateTodoSchema } from "../schemas";
import { trace } from "../trace";

export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const span = trace.getTracer("todo-service").startSpan("updateTodo")
  console.log("span started", span)
  try {
    //validate request body
    const parsedBody = UpdateTodoSchema.safeParse(req.body);
    if (!parsedBody.success) {
      res.status(400).json({
        message: "Invalid request body",
        error: parsedBody.error.errors,
      });
      return;
    }

    //update todo
    const updatedTodo = await prisma.todo.update({
      where: {
        id: parsedBody.data.id,
      },
      data: { ...parsedBody.data },
    });

    res.status(200).json({
      message: "Todo updated successfully",
      updatedTodo,
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

export default updateTodo;
