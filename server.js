import express from "express";
import http from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(join(__dirname, "public"))); // servira les fichiers front-end

let gameState = { counter: 0 };

io.on("connection", (socket) => {
  console.log("Joueur connecté:", socket.id);
  socket.emit("state", gameState);

  socket.on("increment", () => {
    gameState.counter++;
    io.emit("state", gameState);
  });

  socket.on("disconnect", () => console.log("Joueur déconnecté:", socket.id));
});

server.listen(3000, () => {
  console.log("Serveur en ligne sur http://localhost:3000");
});
