import express from "express";

import dotenv from "dotenv";
import router from "./routes/user.route";


dotenv.config();
const app = express();

app.use(express.json());

app.use("/", router);

app.get("/health", (req, res) => {
  res.send("OK");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

export default app;
