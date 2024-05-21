import express, { Express } from "express";
import runNotification from "./services/kafka.service";
const app: Express = express();

app.use(express.json());

app.listen(3004, async () => {
  console.log("Inventory service listening on port 3003");
  await runNotification().catch(console.error);
});