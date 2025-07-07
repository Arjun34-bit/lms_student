let existingConsumerTransport = null;

export function createConsumeTransport(
  socket,
  device,
  roomId,
  setConsumerTransport
) {
  if (existingConsumerTransport)
    return Promise.resolve(existingConsumerTransport);
  return new Promise((resolve, reject) => {
    socket.emit("createTransport", { roomId, sender: false }, ({ params }) => {
      if (params?.error) return reject(params.error);

      const transport = device.createRecvTransport(params);
      existingConsumerTransport = transport;
      setConsumerTransport(transport);

      let alreadyConnected = false;

      transport.on("connect", ({ dtlsParameters }, callback, errback) => {
        if (alreadyConnected) {
          console.warn("Transport connect() already called");
          return;
        }
        alreadyConnected = true;
        if (transport._connectionState === "connected") {
          console.warn("Consumer transport already connected");
          return;
        }

        socket.emit(
          "connectConsumerTransport",
          { roomId, dtlsParameters },
          ({ success, error }) => {
            if (error) {
              console.error("Transport connect failed:", error);
              errback(error);
            } else {
              callback();
            }
          }
        );
      });

      transport.on("connectionstatechange", (state) => {
        if (state === "failed" || state === "closed") {
          console.warn("Consumer transport closed or failed.");
          transport.close();
        }
      });

      resolve(transport);
    });
  });
}

export function consumeMedia(
  socket,
  device,
  roomId,
  producerId,
  recvTransport,
  setConsumer
) {
  return new Promise((resolve, reject) => {
    socket.emit(
      "consumeMedia",
      {
        roomId,
        rtpCapabilities: device.rtpCapabilities,
        producerId,
      },
      async ({ params }) => {
        if (!params || params.error) {
          const errMsg = params?.error || "Error during media consumption";
          return reject(new Error(errMsg));
        }

        try {
          const consumer = await recvTransport.consume({
            id: params.id,
            producerId: params.producerId,
            kind: params.kind,
            rtpParameters: params.rtpParameters,
          });

          setConsumer(consumer);
          const stream = new MediaStream([consumer.track]);
          resolve({ consumer, stream });
        } catch (err) {
          reject(err);
        }
      }
    );
  });
}
