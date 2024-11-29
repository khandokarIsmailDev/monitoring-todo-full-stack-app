import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import { DeleteTodoSchema } from "../schemas";

export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
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
    next(err);
  }
};

export default deleteTodo;
