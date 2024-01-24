import React, { useState } from 'react';
import { environment } from "./environment";
import './App.css';

function App() {
  const env = environment;
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const handleRequest = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('gemini_api_key', geminiApiKey);
      formData.append('prompt', prompt);

      const response = await fetch(env.fastAPIUrl, {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'include',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      setResponse(data.response);

      // Add the response to the chat messages
      setChatMessages([...chatMessages, { type: 'user', text: prompt }, { type: 'bot', text: data.response }]);
      setError('');
    } catch (error) {
      setResponse('');
      setError('Error occurred. Please check your input and try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="input-container">
        <h1>LLM Chatbot</h1>
        <label>
          Gemini API Key:
          <input type="password" value={geminiApiKey} onChange={(e) => setGeminiApiKey(e.target.value)} />
        </label>
        <br />
        <label>
          Prompt:
          <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        </label>
        <br />
        <button onClick={handleRequest} disabled={loading}>
          {loading ? 'Loading...' : 'Get Response'}
        </button>
        <br />
        <p style={{ color: 'red' }}>{error}</p>
      </div>
      <div className="chat-container">
        {chatMessages.map((message, index) => (
          <div key={index} className={`chat-message ${message.type === 'user' ? 'user' : 'bot'}`}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
