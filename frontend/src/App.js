import React, { useState } from 'react';
import './App.css';

function App() {
  const [geminikey, setGeminikey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const getResponse = async () => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('gemini_api_key', geminikey);
      formData.append('prompt', prompt);

      const response = await fetch('https://8000-monikakusumanc-reactapp-t5b6jdzjsvt.ws-us107.gitpod.io/get_gemini_completion', {
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

      const responseData = await response.json();

      // Update state with the response from the backend
      const newPrompt = { user: prompt, bot: responseData.response };
      setResponses((prevResponses) => [...prevResponses, newPrompt]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>LLM Chatbot</h1>
      </header>

      <div id="container">
        <div id="inputContainer">
          <input
            type="text"
            placeholder="Enter the Geminikey"
            value={geminikey}
            onChange={(e) => setGeminikey(e.target.value)}
          />
          <button onClick={getResponse}>Get Response</button>
        </div>

        <div id="promptContainer">
          <input
            type="text"
            placeholder="Enter the prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div id="responseContainer">
            {responses.map((response, index) => (
              <div key={index}>
                <p>
                  <strong>User:</strong> {response.user}
                </p>
                <p>
                  <strong>Bot:</strong> {response.bot}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div id="loader" style={{ display: loading ? 'block' : 'none' }}>
          Loading...
        </div>
      </div>
    </div>
  );
}

export default App;
