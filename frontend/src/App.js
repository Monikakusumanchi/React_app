import React, { useState } from 'react';
import './App.css';

function App() {
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRequest = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('gemini_api_key', geminiApiKey);
      formData.append('prompt', prompt);

      const response = await fetch('https://8000-monikakusumanc-reactapp-siv7pa3roh3.ws-us107.gitpod.io/get_gemini_completion', {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'include', 
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: formData,
      });
      console.log(response)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);
      setResponse(data.response);
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
      <h1>FastAPI React Demo</h1>
      <label>
        Gemini API Key:
        <input type="text" value={geminiApiKey} onChange={(e) => setGeminiApiKey(e.target.value)} />
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
      {response && (
        <div>
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;
