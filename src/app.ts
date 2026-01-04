import expres from "express";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

const port = process.env.port;

const app = expres();

app.use(expres.json());

app.listen(port, () => {
  console.log("Server is running on port :", port);
});
