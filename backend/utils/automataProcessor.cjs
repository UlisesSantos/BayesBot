const db = require('../models/db.cjs');

class AutomataProcessor {
  constructor() {
    // Keywords for agriculture
    this.agricultureKeywords = [
      'cultivo', 'siembra', 'cosecha', 'semilla', 'plantación', 'riego',
      'fertilizante', 'pesticida', 'suelo', 'planta', 'fruta', 'verdura',
      'orgánico', 'clima', 'temporada', 'agricultura'
    ];
    
    // keywords for exportation
    this.exportKeywords = [
      'exportación', 'exportar', 'comercio', 'internacional', 'mercado',
      'envío', 'aduana', 'aranceles', 'certificado', 'regulación',
      'embarque', 'logística', 'contenedor', 'puerto', 'importación'
    ];
    
    // keywords for questions
    this.questionWords = [
      'qué', 'cómo', 'cuándo', 'dónde', 'por qué', 'quién', 'cuál',
      'cuánto', 'cómo se'
    ];
  }
  
  // Method
  async findRelatedTopics(input) {
    const normalizedInput = input.toLowerCase();
    const relatedTopicIds = new Set();
    
    const [topics] = await db.execute('SELECT id, name, description FROM Topics');
    
    for (const topic of topics) {
      const topicName = topic.name.toLowerCase();
      const topicDesc = topic.description ? topic.description.toLowerCase() : '';
    
      // Check if the input contains the topic name or description
      if (normalizedInput.includes(topicName) || 
          (topicDesc && normalizedInput.includes(topicDesc))) {
        relatedTopicIds.add(topic.id);
      }
      
      if (topicName === 'agriculture') {
        for (const keyword of this.agricultureKeywords) {
          if (normalizedInput.includes(keyword)) {
            relatedTopicIds.add(topic.id);
            break;
          }
        }
      }
      
      if (topicName === 'exportation') {
        for (const keyword of this.exportKeywords) {
          if (normalizedInput.includes(keyword)) {
            relatedTopicIds.add(topic.id);
            break;
          }
        }
      }
    }
    
    if (relatedTopicIds.size > 0) {
      for (const topicId of [...relatedTopicIds]) {
        const [connections] = await db.execute(
          'SELECT topic_to FROM Connections WHERE topic_from = ?',
          [topicId]
        );
        
        for (const connection of connections) {
          relatedTopicIds.add(connection.topic_to);
        }
      }
    }
    
    // Details of related topics
    const relatedTopics = [];
    if (relatedTopicIds.size > 0) {
      const [topicDetails] = await db.execute(
        `SELECT id, name, description FROM Topics 
         WHERE id IN (${[...relatedTopicIds].join(',')})`
      );
      return topicDetails;
    }
    
    return relatedTopics;
  }
}

module.exports = AutomataProcessor;