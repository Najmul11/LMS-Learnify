import { Server as SocketIOServer } from "socket.io";
import { Server } from "http";

export const initSocket = (server: Server) => {
  const io = new SocketIOServer(server);

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("notification", (data) => {
      io.emit("newNotification", data);
    });

    socket.on("disconnect", () => {
      console.log("a user disconnected");
    });
  });
};
