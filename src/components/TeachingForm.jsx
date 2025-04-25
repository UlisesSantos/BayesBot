import React, { useState } from 'react';
import { teachBot } from '../services/api';

const TeachingForm = ({ question, topics, onCancel, onSubmit }) => {
  const [answer, setAnswer] = useState('');
  const [topicId, setTopicId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const handleSubmit = async () => {
    if (answer.trim() === '' || !topicId) return;
    
    setSubmitting(true);
    try {
      await teachBot(question, answer, topicId);
      onSubmit(answer, topicId);
    } catch (error) {
      console.error('Error al enseñar al bot:', error);
      alert('Ha ocurrido un error al guardar la respuesta. Por favor, intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div className="teaching-form">
      <h3>Enseñar al chatbot</h3>
      <p>Pregunta: {question}</p>
      <textarea
        rows="4"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Escribe la respuesta correcta..."
      />
      <div className="form-group">
        <label>Tema relacionado:</label>
        <select 
          value={topicId} 
          onChange={(e) => setTopicId(e.target.value)}
          required
        >
          <option value="">Selecciona un tema</option>
          {topics.map(topic => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
      </div>
      <div className="teaching-buttons">
        <button onClick={onCancel} disabled={submitting}>Cancelar</button>
        <button 
          onClick={handleSubmit} 
          disabled={submitting || answer.trim() === '' || !topicId}
        >
          {submitting ? 'Guardando...' : 'Guardar respuesta'}
        </button>
      </div>
    </div>
  );
};

export default TeachingForm;