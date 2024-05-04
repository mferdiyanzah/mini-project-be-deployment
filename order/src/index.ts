import express, { Express } from "express";
import orderRouter from "./routes/order.route";
import orderService from "./services/order.service";
const app: Express = express();

app.use(express.json());

app.use("/", orderRouter);

// app.post("/order", async (req, res) => {
//   await producer.connect();
//   console.log(req.body);

//   await producer.send({
//     topic: "inventory_topic",
//     messages: [{ value: JSON.stringify(req.body) }],
//   });
//   res.send("Order service is up and running");
// });


app.listen(3002, async () => {
  console.log("Order service listening on port 3002");
  await orderService.runOrder().catch(console.error);
});