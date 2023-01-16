const chatRouter = require("express").Router();
const Message = require("../model/messageModel");
const { verifyToken } = require("./verifytoken");

//create a new message
chatRouter.post("/msg", verifyToken, async (req, res) => {
    try {
        const { from, to, message } = req.body;
        const newMessae = await Message.create({
            message: message,
            Chatusers: [from, to],
            Sender: from,
        });
        return res.status(200).json(newMessae);
    } catch (error) {
        return res.status(500).json({ message: "error", error: error });
    }
});

chatRouter.get("/get/chat/msg/:user1Id/:user2Id", async (req, res) => {
    try {
        const from = req.params.user1Id;
        const to = req.params.user2Id;
        const newmessage = await Message.find({
            Chatusers: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 })
        const allMessages = newmessage.map((msg) => {
            return {
                myself: msg.Sender.toString() === from,
                message: msg.message
            };
        })
        return res.status(200).json(allMessages);
    } catch (error) {
        return res.status(500).json({ message: "error", error: error });
    }
});

module.exports = chatRouter;
