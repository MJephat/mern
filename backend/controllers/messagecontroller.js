const Conversation = require("../models/conversationmodel");
const Message = require("../models/messagemodel");

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      particiants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // socket io functionality

    // await conversation.save();
    // await newMessage.save();

    // the above 2 lines replaced..will hep to run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "internal Server error" });
  }
};

// exports.getMessages = async (req, res) => {
//   try {
//     const { id: userToChatId } = req.params;
//     const senderId = req.user._id;

//     const conversation = await Conversation.findOne({participants: { $all: [senderId, userToChatId] },})
//     .populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

//     if (!conversation) return res.status(200).json([]);

//     const messages = conversation.messages;

//     res.status(200).json(messages);
//   } catch (error) {
//     console.log("Error in getMessages controller: ", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

exports.getMessages = async (req, res) => {
  try {
    const senderId = req.user._id;

    // Find all conversations where the sender is a participant
    const conversations = await Conversation.find({
      participants: senderId,
    }).populate("messages"); // Populate actual messages

    // If there are no conversations, return an empty array
    if (!conversations || conversations.length === 0) {
      return res.status(200).json([]);
    }

    // Extract messages from all conversations
    const allMessages = conversations.reduce((acc, conv) => {
      acc.push(...conv.messages);
      return acc;
    }, []);

    // Respond with all messages
    res.status(200).json(allMessages);
  } catch (error) {
    // Log error and respond with an internal server error
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
;