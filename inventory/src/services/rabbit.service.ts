import rabbit from "../libs/rabbit";
import inventoryService from "./inventory.service";

const inventoryCheckingConsumer = async () => {
  const rabbitMQ = await rabbit();
  await rabbitMQ.assertQueue('inventory_check_queue');

  rabbitMQ.consume('inventory_check_queue', async (message) => {
    if (message !== null) {
      const order = JSON.parse(message.content.toString());
      // const orderResponse = await inventoryService.checkProduct(order);
      const orderResponse = {
        isAvailable: true,
      }
      rabbitMQ.sendToQueue(
        message.properties.replyTo,
        Buffer.from(JSON.stringify(orderResponse)),
      );
    }
  });
}

const reduceProductConsumer = async () => {
  const rabbitMQ = await rabbit();
  await rabbitMQ.assertQueue('reduce_product_queue');

  rabbitMQ.consume('reduce_product_queue', async (message) => {
    if (message !== null) {
      const order = JSON.parse(message.content.toString());
      inventoryService.reduceProduct(order);
    }
  });
}

const rabbitConsumer = async () => {
  await inventoryCheckingConsumer();
  await reduceProductConsumer();
}

export default rabbitConsumer;