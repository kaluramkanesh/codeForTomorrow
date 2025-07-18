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
        // console.log("message receive in backend ",message)
      io.to(roomId).emit("receiveMessage", { sender: socket.id, message });
    });
    socket.on("disconnect", () => {
      console.log(`Disconnected `, socket.id);
    });
  });
};

// import { Server, Socket } from "socket.io";
// import jwt from "jsonwebtoken";
// import cookie from "cookie";
// import { prisma } from "../config/prisma";

// interface CustomSocket extends Socket {
//   userId?: string;
// }

// export const initSocket = (io: Server) => {
//   io.use(async (socket: CustomSocket, next) => {
//     try {
//       const cookies = socket.handshake.headers.cookie;
//       if (!cookies) {
//         return next(new Error("Unauthorized: No cookies found"));
//       }

//       const parsedCookies = cookie.parse(cookies);
//       const token = parsedCookies.token;

//       if (!token) {
//         return next(new Error("Unauthorized: Token not found"));
//       }

//       const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

//       const user = await prisma.user.findUnique({
//         where: { id: decoded.userId },
//       });

//       if (!user || user.sessionId !== decoded.sessionId) {
//         return next(new Error("Unauthorized: Invalid session"));
//       }

//       // Attach user info to socket
//       socket.userId = user.id;
//       next();
//     } catch (error) {
//       console.error("Socket auth error:", error.message);
//       next(new Error("Unauthorized: Invalid token"));
//     }
//   });

//   io.on("connection", (socket: CustomSocket) => {
//     console.log(`✅ Authenticated socket connected: ${socket.id}, userId: ${socket.userId}`);

//     socket.on("joinRoom", (roomId) => {
//       socket.join(roomId);
//       socket.to(roomId).emit("userJoined", socket.id);
//     });

//     socket.on("sendMessage", ({ roomId, message }) => {
//       io.to(roomId).emit("receiveMessage", { sender: socket.userId, message });
//     });

//     socket.on("disconnect", () => {
//       console.log(`🔌 Socket disconnected: ${socket.id}`);
//     });
//   });
// };

