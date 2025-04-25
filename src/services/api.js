const API_URL = 'http://localhost:3001/api';

// Method
export const sendMessage = async (message) => {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    
    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en la API:', error);
    throw error;
  }
};

// Method
export const teachBot = async (question, answer, topicId) => {
  try {
    const response = await fetch(`${API_URL}/teach`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, answer, topicId }),
    });
    
    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en la API:', error);
    throw error;
  }
};