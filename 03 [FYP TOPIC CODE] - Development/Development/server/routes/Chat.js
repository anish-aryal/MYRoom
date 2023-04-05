import express from 'express'
import { createChat, findChat, userChats } from '../controllers/chatController.js';
const router = express.Router()

router.post('/chat', createChat);
router.get('/chat/:userId', userChats);
router.get('/chat/find/:firstId/:secondId', findChat);

export default router