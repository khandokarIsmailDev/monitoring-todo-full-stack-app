import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello World");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
