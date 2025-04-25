const db = require('../models/db.cjs');
const AutomataProcessor = require('../utils/AutomataProcessor.cjs');

const automata = new AutomataProcessor();

exports.processMessage = async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Se requiere un mensaje' });
    }
    
    // automata call
    const relatedTopics = await automata.findRelatedTopics(message);
    
    // new question
    const [insertResult] = await db.execute(
      'INSERT INTO Questions (question) VALUES (?)', 
      [message]
    );
    
    const questionId = insertResult.insertId;
    
    // similar answers
    const [answers] = await db.execute(`
      SELECT a.answer, t.name as topic_name 
      FROM Questions q 
      JOIN Answers a ON q.id = a.question_id
      JOIN Topics t ON a.topic_id = t.id
      WHERE MATCH(q.question) AGAINST(? IN NATURAL LANGUAGE MODE)
      LIMIT 1
    `, [message]);
    
    if (answers.length > 0) {
      // answer found
      return res.json({
        type: 'known',
        answer: answers[0].answer,
        topic: answers[0].topic_name,
        relatedTopics
      });
    } else {
      // not answer found
      return res.json({
        type: 'unknown',
        questionId,
        relatedTopics
      });
    }
  } catch (error) {
    console.error('Error al procesar mensaje:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};