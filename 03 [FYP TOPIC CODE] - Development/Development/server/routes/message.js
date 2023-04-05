import express from 'express';
import { addMessage, getMessages } from '../controllers/message.js';

const router = express.Router();

router.post('/messages', addMessage);

router.get('/messages/:chatId', getMessages);

export default router