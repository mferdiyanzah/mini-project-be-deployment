interface Queue {
  queue: string;
}

interface Channel {
  assertQueue: (queue: string, options: { exclusive: boolean }) => Promise<Queue>;
  sendToQueue: (queue: string, content: Buffer, options: { replyTo: string }) => void;
  consume: (queue: string, callback: (message: any) => void) => void;
  deleteQueue: (queue: string) => void;
}

export { Queue, Channel };