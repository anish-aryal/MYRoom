import MessageSchema from "../models/Messagemodel.js";

export const addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const message = new MessageSchema({
    chatId,
    senderId,
    text,
  });
  try {
    const result = await message.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await MessageSchema.find({ chatId });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getLatestMessage = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await MessageSchema.findOne({ chatId }).sort({createdAt: -1}).limit(1);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};