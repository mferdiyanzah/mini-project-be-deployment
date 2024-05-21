import express, { Express } from "express";
import orderRouter from "./routes/order.route";
import orderService from "./services/order.service";
import kafka from "./libs/kafka";
const app: Express = express();

app.use(express.json());

app.use("/", orderRouter);

// app.post("/check", async (req, res) => {
//   const producer = kafka.producer();
//   await producer.connect();
//   await producer.send({
//     topic: "inventory_check_topic",
//     messages: [{ value: JSON.stringify(req.body) }],
//   });
//   res.send("Order service is up and running");
// });

app.listen(3002, async () => {
  console.log("Order service listening on port 3002");
  // await orderService.runOrder().catch(console.error);
});