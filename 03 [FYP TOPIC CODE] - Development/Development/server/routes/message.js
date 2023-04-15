import express from 'express';
import { addMessage, getMessages,getLatestMessage } from '../controllers/message.js';

const router = express.Router();

router.post('/messages', addMessage);

router.get('/messages/:chatId', getMessages);

router.get('/messages/latest/:chatId', getLatestMessage);


export default router
