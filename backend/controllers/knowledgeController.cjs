const db = require('../models/db.cjs');

exports.teachBot = async (req, res) => {
  try {
    const { question, answer, topicId } = req.body;
    
    if (!question || !answer || !topicId) {
      return res.status(400).json({ 
        error: 'Se requieren pregunta, respuesta y tema' 
      });
    }
    
    let questionId;
    
    const [existingQuestions] = await db.execute(
      'SELECT id FROM Questions WHERE question = ?',
      [question]
    );
    
    if (existingQuestions.length > 0) {
      questionId = existingQuestions[0].id;
    } else {
      const [insertResult] = await db.execute(
        'INSERT INTO Questions (question) VALUES (?)',
        [question]
      );
      questionId = insertResult.insertId;
    }
    
    // saves the answer
    await db.execute(
      'INSERT INTO Answers (question_id, answer, topic_id) VALUES (?, ?, ?)',
      [questionId, answer, topicId]
    );
    
    res.json({
      success: true,
      message: 'Conocimiento agregado correctamente'
    });
  } catch (error) {
    console.error('Error al enseñar al bot:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};