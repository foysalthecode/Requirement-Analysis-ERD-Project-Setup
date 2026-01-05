import expres from "express";
import { postRouter } from "./modules/posts/post.router";

const app = expres();

app.use(expres.json());

app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Hello world!!");
});

export default app;
