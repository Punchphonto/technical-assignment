const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:5173" });

let onlineUser = [];

io.on("connection", (socket) => {
    socket.on("addNewUser", (userId) => {
        !onlineUser.some((user) => user.userId === userId) &&
            onlineUser.push({
                userId,
                socketId: socket.id
            })
        console.log(onlineUser);
        io.emit("getOnlineUser", onlineUser)
    });

    // add message
    socket.on("sendMessage", (message) => {
        const user = onlineUser.find(
            u => u.userId === message.recipientId
        )
        if (user) {
            io.to(user.socketId).emit("getMessage", message)
        }
    })

    socket.on("disconnect", () => {
        onlineUser = onlineUser.filter((user) => user.socketId !== socket.id)
        io.emit("getOnlineUser", onlineUser)
    })
});

io.listen(3000);