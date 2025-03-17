const net = require("net");
const Store = require("../core/store");
const AOF = require("../core/aof");
const handleCommand = require("./handlers");

const store = new Store();
const aof = new AOF();
aof.load(store);

const server = net.createServer((socket) => {
  socket.write("Connected to MiniRedis\r\n> "); // Ensure proper newline handling

  let buffer = "";

  socket.on("data", (data) => {
    buffer += data.toString();

    while (buffer.includes("\n")) {
      let command;
      [command, buffer] = buffer.split("\n", 2);

      command = command.trim();
      if (command.length > 0) {
        const response = handleCommand(store, aof, command);
        socket.write(response + "\r\n> "); // Ensure proper formatting
      }
    }
  });

  socket.on("end", () => console.log("Client disconnected"));
});

server.listen(6379, () => console.log("MiniRedis server running on port 6379"));