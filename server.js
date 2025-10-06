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

app.use(express.static(join(__dirname, "public")));

const gameStates = {}; // { roomName: { counter: number, players: [] } }

io.on("connection", (socket) => {
  console.log("Nouveau joueur :", socket.id);

  // Quand un joueur rejoint une salle
  socket.on("joinRoom", (roomName) => {
    socket.join(roomName);

    // Crée la salle si elle n’existe pas encore
    if (!gameStates[roomName]) {
      gameStates[roomName] = { counter: 0, players: [] };
    }

    // Ajoute le joueur à la salle
    gameStates[roomName].players.push(socket.id);
    console.log(`Joueur ${socket.id} a rejoint la salle ${roomName}`);

    // Envoie l’état de la salle au nouveau joueur
    socket.emit("state", gameStates[roomName]);

    // Informe les autres que quelqu’un est arrivé
    io.to(roomName).emit("message", `Un joueur a rejoint ${roomName}`);
  });

  // Incrémenter le compteur dans une salle
  socket.on("increment", (roomName) => {
    if (!gameStates[roomName]) return;
    gameStates[roomName].counter++;
    io.to(roomName).emit("state", gameStates[roomName]);
  });

  // Quand un joueur se déconnecte
  socket.on("disconnect", () => {
    for (const room in gameStates) {
      const players = gameStates[room].players;
      const index = players.indexOf(socket.id);
      if (index !== -1) {
        players.splice(index, 1);
        console.log(`Joueur ${socket.id} a quitté ${room}`);
        if (players.length === 0) {
          console.log(`Salle ${room} vide, suppression.`);
          delete gameStates[room];
        }
        break;
      }
    }
  });
});

server.listen(3000, () => {
  console.log("Serveur prêt sur http://localhost:3000");
});
