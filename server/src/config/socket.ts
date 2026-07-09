import { Server as HTTPServer } from "http";
import { Server as SocketServer } from "socket.io";
import jwt from "jsonwebtoken";

export const initSocket = (httpServer: HTTPServer) => {
  const io = new SocketServer(httpServer, {
    cors: { origin: "*" },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("No token provided"));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
      (socket as any).userId = decoded.userId;
      next();
    } catch (err) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join_channel", (channelId: string) => {
      socket.join(channelId);
    });

    socket.on("chat_message", (data: { channelId: string; content: string }) => {
      io.to(data.channelId).emit("new_message", {
        channelId: data.channelId,
        content: data.content,
        senderId: (socket as any).userId,
        timestamp: new Date(),
      });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
};