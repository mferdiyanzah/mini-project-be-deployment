import express, { Express } from "express";
import producerKafka from "./utils/producer";
import consumerKafka from "./utils/consumer";

const app: Express = express();

app.get("/", (req, res) => {
  res.send("Hello from order service");
});


app.listen(3002, () => {
  console.log("Order service listening on port 3002");
});