import React from 'react';
import './style/ChatMessage.css';

const ChatMessage = ({ message }) => {
  const { text, sender } = message;
  
  return (
    <div className={`message-${sender}`}>
      <div className="message-content">
        {text}
      </div>
    </div>
  );
};

export default ChatMessage;