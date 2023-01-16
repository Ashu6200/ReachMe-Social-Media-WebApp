const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const app = express();
const userRouter = require('./routes/userRoutes')
const postRouter = require('./routes/postRoutes')
const chatRouter = require('./routes/chatRoutes')
const cors = require("cors");
const socket = require("socket.io");


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();


//Routers
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/chat', chatRouter);

mongoose.connect(process.env.MONGODBURL).then(() => {
    console.log("DB is Connected")
}).catch(() => {
    console.log("DB is not Connected");
});


const PORT = process.env.PORT || 3001;

const server = app.listen(5000, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})

const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true
    }
});

global.onlineUsers = new Map();
io.on('connection', (socket) => {
    global.chatsocket = socket;
    socket.on('addUser', (id) => {
        onlineUsers.set(id, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-received", data.message);
        }
    })
})