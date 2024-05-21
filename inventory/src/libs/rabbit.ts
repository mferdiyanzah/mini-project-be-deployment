import amqp from 'amqplib';

const rabbit = async () => {
  const connection = await amqp.connect('amqp://user:password@localhost');
  const channel = await connection.createChannel();
  return channel;
};

export default rabbit;