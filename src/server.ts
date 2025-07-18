import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import http from "http";
import { Server } from "socket.io";
import { initSocket } from "./sockets/socket";
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});
initSocket(io);
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  return res
    .status(500)
    .json({ status: false, error: err.message || "Internal error" });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
