import "./tracing";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "./controllers";


dotenv.config();

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
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
