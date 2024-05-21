import kafka from "../libs/kafka";

const notificationConsumer = kafka.consumer({ groupId: "notification-group" });

const runNotification = async () => {
  await notificationConsumer.connect();
  await notificationConsumer.subscribe({ topic: "inventory_topic", fromBeginning: true });

  await notificationConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (message.value) {
        console.log({
          topic,
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });
      }
    },
  });
};

export default runNotification;