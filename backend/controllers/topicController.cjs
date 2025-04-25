const db = require('../models/db.cjs');

exports.getAllTopics = async (req, res) => {
  try {
    const [topics] = await db.execute('SELECT * FROM Topics');
    
    res.json({
      success: true,
      data: topics
    });
  } catch (error) {
    console.error('Error al obtener los temas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};