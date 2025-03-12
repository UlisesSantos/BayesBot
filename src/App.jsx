import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='app-container'>
        <h1 className='app-title'>Chat</h1>
        <div className='app-chat'></div>
        <div className='app-input'>
          <input
            type='text'
            placeholder='Type a message...'
            className='app-input-field'>
          </input>
          <button className='app-input-button'>Send</button>
        </div>
      </div>
    </>
  )
}

export default App
