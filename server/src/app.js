import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
const app = express();

dotenv.config();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(
  cors({
    origin: "https://donut-a-blog-website.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());

// import routes
import userRoutes from "./routes/user.routes.js";
import blogRoutes from "./routes/blogs.routes.js";
import authorRoutes from "./routes/authors.routes.js";
// routes
app.get("/", (req, res) => {
  res.status(200).json("Hello from Backend! Eat Donut");
});
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/author", authorRoutes);

export { app };
