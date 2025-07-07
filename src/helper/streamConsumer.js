import { consumeMedia, createConsumeTransport } from "./mediasoupHelper";

let consumer = [];
let consumerTransport = [];

const setConsumer = (val) => {
  consumer = val;
};
const setConsumerTransport = (val) => {
  consumerTransport = val;
};

export const getStreamProducer = async (
  socket,
  device,
  classId,
  producerId
) => {
  try {
    const transport = await createConsumeTransport(
      socket,
      device,
      classId,
      setConsumerTransport
    );

    const { consumer, stream } = await consumeMedia(
      socket,
      device,
      classId,
      producerId,
      transport,
      setConsumer
    );

    return stream;
  } catch (error) {
    console.error("Error handling producer", producerId, error);
    return null;
  }
};

export const resumeStream = async (socket, classId, producerId) => {
  try {
    socket.emit(
      "resumePausedConsumers",
      { roomId: classId, producerId },
      ({ success }) => {
        console.log(success ? "Consumer resumed" : "Failed to resume consumer");
      }
    );
  } catch (error) {
    console.error("Error consumer resume", producerId, error);
    return null;
  }
};
