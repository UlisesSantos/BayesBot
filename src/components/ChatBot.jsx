import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import TeachingForm from './TeachingForm';
import { sendMessage } from '../services/api';
import './style/ChatBot.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: '¡Hola! Soy tu asistente para temas de agricultura y exportación. ¿En qué puedo ayudarte?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [teaching, setTeaching] = useState(false);
  const [lastQuestion, setLastQuestion] = useState('');
  const [topics, setTopics] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
    // Cargar temas disponibles
    fetch('http://localhost:3001/api/topics')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setTopics(data.data);
        }
      })
      .catch(err => console.error('Error al cargar temas:', err));
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (input.trim() === '') return;
    
    // Añadir mensaje del usuario
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    
    // Guardar la pregunta actual
    setLastQuestion(input);
    
    try {
      // Enviar a la API
      const response = await sendMessage(input);
      
      // Si el bot no conoce la respuesta
      if (response.type === 'unknown') {
        setMessages(prev => [...prev, { 
          text: '¡No tengo información sobre esto! ¿Te gustaría enseñarme?', 
          sender: 'bot' 
        }]);
        setTeaching(true);
      } else {
        // Respuesta normal
        setMessages(prev => [...prev, { 
          text: response.answer, 
          sender: 'bot' 
        }]);
      }
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      setMessages(prev => [...prev, { 
        text: 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.', 
        sender: 'bot' 
      }]);
    }
    
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">
      <div className= "chatbot-messages">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {teaching ? (
        <TeachingForm 
          question={lastQuestion}
          topics={topics}
          onCancel={() => {
            setTeaching(false);
            setMessages(prev => [...prev, { 
              text: 'No hay problema. ¿Hay algo más en lo que pueda ayudarte?', 
              sender: 'bot' 
            }]);
          }}
          onSubmit={(answer, topicId) => {
            setTeaching(false);
            setMessages(prev => [...prev, { 
              text: '¡Gracias! He aprendido algo nuevo. ¿Hay algo más en lo que pueda ayudarte?', 
              sender: 'bot' 
            }]);
          }}
        />
      ) : (
        <div className="chatbot-input">
          <input 
            className='chatbot-input-text'
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu pregunta aquí..."
          />
          <button className='chatbot-input-button' onClick={handleSend}>Enviar</button>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
