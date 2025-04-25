const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController.cjs');
const knowledgeController = require('../controllers/knowledgeController.cjs');
const topicController = require('../controllers/topicController.cjs');

// Route to process messages
router.post('/chat', chatController.processMessage);

// Route to add new knowledge
router.post('/teach', knowledgeController.teachBot);

// Route to get all topics
router.get('/topics', topicController.getAllTopics);

module.exports = router;