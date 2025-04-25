import React from 'react';
import ChatBot from './components/ChatBot';
import './App.css';

function App() {
  return (
    <>
      <header className="App-header">
        <h1>Chatbot de Agricultura y Exportación</h1>
      </header>
      <main className='App-main'>
        <ChatBot />
      </main>
    </>
  );
}

export default App;