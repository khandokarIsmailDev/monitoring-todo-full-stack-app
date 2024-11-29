import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "./controllers";

dotenv.config();

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.get("/health", (req, res) => {
  res.send("Server is healthy");
});

app.post("/todos", createTodo)
app.get("/todos", getAllTodos)
app.put("/todos", updateTodo)
app.delete("/todos", deleteTodo)

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
