import kafka from "../libs/kafka";

const kafkaConsumer = async () => {
  const consumer = kafka.consumer({
    groupId: "inventory-group",
  });

  await consumer.connect();
  await consumer.subscribe({ topic: "dxg-digicamp-microservices-test" });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (message.value !== null && message.key !== null) {
        if (message.key.toString() === "mfyz") {
          const order = JSON.parse(message.value.toString());
          console.log(order);
        }
      }
    },
  });
};

const kafkaService = {
  kafkaConsumer,
};

export default kafkaService;