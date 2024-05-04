import express, { Express } from "express";
import runInventory from "./services/inventory.service";
const app: Express = express();

app.use(express.json());



// const runKafka = async () => {
//   try {
//     await consumer.connect();

//     await consumer.subscribe({
//       topic: "inventory_topic",
//       fromBeginning: true,
//     });
//     await consumer.run({
//       eachMessage: async ({ topic, partition, message }) => {
//         console.log({
//           topic,
//           partition,
//           offset: message.offset,
//           value: String(message.value),
//         });
//       },
//     });
//   } catch (error) {
//     console.error('Error');
//   }
// }

app.listen(3003, async () => {
  console.log("Inventory service listening on port 3003");
  await runInventory().catch(console.error);
});