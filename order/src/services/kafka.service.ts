import kafka from "../libs/kafka";

const sendNotificationProducer = async (order: any) => {
  const producer = kafka.producer();
  await producer.connect();

  await producer.send({
    topic: "dxg-digicamp-microservices-test",
    messages: [{
      value: JSON.stringify(order),
      key: 'mfyz'
    }],
  });
}

const kafkaService = {
  sendNotificationProducer,
};

export default kafkaService;