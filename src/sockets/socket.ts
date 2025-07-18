import socketio from "socket.io";
import { Server } from "socket.io";
import cookie from "cookie";

export const initSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log(`Client connected :${socket.id}`);
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      socket.to(roomId).emit("userJoined", socket.id);
    });
    socket.on("sendMessage", ({ roomId, message }) => {
      io.to(roomId).emit("receiveMessage", { sender: socket.id, message });
    });
    socket.on("disconnect", () => {
      console.log(`Disconnected `, socket.id);
    });
  });
};
