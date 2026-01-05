import expres from "express";
import { postRouter } from "./modules/posts/post.router";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app = expres();
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(expres.json());

app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Prisma Blog Application Server!!");
});

export default app;
