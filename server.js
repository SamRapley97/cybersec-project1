const { ClientRequest } = require("http");
const net = require("net");

const sockets = [];

const tcpServer = net.createServer();

tcpServer.on("connection", function (socket) {
  console.log("connection establised");

  socket.setEncoding("utf-8");

  sockets.push(socket);

  socket.on("data", function (data) {
    console.log(data);
    const clients = sockets.length;
    for (let i = 0; i < clients; i++) {
      if (sockets[i] === socket) continue;
      sockets[i].write(data);
    }
  });

  socket.on("end", function () {
    sockets.splice(sockets.indexOf(socket, 1));
  });
});

tcpServer.listen(8000);
